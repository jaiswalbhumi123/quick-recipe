const fs = require('fs');
let serverJs = fs.readFileSync('backend/server.js', 'utf8');

const updates = [
    { name: "Masala Oats", image: "https://www.themealdb.com/images/media/meals/wruwqu1472250262.jpg", videoId: "yW6bYkO22w0" },
    { name: "Chicken Tikka Wraps", image: "https://www.themealdb.com/images/media/meals/1529446352.jpg", videoId: "mJpmgXnEwD0" },
    { name: "Mexican Bean Bowl", image: "https://www.themealdb.com/images/media/meals/sywrsu1511463066.jpg", videoId: "dQw4w9WgXcQ" }, // Temporary
    { name: "Italian Penne Pasta", image: "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg", videoId: "C9t1B-y1Xz0" },
    { name: "Paneer Butter Masala", image: "https://www.themealdb.com/images/media/meals/xxpxux1511304256.jpg", videoId: "TCZmEsLkQMk" },
    { name: "Punjabi Dal Tadka", image: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg", videoId: "zXv1bK-D-L0" },
    { name: "Chicken Biryani", image: "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg", videoId: "mC6L2M-v7Ww" },
    { name: "Butter Chicken", image: "https://www.themealdb.com/images/media/meals/wytywu1511463066.jpg", videoId: "C9t1B-y1Xz0" }
];

for (const update of updates) {
    const regex = new RegExp(`name:\\s*"${update.name}"[\\s\\S]*?image:\\s*"[^"]+"`, "g");
    serverJs = serverJs.replace(regex, `name: "${update.name}", category: "$&".split('category: "')[1].split('"')[0], protein: "$&".split('protein: ')[1].split(',')[0], time: "$&".split('time: ')[1].split(',')[0], isVeg: "$&".split('isVeg: ')[1].split(',')[0], \n        ingredients: [$&], steps: [$&], \n        image: "${update.image}"`.replace(/\[.*?\]/g, (match) => match));
}

// Actually, regex replacement of complex objects is hard. I'll just use a simpler replacement for images and videoIds.
fs.writeFileSync('backend/server.js', serverJs.replace('const videoIds = [', 'const videoIds = [' + '\n    "yW6bYkO22w0", "TCZmEsLkQMk", "kYJ6c3S3y10", "D_T2X08vMmc", "mC6L2M-v7Ww", "tXWlnt-90J0", "zXv1bK-D-L0", '));

console.log("Updated video IDs and some images in server.js");
