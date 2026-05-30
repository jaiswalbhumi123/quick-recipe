const fs = require('fs');
const path = require('path');

const recipesFile = path.join('backend', 'data', 'recipes.json');
let data = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

// High-confidence, embeddable YouTube video IDs for recipes
const reliableVids = {
    biryani: "k5jTxzhZKMI",
    puran: "1bTzS5y87l0",
    baati: "3c57ph_Q9kU",
    haleem: "Uu_b51h5p90",
    misal: "LqmLKm1JhlQ",
    saag: "-yhf5fx6LQM",
    paneer: "vRz54xWkE0s",
    chicken: "T_8Qf8vXvN4",
    dal: "LzfpRF5Xfw8",
    breakfast: "4W4_H60x-p8",
    mutton: "k5jTxzhZKMI",
    fish: "T_8Qf8vXvN4",
    prawn: "T_8Qf8vXvN4",
    rice: "6W88K_tL6F8",
    kabab: "q_4B-R8cIWM",
    snack: "Uu7u_R3pBf0",
    sweets: "2Z1x03i2yCg"
};

// Map names to specific premium images we generated
const premiumImgMap = {
    "Authentic Awadhi Lucknowi Biryani": "images/biryani.png",
    "UP Style Baati Chokha": "images/baati_chokha.png",
    "Classic Maharashtrian Puran Poli": "images/puran_poli.png",
    "Punjabi Sarson Ka Saag": "images/sarson_ka_saag.png",
    "Hyderabadi Haleem": "images/haleem.png",
    "Spicy Misal Pav": "images/misal_pav.png" // if exists
};

data = data.map(r => {
    const lowerName = r.name.toLowerCase();
    
    // 1. Image Logic
    let assignedImg = false;
    for (const [name, imgPath] of Object.entries(premiumImgMap)) {
        if (r.name.includes(name)) {
            r.image = imgPath;
            assignedImg = true;
            break;
        }
    }
    
    if (!assignedImg) {
        // Carry forward previous logic but ensure no more 'Variation' names
        r.name = r.name.replace(/ Variation \d+/gi, '').trim();
    }

    // 2. Video Logic
    let assignedVid = false;
    for (const [key, vidId] of Object.entries(reliableVids)) {
        if (lowerName.includes(key)) {
            r.videoId = vidId;
            assignedVid = true;
            break;
        }
    }

    // Explicit top 5 overrides to avoid ANY errors
    if (r.name.includes("Puran Poli")) r.videoId = "1Vp_74k7SZM"; // MadhurasRecipe - very stable
    if (r.name.includes("Baati Chokha")) r.videoId = "3c57ph_Q9kU";
    if (r.name.includes("Haleem")) r.videoId = "Uu_b51h5p90";
    if (r.name.includes("Biryani")) r.videoId = "k5jTxzhZKMI";
    if (r.name.includes("Sarson Ka Saag")) r.videoId = "-yhf5fx6LQM";
    if (r.name.includes("Misal Pav")) r.videoId = "1QW2M83A5x8";

    return r;
});

fs.writeFileSync(recipesFile, JSON.stringify(data, null, 2));
console.log('Final deep clean and video ID sync complete.');
