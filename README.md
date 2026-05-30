# QuickRecipe

QuickRecipe is a premium full-stack culinary application designed to provide users with a delightful recipe discovery experience. It features a beautiful dark-themed UI, user authentication, interactive recipe browsing, and rich data presentation with dynamically fetched images and videos.

## Features

### Frontend 🎨
- **Premium Dark UI:** A stunning, modern dark theme with smooth animations, ripple effects, and responsive design.
- **Recipe Discovery:** Browse an extensive list of recipes with fast search and category filtering (including regional cuisines like Maharashtrian, Punjabi, Mughlai).
- **Interactive Modals:** Detailed recipe views showing ingredients, step-by-step instructions, and integrated YouTube video tutorials.
- **Bookmarking System:** Save and manage your favorite recipes locally and across sessions.
- **Dynamic Imagery:** 3D floating background images on the dashboard and fallback image generation for recipes without dedicated photos.

### Backend ⚙️
- **Express Server:** Fast and lightweight Node.js backend (`server.js`).
- **User Authentication:** Login and Registration system with basic validation and token support.
- **JSON Database:** Simple and effective JSON file-based database for users, visitors tracking, and recipe storage.
- **Analytics / Tracking:** Basic visitor logging and API request logging.

### Data Processing Scripts 🛠️
The repository includes a comprehensive set of Node.js scripts designed for data curation, cleaning, and augmentation:
- Image fetching and matching (`fetch_images.js`, `apply_images_videos.js`)
- YouTube video mapping (`blast_video_mapper.js`, `fix_videos.js`)
- Data normalization (`fix_ingredients_and_steps.js`, `uniqueness_fix.js`)

## Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js, Body-Parser, CORS
- **Database:** Local JSON files (`database.json`, `recipes.json`)

## Getting Started

### Prerequisites
- Node.js installed on your machine.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jaiswalbhumi123/quick-recipe.git
   cd quick-recipe
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd backend
   npm install
   ```
   *(Note: Dependencies might be handled globally in the root directory)*

3. **Start the server:**
   ```bash
   node backend/server.js
   ```

4. **Access the Application:**
   Open your browser and navigate to `http://localhost:5001`. The server will automatically serve the frontend files.

## Project Structure
```text
quick-recipe/
├── backend/            # Express server and database logic
│   ├── data/           # Contains recipes.json and other dataset files
│   ├── database.json   # User and visitor records
│   └── server.js       # Main backend entry point
├── frontend/           # Client-side files
│   ├── index.html      # Login / Landing page
│   ├── register.html   # User registration
│   ├── dashboard.html  # Main application view
│   ├── style.css       # Premium UI styles
│   └── script.js       # Core frontend logic
└── *.js                # Various utility and data processing scripts
```

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests for UI enhancements, backend optimizations, or data pipeline improvements.

## License
This project is licensed under the ISC License.
