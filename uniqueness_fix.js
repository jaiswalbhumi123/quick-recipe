const fs = require('fs');
const path = require('path');

const recipesFile = path.join(__dirname, 'backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

console.log(`Adding unique seeds and randomizing prompts for ${recipes.length} recipes to prevent duplication...`);

recipes.forEach(r => {
    // Force a unique prompt with a seed
    const uniqueStyles = ["aerial view", "macro shot", "side view", "rustic table setting", "modern minimalist plating", "vibrant food styling", "gourmet kitchen lighting"];
    const style = uniqueStyles[r.id % uniqueStyles.length];
    
    // Check if it's already a pollinations URL
    if (r.image.includes('pollinations.ai') || !r.image.startsWith('http')) {
        r.image = `https://image.pollinations.ai/prompt/${encodeURIComponent(r.name + ' ' + style + ' professional food photography high resolution')}?width=1000&height=750&nologo=true&seed=${r.id}&model=flux`;
    }
});

fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
console.log(`Uniqueness Fix Complete!`);
