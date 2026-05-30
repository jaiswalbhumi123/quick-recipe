const fs = require('fs');
const path = require('path');

const recipesPath = path.join(__dirname, 'backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));

// High quality video and image fixes
const specificFixes = {
    5000: { 
        name: "Classic British Fish and Chips",
        videoId: "ps0m03N_hMc", 
        image: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=1000" 
    },
    5001: {
        name: "Authentic Shepherd's Pie",
        videoId: "MDeS_6LNoVs",
        image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd679?w=1000"
    },
    173: {
        name: "Dhaba Style Dal Fry",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1000",
        videoId: "7i-23-4-H4Y"
    }
};

recipes = recipes.map(recipe => {
    // Apply specific fixes
    if (specificFixes[recipe.id]) {
        Object.assign(recipe, specificFixes[recipe.id]);
    }

    // Fix generic/wrong images for others
    if (!recipe.image || recipe.image.includes('placeholder') || recipe.image.includes('loremflickr.com')) {
        const query = recipe.name.split(' ').slice(-1)[0];
        recipe.image = `https://loremflickr.com/800/600/food,${query}?lock=${recipe.id}`;
    }

    // Ensure all have working steps
    if (recipe.steps.length === 0) {
        recipe.steps = ["Prep ingredients", "Cook on medium heat", "Garnish and serve"];
    }

    return recipe;
});

fs.writeFileSync(recipesPath, JSON.stringify(recipes, null, 2));
console.log("Specific Fixes Applied.");
