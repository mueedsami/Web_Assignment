Task Management Web Application

Project Overview
This Task Management Web Application was developed as part of an academic assignment to demonstrate proficiency in full-stack web development using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application enables users to manage their tasks effectively with features such as task creation, editing, deletion, completion tracking, and filtering. It also incorporates a role-based access system to differentiate between administrative and employee privileges.

Key Features
User Management
•	User registration and login with secure password handling.
•	Role-based access control: Admin and Employee.
•	JSON Web Token (JWT)-based authentication system.
Task Management
•	Create tasks with title, description, due date, and priority.
•	Edit and update task details via a modal interface.
•	Mark tasks as completed or delete them entirely.
•	View tasks in a card-based layout with real-time updates.
•	Filter tasks by priority level and sort them by due date.
•	Search functionality based on task title or description.
Admin Privileges
•	Admins can view a list of all registered users (excluding sensitive data like passwords).
•	Admins can delete any user except themselves.
•	Additional logic ensures non-admin users cannot access or perform administrative operations.


Technology Stack
Frontend
•	React.js (Functional components and hooks)
•	React Router DOM for client-side routing
•	Plain CSS for UI styling
Backend
•	Node.js and Express.js for building RESTful APIs
•	MongoDB for database management
•	Mongoose for object data modeling (ODM)
•	bcrypt for password hashing
•	JWT for secure authentication
•	CORS for cross-origin communication

Setup Instructions
Prerequisites
•	Node.js and npm
•	MongoDB (either local instance or cloud service such as MongoDB Atlas)
Step-by-Step Guide
1. Backend Setup
cd server
npm install
npm run dev
2. Frontend Setup
cd client
npm install
npm start





Environment Variables (Backend)
Create a .env file in the server directory and define the following variables:
MONGODB_URI = { Your database URL }

API Reference
User Routes
Method	Endpoint	Description
POST	/user/signup	Register a new user
POST	/user/login	Log in and receive JWT
GET	/user/all	Get all users (admin only)
DELETE	/user/delete/:id	Delete a user (admin only)

Task Routes
Method	Endpoint	Description
POST	/task/create	Create a new task
GET	/task/list	Retrieve all tasks
PATCH	/task/complete/:id	Mark a task as completed
PATCH	/task/update/:id	Update task details
DELETE	/task/delete/:id	Delete a task



Security Considerations
•	All routes are protected using a JWT-based authentication middleware.
•	Passwords are hashed before storing in the database.
•	The application ensures that only admins can perform certain restricted actions such as deleting users.

