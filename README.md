# Multilingual File Manager Application

The Multilingual File Manager is a multi-user application built using Node.js, Express.js, Redis, MySQL, and i18next for internationalization. It provides functionalities for user registration, login, file management, and multilingual support.

This application is designed to handle real-world scenarios like collaborative project workspaces, file sharing, and multilingual accessibility.

============================================================
## Features
============================================================

### Core Features
1. **User Management**
   - Secure user registration and login using hashed passwords.
   - Role-based access control (optional for admin features).

2. **File Management**
   - Perform CRUD operations for files (create, read, update, delete).
   - Store file metadata, including name, size, type, and directory path.
   - Enable file uploads with validation.

3. **Multilingual Support**
   - Built with `i18next` to support multiple languages (e.g., English, French, Spanish).
   - Allow users to toggle their preferred language.

4. **Asynchronous Task Handling**
   - Use **Redis** for queuing background tasks like file uploads and logging.

5. **Responsive Frontend**
   - User-friendly UI built with **React.js** (or **Next.js**).
   - File pagination and search features for better usability.

### Additional Features
- **Admin Dashboard**
  - Monitor users, uploaded files, and Redis-queued tasks.
- **Unit Testing**
  - Comprehensive unit tests for backend APIs.
- **Future-Ready**
  - Add file versioning and integrate with cloud storage (e.g., AWS S3, Google Drive).

============================================================
## Technologies Used
============================================================

### Backend
- **Node.js**: JavaScript runtime for scalable applications.
- **Express.js**: Web framework for building robust APIs.
- **MySQL**: Relational database to store user and file data.
- **Sequelize**: ORM for database management.
- **Redis**: In-memory database for efficient task queuing.
- **i18next**: Library for internationalization.

### Frontend
- **React.js**: Frontend library for building dynamic UIs.
- **Axios**: HTTP client for API communication.
- **i18next**: Multilingual support for frontend.

============================================================
## Project Structure
============================================================

multilingual-file-manager/
├── backend/
│   ├── config/               # Database and Redis configurations
│   ├── controllers/          # Business logic for user and file management
│   ├── locales/              # Translation JSON files
│   ├── middlewares/          # Authentication and validation middleware
│   ├── migrations/           # Sequelize migration scripts
│   ├── models/               # Sequelize models (e.g., User, File)
│   ├── routes/               # API routes for user and file endpoints
│   ├── tests/                # Unit tests for backend functionalities
│   ├── queue.js              # Redis queue setup
│   ├── worker.js             # Worker for background tasks
│   ├── app.js                # Main backend application file
│   └── package.json          # Backend dependencies
├── frontend/
│   ├── components/           # React components
│   ├── pages/                # React Router or Next.js pages
│   ├── styles/               # CSS or SCSS styles
│   ├── src/                  # Source files
│   ├── public/               # Static files (e.g., images, icons)
│   ├── .env.example          # Example environment variables for frontend
│   └── package.json          # Frontend dependencies
└── README.md                 # Documentation

============================================================
Setup Instructions
============================================================

1. Clone the Repository
------------------------------------------------------------
git clone https://github.com/henriettetuombe/multilingual-file-manager.git
cd multilingual-file-manager

2. Set Up the Backend
------------------------------------------------------------
cd backend

Install dependencies:
------------------------------------------------------------
npm install

Set up the .env file:
------------------------------------------------------------
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
JWT_SECRET=your_secret_key

Run database migrations:
------------------------------------------------------------
npx sequelize-cli db:migrate

Start the Redis server:
------------------------------------------------------------
redis-server

Start the backend server:
------------------------------------------------------------
npm start

3. Set Up the Frontend
------------------------------------------------------------
cd ../frontend

Install dependencies:
------------------------------------------------------------
npm install

Set up the .env file:
------------------------------------------------------------
REACT_APP_API_URL=http://localhost:3000/api

Start the frontend development server:
------------------------------------------------------------
npm run dev

============================================================
API Documentation
============================================================

User Endpoints
------------------------------------------------------------
Register a User:
POST /api/users/register
Request Body:
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "password123"
}

Login a User:
POST /api/users/login
Request Body:
{
  "email": "testuser@example.com",
  "password": "password123"
}

File Endpoints
------------------------------------------------------------
Create a File:
POST /api/files
Request Body:
{
  "userId": 1,
  "name": "example.txt",
  "size": 2048,
  "type": "txt",
  "path": "/uploads/example.txt"
}

Get All Files:
GET /api/files

Update a File:
PUT /api/files/:id
Request Body:
{
  "name": "new_example.txt",
  "size": 4096
}

Delete a File:
DELETE /api/files/:id

============================================================
Running Tests
============================================================
Backend Tests:
Run the following command to execute tests:
------------------------------------------------------------
npm test

============================================================
Challenges and Solutions
============================================================

1. Database Connection Errors:
   - Implemented .env for dynamic configuration.

2. Queuing Tasks:
   - Used Bull and Redis for efficient background task handling.

3. Language Support:
   - Used i18next to support multiple languages in both backend and frontend.

============================================================
Future Improvements
============================================================
1. Add file versioning for better management.
2. Integrate cloud storage (e.g., AWS S3 or Google Drive).
3. Implement advanced search and filtering options.

============================================================
Authors
============================================================
Henriette Tuombe(https://github.com/henriettetuombe)
