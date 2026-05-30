const fs = require('fs');
const path = require('path');

const recipesFile = path.join(__dirname, 'backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

console.log(`Doing final text refinement for ${recipes.length} recipes...`);

recipes.forEach(r => {
    // Fix "Primary Vegetable/Protein" or "Main Ingredient"
    r.ingredients = r.ingredients.map(ing => {
        if (ing.includes('Primary Vegetable/Protein') || ing.includes('Main Ingredient') || ing.includes('Main Protein/Vegetables')) {
            let dishName = r.name.replace(/Classic|Premium|Dhaba Style|Chef'S Special|Homestyle|Restaurant Style|Spicy|Authentic|Special|Traditional|British/gi, '').trim();
            // Simplify names like "Chicken Tikka Masala" to "Chicken"
            if (dishName.toLowerCase().includes('chicken')) dishName = 'Chicken';
            if (dishName.toLowerCase().includes('paneer')) dishName = 'Paneer';
            if (dishName.toLowerCase().includes('aloo')) dishName = 'Potatoes';
            
            return ing.replace(/Primary Vegetable\/Protein|Main Ingredient|Main Protein\/Vegetables/gi, 'Fresh ' + dishName);
        }
        return ing;
    });
});

fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
console.log(`Refinement Complete!`);
