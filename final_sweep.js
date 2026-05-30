const fs = require('fs');
const path = require('path');

const recipesFile = path.join(__dirname, 'backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

let imageFixed = 0;
let ingredientFixed = 0;

recipes.forEach(r => {
    // Fix ALL Unsplash images to ensure uniqueness and relevance
    if (r.image.includes('unsplash.com')) {
        r.image = `https://image.pollinations.ai/prompt/${encodeURIComponent(r.name + ' gourmet dish plated high quality photography')}?width=800&height=600&nologo=true`;
        imageFixed++;
    }

    // Double check for any missed generic ingredients/steps not caught by previous script
    r.ingredients = r.ingredients.map(ing => {
        if (ing.includes('Main ingredient')) {
            ingredientFixed++;
            return ing.replace('Main ingredient', r.name.replace(/Classic|Premium|Dhaba Style|Chef'S Special|Homestyle|Restaurant Style|Spicy|Authentic|Special/gi, '').replace(/Paratha|Curry|Fry|Rice|Biryani/gi, '').trim() || "Base Ingredients");
        }
        return ing;
    });

    r.steps = r.steps.map(step => {
        if (step.includes('main ingredient')) {
            return step.replace('main ingredient', r.name.toLowerCase().replace(/classic|premium|dhaba style|chef's special|homestyle|restaurant style|spicy|authentic|special/gi, '').replace(/paratha|curry|fry|rice|biryani/gi, '').trim() || "ingredients");
        }
        return step;
    });
});

fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
console.log(`Final sweep: Updated ${imageFixed} images and fixed ${ingredientFixed} ingredients.`);
