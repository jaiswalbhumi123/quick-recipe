const fs = require('fs');
const path = require('path');

const recipesFile = path.join(__dirname, 'backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

console.log(`Force-Applying Professional Ultra-Fix to ${recipes.length} recipes...`);

const templates = {
    paratha: {
        ingredients: ["2 cups Whole Wheat Flour (Atta)", "300g Fresh Paneer/Aloo/Gobi/Matar", "2 Green Chilies, finely chopped", "1 tsp Grated Ginger", "1/2 tsp Ajwain", "1 tsp Garam Masala", "1/2 tsp Amchur Powder", "Fresh Coriander, finely chopped", "Salt to taste", "Ghee/Oil for roasting"],
        steps: [
            "Start by kneading a soft, smooth dough using whole wheat flour, a pinch of salt, a teaspoon of oil, and lukewarm water. Cover with a damp cloth and rest for at least 20 minutes.",
            "Prepare the flavorful stuffing by mashing the primary ingredient (e.g., boiled potato or crumbled paneer) and mixing it thoroughly with ginger, green chilies, and coriander.",
            "Incorporate all dry spices into the stuffing: Ajwain, Garam Masala, Amchur, and Salt. Ensure there are no large lumps to prevent the paratha from tearing.",
            "Pinch a medium-sized ball from the dough and roll it into a 4-inch circle using dry flour for dusting.",
            "Place a generous amount of the spiced stuffing in the center. Carefully pleat the edges toward the middle and seal tightly.",
            "Flatten the stuffed ball with your fingers, then roll it out gently into a 7 or 8-inch even circle. Apply uniform pressure while rolling.",
            "Place the rolled paratha on a preheated heavy tawa over a medium-high flame. Cook for 1 minute until small bubbles appear.",
            "Flip the paratha and spread a generous teaspoon of ghee or oil over the cooked surface.",
            "Flip again and apply ghee to the second side. Press firmly with a spatula while roasting to ensure even browning and crispiness.",
            "Serve the hot, steaming paratha with a bowl of fresh yogurt, tangy mango pickle, or a knob of white butter."
        ]
    },
    curry: {
        ingredients: ["500g Primary Vegetable/Protein", "2 medium Onions, finely chopped", "2 large Tomatoes, pureed", "1 tbsp Ginger-Garlic paste", "2 Green Chilies", "1 tsp Cumin seeds", "1/2 tsp Turmeric", "1 tsp Red Chili powder", "1 tsp Kitchen King/Garam Masala", "Fresh Cilantro", "3 tbsp Oil"],
        steps: [
            "Clean and prep the primary ingredients into uniform pieces to ensure even cooking and texture.",
            "Heat oil in a thick-bottomed pan and add cumin seeds, waiting for them to crackle and release their aroma.",
            "Add the chopped onions and sauté until they transition into a deep, caramelized golden-brown color.",
            "Stir in the ginger-garlic paste and slit green chilies. Fry for 2-3 minutes until the raw pungent aroma is gone.",
            "Add the fresh tomato puree and a salt. Cook on a medium flame until the oil starts separating from the masala base.",
            "Incorporate the dry spice mix: Turmeric, Red chili powder, and Coriander powder. Add a splash of water to keep the spices from burning.",
            "Add your main veggie or protein pieces to the masala base and sauté for 5 minutes, allowing them to absorb the flavors.",
            "Add enough hot water to create the desired gravy thickness. Cover and simmer on low heat.",
            "Cook until the ingredients are tender and juicy. Check for perfect seasoning and adjust as needed.",
            "Finish with a dash of garam masala for warmth and a handful of fresh cilantro for a vibrant finish. Serve with hot Phulkas or Basmati rice."
        ]
    },
    fry: {
        ingredients: ["400g Sliced Vegetable/Main Ingredient", "1/2 tsp Mustard seeds", "1/2 tsp Cumin seeds", "1/4 tsp Asafoetida (Hing)", "1 tsp Turmeric", "1.5 tsp Red Chili powder", "1 tsp Coriander-Cumin powder", "2 tbsp Oil", "Salt to taste"],
        steps: [
            "Wash and slice the primary ingredients into uniform strips or cubes. Pat dry to ensure they fry gracefully and don't steam.",
            "Heat 2-3 tablespoons of oil in a sturdy wok (Karahi). Add mustard seeds and cumin until they splutter, then add a pinch of hing.",
            "Carefully add the sliced ingredients. Sauté on high heat for 3 minutes to seal the surfaces and develop a crust.",
            "Reduce heat to medium, add salt and turmeric, and toss well. Cover with a lid and cook for 5-8 minutes until tender.",
            "Remove the lid and increase the flame to medium-high. Add the remaining dry spices: red chili powder and coriander-cumin powder.",
            "Continue to stir-fry uncovered for 5 minutes, tossing frequently to ensure every piece is perfectly coated and crispy.",
            "Check for doneness—the ingredients should be tender on the inside with a charred, spicy exterior.",
            "Garnish with a squeeze of fresh lemon juice or chopped coriander. Serve as an aromatic side dish."
        ]
    },
    biryani: {
        ingredients: ["2 cups Aged Basmati Rice", "500g Main Protein/Vegetables", "2 cups Thick Yogurt", "2 tbsp Biryani Masala", "3 large Onions (fried into Birista)", "Whole Spices (Mace, Star Anise, Cinnamon)", "Saffron in warm milk", "1/2 cup Pure Ghee", "Fresh Mint and Coriander"],
        steps: [
            "Rinse the Basmati rice 3 times until the water runs clear. Soak for 40 minutes to achieve the perfect texture.",
            "Parboil the rice in plenty of salted water with whole aromatic spices until it is 70% cooked (the grain should break when pressed but still have a bite). Drain and set aside.",
            "Marinate the main ingredients in yogurt, ginger-garlic paste, red chili powder, and biryani masala for at least 60 minutes.",
            "Heat ghee in a large heavy-bottomed pot. Add whole spices and the marinated mixture. Sauté until partially cooked and fragrant.",
            "Start the layering: Spread half of the cooked meat/veggies at the bottom, then top with a layer of parboiled rice.",
            "Sprinkle a generous layer of golden fried onions (birista), chopped mint, and fresh coriander over the rice.",
            "Repeat with the second layer of remaining meat/veggies and the rest of the rice.",
            "Drizzle the saffron-infused milk and remaining ghee over the rice for moisture, aroma, and vibrant color.",
            "Seal the pot with a heavy lid or dough (Dum style) and cook on very low heat for 25 minutes, ideally on a hot tawa.",
            "Allow the biryani to rest for 15 minutes undisturbed. Gently mix the layers and serve with creamy raita."
        ]
    }
};

recipes.forEach(r => {
    let t = null;
    const name = r.name.toLowerCase();

    if (name.includes('paratha')) t = templates.paratha;
    else if (name.includes('fry')) t = templates.fry;
    else if (name.includes('curry') || name.includes('aloo matar') || name.includes('matar') || name.includes('masala') || name.includes('saag')) t = templates.curry;
    else if (name.includes('biryani') || name.includes('pulao')) t = templates.biryani;

    if (t) {
        // Force replace to ensure 100% quality
        r.ingredients = t.ingredients;
        r.steps = t.steps;
    }

    // Solve "Not proper image / black image"
    if (r.image.includes('pollinations.ai')) {
        r.image = `https://image.pollinations.ai/prompt/${encodeURIComponent(r.name + ' professionally plated gourmet masterpiece restaurant quality high definition food photography vibrant colors edible flowers garnish background bokeh')}?width=1024&height=768&nologo=true`;
    }
});

fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
console.log(`Force Ultra-Fix Complete!`);
