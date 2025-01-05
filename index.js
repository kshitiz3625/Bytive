// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing for all routes
app.use(express.json()); // Parse incoming JSON payloads

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://skshitizsharma321:SHARMA3625@cluster0.uiloh.mongodb.net/', {
    useNewUrlParser: true, // Use new URL parser to avoid deprecation warnings
    useUnifiedTopology: true // Use new Server Discovery and Monitoring engine
});

// Define the Task Schema using Mongoose
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // Title is mandatory
    },
    description: {
        type: String,
        required: true // Description is mandatory
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'], // Only allow these status values
        default: 'pending' // Set default status for new tasks
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create Task model from schema
const Task = mongoose.model('Task', taskSchema);

// API Routes

/**
 * Create a new task
 * POST /tasks
 * @body {string} title - Task title
 * @body {string} description - Task description
 * @body {string} [status=pending] - Task status
 */
app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task); // 201 Created status code
    } catch (error) {
        res.status(400).json({ error: error.message }); // 400 Bad Request for validation errors
    }
});

/**
 * Fetch all tasks
 * GET /tasks
 * @returns {Array} List of all tasks
 */
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message }); // 500 Internal Server Error
    }
});

/**
 * Fetch a single task by ID
 * GET /tasks/:id
 * @param {string} id - Task ID
 * @returns {Object} Task object if found
 */
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' }); // 404 Not Found
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Update task status
 * PUT /tasks/:id
 * @param {string} id - Task ID
 * @body {string} status - New status (pending, in-progress, completed)
 * @returns {Object} Updated task object
 */
app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { 
                new: true, // Return the updated document
                runValidators: true // Run schema validators on update
            }
        );
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Delete a task
 * DELETE /tasks/:id
 * @param {string} id - Task ID
 * @returns {Object} Success message
 */
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Server setup
const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});