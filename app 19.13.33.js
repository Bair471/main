// document.getElementById('addTodo').addEventListener('click', async () => {
//     const input = document.getElementById('todoText');
//     const title = input.value;
//     if(title) {
//         const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({title, completed: false})
//         });
        
//         const todo = await res.json();
//         todotoHTML(todo);

//         input.value = '';
//     }
// })

// async function deleteTodo(id) {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });
//     const data = await res.json();
//     console.log(data);
//     if (data) {
//         document.getElementById(`todo${id}`).remove();
//     }
// }

// async function getAllTodos () {
//     const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
//     const todos = await res.json();

//     console.log(todos);
//     todos.forEach(todo => todotoHTML(todo))
// }


// window.addEventListener('DOMContentLoaded', getAllTodos);

// function todotoHTML({id, completed, title}) {
//     const todoList = document.getElementById('todos');

// todoList.insertAdjacentHTML('beforeend',`
//     <div class="form-check" id="todo${id}"> 
//         <label class="form-check-label"> 
//             <input type="checkbox" class="form-check-input" ${completed && 'checked'}" > <span>ID: ${id}, Title: ${title}</span>
//             </label>    
//         <button onclick="deleteTodo(${id})" type="button" class="btn-close" aria-label="Close">
//             </button>
//     </div>`
// );
// } 

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());


const taskManager = {
    tasks: [],
    addTask: function (title, id, status) {
        const task = {
            id: id,
            title: title,
            description: "Start",
            status: status,
        };
        this.tasks.push(task);
    },
    listTasks: function () {
        return this.tasks;
    },
    deleteTask: function (taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
    changeStatus: function (taskId, newStatus) {
        this.tasks.forEach(task => {
            if (task.id === taskId) {
                task.status = newStatus;
            }
        });
    },
};

// app.use(express.static(path.join(__dirname, 'public')));


// API endpoints
app.post('/addTask', (req, res) => {
    const { title, id, status } = req.body;
    taskManager.addTask(title, id, status);
    res.json({ message: 'Task added successfully' });
});

app.get('/listTasks', (req, res) => {
    const tasks = taskManager.listTasks();
    res.json(tasks);
});

app.delete('/deleteTask/:id', (req, res) => {
    const taskId = req.params.id;
    taskManager.deleteTask(taskId);
    res.json({ message: 'Task deleted successfully' });
});

app.put('/changeStatus/:id', (req, res) => {
    const taskId = req.params.id;
    const { newStatus } = req.body;
    taskManager.changeStatus(taskId, newStatus);
    res.json({ message: 'Status changed successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Define the path to your HTML file
const htmlFilePath = path.join(__dirname, 'public', 'index.html');

// Serve static files (including the HTML file)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file explicitly
app.get('/', (req, res) => {
  res.sendFile(htmlFilePath);
});