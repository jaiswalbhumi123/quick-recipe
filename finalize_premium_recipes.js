const fs = require('fs');

const recipesFile = 'backend/data/recipes.json';
let allRecipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

// High-quality authentic regional recipes to "lead" the database
const premiumRegional = [
    // --- LUCKNOW / UP ---
    {
        name: "Authentic Awadhi Lucknowi Biryani",
        category: "dinner",
        protein: 32,
        time: 60,
        isVeg: false,
        ingredients: ["500g Chicken/Mutton", "2 Cups Long Grain Basmati Rice", "1 Cup Thick Curd", "2 tsp Ginger-Garlic Paste", "Saffron Threads", "Kewra Water", "Mace, Cardamom, Clove Powder"],
        steps: ["Marinate meat with yogurt and spices for 4 hours.", "Parboil rice until 70% cooked.", "Layer meat and rice in a heavy-bottomed pot.", "Infuse with saffron milk and kewra.", "Dum cook on low heat for 30 minutes."],
        videoId: "k5jTxzhZKMI",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800"
    },
    {
        name: "UP Style Baati Chokha",
        category: "dinner",
        protein: 18,
        time: 50,
        isVeg: true,
        ingredients: ["2 Cups Wheat Flour", "1/2 Cup Sattu", "1 Brinjal", "2 Tomatoes", "Garlic, Green Chili, Onion", "Raw Mustard Oil"],
        steps: ["Make stiff dough balls (Baati) and bake until golden.", "Roast brinjal and tomatoes on open flame.", "Mash them with garlic, oil, and spices to make Chokha.", "Dip Baatis in Ghee and serve with Chokha."],
        videoId: "3c57ph_Q9kU",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800"
    },
    // --- MAHARASHTRA ---
    {
        name: "Classic Maharashtrian Puran Poli",
        category: "snacks",
        protein: 12,
        time: 45,
        isVeg: true,
        ingredients: ["1 Cup Chana Dal", "1 Cup Jaggery", "2 Cups Wheat Flour", "Cardamom & Nutmeg Powder", "Pure Ghee"],
        steps: ["Cook dal and mash with jaggery to make Puran.", "Stuff Puran into wheat dough balls.", "Roll into thin polis and roast with ghee.", "Serve hot with more ghee."],
        videoId: "4W4_H60x-p8",
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800"
    },
    {
        name: "Spicy Misal Pav",
        category: "breakfast",
        protein: 15,
        time: 30,
        isVeg: true,
        ingredients: ["1 Cup Sprouted Moth Beans", "Goda Masala", "Farsan (Crispy Mix)", "Pav (Bread)", "Onions & Lemon"],
        steps: ["Cook sprouts with spices into a watery gravy.", "Top with farsan, chopped onions, and lemon juice.", "Serve with buttered Pav."],
        videoId: "_S-C1l4qOEQ",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800"
    },
    // --- PUNJAB ---
    {
        name: "Punjabi Sarson Ka Saag",
        category: "dinner",
        protein: 14,
        time: 60,
        isVeg: true,
        ingredients: ["500g Mustard Greens", "200g Spinach", "2 tbsp Maize Flour", "Ginger, Garlic, Green Chilis", "Butter & Jaggery"],
        steps: ["Boil and mash greens. Mix with maize flour.", "Slow cook with ginger-garlic for 30 mins.", "Serve with Makki di Roti and white butter."],
        videoId: "LzfpRF5Xfw8",
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800"
    },
    {
        name: "Hyderabadi Haleem",
        category: "dinner",
        protein: 45,
        time: 120,
        isVeg: false,
        ingredients: ["500g Mutton", "1/2 Cup Broken Wheat", "Lentils (Moong, Masoor, Chana)", "Pure Ghee", "Fried Onions", "Lemon & Ginger"],
        steps: ["Slow cook meat, wheat, and lentils until completely soft.", "Pound into a smooth, paste-like consistency.", "Add ghee and garnish with crispy onions and nuts."],
        videoId: "k5jTxzhZKMI",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"
    }
];

// Re-assign IDs and clean up
const startingId = 3000;
const finalPremium = premiumRegional.map((r, i) => ({ ...r, id: startingId + i }));

// Filter out old versions of these to avoid duplicates
const cleanedBase = allRecipes.filter(r => !premiumRegional.some(p => r.name.toLowerCase().includes(p.name.split(' ').slice(-2).join(' ').toLowerCase())));

// Combine and put premium at the top (effectively making them highly visible/searchable)
const result = [...finalPremium, ...cleanedBase];

fs.writeFileSync(recipesFile, JSON.stringify(result, null, 2));

console.log(`Added ${finalPremium.length} Premium Authentic regional recipes.`);
console.log(`Total database size: ${result.length} recipes.`);
