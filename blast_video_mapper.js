const fs = require('fs');
const path = require('path');
const ytSearch = require('yt-search');

const recipesFile = path.join('backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

// We want to force re-map EVERY single recipe so each has its own EXACT video.
async function searchVideo(name) {
    try {
        let q = `${name} recipe`;
        let s = await ytSearch(q);
        if (s && s.videos.length > 0) {
            return s.videos[0].videoId;
        }
    } catch (e) { }
    return null;
}

// We will skip the first 6 very premium, hand-picked recipes because we already spent time making sure they are perfectly verified.
// The rest (1000+) we will do now!
async function blast() {
    let toProcess = recipes.slice(6);
    console.log(`Blasting ${toProcess.length} recipes for exact unique videos...`);

    let count = 0;
    // Process in batches of 50
    for (let i = 0; i < toProcess.length; i += 50) {
        let chunk = toProcess.slice(i, i + 50);
        await Promise.all(chunk.map(async (r) => {
            let vid = await searchVideo(r.name);
            if (vid) {
                r.videoId = vid;
                count++;
            }
        }));
        console.log(`Progress: ${i + chunk.length} / ${toProcess.length}`);
    }

    // Now write back
    // Remember to put recipes[0..5] together with toProcess
    for (let i = 0; i < toProcess.length; i++) {
        recipes[i + 6] = toProcess[i];
    }

    fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
    console.log(`Finished! Found unique matching videos for ${count} recipes.`);
}

blast();
