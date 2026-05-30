const fs = require('fs');
const path = require('path');
const ytSearch = require('yt-search');

const recipesFile = path.join('backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

// Don't re-match if it's already an exact video (so we pick up where we left off essentially or just re-do)
// Instead let's just do the ones we know are bad (our generic fallbacks + first 250 for now).
const generics = ["a03U45jFxOI", "-yhf5fx6LQM", "Y2e2K7a-TrY", "LqmLKm1JhlQ", "FLd00Bx4tOk", "k5jTxzhZKMI", "1IszT_guI08", "O19sXyA1X_w", "T_8Qf8vXvN4", "Uu7u_R3pBf0", "3UH0I5xwGYA", "1DbrPChGnpk", "YfjyoYBnqRQ", "6Tme3rLiFzg", "fEzDJ8Md0yc", "XtvzuziFFBI", "4QAD9Zj9eP4", "WfCvMfiVHKY", "_q5GKCNZcHI", "qkRrmKWotA8", "PFG1aeYgi7c", "nRwZuhTWsjw", "cAoYsLXUKGI", "92D8P1mamrQ", "cP3RwsJL0Ws", "HCyalu9KMIs", "ref4lsPJ_r4", "6No7g2GptXY", "12L2LsKYfPI", "OjfvFMMos7c", "4h4nP40C0io", "aQHr9Zsnzbw", "ZjEL_bLSRlY", "nPi2GD2SqfQ", "4K_XCyS5M-E", "MrZFfO5v91A", "rm_9cPXrv4A", "sAa-CEl5Z-k", "JbmSFoXC-VU", "Km7KRbKVu88", "RaLzxZryEoA"];

async function searchVideo(name) {
    try {
        let s = await ytSearch(`${name} recipe`);
        if (s && s.videos.length > 0) return s.videos[0].videoId;
    } catch (e) {}
    return null;
}

// Ensure the specific error recipes are fixed
const specific = ["aubergine and hummus grill", "aussie burger", "bang bang prawn salad"];

async function main() {
    let toProcess = recipes.filter(r => generics.includes(r.videoId) || specific.some(s => r.name.toLowerCase().includes(s)));
    console.log(`Fixing exactly ${toProcess.length} recipes...`);

    let count = 0;
    // Do 40 at a time, write, so it works live
    for (let i = 0; i < toProcess.length; i += 40) {
        let chunk = toProcess.slice(i, i + 40);
        await Promise.all(chunk.map(async (r) => {
            let vid = await searchVideo(r.name);
            if (vid) {
                // update in main array
                let realRec = recipes.find(x => x.id === r.id);
                if (realRec) {
                    realRec.videoId = vid;
                    count++;
                }
            }
        }));
        
        fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
        console.log(`Saved batch up to ${i+40} / ${toProcess.length}`);
    }
    console.log(`Finished mapping ${count} perfect videos in real-time.`);
}
main();
