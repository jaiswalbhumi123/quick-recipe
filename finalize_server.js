const fs = require('fs');
let serverJs = fs.readFileSync('backend/server.js', 'utf8');

const explicitFixed = {
    "Masala Oats": "https://www.themealdb.com/images/media/meals/wruwqu1472250262.jpg",
    "Chicken Tikka Wraps": "https://www.themealdb.com/images/media/meals/1529446352.jpg",
    "Mexican Bean Bowl": "https://www.themealdb.com/images/media/meals/sywrsu1511463066.jpg",
    "Italian Penne Pasta": "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
    "Egg & Spinach Omelette": "https://www.themealdb.com/images/media/meals/1550441882.jpg",
    "Paneer Butter Masala": "https://www.themealdb.com/images/media/meals/syqvwu1511741706.jpg",
    "Grilled Lemon Salmon": "https://www.themealdb.com/images/media/meals/1585314305.jpg",
    "Healthy Tofu Stir Fry": "https://www.themealdb.com/images/media/meals/1525874812.jpg",
    "Mango Smoothie Bowl": "https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg",
    "High-Protein Soya Chunks Curry": "https://www.themealdb.com/images/media/meals/wutwqx1511815709.jpg",
    "Protein Pancakes": "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg",
    "Garlic Butter Steak": "https://www.themealdb.com/images/media/meals/vussxq1511882648.jpg",
    "Quinoa Salad": "https://www.themealdb.com/images/media/meals/urtqqt1511814138.jpg",
    "Butter Chicken": "https://www.themealdb.com/images/media/meals/wytywu1511463066.jpg",
    "Chicken Biryani": "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg",
    "Mushroom Risotto": "https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg",
    "Pesto Pasta": "https://www.themealdb.com/images/media/meals/rvtvuw1511190488.jpg",
    "Moong Dal Chilla": "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
    "Fish Curry": "https://www.themealdb.com/images/media/meals/1548772327.jpg",
    "Healthy Avocado Toast": "https://www.themealdb.com/images/media/meals/vwxqpt1511639810.jpg",
    "Punjabi Dal Tadka": "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg"
};

for (const [name, img] of Object.entries(explicitFixed)) {
    const regex = new RegExp(`(name:\\s*"${name}"[\\s\\S]*?image:\\s*")[^"]+(")`, "g");
    serverJs = serverJs.replace(regex, `$1${img}$2`);
}

fs.writeFileSync('backend/server.js', serverJs);
console.log("Finalized server.js with correct images.");
