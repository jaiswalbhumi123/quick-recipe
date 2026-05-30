const fs = require('fs');
const https = require('https');

const queries = [
    { q: "oats", fallback: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&q=80" },
    { q: "wrap", fallback: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80" },
    { q: "bean", fallback: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80" },
    { q: "pasta", fallback: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&q=80" },
    { q: "omelette", fallback: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=500&q=80" },
    { q: "paneer", fallback: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?w=500&q=80" },
    { q: "salmon", fallback: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80" },
    { q: "tofu", fallback: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" },
    { q: "smoothie", fallback: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=500&q=80" },
    { q: "soy", fallback: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80" },
    { q: "pancake", fallback: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&q=80" },
    { q: "steak", fallback: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80" },
    { q: "salad", fallback: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80" },
    { q: "butter chicken", fallback: "https://images.unsplash.com/photo-1603894584373-5ac82b6ae39c?w=500&q=80" },
    { q: "biryani", fallback: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&q=80" },
    { q: "risotto", fallback: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=500&q=80" },
    { q: "pesto", fallback: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80" },
    { q: "dal", fallback: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80" },
    { q: "fish", fallback: "https://images.unsplash.com/photo-1604152009778-54315c10214a?w=500&q=80" },
    { q: "avocado", fallback: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&q=80" }
];

function getImage(q) {
    return new Promise((resolve) => {
        https.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`, res => {
            let data = "";
            res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    const meals = JSON.parse(data).meals;
                    if (meals && meals.length > 0) resolve(meals[0].strMealThumb);
                    else resolve(null);
                } catch (e) { resolve(null); }
            });
        }).on("error", () => resolve(null));
    });
}

(async () => {
    const results = [];
    for (const obj of queries) {
        let res = await getImage(obj.q);
        results.push(res || obj.fallback);
    }
    fs.writeFileSync('output.json', JSON.stringify(results, null, 2));
})();
