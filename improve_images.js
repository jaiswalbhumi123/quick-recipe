const fs = require('fs');

const recipesFile = 'backend/data/recipes.json';
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

const imageBank = {
    "breakfast": ["1546069901-ba9599a7e63c", "1517673400267-0251440c45dc", "1493770348161-369560ae357d", "1490645935967-10de41f23b7a"],
    "lunch": ["1585937421612-70a008356fbe", "1601050690597-df0568f70950", "1540189549336-e82117369a47", "1546793665-24a99c14cbb2"],
    "dinner": ["1563379091339-03b21ab4a4f8", "1512621776951-a57141f2eefd", "1476224203421-9ac39933077e", "1467003909585-2f8a7270026d"],
    "snacks": ["1626074353765-517a681e40be", "1626700051175-6818013e1d4f", "1593504049359-74330189a3ca", "1604382354930-d07a9980d96f"],
    "quick": ["1546069901-ba9599a7e63c", "1490645935967-10de41f23b7a", "1494392570077-0c7f191b7026", "1543332164-702338abd701"]
};

const updated = recipes.map((r, i) => {
    // Only update if it doesn't already have a 'premium' looking ID (we just added some with w=800)
    if (r.image && r.image.includes('w=800')) return r;

    const bank = imageBank[r.category] || imageBank['dinner'];
    const imgId = bank[i % bank.length];
    return {
        ...r,
        image: `https://images.unsplash.com/photo-${imgId}?w=600&auto=format&fit=crop`
    };
});

fs.writeFileSync(recipesFile, JSON.stringify(updated, null, 2));
console.log("Improved image diversity across all recipes.");
