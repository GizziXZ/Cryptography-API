const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.post('/aes/encrypt', (req, res) => {
    const { message, key } = req.body;

    if (!message || !key) {
        return res.status(400).send({ error: 'Message and key are required' });
    }

    if (key.length !== 32) {
        return res.status(400).send({ error: 'Key must be 32 bytes long' });
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    res.send({ iv: iv.toString('hex'), encrypted });
});

router.post('/aes/decrypt', (req, res) => {
    const { encrypted, key, iv } = req.body;

    if (!encrypted || !key || !iv) {
        return res.status(400).send({ error: 'Encrypted message, key, and IV are required' });
    }

    if (key.length !== 32) {
        return res.status(400).send({ error: 'Key must be 32 bytes long' });
    }

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    res.send({ decrypted });
});

module.exports = router;