const fs = require('fs');
const path = require('path');

const recipesFile = path.join(__dirname, 'backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

console.log(`Applying Master Image Fix to ${recipes.length} recipes...`);

const handpicked = {
    'paratha': '1536098563539-7023c621f314',
    'biryani': '1601050690597-df0568f70950',
    'pulao': '1563379091339-03b21ab4a4f8',
    'burger': '1568901346375-23c9450c58cd',
    'pizza': '1513104890138-7c749659a591',
    'salad': '1512621776951-a57141f2eefd',
    'noodles': '1585032295897-90c749b01801',
    'chowmein': '1512058560366-cd242959443c',
    'dosa': '1589301760014-d929f3979dbc',
    'idli': '1610192244261-3f33de3f5721',
    'curry': '1585937421612-70a008356fbe',
    'paneer': '1601050690597-df0568f70950',
    'chicken': '1604908176997-125f25cc6f3d',
    'soup': '1547592166-23ac45744acd',
    'sandwich': '1528735602780-2552fd24290c',
    'eggs': '1525351484163-7529414344d8',
    'scones': '1540321256330-8041920875c7',
    'mash': '1512621776951-a57141f2eefd',
    'misal': '1601050690597-df0568f70950',
    'up style': '1610192244261-3f33de3f5721'
};

recipes.forEach(r => {
    let unsplashId = null;
    const name = r.name.toLowerCase();

    // Try to find a handpicked ID
    for (const [key, id] of Object.entries(handpicked)) {
        if (name.includes(key)) {
            unsplashId = id;
            break;
        }
    }

    if (unsplashId) {
        // Add unique variation params if it's a common ID
        r.image = `https://images.unsplash.com/photo-${unsplashId}?w=1000&auto=format&fit=crop&q=80&sig=${r.id}`;
    } else {
        // Better fallback for others
        r.image = `https://image.pollinations.ai/prompt/${encodeURIComponent(r.name + ' closeup food photography gourmet')}?width=1000&height=750&seed=${r.id}&nologo=true`;
    }
});

fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
console.log(`Master Image Fix Complete!`);
