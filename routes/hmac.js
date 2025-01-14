const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.post('/hmac', (req, res) => {
    const { message, key } = req.body;

    if (!message || !key) {
        return res.status(400).send({ error: 'Message and key are required' });
    }

    const hmac = crypto.createHmac('sha256', key).update(message).digest('hex');
    res.send({ hmac });
});

module.exports = router;