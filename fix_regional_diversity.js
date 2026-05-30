const fs = require('fs');
const path = require('path');

const recipesFile = path.join('backend', 'data', 'recipes.json');
let data = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

// Dictionaries for authentic regional dishes categorized properly
const regionalData = {
    "UP Style": {
        breakfast: ["Bedmi Poori & Aloo Sabzi", "Kachori Jalebi", "Fara", "Chooda Matar", "Samosa Chaat", "Matar Ki Ghugni", "Aloo Nimona Breakfast"],
        lunch: ["Arhar Dal & Chawal", "Badi Ki Sabzi", "Baingan Bharta", "Tehri", "Kathal Ki Sabzi", "UP Style Kadhi Pakora", "Aloo Rasedar", "Bhindi Kurkuri"],
        dinner: ["Mutton Korma", "Chicken Dum Curry", "Shahi Paneer", "Awadhi Nalli Nihari", "Kofta Sabzi", "Dum Aloo", "Lauki Chana Dal"],
        snacks: ["Aloo Tikki Chaat", "Pani Puri / Golgappa", "Papdi Chaat", "Dahi Vada", "Bhel Puri", "Moong Dal Laddu", "Mathri"]
    },
    "Maharashtrian": {
        breakfast: ["Kanda Poha", "Sabudana Khichdi", "Misal Pav", "Vada Pav", "Thalipeeth", "Upma", "Sheera", "Medu Vada"],
        lunch: ["Pithla Bhakri", "Varan Bhaat", "Bharli Vangi", "Zunka Bhakri", "Matki Usal", "Kothimbir Vadi", "Dalimbi Usal", "Aamti"],
        dinner: ["Kolhapuri Chicken", "Malvani Fish Curry", "Mutton Rassa", "Tambda Rassa", "Pandhra Rassa", "Batata Sukhi Bhaji", "Masale Bhaat"],
        snacks: ["Bakarwadi", "Shankarpali", "Sabudana Vada", "Batata Vada", "Chivda", "Farsan", "Kanda Bhaji"]
    },
    "Punjabi": {
        breakfast: ["Aloo Paratha with Makhan", "Gobi Paratha", "Chole Bhature", "Amritsari Kulcha", "Paneer Paratha", "Lassi & Puri", "Puri Chole"],
        lunch: ["Rajma Chawal", "Kadhi Pakora", "Dal Makhani", "Pindi Chole", "Mutter Paneer", "Punjabi Kadi", "Aloo Wadiyan"],
        dinner: ["Butter Chicken", "Chicken Tikka Masala", "Mutton Rogan Josh", "Kadhai Paneer", "Fish Amritsari", "Palak Paneer", "Dhaba Style Dal Fry"],
        snacks: ["Street Style Samosa", "Mix Pakora / Bhajiya", "Tandoori Chicken Tikka", "Seekh Kebab", "Dahi Bhalla", "Paneer Tikka", "Kurkuri Bhindi"]
    },
    "Mughlai": {
        breakfast: ["Keema Paratha", "Nihari with Khamiri Roti", "Paya Soup", "Baida Roti", "Mughlai Omelette", "Khajoor Shake"],
        lunch: ["Mughlai Chicken Paratha", "Mutton Korma Classic", "Chicken Pasanda", "Paneer Shah Jahani", "Navratan Korma", "Shahi Paneer Rich", "Egg Korma"],
        dinner: ["Royal Mutton Biryani", "Chicken Dum Biryani", "Galouti Kebab Platter", "Reshmi Kebab", "Tandoori Chicken", "Boti Kebab", "Nargisi Kofta"],
        snacks: ["Chicken Kathi Roll", "Mutton Keema Samosa", "Shami Kebab", "Sheer Khurma", "Mughlai Paratha Mini", "Kakori Kebab"]
    }
};

const foodImages = [
    "1585937421612-70a008356fbe", "1601050690597-df0568f70950", "1563379091339-03b21ab4a4f8", 
    "1626074353765-517a681e40be", "1589301760014-d929f39ce9b1", "1584844675549-3bc0b8fe3227", 
    "1626700051175-6818013e1d4f", "1604908176997-125f25cc6f3d", "1512621776951-a57141f2eefd", 
    "1599487641372-ea88040441f7", "1546793665-24a99c14cbb2", "1631481135406-81e5b8e97aae", 
    "1476224203421-9ac39933077e", "1540189549336-e82117369a47", "1505253716362-af11ac614c77", 
    "1568901346375-23c9450c58cd", "1481070555726-0e1cebdcaeeb", "1515003197202-ce2b3391b409"
];

const protectedNames = ["Authentic Awadhi Lucknowi Biryani", "UP Style Baati Chokha", "Classic Maharashtrian Puran Poli", "Punjabi Sarson Ka Saag", "Hyderabadi Haleem", "Spicy Misal Pav"];

let updatedCount = 0;

data = data.map(r => {
    // Skip our special heavily tested ones
    if (protectedNames.includes(r.name)) return r;

    let regionMatched = null;
    let actualRegionKey = null;

    if (r.name.includes("UP Style")) { regionMatched = "UP Style"; actualRegionKey = "UP Style"; }
    else if (r.name.includes("Maharashtrian Style")) { regionMatched = "Maharashtrian Style"; actualRegionKey = "Maharashtrian"; }
    else if (r.name.includes("Punjabi Style")) { regionMatched = "Punjabi Style"; actualRegionKey = "Punjabi"; }
    else if (r.name.includes("Mughlai Style")) { regionMatched = "Mughlai Style"; actualRegionKey = "Mughlai"; }

    if (regionMatched) {
        // Redefine this recipe into a totally authentic specific one
        const cat = r.category; // breakfast, lunch, dinner, snacks
        const dict = regionalData[actualRegionKey][cat] || regionalData[actualRegionKey]["dinner"]; // fallback
        
        // Pick one authentic name probabilistically based on the ID to ensure spread
        const authenticName = dict[r.id % dict.length] + ` (${regionMatched})`;
        r.name = authenticName;

        // Assign a distinct, nice Unsplash image based on the object
        const randomImageId = foodImages[(r.id + r.name.length) % foodImages.length];
        r.image = `https://images.unsplash.com/photo-${randomImageId}?w=800&auto=format&fit=crop`;

        updatedCount++;
    }

    return r;
});

// Write to JSON
fs.writeFileSync(recipesFile, JSON.stringify(data, null, 2));
console.log(`Successfully diversified names and images for ${updatedCount} regional recipes!`);
