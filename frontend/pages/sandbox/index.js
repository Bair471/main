const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

// CREATE
app.post('/api/Food', async (req, res) => {
    const food = req.body;

    // Validation
    if (!food.brand) {
        res.status(400).send('Missing required fields: brand, model, year (number), price (decimal)');
        return;
    }

    const client = await MongoClient.connect(mongoConnectionString);
    const db = client.db('Food');
    const result = await db.collection('data').insertOne({
        brand: bike.brand,
        model: bike.model,
        year: parseInt(bike.year),
        price: parseFloat(bike.price)
    });

    res.send(result);
});

// GET
app.get('/api/Food', async (req, res) => {
    const client = await MongoClient.connect(mongoConnectionString);
    const db = client.db('Food');
    const result = await db.collection('data').find().toArray();

    res.send(result);
});

// GET SINGLE
app.get('/api/Food/:id', async (req, res) => {
    const id = req.params.id;
    const client = await MongoClient.connect(mongoConnectionString);
    const db = client.db('Food');

    const result = await db.collection('data').findOne({ _id: new ObjectId(id) });

    res.send(result);
});

// UPDATE
app.put('/api/Food/:id', async (req, res) => {
    const id = req.params.id;
    const food = req.body;

    // Validation
    if (!food.brand) {
        res.status(400).send('Missing required fields: brand, model, year (number), price (decimal)');
        return;
    }

    const client = await MongoClient.connect(mongoConnectionString);
    const db = client.db('Food');
    const result = await db.collection('data').updateOne({ _id: new ObjectId(id) }, {
        $set: {
            brand: bike.brand,
            model: bike.model,
            year: parseInt(bike.year),
            price: parseFloat(bike.price)
        }
    });

    res.send(result);
});



const port = 8000;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
