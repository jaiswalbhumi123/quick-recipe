const fs = require('fs');
const path = require('path');

const recipesFile = path.join('backend', 'data', 'recipes.json');
let data = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

const imgDict = {
    // Breakfast specific
    "egg": "1493770348161-369560ae357d",
    "omelette": "1525351484163-f4c1c5028153",
    "pancake": "1515003197202-ce2b3391b409",
    "paratha": "1626700051175-6818013e1d4f",
    "toast": "1481070555726-0e1cebdcaeeb",
    "sandwich": "1528735602780-2552fd46c7af",
    "upma": "1593504049359-74330189a3ca",
    "poha": "1630449491740-424b94f06126",
    "dosa": "1630449491740-424b94f06126",
    "idli": "1630449491740-424b94f06126",
    
    // Lunch specific
    "thali": "1601050690597-df0568f70950",
    "rice": "1512621776951-a57141f2eefd",
    "pulao": "1563379091339-03b21ab4a4f8",
    "dal": "1546793665-24a99c14cbb2",
    "sabzi": "1601050690597-df0568f70950",
    "curry": "1604908176997-125f25cc6f3d",
    "wrap": "1626700051175-6818013e1d4f",
    "roll": "1626700051175-6818013e1d4f",
    "pasta": "1473093295043-cdd812d0e601",
    "noodle": "1552611052333-5eadd8e02554",
    "salad": "1505253716362-af11ac614c77",
    "burger": "1568901346375-23c9450c58cd",
    
    // Generic
    "chicken": "1604908176997-125f25cc6f3d",
    "paneer": "1631481135406-81e5b8e97aae",
    "aloo": "1512621776951-a57141f2eefd",
    "kebab": "1599487641372-ea88040441f7",
    "tikka": "1599487641372-ea88040441f7",
    "roti": "1626700051175-6818013e1d4f",
    "mutton": "1476224203421-9ac39933077e",
    "fish": "1540189549336-e82117369a47",
    "prawn": "1540189549336-e82117369a47"
};

// Top 5 explicit handling to preserve
const overrides = [
    "Authentic Awadhi Lucknowi Biryani",
    "Classic Maharashtrian Puran Poli",
    "Punjabi Sarson Ka Saag",
    "UP Style Baati Chokha",
    "Hyderabadi Haleem",
    "Spicy Misal Pav"
];

let updatedCount = 0;

data = data.map(r => {
    // Preserve top custom recipes images
    if (overrides.some(o => r.name.includes(o))) {
        return r;
    }

    if (r.category === 'breakfast' || r.category === 'lunch') {
        const lowerName = r.name.toLowerCase();
        let assignedImg = false;
        
        // Match against specific food keywords first
        for (const [key, photoId] of Object.entries(imgDict)) {
            if (lowerName.includes(key)) {
                r.image = `https://images.unsplash.com/photo-${photoId}?w=800&auto=format&fit=crop`;
                assignedImg = true;
                break;
            }
        }
        
        // If still no exact match for breakfast/lunch, assign a random nice category image
        if (!assignedImg) {
            if (r.category === 'breakfast') {
                const bfastImages = [
                    "1493770348161-369560ae357d", // Eggs/Toast
                    "1528735602780-2552fd46c7af", // Sandwich
                    "1515003197202-ce2b3391b409"  // Pancakes
                ];
                const rand = bfastImages[Math.floor(Math.random() * bfastImages.length)];
                r.image = `https://images.unsplash.com/photo-${rand}?w=800&auto=format&fit=crop`;
            } else if (r.category === 'lunch') {
                const lunchImages = [
                    "1601050690597-df0568f70950", // Thali/Curry
                    "1512621776951-a57141f2eefd", // Rice/Bowl
                    "1546793665-24a99c14cbb2"   // Dal/Soup
                ];
                const rand = lunchImages[Math.floor(Math.random() * lunchImages.length)];
                r.image = `https://images.unsplash.com/photo-${rand}?w=800&auto=format&fit=crop`;
            }
        }
        updatedCount++;
    }
    
    return r;
});

fs.writeFileSync(recipesFile, JSON.stringify(data, null, 2));
console.log(`Updated images for ${updatedCount} Breakfast and Lunch recipes based on names.`);
