const express = require('express');
const router = express.Router();

router.post('/base64/encode', (req, res) => {
    const input = req.body.input;
    if (!input) {
        return res.status(400).send({ error: 'Input is required' });
    }
    const encoded = Buffer.from(input).toString('base64');
    res.send({ encoded });
});

router.post('/base64/decode', (req, res) => {
    const input = req.body.input;
    if (!input) {
        return res.status(400).send({ error: 'Input is required' });
    }
    const decoded = Buffer.from(input, 'base64').toString('utf-8');
    res.send({ decoded });
});

module.exports = router;