const fs = require('fs');
const path = require('path');

const recipesFile = path.join(__dirname, 'backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

console.log(`Applying Super-Perfect Image Mapping to ${recipes.length} recipes...`);

recipes.forEach(r => {
    let name = r.name;
    
    // Create a highly descriptive prompt for the AI
    let descriptivePrompt = name + " gourmet authentic dish plated professionally high resolution food photography";
    if (name.toLowerCase().includes('paratha')) descriptivePrompt = "Indian stuffed flatbread " + name + " served with curd and pickle on a rustic wooden plate vibrant colors";
    if (name.toLowerCase().includes('biryani')) descriptivePrompt = "Indian traditional biryani rice " + name + " with aromatic spices garnished with fried onions and mint high end restaurant photography";
    if (name.toLowerCase().includes('curry') || name.toLowerCase().includes('aloo matar')) descriptivePrompt = "Indian spicy vegetable curry " + name + " in a traditional copper bowl with cilantro garnish";
    if (name.toLowerCase().includes('fry')) descriptivePrompt = "Indian crispy sauteed " + name + " dry vegetable dish seasoned with spices photography centerpiece";
    if (name.toLowerCase().includes('misal')) descriptivePrompt = "Maharashtrian spicy breakfast Misal Pav served with bun bread onions and lemon";
    
    // Add unique seed and model Flux for best quality
    // We add a random float to the end to bypass any caching layers entirely
    const cacheBuster = Math.floor(Math.random() * 1000000);
    r.image = `https://image.pollinations.ai/prompt/${encodeURIComponent(descriptivePrompt)}?width=1000&height=750&seed=${r.id}&nologo=true&model=flux&v=${cacheBuster}`;
});

fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
console.log(`Image Perfection Complete!`);
