const fs = require('fs');
const path = require('path');

const recipesFile = path.join(__dirname, 'backend', 'data', 'recipes.json');
let recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

// High-quality generic data generators for different types of dishes
const recipeTemplates = {
    paratha: (name, mainIng) => ({
        ingredients: [
            `2 cups Whole Wheat Flour (Atta)`,
            `1 cup ${mainIng}, boiled and mashed (or finely chopped if appropriate)`,
            `2 Green Chilies, finely chopped`,
            `1/2 tsp Ginger, grated`,
            `1/2 tsp Ajwain (Carom seeds)`,
            `1/2 tsp Garam Masala`,
            `1/4 tsp Turmeric powder`,
            `1 tsp Dry Mango Powder (Amchur)`,
            `2 tbsp Fresh Coriander, chopped`,
            `Salt to taste`,
            `Oil/Ghee for roasting`
        ],
        steps: [
            `Knead the wheat flour with water and salt into a soft dough. Cover and rest for 15 minutes.`,
            `In a bowl, mix ${mainIng}, green chilies, ginger, and all spices to prepare the stuffing.`,
            `Take a small ball of dough, flatten it, and place a spoonful of the stuffing in the center.`,
            `Bring the edges of the dough together to seal and flatten it with your palm.`,
            `Roll the paratha into a circle with a rolling pin using dry flour for dusting.`,
            `Heat a tawa (griddle) and place the paratha on it. Cook for a minute, then flip.`,
            `Apply ghee or oil and cook on both sides until golden brown spots appear.`,
            `Serve hot with curd, pickle, or a dollop of butter.`
        ]
    }),
    curry: (name, mainIng) => ({
        ingredients: [
            `500g ${mainIng}`,
            `2 medium Onions, finely chopped`,
            `2 large Tomatoes, pureed`,
            `1 tbsp Ginger-Garlic paste`,
            `2 tbsp Oil or Butter`,
            `1 tsp Cumin seeds`,
            `1/2 tsp Turmeric powder`,
            `1 tsp Red Chili powder`,
            `1 tbsp Coriander powder`,
            `1 tsp Garam Masala`,
            `1/2 cup Fresh Cream or Yogurt (Optional)`,
            `Salt to taste`,
            `Fresh Coriander for garnish`
        ],
        steps: [
            `Heat oil in a heavy-bottomed pan and add cumin seeds. Let them splutter.`,
            `Add chopped onions and sauté until they turn golden brown.`,
            `Add ginger-garlic paste and cook for 2 minutes until the raw smell goes away.`,
            `Add tomato puree and cook until the oil starts separating from the masala.`,
            `Add all the dry spices (turmeric, chili, coriander) and salt. Mix well.`,
            `Add ${mainIng} to the masala and sauté for 5 minutes.`,
            `Add 1-2 cups of warm water depending on the desired consistency. Cover and simmer on low heat.`,
            `Cook until ${mainIng} is tender and perfectly cooked through.`,
            `Finish by adding garam masala and fresh cream/yogurt if using.`,
            `Garnish with fresh coriander and serve hot with roti, naan, or rice.`
        ]
    }),
    fry: (name, mainIng) => ({
        ingredients: [
            `2 cups ${mainIng}, cut into cubes or slices`,
            `1 large Onion, sliced`,
            `2 Green Chilies, slit`,
            `1 tsp Mustard seeds`,
            `1 tsp Cumin seeds`,
            `1/2 tsp Turmeric powder`,
            `1 tsp Red Chili powder`,
            `1/2 tsp Amchur (Dry Mango powder)`,
            `2 tbsp Oil`,
            `Salt to taste`,
            `Fresh Coriander for garnish`
        ],
        steps: [
            `Heat oil in a pan and add mustard seeds and cumin seeds.`,
            `Add sliced onions and green chilies, sauté until translucent.`,
            `Add ${mainIng} and stir well. Cook on medium heat for 5 minutes.`,
            `Add turmeric powder, red chili powder, and salt. Cover and cook on low flame.`,
            `Stir occasionally to prevent sticking. Cook until ${mainIng} is crispy and golden.`,
            `Sprinkle amchur powder and mix well.`,
            `Garnish with fresh coriander and serve as a tasty side dish.`
        ]
    }),
    rice: (name, mainIng) => ({
        ingredients: [
            `1 cup Basmati Rice, washed and soaked`,
            `1 cup ${mainIng}, diced or prepared`,
            `1 large Onion, sliced`,
            `1 tbsp Ghee or Oil`,
            `Whole Spices (Cinnamon, Cardamom, Cloves, Bay leaf)`,
            `1 tsp Cumin seeds`,
            `1/2 tsp Turmeric powder (Optional)`,
            `2 cups Water`,
            `Salt to taste`,
            `Fresh Mint and Coriander for garnish`
        ],
        steps: [
            `Heat ghee in a pressure cooker or heavy pot. Add whole spices and cumin.`,
            `Add sliced onions and sauté until golden brown.`,
            `Add ${mainIng} and sauté for 2-3 minutes.`,
            `Add soaked rice and gently mix with the spices.`,
            `Add water, salt, and turmeric. Stir once carefully.`,
            `Cover and cook (bring to 1 whistle in pressure cooker or simmer for 15 mins in pot).`,
            `Allow the steam to release naturally, then fluff the rice with a fork.`,
            `Garnish with mint and coriander. Serve hot with raita.`
        ]
    }),
    biryani: (name, mainIng) => ({
        ingredients: [
            `500g ${mainIng}`,
            `2 cups Long Grain Basmati Rice`,
            `1 cup Curd (Yogurt)`,
            `2 large Onions, thinly sliced (Biryani style)`,
            `1 tbsp Ginger-Garlic paste`,
            `Whole Biryani Spices (Bay leaf, Star Anise, Mace, Cardamom)`,
            `1/2 tsp Saffron dissolved in warm milk`,
            `2 tbsp Ghee`,
            `Fresh Mint and Coriander`,
            `Biryani Masala powder`
        ],
        steps: [
            `Marinate ${mainIng} with curd, ginger-garlic paste, biryani masala, and salt for at least 1 hour.`,
            `Wash and parboil the rice with whole spices until it is 70% cooked. Drain and keep aside.`,
            `Deep-fry half the onions until crisp and golden brown (Birista).`,
            `In a heavy-bottomed pot, layer the marinated ${mainIng} at the bottom.`,
            `Add a layer of parboiled rice over it. Sprinkle fried onions, mint, and coriander.`,
            `Add another layer of rice, saffron milk, and ghee.`,
            `Seal the pot with dough or a tight lid. Dum-cook on very low heat for 25-30 minutes.`,
            `Let it rest for 10 minutes before opening and serving with salan or raita.`
        ]
    })
};

const commonUnsplashImages = [
    "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515003197202-ce2b3391b409?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop"
];

let fixedCount = 0;
let updatedImages = 0;

recipes.forEach(r => {
    let lowerName = r.name.toLowerCase();
    let lowerSteps = r.steps.join(' ').toLowerCase();
    let lowerIngr = r.ingredients.join(' ').toLowerCase();
    let isGeneric = lowerSteps.includes('prepare the') || lowerIngr.includes('main ingredient') || lowerIngr.includes('1 cup');

    // Extract main ingredient name from recipe name
    let mainIng = r.name.replace(/Classic|Premium|Dhaba Style|Chef'S Special|Homestyle|Restaurant Style|Spicy|Authentic|Special/gi, '').replace(/Paratha|Curry|Fry|Rice|Biryani/gi, '').trim();
    if (!mainIng) mainIng = "Main Ingredient";

    if (isGeneric) {
        let template = null;
        if (lowerName.includes('paratha')) template = recipeTemplates.paratha;
        else if (lowerName.includes('curry')) template = recipeTemplates.curry;
        else if (lowerName.includes('fry')) template = recipeTemplates.fry;
        else if (lowerName.includes('rice')) template = recipeTemplates.rice;
        else if (lowerName.includes('biryani')) template = recipeTemplates.biryani;

        if (template) {
            const data = template(r.name, mainIng);
            r.ingredients = data.ingredients;
            r.steps = data.steps;
            fixedCount++;
        }
    }

    // Always fix generic images or duplicate images
    if (commonUnsplashImages.includes(r.image) || r.image.includes('unsplash')) {
        r.image = `https://image.pollinations.ai/prompt/${encodeURIComponent(r.name + ' gourmet dish plated high quality photography')}?width=800&height=600&nologo=true`;
        updatedImages++;
    } else if (r.image.includes('pollinations.ai') && !r.image.includes('encodeURIComponent')) {
        // Just ensure it's a good prompt
        r.image = `https://image.pollinations.ai/prompt/${encodeURIComponent(r.name + ' gourmet dish plated high quality photography')}?width=800&height=600&nologo=true`;
    }
});

fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));

console.log(`Updated ${fixedCount} recipes with realistic ingredients and steps.`);
console.log(`Updated ${updatedImages} recipes with unique high-quality images.`);
