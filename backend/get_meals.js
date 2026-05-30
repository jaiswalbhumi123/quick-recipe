const https = require('https');
const fs = require('fs');

async function getAllMeals() {
    let allMeals = [];
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    for (let char of alphabet) {
        await new Promise((resolve) => {
            https.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`, res => {
                let data = "";
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.meals) {
                            allMeals = allMeals.concat(parsed.meals);
                        }
                    } catch (e) { }
                    resolve();
                });
            }).on('error', resolve);
        });
    }

    fs.writeFileSync('all_meals.json', JSON.stringify(allMeals, null, 2));
    console.log(`Saved ${allMeals.length} meals to all_meals.json`);
}

getAllMeals();
