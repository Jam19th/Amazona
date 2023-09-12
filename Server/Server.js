import express from 'express';
import Seed_Data from './Seed_Data.js';

const app = express();

app.get('/api/products', (req, res) => {
    res.send(Seed_Data.products);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});