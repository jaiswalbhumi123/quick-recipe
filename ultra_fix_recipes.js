const fs = require('fs');
const path = require('path');

const recipesFile = path.join(__dirname, 'backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

console.log(`Applying Ultra-Fix to ${recipes.length} recipes for ingredients & steps...`);

const templates = {
    paratha: {
        ingredients: ["2 cups Whole Wheat Flour (Atta)", "Water as needed", "Salt to taste", "2 tbsp Ghee/Oil"],
        steps: [
            "Take the whole wheat flour in a large bowl, add salt and a teaspoon of oil. Gradually add water and knead to a soft, pliable dough. Cover and rest for 20 minutes.",
            "Prepare the stuffing by mashing or finely chopping the main ingredients (e.g., Aloo, Paneer, or Gobi).",
            "In a separate bowl, mix the prepared ingredients with chopped green chilies, grated ginger, cumin seeds, amchur (mango powder), and fresh coriander.",
            "Divide the dough into equal-sized balls. Take one ball and flatten it into a small circle using a rolling pin.",
            "Place a generous amount of the prepared filling in the center. Bring the edges together and seal firmly to enclose the stuffing.",
            "Flatten the stuffed ball with your hands, dust with dry flour, and roll gently into a circle around 6-7 inches in diameter. Be careful not to let the stuffing leak out.",
            "Heat a tawa (griddle) on medium flame. Place the rolled paratha on the hot tawa and cook for a minute.",
            "Flip the paratha and apply a teaspoon of ghee or oil on the cooked side. Press gently with a spatula.",
            "Flip again, apply ghee on the second side, and roast until both sides are golden brown and have crispy spots.",
            "Serve hot directly from the tawa with a dollop of fresh butter, thick curd, or your favorite pickle."
        ]
    },
    curry: {
        ingredients: ["2 large Onions, finely chopped", "2 Tomatoes, pureed", "1 tbsp Ginger-Garlic paste", "2 Green Chilies, slit", "1/2 tsp Turmeric", "1 tsp Kashmiri Red Chili powder", "1 tsp Garam Masala", "Salt to taste", "Fresh Cilantro for garnish"],
        steps: [
            "Begin by thoroughly washing and prepping your primary vegetables or protein. Cut them into uniform bite-sized pieces for even cooking.",
            "Heat 2 tablespoons of oil in a heavy-bottomed kadai or pressure cooker. Add whole spices like cumin seeds, bay leaf, and cardamom until they sizzle.",
            "Add the finely chopped onions and sauté on medium-low heat until they turn a rich golden brown. This is crucial for a deep flavor base.",
            "Stir in the ginger-garlic paste and slit green chilies. Sauté for 2 minutes until the raw smell completely disappears.",
            "Add the tomato puree and salt. Cook until the oil begins to separate from the sides of the masala paste.",
            "Incorporate all the dry ground spices: turmeric, red chili powder, and coriander powder. Sauté for a minute, splashing a little water to prevent burning.",
            "Add your main ingredients (Aloo, Matar, Paneer, or Chicken/Mutton) and toss well to coat every piece with the masala base.",
            "Pour in enough warm water to reach your desired gravy consistency. Bring to a boil, then cover with a tight lid.",
            "Simmer on a low flame until the ingredients are perfectly tender and the gravy has thickened into a rich, aromatic consistency.",
            "Finish the dish by stirring in garam masala and a generous amount of freshly chopped cilantro. Serve piping hot with roti or steamed rice."
        ]
    },
    fry: {
        ingredients: ["Main Ingredients, sliced", "1/2 tsp Cumin seeds", "1/2 tsp Turmeric", "1 tsp Red Chili powder", "1/2 tsp Amchur (Dry Mango Powder)", "2 tbsp Oil", "Salt to taste"],
        steps: [
            "Wash and slice the main ingredients into thin, uniform pieces. Pat dry completely with a clean towel to ensure a crispy texture.",
            "Heat a flat heavy skillet with 2 tablespoons of oil. When the oil is hot, add cumin seeds and let them splutter.",
            "Add the sliced main ingredients and sauté on a high flame for 2-3 minutes to seal the moisture and start the browning process.",
            "Lower the heat to medium and add salt and turmeric. Mix well, cover, and cook for 5-7 minutes until about 80% done.",
            "Remove the lid and increase the flame slightly. Add red chili powder, coriander powder, and amchur.",
            "Continue to stir-fry on an open flame, tossing frequently to coat each piece evenly with the dry spices.",
            "Cook until the surfaces are browned and slightly charred for an authentic roasted flavor.",
            "Garnish with a little more amchur or chaat masala for an extra tang. Serve hot as a side dish."
        ]
    },
    biryani: {
        ingredients: ["2 cups Basmati Rice, soaked 30 mins", "500g Main Protein/Veg", "2 large Onions, sliced into birista (fried onions)", "1 cup Curd (Yogurt)", "1 tsp Shahi Jeera", "Whole Garam Masala (Cloves, Cinnamon, Mace)", "Saffron strands in milk", "1/2 cup Pure Ghee"],
        steps: [
            "Wash and soak long-grain Basmati rice for at least 30 minutes in cold water. This ensures the grains stay long and fluffy after cooking.",
            "In a large pot, boil 8 cups of water with bay leaves, cloves, and cardamom. Add the soaked rice and cook until it is precisely 70% done. Drain and keep warm.",
            "Marinate the main ingredients with thick yogurt, ginger-garlic paste, red chili powder, biryani masala, and a pinch of salt for 1 hour.",
            "Take a heavy-bottomed pot (Handi). Heat ghee and sauté whole shahi jeera and the remaining whole spices until aromatic.",
            "If using meat, sauté until browned. If using vegetables, sauté until half-cooked. Layer this at the bottom of the pot.",
            "Sprinkle half of the golden-fried onions (birista), fresh mint, and coriander leaves over the base layer.",
            "Layer the parboiled rice evenly over the base. Do not press the rice; let it stay airy.",
            "Pour the saffron-soaked milk and a little more ghee in a circular motion over the rice for color and richness.",
            "Seal the pot with a tight lid or aluminum foil (Dum process) to trap the steam. For best results, place the pot on a heavy tawa over very low heat.",
            "Dum-cook for 20-30 minutes. Let the Biryani rest for 15 minutes before opening. Gently fluff the rice and serve with raita or salan."
        ]
    }
};

recipes.forEach(r => {
    let t = null;
    const name = r.name.toLowerCase();

    if (name.includes('paratha')) t = templates.paratha;
    else if (name.includes('fry')) t = templates.fry;
    else if (name.includes('curry') || name.includes('aloo matar') || name.includes('masala')) t = templates.curry;
    else if (name.includes('biryani') || name.includes('pulao')) t = templates.biryani;

    if (t) {
        // Only apply if the current steps are short or look generic
        if (r.steps.length < 8 || r.ingredients.some(i => i.includes('Main ingredient')) || r.steps.some(s => s.toLowerCase().includes('wash and prepare'))) {
            r.ingredients = [...t.ingredients, ...r.ingredients.filter(i => !i.toLowerCase().includes('main ingredient'))];
            r.steps = t.steps;
        }
    }

    // Solve "Not proper image / black image" by making prompts more vivid and using a fallback sequence in script.js (later)
    // but here I'll update the prompts to be MORE descriptive
    if (r.image.includes('pollinations.ai')) {
        r.image = `https://image.pollinations.ai/prompt/${encodeURIComponent(r.name + ' professionally plated authentic gourmet dish restaurant quality high definition food photography centerpiece')}?width=1024&height=768&nologo=true`;
    }
});

fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
console.log(`Ultra-Fix Complete!`);
