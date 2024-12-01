# Multilingual File Manager Application

This is a Multilingual File Manager Application built using Node.js, Express, MONGODB, and i18next for internationalization. The application provides user registration, login, and file management functionalities with support for multiple languages.

## Features

- User registration and login
- File management: create, read, update, delete files
- Multilingual support using i18next
- Input data extraction from request body, query parameters, and headers

## Project Structure

```bash
  multilingual-file-manager/
  ├── config/
  ├── controllers/
  │ ├── fileController.js
  │ └── userController.js
  ├── locales/
  │ ├── en.json
  │ └── fr.json
  ├── migrations/
  │ ├── 20240716232651-create-user.js
  │ └── 20240716232652-create-file.js
  ├── models/
  │ ├── index.js
  │ ├── user.js
  │ └── file.js
  ├── node_modules/
  ├── seeders/
  ├── tests/
  │ ├── fileController/
  │ │ ├── createFile.test.js
  │ │ ├── deleteFile.test.js
  │ │ ├── getFileById.test.js
  │ │ ├── getFiles.test.js
  │ │ └── updateFile.test.js
  │ └── userController/
  │ ├── login.test.js
  │ └── register.test.js
  ├── .gitignore
  ├── app.js
  ├── jest.config.js
  ├── package.json
  ├── package-lock.json
  ├── queue.js
  ├── routes.js
  ├── worker.js
  └── README.md
```

## Prerequisites

- Node.js (v14 or later)
- MySQL

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/henriettetuombe/multilingual-file-manager.git
   cd multilingual-file-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure MySQL database:

   - Create a MySQL database.
   - Update the database configuration in the `models/index.js` file.

4. Initialize i18next localization files:
   - Add your localization files in the `locales` directory.

## Running the Application

1. Start the server:

   ```bash
   node app.js
   ```

2. The server will run on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### User Endpoints

- **Register a User:**

  ```http
  POST /users/register
  ```

  Request Body:

  ```json
  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

- **Login a User:**

  ```http
  POST /users/login
  ```

  Request Body:

  ```json
  {
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

### File Endpoints

- **Create a File:**

  ```http
  POST /api/files
  ```

  Request Body:

  ```json
  {
    "userId": "userid",
    "name": "testfile.txt",
    "size": 1024,
    "type": "txt",
    "path": "/files/testfile.txt"
  }
  ```

- **Get All Files:**

  ```http
  GET /api/files
  ```

- **Get a File by ID:**

  ```http
  GET /api/files/:id
  ```

- **Update a File:**

  ```http
  PUT /api/files/:id
  ```

  Request Body:

  ```json
  {
    "name": "updatedfile.txt",
    "size": 2048,
    "type": "txt",
    "path": "/files/updatedfile.txt"
  }
  ```

- **Delete a File:**

  ```http
  DELETE /api/files/:id
  ```

## Running Tests

1. Run the tests:

   ```bash
   npm test
   ```

   or

   ```bash
   npm test -- --detectOpenHandles
   ```

## Authors

- [Henriette Tuombe](https://github.com/henriettetuombe)
- [Shemssa Patience](https://github.com/pshemssa)







http://localhost:3000/user/register
http://localhost:3000/user/login
