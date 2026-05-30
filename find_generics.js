const fs = require('fs');
const path = require('path');

const recipesPath = path.join(__dirname, 'backend', 'data', 'recipes.json');
const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));

const imageCounts = {};
recipes.forEach(r => {
    if (r.image) {
        imageCounts[r.image] = (imageCounts[r.image] || 0) + 1;
    }
});

const genericImages = Object.entries(imageCounts)
    .filter(([url, count]) => count > 2) // More than 2 occurrences is likely generic
    .sort((a, b) => b[1] - a[1]);

console.log('Most common image URLs (appearing more than 2 times):');
genericImages.forEach(([url, count]) => {
    console.log(`${count} occurrences: ${url}`);
});

const genericStepsPatterns = [
    "Prepare the",
    "Prepare the main",
    "Sauté with spices",
    "Cook until the",
    "Mise en place"
];

const genericIngredientsPatterns = [
    "Main ingredient",
    "1 Cup",
    "1 tsp Spices"
];

let genericRecipesCount = 0;
recipes.forEach(r => {
    const isGenericSteps = r.steps && r.steps.some(s => genericStepsPatterns.some(p => s.includes(p)));
    const isGenericIngredients = r.ingredients && r.ingredients.some(i => genericIngredientsPatterns.some(p => i.includes(p)));
    
    if (isGenericSteps || isGenericIngredients) {
        genericRecipesCount++;
    }
});

console.log(`\nFound ${genericRecipesCount} recipes with potentially generic steps or ingredients out of ${recipes.length} total.`);
