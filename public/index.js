const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 6000;

// Middleware to parse JSON in request bodies
app.use(bodyParser.json());

// In-memory data store (replace with a database in a real-world scenario)
let tasks = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },

];

// Create a new task
app.post('/tasks', (req, res) => {
    const { title, completed } = req.body;
    const newTask = { id: tasks.length + 1, title, completed };
    tasks.push(newTask);
    res.json(newTask);
});

function insert (collection, bike) {
    
      // Insert the bike record
    collection.insertOne(bike, (err, result) => {
    if (err) {
      console.error("Error inserting record:", err);
    } else {
      console.log("Bike record added:", result);
    }
  });
}

app.post('/abc', (req, res) => {
    const bike = req.body;
    connectTodb((err) => {
        if(!err) {
            // app.listen(PORT, (err) => {
            //     err? console.log(err) : console.log(`listening port ${PORT}`);
            // });
            db = getDb();
            const collection = db.collection(`data`)
            insert(collection, bike);
            // getAll(data)
            // updateBike(data, '65900fc283af9b00630af811');
        } else {
            console.log(`DB connection error: ${err}`);
        }
    });
})

// Get all tasks
app.get('/gettasks', (req, res) => {
    res.json(tasks);
});

// Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// Update a task by ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;
    const index = tasks.findIndex(t => t.id === taskId);

    if (index !== -1) {
        tasks[index] = { id: taskId, title, completed };
        res.json(tasks[index]);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.json({ message: 'Task deleted successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});