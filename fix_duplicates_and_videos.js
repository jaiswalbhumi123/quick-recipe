const fs = require('fs');
const path = require('path');
const ytSearch = require('yt-search');
const https = require('https');

const recipesFile = path.join('backend', 'data', 'recipes.json');
let data = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

// 1. Deduplicate by exact name
let uniqueRecipes = [];
let seenNames = new Set();
for (let r of data) {
    if (!seenNames.has(r.name)) {
        seenNames.add(r.name);
        uniqueRecipes.push(r);
    }
}
const removedCount = data.length - uniqueRecipes.length;
console.log(`Removed ${removedCount} duplicate recipes.`);

// 2. We need to fix the videos. The new ones have 'dQw4w9WgXcQ' as default.
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

async function fixRegionalVideos() {
    let toFix = uniqueRecipes.filter(r => r.videoId === 'dQw4w9WgXcQ' || r.videoId === 'k5jTxzhZKMI' || r.videoId === 'a03U45jFxOI' || r.name.toLowerCase().includes('pani puri'));
    console.log(`Need to fix videos for ${toFix.length} recipes...`);

    let count = 0;
    for (let i = 0; i < toFix.length; i++) {
        let r = toFix[i];
        let vid = await getSpecificVideo(r.name);
        if (vid) {
            r.videoId = vid;
            count++;
            console.log(`Fixed video for: ${r.name} -> ${vid}`);
        } else {
            console.log(`Could not find video for: ${r.name}`);
        }
    }

    fs.writeFileSync(recipesFile, JSON.stringify(uniqueRecipes, null, 2));
    console.log(`Successfully fixed ${count} new exact videos.`);
}

fixRegionalVideos();
