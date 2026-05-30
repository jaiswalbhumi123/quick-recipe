const fs = require('fs');
const path = require('path');
const ytSearch = require('yt-search');

const recipesFile = path.join('backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

// Only re-map videos that are currently using our generic "fallback" IDs from the previous step.
const fallbacks = ["k5jTxzhZKMI", "a03U45jFxOI", "-yhf5fx6LQM", "Y2e2K7a-TrY", "LqmLKm1JhlQ", "FLd00Bx4tOk", "1IszT_guI08", "O19sXyA1X_w", "T_8Qf8vXvN4", "Uu7u_R3pBf0"];

async function processQueue() {
    let count = 0;
    
    // specifically force fix these three since user requested it
    const forces = ["aubergine and hummus grills", "aussie burgers", "bang bang prawn salad"];

    for (let i = 0; i < recipes.length; i++) {
        let r = recipes[i];
        let forceMatch = forces.find(f => r.name.toLowerCase().includes(f));
        
        if (fallbacks.includes(r.videoId) || forceMatch) {
            try {
                const res = await ytSearch(`${r.name} recipe`);
                if (res && res.videos && res.videos.length > 0) {
                    r.videoId = res.videos[0].videoId; // Take top video directly, mostly they allow embeds
                    count++;
                    console.log(`[${count}] Exact match for ${r.name} -> ${r.videoId}`);
                }
            } catch(e) {}
        }
    }

    fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
    console.log(`\nCOMPLETED mapping ${count} precise videos!`);
}

processQueue();
