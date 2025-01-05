# Todo List API
A RESTful API service built with Node.js, Express, and MongoDB for managing a todo list application. This API allows you to create, read, update, and delete tasks with their titles, descriptions, and status.


## Features
• Create new tasks with title and description
• Fetch all tasks or a single task by ID
• Update task status (pending, in-progress, completed)
• Delete tasks
• MongoDB integration for data persistence
• Error handling and validation
• CORS enabled for cross-origin requests


## Prerequisites
Before running this project, make sure you have-
• Node.js (v14 or higher)
• npm (Node Package Manager)
• MongoDB Atlas account (or local MongoDB installation)


## API Endpoints

### Create a Task
POST: '/tasks'
Body:
{
    "title": "Task title",
    "description": "Task description",
    "status": "pending" // optional, defaults to "pending"
}

### Get All Tasks
GET: /tasks

### Get Task by ID
GET: /tasks/:id

### Update Task Status
PUT: /tasks/:id
Body:
{
    "status": "in-progress" // "pending", "in-progress", or "completed"
}

### Delete Task
DELETE: /tasks/:id


## Response Formats

### Success Response
{
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "status": "pending",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
}

### Error Response
{
    "error": "Error message"
}


## Testing
You can test the API using Postman or any other API testing tool. Import the provided Postman collection for quick testing.


## Error Handling

The API includes error handling for:
• Invalid request data
• Non-existent tasks
• Database connection issues
• Server errors


### Technologies Used
• Node.js
• Express.js
• MongoDB
• Mongoose
• CORS
