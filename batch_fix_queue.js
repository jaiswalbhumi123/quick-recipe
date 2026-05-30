const fs = require('fs');
const path = require('path');
const ytSearch = require('yt-search');

const recipesFile = path.join('backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

const fallbacks = ["k5jTxzhZKMI", "a03U45jFxOI", "-yhf5fx6LQM", "Y2e2K7a-TrY", "LqmLKm1JhlQ", "FLd00Bx4tOk", "1IszT_guI08", "O19sXyA1X_w", "T_8Qf8vXvN4", "Uu7u_R3pBf0"];
const forces = ["aubergine and hummus", "aussie burger", "bang bang prawn"];

async function main() {
    let toProcess = recipes.filter(r => {
        let f = forces.find(x => r.name.toLowerCase().includes(x));
        return f || fallbacks.includes(r.videoId);
    });
    
    console.log(`Need to fix exactly ${toProcess.length} videos.`);
    let count = 0;
    
    // Batch process in groups of 50 to maximize speed
    for (let i = 0; i < toProcess.length; i += 50) {
        let chunk = toProcess.slice(i, i + 50);
        await Promise.all(chunk.map(async (r) => {
            try {
                let s = await ytSearch(`${r.name} recipe`);
                if (s && s.videos.length > 0) {
                    r.videoId = s.videos[0].videoId;
                    count++;
                }
            } catch(e){}
        }));
        console.log(`Processed ${Math.min(i+50, toProcess.length)} / ${toProcess.length}`);
    }

    // Save
    fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
    console.log(`Successfully mapped ${count} precise videos!`);
}

main();
