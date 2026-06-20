const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Simple Database handling
const dbPath = path.join(__dirname, 'database.json');

function readDB() {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return { users: [], visitors: [] };
    }
}

function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Visitor Tracking Middleware MUST be before express.static
app.use((req, res, next) => {
    if (req.path.includes('.html') || req.path === '/') {
        let db = readDB();
        const time = new Date().toLocaleTimeString();
        const endpoint = req.path === '/' ? '/index.html' : req.path;
        
        console.log(`[🌐 VISITOR ALERT] at ${time} - Page opened: ${endpoint}`);
        
        db.visitors.push({ time, endpoint, ip: req.ip || "Localhost" });
        writeDB(db);
    }
    next();
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, '..', 'frontend')));


const recipesPath = path.join(__dirname, 'data', 'recipes.json');
let recipesFormatted = [];

try {
    const rawData = fs.readFileSync(recipesPath, 'utf8');
    recipesFormatted = JSON.parse(rawData);
    console.log(`Successfully loaded ${recipesFormatted.length} recipes from data file.`);
} catch (err) {
    console.error("Error loading recipes.json, using empty array.", err);
}

app.get('/api/recipes', (req, res) => {
    const limit = parseInt(req.query.limit) || recipesFormatted.length;
    const offset = parseInt(req.query.offset) || 0;
    res.json(recipesFormatted.slice(offset, offset + limit));
});

app.post('/api/register', (req, res) => {
    const { name, email, phone, password } = req.body;
    let db = readDB();

    if (db.users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already exists.' });
    }
    
    db.users.push({ name, email, phone, password });
    writeDB(db);
    
    console.log(`[✅ NEW REGISTRATION] ${name} (${email}) joined!`);
    res.json({ success: true, message: 'Account created' });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    let db = readDB();

    const user = db.users.find(u => u.email === email && u.password === password);
    if (user) {
        console.log(`[🔑 LOGIN] ${user.name} (${user.email}) signed in successfully.`);
        res.json({ token: 'login-token-123', user: { name: user.name, email: user.email, phone: user.phone } });
    } else {
        res.status(401).json({ error: 'Invalid email or password' });
    }
});

// Fallback to index.html for any other requests (SPA-like)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
