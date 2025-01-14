const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.get('/uuid', (req, res) => {
    const uuid = crypto.randomUUID();
    res.send({ uuid });
});

module.exports = router;