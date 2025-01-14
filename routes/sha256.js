const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.post('/sha256', (req, res) => {
    const input = req.body.input;
    if (!input) {
        return res.status(400).send({ error: 'Input is required' });
    }
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    res.send({ hash });
});

module.exports = router;