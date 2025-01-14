const express = require('express');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

// Load all routes
const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(file => {
    const filePath = path.join(routesPath, file);
    if (fs.lstatSync(filePath).isFile() && file.endsWith('.js')) {
        app.use(require(filePath));
    }
});

app.listen(80, () => {
    console.log('Server is running on port 80');
})