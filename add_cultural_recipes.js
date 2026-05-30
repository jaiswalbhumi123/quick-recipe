const fs = require('fs');

const recipesFile = 'backend/data/recipes.json';
let existingRecipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

// Find the max ID to continue sequence
let maxId = Math.max(...existingRecipes.map(r => r.id));

const culturalRecipes = [
    // --- UTTAR PRADESH ---
    {
        name: "Awadhi Lucknowi Biryani",
        category: "dinner",
        protein: 28,
        time: 50,
        isVeg: false,
        ingredients: ["500g Chicken", "2 Cups Basmati Rice", "1 Cup Yogurt", "2 Onions Sliced", "2 tsp Ginger-Garlic Paste", "Saffron in 1/2 Cup Milk", "Whole Spices: Cloves, Cardamom, Cinnamon", "Kewra Water"],
        steps: ["Marinate chicken in yogurt and ginger-garlic paste for 2 hours.", "Parboil rice with whole spices until 70% cooked.", "Cook marinated chicken until tender in a sealed pot.", "Layer rice over chicken, drizzle saffron milk and kewra water.", "Seal the pot (Dum) and cook on slow flame for 15-20 minutes."]
    },
    {
        name: "Matar Nimona",
        category: "lunch",
        protein: 15,
        time: 30,
        isVeg: true,
        ingredients: ["2 Cups Fresh Green Peas", "2 Boiled Potatoes", "1 tsp Cumin", "1 tsp Turmeric", "Ginger-Green Chili Paste", "Fresh Coriander"],
        steps: ["Coarsely grind fresh peas into a paste.", "Sauté potatoes and pea paste in oil until fragrant.", "Add spices and water. Simmer on low heat.", "Garnish with coriander and serve with hot rotis."]
    },
    {
        name: "Banarasi Bedmi Poori",
        category: "breakfast",
        protein: 10,
        time: 25,
        isVeg: true,
        ingredients: ["2 Cups Wheat Flour", "1/2 Cup Urad Dal (Soaked)", "1 tsp Fennel Seeds Powder", "1/2 tsp Hing", "Oil for deep frying"],
        steps: ["Grind soaked urad dal with spices into a coarse paste.", "Knead dough with flour and the dal paste.", "Roll out small pooris and deep fry until crisp and golden brown."]
    },
    {
        name: "Baati Chokha",
        category: "dinner",
        protein: 16,
        time: 45,
        isVeg: true,
        ingredients: ["2 Cups Wheat Flour", "1/2 Cup Sattu (Roasted Gram Flour)", "2 Brinjals (Eggplant)", "2 Tomatoes", "Mustard Oil", "Garlic & Green Chilis"],
        steps: ["Prepare hard dough balls (Baatis) and bake until golden brown.", "Roast brinjals and tomatoes on open fire.", "Mash roasted veggies, add salt, garlic, mustard oil to make Chokha.", "Dip Baatis in Ghee and serve with Chokha."]
    },
    {
        name: "Galouti Kebab",
        category: "snacks",
        protein: 24,
        time: 40,
        isVeg: false,
        ingredients: ["250g Minced Mutton", "2 tbsp Raw Papaya Paste", "Lucknowi Spices (Mace, Cardamom, Cloves)", "Ginger-Garlic Paste", "Ghee for pan frying"],
        steps: ["Mix minced meat with raw papaya and spices. Marinate for 4 hours.", "Shape into small smooth patties.", "Shallow fry in ghee until melt-in-the-mouth tender."]
    },

    // --- MAHARASHTRA ---
    {
        name: "Misal Pav",
        category: "breakfast",
        protein: 14,
        time: 30,
        isVeg: true,
        ingredients: ["1 Cup Sprouted Moth Beans", "1 Onion", "Spices: Misal Masala (Goda Masala)", "Farsan (Crispy topping)", "Lemons & Onions", "Pav (Bread rolls)"],
        steps: ["Pressure cook sprouted moth beans.", "Make a spicy watery gravy with spices and onions.", "In a bowl, place the beans, pour the spicy gravy (Rassa) over it.", "Top with farsan, onions, and coriander. Serve with buttered pav."]
    },
    {
        name: "Puran Poli",
        category: "snacks",
        protein: 12,
        time: 50,
        isVeg: true,
        ingredients: ["1 Cup Chana Dal", "1 Cup Jaggery", "2 Cups Wheat Flour", "Cardamom Powder", "Ghee"],
        steps: ["Cook chana dal and mash it with jaggery into a thick paste (Puran).", "Stuff the sweet paste into wheat dough balls.", "Roll thinly and roast on a tawa (griddle) with plenty of ghee."]
    },
    {
        name: "Vada Pav",
        category: "snacks",
        protein: 8,
        time: 20,
        isVeg: true,
        ingredients: ["2 Boiled Potatoes", "1 Cup Besan (Gram Flour)", "Garlic-Green Chili Paste", "Mustard Seeds", "Pav (Bread rolls)", "Dry Garlic Chutney"],
        steps: ["Make spiced potato balls and dip in besan batter.", "Deep fry until golden brown (Batata Vada).", "Stuff the vada into a pav spread with dry garlic chutney."]
    },
    {
        name: "Sabudana Khichdi",
        category: "breakfast",
        protein: 6,
        time: 15,
        isVeg: true,
        ingredients: ["1 Cup Sago Pearls (Soaked)", "1/2 Cup Crushed Roasted Peanuts", "1 Potato Diced", "Green Chilis", "Cumin Seeds"],
        steps: ["Soak sago overnight until soft.", "Sauté potatoes, cumin, and chilis in oil.", "Add sago and peanut powder. Cook until transparent."]
    },
    {
        name: "Zunka Bhakri",
        category: "lunch",
        protein: 18,
        time: 25,
        isVeg: true,
        ingredients: ["1 Cup Besan", "2 Onions Chopped", "Garlic Paste", "Red Chili Powder", "Jowar Flour (for Bhakri)"],
        steps: ["Sauté onions and garlic. Add besan and spices with a little water.", "Cook until it forms a thick, lumpy, tasty mixture (Zunka).", "Serve hot with Jowar Bhakri (flatbread)."]
    },

    // --- PUNJAB ---
    {
        name: "Sarson Ka Saag",
        category: "dinner",
        protein: 12,
        time: 60,
        isVeg: true,
        ingredients: ["500g Mustard Greens", "200g Spinach", "2 tbsp Maize Flour (Makki Atta)", "Ginger, Garlic, Green Chilis", "Butter & Jaggery"],
        steps: ["Boil and mash greens with maize flour.", "Slow cook with ginger-garlic and spices for 30 minutes.", "Serve with a huge dollop of butter and Makki di Roti."]
    },
    {
        name: "Makki di Roti",
        category: "dinner",
        protein: 8,
        time: 20,
        isVeg: true,
        ingredients: ["2 Cups Maize Flour", "Warm Water", "Ghee"],
        steps: ["Knead maize flour with warm water into a soft dough.", "Shape into round rotis by hand on a wet cloth or plastic sheet.", "Roast on tawa with ghee until crispy."]
    },
    {
        name: "Amritsari Kulcha",
        category: "lunch",
        protein: 14,
        time: 30,
        isVeg: true,
        ingredients: ["2 Cups Maida (Refined Flour)", "2 Boiled Potatoes", "Anardana (Dried Pomegranate Seeds)", "Ajwain", "Butter"],
        steps: ["Stuff maida dough with a spicy potato mixture.", "Bake in a tandoor or oven until crisp and flaky.", "Crush lightly and top with lots of butter."]
    },
    {
        name: "Dal Makhani",
        category: "dinner",
        protein: 18,
        time: 60,
        isVeg: true,
        ingredients: ["1 Cup Whole Black Urad Dal", "1/4 Cup Rajma", "2 tbsp Butter", "2 tbsp Fresh Cream", "Tomato Puree", "Ginger-Garlic Paste"],
        steps: ["Pressure cook dal and rajma until soft. Slowly mash them.", "Sauté ginger-garlic and tomato puree in butter.", "Add dal and simmer on low heat for 1 hour. Finish with cream and butter."]
    },
    {
        name: "Chole Bhature",
        category: "lunch",
        protein: 22,
        time: 45,
        isVeg: true,
        ingredients: ["1 Cup Chickpeas (Soaked)", "2 Cups Maida", "Yogurt (for dough)", "Chole Masala", "Tea bag (for dark color)", "Onions & Tomatoes"],
        steps: ["Boil chickpeas with a tea bag. Sauté onions, tomatoes, and spices.", "Knead maida dough with yogurt and ferment for 2 hours.", "Fry large fluffy Bhatures and serve with spicy Chole."]
    },

    // --- MUGHLAI/MUSLIM ---
    {
        name: "Mutton Korma",
        category: "dinner",
        protein: 35,
        time: 60,
        isVeg: false,
        ingredients: ["500g Mutton", "2 Cups Yogurt", "Fried Onion Paste", "Cashew Paste", "Aromatic Spices (Korma Masala)", "Ghee"],
        steps: ["Slow cook mutton with yogurt and whole spices.", "Add fried onion and cashew paste for texture and color.", "Simmer until the mutton is fork-tender and the oil separates."]
    },
    {
        name: "Sheer Khurma",
        category: "snacks",
        protein: 10,
        time: 25,
        isVeg: true,
        ingredients: ["1 Litre Full Cream Milk", "1/2 Cup Fine Vermicelli (Seviyan)", "1/2 Cup Dates (Chopped)", "Dry Fruits (Cashews, Almonds, Pistachios)", "Cardamom Powder", "Saffron"],
        steps: ["Roast vermicelli in ghee until golden.", "Boil milk and reduce until slightly thick.", "Add vermicelli, dates, and dry fruits. Simmer for 10 minutes with saffron."]
    },
    {
        name: "Chicken Nihari",
        category: "dinner",
        protein: 30,
        time: 60,
        isVeg: false,
        ingredients: ["500g Chicken (on bone)", "2 tbsp Roasted Atta (Wheat Flour)", "Nihari Masala", "Ginger Juliennes", "Lemon & Fried Onions"],
        steps: ["Cook chicken with nihari spices in a pressure cooker or pot.", "Thicken the gravy with roasted wheat flour slurry.", "Simmer until the fat floats on top (Tari). Garnish with ginger and lemon."]
    },
    {
        name: "Nargisi Kofta",
        category: "lunch",
        protein: 32,
        time: 45,
        isVeg: false,
        ingredients: ["4 Boiled Eggs", "250g Minced Meat", "Ginger-Garlic Paste", "Mughlai Spices", "Onion-Tomato Gravy"],
        steps: ["Wrap boiled eggs with seasoned minced meat.", "Deep fry the meat-wrapped eggs (Koftas).", "Cut in half and place in a rich Mughlai gravy."]
    },
    {
        name: "Haleem",
        category: "dinner",
        protein: 40,
        time: 120,
        isVeg: false,
        ingredients: ["500g Meat", "1 Cup Broken Wheat (Dalia)", "Mix of Lentils (Moong, Masoor, Chana)", "Fried Onions", "Ghee & Spices"],
        steps: ["Soak wheat and lentils. Cook meat with lentils until very mushy.", "Pound or blend the mixture to a paste-like consistency.", "Simmer with ghee and garnish with crispy fried onions and lemon."]
    }
];

// Add image mapping and final formatting
const finalAppends = culturalRecipes.map((r, i) => ({
    ...r,
    id: ++maxId,
    // Add realistic Unsplash images if possible or use generic
    image: `https://images.unsplash.com/photo-${[
        "1585937421612-70a008356fbe", // Curry
        "1601050690597-df0568f70950", // Dal
        "1626074353765-517a681e40be", // Snacks
        "1563379091339-03b21ab4a4f8", // Biryani
        "1546069901-ba9599a7e63c", // Salad/Misc
        "1517673400267-0251440c45dc", // Breakfast
        "1626700051175-6818013e1d4f", // Wraps
        "1563379091339-03b21ab4a4f8"  // Biryani
    ][i % 8]}?w=600`,
    videoId: "dQw4w9WgXcQ" // Placeholder for now
}));

const updatedRecipes = [...existingRecipes, ...finalAppends];

fs.writeFileSync(recipesFile, JSON.stringify(updatedRecipes, null, 2));

console.log(`Added ${finalAppends.length} specialized cultural recipes.`);
console.log(`New total: ${updatedRecipes.length} recipes.`);
