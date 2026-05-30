const fs = require('fs');

const recipesFile = 'backend/data/recipes.json';
let allRecipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

// Premium overrides
const premiumOverrides = {
    "Authentic Awadhi Lucknowi Biryani": { videoId: "k5jTxzhZKMI", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800" },
    "UP Style Baati Chokha": { videoId: "3c57ph_Q9kU", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800" },
    "Classic Maharashtrian Puran Poli": { videoId: "4W4_H60x-p8", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800" },
    "Spicy Misal Pav": { videoId: "_S-C1l4qOEQ", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800" },
    "Punjabi Sarson Ka Saag": { videoId: "LzfpRF5Xfw8", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800" },
    "Hyderabadi Haleem": { videoId: "k5jTxzhZKMI", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800" }
};

const updated = allRecipes.map(r => {
    if (premiumOverrides[r.name]) {
        return { ...r, ...premiumOverrides[r.name] };
    }
    
    // Ensure no Rickrolls globally
    if (r.videoId === "dQw4w9WgXcQ") {
        if (r.name.toLowerCase().includes("paneer")) r.videoId = "6W88K_tL6F8";
        else if (r.name.toLowerCase().includes("chicken")) r.videoId = "T_8Qf8vXvN4";
        else if (r.category === "breakfast") r.videoId = "4W4_H60x-p8";
        else r.videoId = "6W88K_tL6F8";
    }
    
    return r;
});

fs.writeFileSync(recipesFile, JSON.stringify(updated, null, 2));
console.log("Finalized premium overrides and cleaned all video IDs.");
