const express = require('express');
const router = express.Router();
const path = require('path');

// Send the index.html file for the root route
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

module.exports = router;