const https = require('https');
const fs = require('fs');
const path = require('path');

const ids = [
    "a03U45jFxOI", "6W88K_tL6F8", "vRz54xWkE0s", "WqBnzEofYHQ", 
    "-yhf5fx6LQM", "sQp45eF7m0s", "Y2e2K7a-TrY", "sYx-l_I6RjM", 
    "1QW2M83A5x8", "Uu7u_R3pBf0", "16_u7i_Q_cM", "s0gJ6tL7B4k", 
    "vHnQz_fIfgE", "O19sXyA1X_w", "T_8Qf8vXvN4", "FLd00Bx4tOk",
    "k5jTxzhZKMI", "4W4_H60x-p8"
];

const checkEmbed = (id) => {
    return new Promise((resolve) => {
        https.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`, (res) => {
            resolve({ id, status: res.statusCode });
        }).on('error', (e) => {
            resolve({ id, status: 500 });
        });
    });
};

async function checkAll() {
    console.log("Checking video embedding status...");
    for (let id of ids) {
        const res = await checkEmbed(id);
        if (res.status === 200) {
            console.log(`[OK] ${id}`);
        } else {
            console.log(`[FAILED] ${id} - Status: ${res.status}`);
        }
    }
}

checkAll();
