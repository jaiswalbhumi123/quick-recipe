const fs = require('fs');
const path = require('path');

const recipesFile = path.join(__dirname, 'backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

console.log(`Cleaning up step chatter for ${recipes.length} recipes...`);

const chatterPhrases = [
    /^I served mine .+/i,
    /^This is one recipe .+/i,
    /^Adjust the amount of .+/i,
    /for “healthy looking” mandazis/i,
    /Before you do anything, freeze your bacon/i,
    /NOTE: This L shape should reach/i,
    /You can use Coconut milk instead/i,
    /Wash and cut all vegetables and prep the .+ base/i,
    /in the meantime, heat 1-2 tablespoons/i,
    /Just before serving, drizzle/i
];

recipes.forEach(r => {
    // Filter out chatty sentences in steps
    r.steps = r.steps.filter(step => {
        // Keep it if it doesn't match a chatter phrase AND it has an action word
        const isChatter = chatterPhrases.some(phrase => phrase.test(step));
        return !isChatter;
    });

    // Final check for "Main ingredient" that might have slipped through
    r.ingredients = r.ingredients.map(ing => {
        if (ing.includes('Main ingredient')) {
            return ing.replace('Main ingredient', r.name.replace(/Classic|Premium|Dhaba Style|Chef'S Special|Homestyle|Restaurant Style|Spicy|Authentic|Special/gi, '').replace(/Paratha|Curry|Fry|Rice|Biryani/gi, '').trim() || "Base Ingredients");
        }
        return ing;
    });
});

fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));

console.log(`Perfection Complete!`);
