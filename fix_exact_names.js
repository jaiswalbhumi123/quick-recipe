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
    } catch (e) {}
    return null;
}

// User explicitly mentioned:
const priorities = ["Aubergine and hummus grills", "Aussie burgers", "Bang bang prawn salad"];

async function main() {
    let count = 0;
    
    // Process priorities first
    for (let p of priorities) {
        let rec = recipes.find(r => r.name.toLowerCase() === p.toLowerCase());
        if (rec) {
            let vid = await getSpecificVideo(p);
            if (vid) {
                rec.videoId = vid;
                count++;
                console.log(`Fixed exact video for: ${p} -> ${vid}`);
            }
        }
    }

    // Now process the next 40 top items shown on all dashboard loading list
    // to give user an immediate, excellent impression!
    let batch = recipes.slice(6, 46); // skipping 0-5 premium ones
    let promises = batch.map(async (r) => {
        // Only fetch if they currently point to our generic fallback array 
        const generics = ["a03U45jFxOI","-yhf5fx6LQM","Y2e2K7a-TrY","LqmLKm1JhlQ","FLd00Bx4tOk","k5jTxzhZKMI","1IszT_guI08", "O19sXyA1X_w", "T_8Qf8vXvN4", "Uu7u_R3pBf0"];
        if (generics.includes(r.videoId)) {
            let vid = await getSpecificVideo(r.name);
            if (vid) {
                r.videoId = vid;
                count++;
                console.log(`Mapped exact video: ${r.name}`);
            }
        }
    });

    await Promise.all(promises);

    fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
    console.log(`Done. Fixed ${count} specific videos immediately.`);
}

main();
