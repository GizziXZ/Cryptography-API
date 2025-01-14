const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.get('/keys', (req, res) => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });
    res.send({ publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }), privateKey: privateKey.export({ type: 'pkcs1', format: 'pem' }) });
});

module.exports = router;