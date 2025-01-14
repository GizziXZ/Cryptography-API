const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.get('/random', (req, res) => {
    const random = crypto.randomBytes(16).toString('hex');
    res.send({ random });
});

module.exports = router;