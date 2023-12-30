const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const { connectTodb, getDb } = require('./db');
const PORT = 3003;
const app = express();
function insert (collection) {
    const bike = { 
        brand: "Giant", 
        model: "EmondaSport", 
        type: "Road Bike", 
        price: 1800
      };
      // Insert the bike record
    collection.insertOne(bike, (err, result) => {
    if (err) {
      console.error("Error inserting record:", err);
    } else {
      console.log("Bike record added:", result);
    }
  });
}

function getAll(collection) {
    collection.find({}).then((bikes) => {
        console.log(bikes); 
      });
}

function updateBike(collection, documentId) {
    const update = { $set: { "Rating": "100" } };
    collection.updateOne({_id:new ObjectId(documentId)}, update, (err, result) => {
        if (err) {
          console.error("Error updating document:", err);
        } else {
          console.log("Document updated:", result);
        }
        // client.close();
      });
}


connectTodb((err) => {
    if(!err) {
        // app.listen(PORT, (err) => {
        //     err? console.log(err) : console.log(`listening port ${PORT}`);
        // });
        db = getDb();
        const data = db.collection(`data`)
        // insert(data);
        // getAll(data)
        updateBike(data, '65900fc283af9b00630af811');
    } else {
        console.log(`DB connection error: ${err}`);
    }
});
