const express = require('express');
const router = express.Router();

router.get('/auth', (req, res) => {
    res.send('Authentication route');
});

module.exports = router;