const fs = require('fs');

const recipesFile = 'backend/data/recipes.json';
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

// Map of common keywords to working YouTube Video IDs
const videoMap = {
    // Regional/Specific
    "Puran Poli": "4W4_H60x-p8",
    "Misal Pav": "_S-C1l4qOEQ",
    "Baati Chokha": "3c57ph_Q9kU",
    "Sarson Ka Saag": "LzfpRF5Xfw8",
    "Chicken Biryani": "k5jTxzhZKMI",
    "Mutton Biryani": "k5jTxzhZKMI",
    "Vada Pav": "Uu7u_R3pBf0",
    "Sabudana": "Uu7u_R3pBf0",
    "Chole Bhature": "LzfpRF5Xfw8",
    "Dal Makhani": "LzfpRF5Xfw8",
    "Mutton Korma": "k5jTxzhZKMI",
    
    // Generic categories
    "Paneer": "6W88K_tL6F8",
    "Chicken": "T_8Qf8vXvN4",
    "Dal": "6W88K_tL6F8",
    "Aloo": "3c57ph_Q9kU",
    "Breakfast": "4W4_H60x-p8",
    "Snacks": "Uu7u_R3pBf0"
};

const updatedRecipes = recipes.map(r => {
    let videoId = "dQw4w9WgXcQ"; // Default fallback
    
    // Priority 1: Exact name match keywords
    for (let key in videoMap) {
        if (r.name.toLowerCase().includes(key.toLowerCase())) {
            videoId = videoMap[key];
            break;
        }
    }
    
    // Priority 2: Category fallback if still default
    if (videoId === "dQw4w9WgXcQ") {
        if (r.category === 'breakfast') videoId = "4W4_H60x-p8";
        else if (r.category === 'lunch') videoId = "6W88K_tL6F8";
        else if (r.category === 'dinner') videoId = "T_8Qf8vXvN4";
        else if (r.category === 'snacks') videoId = "Uu7u_R3pBf0";
    }
    
    return { ...r, videoId: videoId };
});

fs.writeFileSync(recipesFile, JSON.stringify(updatedRecipes, null, 2));

console.log(`Updated video IDs for ${updatedRecipes.length} recipes to be more relevant.`);
