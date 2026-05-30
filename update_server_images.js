const fs = require('fs');
const data = JSON.parse(fs.readFileSync('all_meals.json', 'utf8'));

// Sample of unique images from all_meals.json
const uniqueImages = data.map(m => m.strMealThumb);

let serverJs = fs.readFileSync('backend/server.js', 'utf8');

// We want to replace duplicate images or common ones.
// But it's better to just assign a unique one to each of the 40 recipes if they are duplicates.

const recipes = [
    "Masala Oats", "Chicken Tikka Wraps", "Mexican Bean Bowl", "Italian Penne Pasta",
    "Egg & Spinach Omelette", "Paneer Butter Masala", "Grilled Lemon Salmon", "Healthy Tofu Stir Fry",
    "Mango Smoothie Bowl", "High-Protein Soya Chunks Curry", "Protein Pancakes", "Garlic Butter Steak",
    "Quinoa Salad", "Butter Chicken", "Chicken Biryani", "Mushroom Risotto", "Pesto Pasta",
    "Moong Dal Chilla", "Fish Curry", "Healthy Avocado Toast", "Peanut Butter Banana Toast",
    "Tuna Salad Sandwich", "Crunchy Roasted Chickpeas", "Fresh Fruit Bowl", "Mixed Nuts & Seeds",
    "Hummus & Carrot Sticks", "Spicy Hard Boiled Eggs", "Whey Protein Shake", "Sizzling Chicken Fajitas",
    "Spaghetti Bolognese", "Punjabi Dal Tadka", "Creamy Palak Paneer", "Korean Veggie Stir Fry",
    "Chicken Keema Matar", "Garlic Butter Shrimp Scampi", "Baked Sweet Potato Wedges", "Oatmeal with Blueberries",
    "Chia Seed Pudding", "Mediterranean Greek Salad", "Strawberry Protein Smoothie"
];

const specificImages = {
    "Paneer Butter Masala": "https://www.themealdb.com/images/media/meals/xxpxux1511304256.jpg", // Matar Paneer
    "Punjabi Dal Tadka": "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg", // Dal fry
    "Creamy Palak Paneer": "https://www.themealdb.com/images/media/meals/syqvwu1511741706.jpg", // Palak Paneer
    "Butter Chicken": "https://www.themealdb.com/images/media/meals/wytywu1511463066.jpg",
    "Chicken Biryani": "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg",
    "Spicy Hard Boiled Eggs": "https://www.themealdb.com/images/media/meals/vrspxv1511722107.jpg", // Shakshuka/Egg
    "Baked Sweet Potato Wedges": "https://www.themealdb.com/images/media/meals/v97m3p1511919530.jpg",
    "Oatmeal with Blueberries": "https://www.themealdb.com/images/media/meals/0206881582296225.jpg",
    "Strawberry Protein Smoothie": "https://www.themealdb.com/images/media/meals/1529442316.jpg"
};

for (let name of recipes) {
    let img = specificImages[name];
    if (!img) {
        // Find a match in all_meals.json or use unique
        const match = data.find(m => m.strMeal.toLowerCase().includes(name.split(' ')[0].toLowerCase()));
        img = match ? match.strMealThumb : uniqueImages[recipes.indexOf(name) % uniqueImages.length];
    }
    
    const regex = new RegExp(`(name:\\s*"${name}"[\\s\\S]*?image:\\s*")[^"]+(")`, "g");
    serverJs = serverJs.replace(regex, `$1${img}$2`);
}

fs.writeFileSync('backend/server.js', serverJs);
console.log("Updated server.js with more accurate images.");
