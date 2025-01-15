const express = require('express');
const openpgp = require('openpgp');
const router = express.Router();

router.post('/pgp/encrypt', async (req, res) => {
    const { message, publicKey } = req.body;

    if (!message || !publicKey) {
        return res.status(400).send({ error: 'Message and public key are required' });
    }

    const key = await openpgp.readKey({ armoredKey: publicKey });

    const { data: encrypted } = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: message }),
        encryptionKeys: key,
    });

    res.send({ encrypted });
});

router.post('/pgp/decrypt', async (req, res) => {
    const { encrypted, privateKey, passphrase } = req.body;

    if (!encrypted || !privateKey || !passphrase) {
        return res.status(400).send({ error: 'Encrypted message, private key, and passphrase are required' });
    }

    const key = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKey }),
        passphrase
    });

    const encryptedMessage = await openpgp.readMessage({ armoredMessage: encrypted });

    const { data: decrypted } = await openpgp.decrypt({
        message: encryptedMessage,
        decryptionKeys: key,
    });

    res.send({ decrypted });
});

router.post('/pgp/sign', async (req, res) => {
    const { message, privateKey, passphrase } = req.body;

    if (!message || !privateKey || !passphrase) {
        return res.status(400).send({ error: 'Message, private key, and passphrase are required' });
    }

    const key = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKey }),
        passphrase
    });

    const unsignedMessage = await openpgp.createCleartextMessage({ text: message });

    const { data: signature } = await openpgp.sign({
        message: unsignedMessage,
        signingKeys: key,
    });

    res.send({ signature });
});

router.post('/pgp/verify', async (req, res) => {
    const { message, publicKey } = req.body;

    if (!message || !publicKey) {
        return res.status(400).send({ error: 'Message and public key are required' });
    }

    const signedMessage = await openpgp.readCleartextMessage({ cleartextMessage: message });

    const verified = await openpgp.verify({
        message: signedMessage,
        verificationKeys: (await openpgp.readKey({ armoredKey: publicKey })),
    });

    res.send({ verified });
});

module.exports = router;