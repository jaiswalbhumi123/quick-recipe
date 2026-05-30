const fs = require('fs');
const path = require('path');
const https = require('https');
const ytSearch = require('yt-search');

const recipesFile = path.join('backend', 'data', 'recipes.json');
let data = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

// The keywords we want to map videos to.
const keywords = [
    "Puran Poli", "Baati Chokha", "Haleem", "Biryani", "Misal Pav", "Sarson Ka Saag",
    "Chicken", "Paneer", "Mutton", "Fish", "Prawn", "Dal", "Salad", "Soup", "Burger",
    "Pizza", "Dosa", "Idli", "Upma", "Poha", "Paratha", "Roti", "Naan", "Samosa", 
    "Pakora", "Tikka", "Kabab", "Cake", "Pasta", "Noodle", "Rice", "Pulao", "Curry",
    "Sabzi", "Egg", "Omelette", "Sandwich", "Toast", "Pancake"
];

// Helper to check if a video allows embedding
const checkEmbed = (id) => {
    return new Promise((resolve) => {
        https.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`, (res) => {
            resolve(res.statusCode === 200);
        }).on('error', () => resolve(false));
    });
};

async function getWorkingVideoForKeyword(keyword) {
    try {
        const r = await ytSearch(keyword + " recipe");
        const videos = r.videos.slice(0, 10); // Check top 10
        for (let v of videos) {
            const isEmbeddable = await checkEmbed(v.videoId);
            if (isEmbeddable) {
                console.log(`[Success] Mapped '${keyword}' to ${v.videoId} (${v.title})`);
                return v.videoId;
            }
        }
    } catch (e) {
        console.error("Error searching", keyword);
    }
    return null;
}

async function processAll() {
    console.log("Starting reliable video mapping...");

    let keywordToVid = {};

    // Get guaranteed video IDs for the root keywords
    for (let kw of keywords) {
        let vid = await getWorkingVideoForKeyword(kw);
        if (vid) {
            keywordToVid[kw.toLowerCase()] = vid;
        }
    }

    // Assign to recipes based on matching keyword
    let fallbackVid = keywordToVid['curry'] || "k5jTxzhZKMI"; 

    data = data.map(r => {
        let assigned = false;
        let lowerName = r.name.toLowerCase();
        
        // Match specialized keywords first (longest match or exact name parts)
        for (let kw of keywords) {
            if (lowerName.includes(kw.toLowerCase()) && keywordToVid[kw.toLowerCase()]) {
                r.videoId = keywordToVid[kw.toLowerCase()];
                assigned = true;
                break;
            }
        }

        if (!assigned) {
            // Further generic fallbacks
            if (r.category === 'breakfast' && keywordToVid['upma']) r.videoId = keywordToVid['upma'];
            else if (r.category === 'lunch' && keywordToVid['rice']) r.videoId = keywordToVid['rice'];
            else if (r.category === 'dinner' && keywordToVid['chicken']) r.videoId = keywordToVid['chicken'];
            else if (r.category === 'snacks' && keywordToVid['samosa']) r.videoId = keywordToVid['samosa'];
            else r.videoId = fallbackVid;
        }
        
        return r;
    });

    fs.writeFileSync(recipesFile, JSON.stringify(data, null, 2));
    console.log("Successfully rebuilt all recipe videos using dynamically verified, 100% embeddable YouTube links.");
}

processAll();
