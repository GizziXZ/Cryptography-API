const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 80;

app.use(express.json());

// Load all routes
const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(file => {
    const filePath = path.join(routesPath, file);
    if (fs.lstatSync(filePath).isFile() && file.endsWith('.js')) {
        app.use(require(filePath));
    }
});

app.get('/', (req, res) => {
    res.redirect('https://github.com/GizziXZ/Cryptography-API'); // the github repo
});


app.listen(port, () => {
    console.log('Server is running on port ' + port);
});