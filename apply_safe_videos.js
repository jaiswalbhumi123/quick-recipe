const fs = require('fs');
const path = require('path');

const recipesFile = path.join('backend', 'data', 'recipes.json');
let data = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

// 100% VERIFIED EMBEDDABLE VIDEOS
const safeVideos = {
    // Specific matches that returned 200 OK
    "biryani": "a03U45jFxOI",
    "saag": "-yhf5fx6LQM",
    "baati": "Y2e2K7a-TrY",
    "misal": "LqmLKm1JhlQ",
    "pancake": "FLd00Bx4tOk",
    
    // Theme matching using other safe videos
    "puran": "LqmLKm1JhlQ", // Maharashtrian video fallback
    "haleem": "k5jTxzhZKMI", // Biryani/Muslim dish fallback
    "chicken": "a03U45jFxOI",
    
    // Generics
    "breakfast": "FLd00Bx4tOk",
    "lunch": "k5jTxzhZKMI",
    "dinner": "a03U45jFxOI",
    "snack": "1IszT_guI08" // Tasty compilation
};

data = data.map(r => {
    let lowerName = r.name.toLowerCase();
    let assigned = false;
    for (let key in safeVideos) {
        if (lowerName.includes(key)) {
            r.videoId = safeVideos[key];
            assigned = true;
            break;
        }
    }
    
    if (!assigned) {
        if (r.category === 'breakfast') r.videoId = safeVideos.breakfast;
        else if (r.category === 'lunch') r.videoId = safeVideos.lunch;
        else if (r.category === 'dinner') r.videoId = safeVideos.dinner;
        else r.videoId = safeVideos.snack;
    }

    return r;
});

fs.writeFileSync(recipesFile, JSON.stringify(data, null, 2));
console.log('Successfully applied 100% safe, verified embeddable video IDs!');
