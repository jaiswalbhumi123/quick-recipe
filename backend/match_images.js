const fs = require('fs');

const meals = JSON.parse(fs.readFileSync('all_meals.json', 'utf8'));
let serverJs = fs.readFileSync('backend/server.js', 'utf8');

const regex = /{[\s\S]*?name:\s*"([^"]+)",[\s\S]*?image:\s*"([^"]+)"[\s\S]*?}/g;

const customMapping = {
    "Masala Oats": "oatmeal", // no oatmeal in mealdb, maybe "Breakfast" category?
    "Egg & Spinach Omelette": "omelette",
    "Quinoa Salad": "quinoa",
    "Peanut Butter Banana Toast": "pancakes", // fallback
    "Fresh Fruit Bowl": "fruit",
    "Mixed Nuts & Seeds": "nut",
    "Spicy Hard Boiled Eggs": "egg",
    "Whey Protein Shake": "drink",
    "Creamy Palak Paneer": "paneer",
    "Sizzling Chicken Fajitas": "fajita",
    "Garlic Butter Shrimp Scampi": "shrimp",
    "Mediterranean Greek Salad": "salad",
    "Oatmeal with Blueberries": "porridge", // or berry
    "Strawberry Protein Smoothie": "strawberry",
    "Baked Sweet Potato Wedges": "potato",
    "Healthy Avocado Toast": "avocado",
    "Tuna Salad Sandwich": "tuna",
    "Chia Seed Pudding": "pudding",
    "Crunchy Roasted Chickpeas": "chickpea"
};

function findBestImage(name) {
    const keywords = (name + " " + (customMapping[name] || "")).toLowerCase().split(' ').map(s => s.trim()).filter(s => s.length > 2);

    // Sort meals by how many keywords match
    meals.sort((a, b) => {
        const aName = a.strMeal.toLowerCase();
        const bName = b.strMeal.toLowerCase();
        let aScore = 0;
        let bScore = 0;
        for (const word of keywords) {
            if (aName.includes(word)) aScore++;
            if (bName.includes(word)) bScore++;
        }
        return bScore - aScore;
    });

    // Also try category matching if score is 0
    if (meals[0] && keywords.some(w => meals[0].strMeal.toLowerCase().includes(w))) {
        return meals[0].strMealThumb;
    }

    return null;
}

const lines = serverJs.split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('name: "') && lines[i].includes('image: "')) {
        const nameMatch = lines[i].match(/name:\s*"([^"]+)"/);
        const imageMatch = lines[i].match(/image:\s*"([^"]+)"/);

        if (nameMatch) {
            const name = nameMatch[1];
            const oldUrl = imageMatch[1];
            const bestImage = findBestImage(name);

            if (bestImage) {
                lines[i] = lines[i].replace(oldUrl, bestImage);
            } else {
                // Keep old Unsplash fallback if not found
                console.log("No match for:", name);
            }
        }
    }
}

fs.writeFileSync('backend/server.js', lines.join('\n'));
console.log('Done replacing images in server.js');
