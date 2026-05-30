const fs = require('fs');
const path = require('path');

const recipesFile = path.join(__dirname, 'backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

console.log(`Switching to Ultra-Stable Bing Image Sources for ${recipes.length} recipes...`);

recipes.forEach(r => {
    // Explicitly using Bing's high-reliability thumbnail service
    r.image = `https://tse1.mm.bing.net/th?q=${encodeURIComponent(r.name + ' authentic recipe gourmet dish')}&w=600&h=450&c=7&p=0`;
});

fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
console.log(`Image Stability Fix Complete!`);
