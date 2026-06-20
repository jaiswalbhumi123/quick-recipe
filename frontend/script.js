let allRecipes = [];
let displayedCount = 20;
let currentCategory = 'all';
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? (window.location.port === '3000' ? 'http://localhost:5001/api' : '/api')
    : '/api';
let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('recipesGrid')) {
        loadRecipes();
        setupSearch();
    }
    
    // Update dashboard/home greeting with user name
    const userJson = localStorage.getItem('user');
    if (userJson) {
        const user = JSON.parse(userJson);
        const greetingEl = document.querySelector('.header-user .greeting');
        if (greetingEl) {
            if (window.location.href.includes('home.html')) {
                greetingEl.textContent = `Inspiring ${user.name.split(' ')[0]}`;
            } else {
                greetingEl.textContent = `Hello ${user.name.split(' ')[0]},`;
            }
        }
    }
});

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            displayedCount = 20;
            applyFilters();
        });
    }
}

async function loadRecipes() {
    const grid = document.getElementById('recipesGrid');
    grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; margin-top:20px; color:var(--text-muted);">Fetching best recipes...</p>';

    try {
        const res = await fetch(`${API_BASE}/recipes?limit=2000&v=${new Date().getTime()}`);
        if (!res.ok) throw new Error('API down');
        allRecipes = await res.json();
    } catch (e) {
        console.error("Fetch error:", e);
        grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; color:#ff4444;">Could not load recipes.</p>';
        return;
    }
    displayRecipes(allRecipes);
}

function setCategory(cat, el) {
    currentCategory = cat;
    displayedCount = 20;

    document.querySelectorAll('.cat-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');

    applyFilters();
}

function applyFilters() {
    const term = document.getElementById('searchInput')?.value.toLowerCase() || "";
    const filtered = allRecipes.filter(r => {
        const matchesTerm = (r.name.toLowerCase().includes(term) ||
            r.category.toLowerCase().includes(term) ||
            (r.ingredients && r.ingredients.join(' ').toLowerCase().includes(term)));
            
        let matchesCategory = false;
        if (currentCategory === 'all') matchesCategory = true;
        else if (currentCategory === 'saved') matchesCategory = savedRecipes.includes(r.id);
        else if (currentCategory === 'up') matchesCategory = r.name.toLowerCase().includes('up style');
        else if (currentCategory === 'maharashtra') matchesCategory = r.name.toLowerCase().includes('maharashtrian');
        else if (currentCategory === 'punjab') matchesCategory = r.name.toLowerCase().includes('punjabi');
        else if (currentCategory === 'mughlai') matchesCategory = r.name.toLowerCase().includes('mughlai');
        else matchesCategory = r.category === currentCategory;

        return matchesTerm && matchesCategory;
    });
    displayRecipes(filtered);
}

function toggleBookmark(id, event) {
    if (event) event.stopPropagation();
    if (savedRecipes.includes(id)) {
        savedRecipes = savedRecipes.filter(savedId => savedId !== id);
    } else {
        savedRecipes.push(id);
    }
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    applyFilters();
    
    const modalIcon = document.getElementById('modalBookmarkIcon');
    if (modalIcon) {
        modalIcon.className = savedRecipes.includes(id) ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark";
    }
}

function displayRecipes(recipes) {
    const grid = document.getElementById('recipesGrid');
    if (!grid) return;

    if (recipes.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; margin-top: 20px; color:var(--text-muted);">No matches found.</p>';
        return;
    }

    const visibleRecipes = recipes.slice(0, displayedCount);

    let html = visibleRecipes.map(recipe => {
        let title = recipe.name || "Delicious Dish";

        let exactImage = recipe.image;
        if (!exactImage) {
            exactImage = `https://tse1.mm.bing.net/th?q=${encodeURIComponent(title + ' gourmet dish plated')}&w=400&h=300&c=7&p=0`;
        }

        return `
        <div class="recipe-card-dark" onclick="openRecipeModal(${recipe.id})">
            <div class="img-wrapper">
                <img src="${exactImage}" alt="${title}" 
                    onerror="this.onerror=null; this.src='https://image.pollinations.ai/prompt/${encodeURIComponent(title + ' food photography')}?width=400&height=300&seed=${recipe.id}';">
            </div>
            <div class="fav-icon" onclick="toggleBookmark(${recipe.id}, event)">
                <i class="${savedRecipes.includes(recipe.id) ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
            </div>
            <h4>${title}</h4>
            <div class="meta-info">
                <span><i class="fa-solid fa-fire"></i> ${recipe.protein * 15} kcal</span>
                <span><i class="fa-solid fa-dumbbell"></i> ${recipe.protein}g P</span>
            </div>
        </div>
    `}).join('');

    if (recipes.length > displayedCount) {
        html += `
            <div style="grid-column: 1/-1; text-align:center; padding: 15px 0;">
                <button onclick="loadMore()" style="background:transparent; border:1px solid var(--primary); color:var(--primary); padding:10px 40px; border-radius:20px; cursor:pointer;">
                    View More
                </button>
            </div>
        `;
    }
    grid.innerHTML = html;
}

function loadMore() {
    displayedCount += 20;
    applyFilters();
}

function openRecipeModal(id) {
    const recipe = allRecipes.find(r => r.id === id);
    if (!recipe) return;

    const modal = document.getElementById('recipeModal');

    let exactImage = recipe.image;
    if (!exactImage) {
        exactImage = `https://tse1.mm.bing.net/th?q=${encodeURIComponent(recipe.name + ' recipe food')}&w=800&h=600&c=7&p=0`;
    }

    // Ensure we parse exactly the given ingredients into a clean visual list
    let ingredientsHtml = '<p style="color:var(--text-muted);">No exact ingredients found.</p>';
    if (recipe.ingredients && recipe.ingredients.length > 0) {
        ingredientsHtml = recipe.ingredients.map(ing => {
            // Find a quantity-like snippet if possible, else default to generic qty design
            let qtyMatch = ing.match(/^(\d+(?:\.\d+)?\s*(?:g|ml|tbsp|tsp|cup|cups|oz|lb|lbs|pc|piece|pieces)?)/i);
            let qty = qtyMatch ? qtyMatch[0] : 'As needed';
            let name = qtyMatch ? ing.substring(qtyMatch[0].length).trim() : ing.trim();
            // remove leading symbols like - or ,
            name = name.replace(/^[-,\s]+/, '');

            const ingImg = `https://tse1.mm.bing.net/th?q=${encodeURIComponent(name + ' raw ingredient')}&w=100&h=100&c=7&p=0`;

            return `
            <div class="ingredient-item">
                <img src="${ingImg}" alt="${name}" onerror="this.onerror=null; this.src='https://tse1.mm.bing.net/th?q=${encodeURIComponent(name + ' raw ingredient')}&w=100&h=100&c=7&p=0';">
                <div class="ing-name">${name}</div>
                <div class="ing-qty">${qty}</div>
            </div>`;
        }).join('');
    }

    let stepsHtml = '<p style="color:var(--text-muted);">Prep details coming soon.</p>';
    if (recipe.steps && recipe.steps.length > 0) {
        stepsHtml = recipe.steps.map((step, i) => `
            <div class="step-box">
                <div class="step-num">${i + 1}</div>
                <div class="step-text">${step}</div>
            </div>
        `).join('');
    }

    const vId = recipe.videoId || 'sCjXhgDNgRQ';

    modal.innerHTML = `
        <div class="detail-header-wrapper">
            <div class="nav-actions">
                <div class="circle-btn" onclick="closeRecipeModal()">
                    <i class="fa-solid fa-arrow-left"></i>
                </div>
                <div class="circle-btn" onclick="toggleBookmark(${recipe.id}, event)">
                    <i id="modalBookmarkIcon" class="${savedRecipes.includes(recipe.id) ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
                </div>
            </div>
            <img src="${exactImage}" class="detail-header-img" alt="${recipe.name}" 
                onerror="this.onerror=null; this.src='https://image.pollinations.ai/prompt/${encodeURIComponent(recipe.name + ' gourmet dish')}?width=1000&height=750&seed=${recipe.id}';">
        </div>
        
        <div class="detail-content">
            <h1 class="detail-title">${recipe.name}</h1>
            <div class="detail-meta-row">
                <div class="auth-badge">
                    <img src="https://ui-avatars.com/api/?name=Chef&background=2ecc71&color=fff" alt="Chef">
                    By Master Chef
                </div>
                <div style="color: #FFCC00; font-size: 0.95rem; font-weight:600;">
                    <i class="fa-solid fa-star"></i> 4.8
                </div>
            </div>
            
            <div class="meta-badges">
                <div><i class="fa-regular fa-clock"></i> ${recipe.time} min<span>Time</span></div>
                <div><i class="fa-solid fa-fire"></i> ${recipe.protein * 15}<span>Kcal</span></div>
                <div><i class="fa-solid fa-leaf"></i> ${recipe.isVeg ? 'Veg' : 'Non-Veg'}<span>Type</span></div>
            </div>
            
            <p class="desc-text">A healthy, flavorful dish curated specifically for you. This recipe delivers restaurant-quality results with exact ingredients and easy techniques. Perfect for your specific routine.</p>
            
            <h3 class="section-title-sm">Ingredients</h3>
            <div style="margin-bottom: 30px;">
                ${ingredientsHtml}
            </div>

            <h3 class="section-title-sm">Step-by-Step Instructions</h3>
            <div style="margin-bottom: 30px;">
                ${stepsHtml}
            </div>

            <h3 class="section-title-sm">Cooking Video</h3>
            <div class="video-box">
                <iframe src="https://www.youtube.com/embed/${vId}?autoplay=0&rel=0" allowfullscreen></iframe>
            </div>
            <p class="desc-text" style="font-size:0.8rem; text-align:center;">
                <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.name + ' recipe tutorial')}" target="_blank" style="color:var(--primary); text-decoration:none;">
                    Missing exactly this video? Search alternative video directly matching "${recipe.name}"
                </a>
            </p>
        </div>
    `;

    modal.style.display = 'block';

    // Smooth transition
    modal.scrollTop = 0;
    document.body.style.overflow = 'hidden';
}

function closeRecipeModal() {
    const modal = document.getElementById('recipeModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modal.innerHTML = '';
}

// Auth Handlers
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = document.querySelector('.btn-primary');

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';
    btn.disabled = true;

    try {
        const res = await fetch(`${API_BASE.replace('/api', '')}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'dashboard.html';
        } else {
            alert(data.error || "Login failed");
        }
    } catch (e) {
        console.error(e);
        alert("Server error. Please try again.");
    } finally {
        btn.innerHTML = 'Sign In <i class="fa-solid fa-arrow-right"></i>';
        btn.disabled = false;
    }
}

async function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const btn = document.querySelector('.btn-primary');

    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';
    btn.disabled = true;

    try {
        const res = await fetch(`${API_BASE.replace('/api', '')}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, password })
        });
        const data = await res.json();
        if (res.ok) {
            alert("Account created! Please sign in.");
            window.location.href = 'index.html';
        } else {
            alert(data.error || "Registration failed");
        }
    } catch (e) {
        console.error(e);
        alert("Server error. Please try again.");
    } finally {
        btn.innerHTML = 'Create Account <i class="fa-solid fa-check"></i>';
        btn.disabled = false;
    }
}

function googleLogin() { 
    // Mocking google login
    alert("Google login is coming soon! Using guest access...");
    window.location.href = 'dashboard.html'; 
}

function logout() { 
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html'; 
}

// --- 3D Floating Images Rotator ---
const foodImages = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1499028344343-ae173fdc5725?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1484723091791-c0e7e14fb133?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1540189567004-451aa352936c?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcd3327?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500&h=500&fit=crop"
];

function initFloatingImages() {
    const floaters = document.querySelectorAll('.float-item');
    if (floaters.length === 0) return;

    // Attach error handlers
    floaters.forEach(floater => {
        floater.onerror = () => {
            console.log("Floating image failed, rotating...");
            const randomImg = foodImages[Math.floor(Math.random() * foodImages.length)];
            floater.src = randomImg;
        };
    });

    // Improved logic to ensure 100% unique image selection
    const getUniqueImg = (currentSrc) => {
        const allDisplayed = Array.from(floaters).map(f => f.src);
        const available = foodImages.filter(img => !allDisplayed.includes(img) && img !== currentSrc);

        if (available.length > 0) {
            return available[Math.floor(Math.random() * available.length)];
        }
        return foodImages[Math.floor(Math.random() * foodImages.length)];
    };

    let nextIndex = 0;
    setInterval(() => {
        const itemToUpdate = floaters[nextIndex];
        const newImg = getUniqueImg(itemToUpdate.src);

        itemToUpdate.style.opacity = '0';
        setTimeout(() => {
            itemToUpdate.src = newImg;
            itemToUpdate.onload = () => {
                itemToUpdate.style.opacity = ''; // Fade in ONLY after load
            };
        }, 600);

        nextIndex = (nextIndex + 1) % floaters.length;
    }, 3500);

    // Parallax Effect for Dashboard
    if (document.querySelector('.dashboard-floats')) {
        window.addEventListener('scroll', () => {
            const scroll = window.pageYOffset;
            floaters.forEach((floater, index) => {
                const speed = (index + 1) * 0.2;
                floater.style.transform = `translateY(${scroll * speed}px) rotate(${scroll * 0.05}deg)`;
            });
        });

        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            document.querySelector('.dashboard-floats').style.transform = `translate(${x}px, ${y}px)`;
        });
    }
}

document.addEventListener('DOMContentLoaded', initFloatingImages);

// --- Premium UI Interactions ---
document.addEventListener('mousemove', e => {
    // Premium Cursor Glow effect for recipe cards
    const card = e.target.closest('.recipe-card-dark');
    if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    }
});

document.addEventListener('click', function(e) {
    // Smooth Ripple effect for primary buttons
    const btn = e.target.closest('.btn-primary');
    if (btn) {
        const rect = btn.getBoundingClientRect();
        const circle = document.createElement('span');
        const diameter = Math.max(btn.clientWidth, btn.clientHeight);
        const radius = diameter / 2;
        
        const left = e.clientX - rect.left - radius;
        const top = e.clientY - rect.top - radius;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${left}px`;
        circle.style.top = `${top}px`;
        circle.classList.add('ripple');
        
        const existing = btn.querySelector('.ripple');
        if (existing) existing.remove();
        
        btn.appendChild(circle);
        
        setTimeout(() => {
            circle.remove();
        }, 600);
    }
});
