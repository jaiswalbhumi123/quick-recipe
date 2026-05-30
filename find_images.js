const fs = require('fs');
const data = JSON.parse(fs.readFileSync('all_meals.json', 'utf8'));

const mappings = {
    "Paneer Butter Masala": "Paneer",
    "Punjabi Dal Tadka": "Dal",
    "Spicy Hard Boiled Eggs": "Egg",
    "Baked Sweet Potato Wedges": "Potato",
    "Oatmeal with Blueberries": "Oat",
    "Chia Seed Pudding": "Pudding",
    "Strawberry Protein Smoothie": "Strawberry",
    "Mango Smoothie Bowl": "Mango",
    "Whey Protein Shake": "Shake",
    "High-Protein Soya Chunks Curry": "Soya",
    "Butter Chicken": "Butter Chicken",
    "Chicken Biryani": "Biryani",
    "Mexican Bean Bowl": "Mexican",
    "Italian Penne Pasta": "Pasta",
    "Grilled Lemon Salmon": "Salmon",
    "Garlic Butter Steak": "Steak",
    "Healthy Tofu Stir Fry": "Tofu"
};

const results = {};
for (const [recipe, term] of Object.entries(mappings)) {
    const match = data.find(m => m.strMeal.toLowerCase().includes(term.toLowerCase()));
    if (match) {
        results[recipe] = match.strMealThumb;
    }
}

console.log(JSON.stringify(results, null, 2));
