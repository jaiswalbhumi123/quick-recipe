const fs = require('fs');
const path = require('path');

const recipesFile = path.join(__dirname, 'backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

console.log(`Starting final perfection for ${recipes.length} recipes...`);

let imageFixed = 0;
let stepsFixed = 0;
let idSeen = new Set();
let duplicatesRemoved = 0;

// Clean Up and Perfect
const finalRecipes = [];

recipes.forEach(r => {
    // Unique ID check
    if (idSeen.has(r.id)) {
        r.id = Math.max(...recipes.map(re => re.id)) + 1 + finalRecipes.length;
        duplicatesRemoved++;
    }
    idSeen.add(r.id);

    // Image Perfection: Ensure every recipe has a unique, high-quality pollinations prompt
    // We only keep local images if they exist and are purposeful
    if (!r.image.startsWith('images/') || r.image === 'images/placeholder.png') {
        r.image = `https://image.pollinations.ai/prompt/${encodeURIComponent(r.name + ' gourmet dish plated restaurant style high quality food photography')}?width=800&height=600&nologo=true`;
        imageFixed++;
    }

    // Steps & Ingredients cleanup
    if (r.steps.some(s => s.toLowerCase().includes('mise en place') || s.toLowerCase().includes('prepare the'))) {
        // If it's still generic, give it a better generic structure
        let type = "Dish";
        if (r.name.toLowerCase().includes('paratha')) type = "Paratha";
        else if (r.name.toLowerCase().includes('curry')) type = "Curry";
        else if (r.name.toLowerCase().includes('fry')) type = "Fry";
        else if (r.name.toLowerCase().includes('rice')) type = "Rice";

        if (r.steps.length < 5) {
            r.steps = [
                `Thoroughly wash and prepare all necessary ingredients for the ${r.name}.`,
                `Heat a suitable pan or pot and add the aromatics and tempering spices.`,
                `Sauté the base ingredients and cook until they develop a rich aroma and flavor.`,
                `Incorporate the primary ingredients and mix well with the prepared masala base.`,
                `Cook on optimal heat until the dish is perfectly tender and flavors are well-absorbed.`,
                `Check for seasoning, adjust salt and spices, and garnish with fresh herbs.`,
                `Serve hot and enjoy your homemade ${r.name}!`
            ];
            stepsFixed++;
        }
    }

    finalRecipes.push(r);
});

fs.writeFileSync(recipesFile, JSON.stringify(finalRecipes, null, 2));

console.log(`Perfection Complete!`);
console.log(`- Images updated: ${imageFixed}`);
console.log(`- Generic steps improved: ${stepsFixed}`);
console.log(`- Duplicate IDs resolved: ${duplicatesRemoved}`);
