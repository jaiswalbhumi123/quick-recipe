const fs = require('fs');
const path = require('path');
const ytSearch = require('yt-search');
const https = require('https');

const recipesFile = path.join('backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

const checkEmbed = (id) => {
    return new Promise((resolve) => {
        https.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`, (res) => {
            resolve(res.statusCode === 200);
        }).on('error', () => resolve(false));
    });
};

async function getSpecificVideo(name) {
    try {
        const r = await ytSearch(`${name} recipe`);
        if (r && r.videos && r.videos.length > 0) {
            for (let i = 0; i < Math.min(3, r.videos.length); i++) {
                const v = r.videos[i];
                if (await checkEmbed(v.videoId)) {
                    return v.videoId;
                }
            }
        }
    } catch (e) {
        // ignore
    }
    return null;
}

async function processBatches() {
    console.log(`Starting massive video sync for ${recipes.length} recipes...`);
    
    // We will do this in batches of 10 to avoid blasting YouTube and getting blocked
    const BATCH_SIZE = 10;
    let updated = 0;

    for (let i = 0; i < recipes.length; i += BATCH_SIZE) {
        const batch = recipes.slice(i, i + BATCH_SIZE);
        const promises = batch.map(async (r) => {
            const vid = await getSpecificVideo(r.name);
            if (vid) {
                r.videoId = vid;
                updated++;
            }
        });
        
        await Promise.all(promises);
        
        // Print progress
        console.log(`Processed ${Math.min(i + BATCH_SIZE, recipes.length)} / ${recipes.length} recipes...`);
        
        // Small delay to prevent rate limit
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
    console.log(`\nDONE! Successfully mapped exact specific videos for ${updated} recipes.`);
}

processBatches();
