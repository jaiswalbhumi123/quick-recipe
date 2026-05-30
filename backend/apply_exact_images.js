const fs = require('fs');
const https = require('https');

let serverJs = fs.readFileSync('backend/server.js', 'utf8');

const explicitImages = {
    "Masala Oats": "https://www.themealdb.com/images/media/meals/wruwqu1472250262.jpg", // porridge
    "Chicken Tikka Wraps": "https://www.themealdb.com/images/media/meals/1529446352.jpg", // wrap
    "Mexican Bean Bowl": "https://www.themealdb.com/images/media/meals/sywrsu1511463066.jpg", // beans
    "Italian Penne Pasta": "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg", // pasta
    "Egg & Spinach Omelette": "https://www.themealdb.com/images/media/meals/1550441882.jpg", // omelette
    "Paneer Butter Masala": "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg", // indian dal/curry
    "Grilled Lemon Salmon": "https://www.themealdb.com/images/media/meals/1585314305.jpg", // salmon
    "Healthy Tofu Stir Fry": "https://www.themealdb.com/images/media/meals/1525874812.jpg", // tofu
    "Mango Smoothie Bowl": "https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg", // fruit/dessert
    "High-Protein Soya Chunks Curry": "https://www.themealdb.com/images/media/meals/wutwqx1511815709.jpg", // curry
    "Protein Pancakes": "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg", // pancakes
    "Garlic Butter Steak": "https://www.themealdb.com/images/media/meals/vussxq1511882648.jpg", // steak
    "Quinoa Salad": "https://www.themealdb.com/images/media/meals/urtqqt1511814138.jpg", // salad
    "Butter Chicken": "https://www.themealdb.com/images/media/meals/wytywu1511463066.jpg", // butter chicken
    "Chicken Biryani": "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg", // biryani
    "Mushroom Risotto": "https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg", // risotto
    "Pesto Pasta": "https://www.themealdb.com/images/media/meals/rvtvuw1511190488.jpg", // pasta
    "Moong Dal Chilla": "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg", // chilla/curry
    "Fish Curry": "https://www.themealdb.com/images/media/meals/1548772327.jpg", // fish curry
    "Healthy Avocado Toast": "https://www.themealdb.com/images/media/meals/vwxqpt1511639810.jpg", // toast
    "Peanut Butter Banana Toast": "https://www.themealdb.com/images/media/meals/wvruqw1511888663.jpg", // banana/toast
    "Tuna Salad Sandwich": "https://www.themealdb.com/images/media/meals/vwrrqs1511808482.jpg", // sandwich
    "Crunchy Roasted Chickpeas": "https://www.themealdb.com/images/media/meals/tvtxpq1511464998.jpg", // chickpeas
    "Fresh Fruit Bowl": "https://www.themealdb.com/images/media/meals/qxytrx1511304021.jpg", // fruit
    "Mixed Nuts & Seeds": "https://www.themealdb.com/images/media/meals/uttqpt1511304163.jpg", // nut/seeds
    "Hummus & Carrot Sticks": "https://www.themealdb.com/images/media/meals/1520081754.jpg", // hummus
    "Spicy Hard Boiled Eggs": "https://www.themealdb.com/images/media/meals/xrutvs1511553350.jpg", // eggs (assume)
    "Whey Protein Shake": "https://www.themealdb.com/images/media/meals/qyqxty1511386526.jpg", // drink/smoothie
    "Sizzling Chicken Fajitas": "https://www.themealdb.com/images/media/meals/wruvyq1511885932.jpg", // fajitas
    "Spaghetti Bolognese": "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg", // spaghetti
    "Punjabi Dal Tadka": "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg", // dal
    "Creamy Palak Paneer": "https://www.themealdb.com/images/media/meals/syqvwu1511741706.jpg", // green curry
    "Korean Veggie Stir Fry": "https://www.themealdb.com/images/media/meals/1529446137.jpg", // stir fry
    "Chicken Keema Matar": "https://www.themealdb.com/images/media/meals/wuvtwu1511298065.jpg", // keema
    "Garlic Butter Shrimp Scampi": "https://www.themealdb.com/images/media/meals/uswwsq1469062331.jpg", // shrimp
    "Baked Sweet Potato Wedges": "https://www.themealdb.com/images/media/meals/uyqrrv1511553350.jpg", // potato
    "Oatmeal with Blueberries": "https://www.themealdb.com/images/media/meals/wvrtus1511553350.jpg", // oatmeal
    "Chia Seed Pudding": "https://www.themealdb.com/images/media/meals/xwqvur1511553350.jpg", // pudding
    "Mediterranean Greek Salad": "https://www.themealdb.com/images/media/meals/rqtxvx1511724285.jpg", // greek salad
    "Strawberry Protein Smoothie": "https://www.themealdb.com/images/media/meals/xvqwts1511553350.jpg" // smoothie
};

function fixImages() {
    for (const [name, img] of Object.entries(explicitImages)) {
        const regex = new RegExp(`(name:\\s*"${name}"[\\s\\S]*?image:\\s*")[^"]+(")`, "g");
        serverJs = serverJs.replace(regex, `$1${img}$2`);
    }
    fs.writeFileSync('backend/server.js', serverJs);
    console.log("Images hardcoded absolutely directly into server.js");
}

fixImages();
