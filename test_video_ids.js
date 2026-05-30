const https = require('https');

const candidates = [
    "PUP7U5vTZM0", // Gordon Ramsay eggs
    "1IszT_guI08", // Tasty generic
    "e2z7dJ9d-Ew", // Puran Poli (CookingShooking)
    "j3I-021n9qQ", // Puran Poli (Vidarbha)
    "1bTzS5y87l0", // Puran poli kunal kapur
    "2Z1x03i2yCg", // Puran poli sanjeev Kapoor
    "Uu_b51h5p90", // Haleem Pista house
    "l2E3b_45R6M", // Haleem South indian
    "LqmLKm1JhlQ", // Misal pav Kunal
    "K7L-W-oH5YQ"  // Misal pav rajshri
];

const checkEmbed = (id) => {
    return new Promise((resolve) => {
        https.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`, (res) => {
            resolve({ id, status: res.statusCode });
    });
    });
};

async function test() {
    for (let id of candidates) {
        const r = await checkEmbed(id);
        console.log(`[${r.status}] ${id}`);
    }
}

test();
