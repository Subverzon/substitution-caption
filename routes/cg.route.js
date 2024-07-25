const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Root route for the cg
router.get('/', (req, res) => {
    res.send('CG Route, use /cg/:foldername to access the cg pages');
});

// Create the cg directory if it doesn't exist
const dirPath = path.join(__dirname, '../cg');
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Loop through the cg directory and create routes for each folder
fs.readdirSync(dirPath).forEach(file => {
    if (file === '.DS_Store') return;

    router.get(`/${file}`, (req, res) => {
        res.sendFile(path.resolve(dirPath, file, 'dashboard/index.html'));
    });

    fs.readdirSync(path.join(dirPath, file, "pages")).forEach(subfile => {
        router.get(`/${file}/${subfile}`, (req, res) => {
            res.sendFile(path.resolve(dirPath, file, `pages/${subfile}/index.html`));
        });
    });
});

module.exports = router;