import express from 'express';
import Seed_Data from './Seed_Data.js';

const app = express();

app.get('/api/products', (req, res) => {
    res.send(Seed_Data.products);
});

app.get('/api/products/:slug', (req, res) => {
    const product = Seed_Data.products.find((x) => x.slug === req.params.slug);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});