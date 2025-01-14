const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// random 16 bytes
app.get('/random', (req, res) => {
    const random = crypto.randomBytes(16).toString('hex');
    res.send({random}); 
});

// hash a string with sha256
app.get('/hash/:input', (req, res) => {
    const input = req.params.input; // :input
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    res.send({hash});
});

// generate a pair of RSA keys
app.get('/keys', (req, res) => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });
    res.send({ publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }), privateKey: privateKey.export({ type: 'pkcs1', format: 'pem' }) });
});

// base64 encode a string
app.post('/base64/encode', (req, res) => {
    const input = req.body.input;
    if (!input) {
        return res.status(400).send({ error: 'Input is required' });
    }
    const encoded = Buffer.from(input).toString('base64');
    res.send({ encoded });
});

// base64 decode a string
app.post('/base64/decode', (req, res) => {
    const input = req.body.input;
    if (!input) {
        return res.status(400).send({ error: 'Input is required' });
    }
    const decoded = Buffer.from(input, 'base64').toString('utf-8');
    res.send({ decoded });
});

app.listen(80, () => {
    console.log('Server is running on port 80');
})