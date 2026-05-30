const fs = require('fs');
const path = require('path');

const recipesFile = path.join(__dirname, 'backend', 'data', 'recipes.json');
const rawData = fs.readFileSync(recipesFile, 'utf8');
let recipes = JSON.parse(rawData);

console.log(`Updating ${recipes.length} recipes with high-end professional dish images...`);

const updatedRecipes = recipes.map(recipe => {
    const name = recipe.name;
    
    // Preserve local manual images if they exist and are likely correct
    if (recipe.image && (recipe.image.startsWith('images/') || recipe.image.includes('biryani.png'))) {
        return recipe;
    }
    
    // Use a very specific, high-end professional food photography search query
    // Adding 'plated' and 'restaurant' helps get better results.
    const searchQuery = encodeURIComponent(`${name} gourmet dish plated restaurant`);
    const newImage = `https://tse1.mm.bing.net/th?q=${searchQuery}&w=800&h=600&c=7&p=0`;
    
    return {
        ...recipe,
        image: newImage
    };
});

fs.writeFileSync(recipesFile, JSON.stringify(updatedRecipes, null, 2));

console.log("SUCCESS: All recipe images updated to specific professional dish photos.");
