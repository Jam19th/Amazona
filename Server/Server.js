import express from 'express';
// import Seed_Data from './Seed_Data.js';
import supabase from './supabase.js';

const app = express();

app.get('/api/products', (req, res) => {
    res.send(supabase.products);
});

// fetch all products
// app.get('/api/products', async (req, res) => {
//     const { data, error } = await supabase
//         .from('Products')
//         .select()

//     if (error) {
//         res.status(404).send({ message: 'Products Not Found' });
//     }
//     if (data) {
//         res.send(data);
//     }
// })

app.get('/api/products/slug/:slug', (req, res) => {
    const product = supabase.products.find((x) => x.slug === req.params.slug);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

// fetch by slug
// app.get('/api/products/slug/:slug', async (req, res) => {
//     const product = await supabase
//         .from('Products')
//         .select()
//         .eq('slug', req.params.slug)
//         .single()
//         if (product) {
//             res.send(product);
//         } else {
//             res.status(404).send({ message: 'Product Not Found' });
//         }
// });

app.get('/api/products/:id', (req, res) => {
    const product = supabase.products.find((x) => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

// fetch by id
// app.get('/api/products/:id', async (req, res) => {
//     const { data, error } = await supabase
//         .from('Products')
//         .select()
//         .eq('id', req.params.id)
//         .single()

//     if (error) {
//         res.status(404).send({ message: 'Product Not Found' });
//     }
//     if (data) {
//         res.send(data);
//     }
// })

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});