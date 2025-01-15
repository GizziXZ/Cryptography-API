const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.post('/hash', (req, res) => {
    const input = req.body.input;
    const algorithm = req.body.algorithm;
    if (!input || !algorithm) {
        return res.status(400).send({ error: 'Input and Algorithm are required' });
    }
    try {
        const hash = crypto.createHash(algorithm).update(input).digest('hex');
        res.send({ hash });
    } catch (err) {
        res.status(400).send({ error: 'Invalid algorithm' });
    }
});

module.exports = router;