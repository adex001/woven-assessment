# User Management API
This is a RESTful API for managing user accounts and profiles, including authentication and
file upload capabilities, built with Node.js and Express.js.

[![Coverage Status](https://coveralls.io/repos/github/adex001/woven-assessment/badge.svg?branch=main)](https://coveralls.io/github/adex001/woven-assessment?branch=main)

## API Endpoints

| **API Endpoint**                        | **Method** | **Request Body**                                                                                              | **Response**                     |
|-----------------------------------------|------------|---------------------------------------------------------------------------------------------------------------|----------------------------------|
| `/api/users/register`                   | `POST`     | `{ "username": "user123", "password": "password", "email": "user@example.com" }`                               | `{ "message": "User registered successfully", "data": { "id": "6693a2c2c12a2383505b619c", "username": "adex012a", "email": "adex0011@gmail.com" } }` |
| `/api/users/login`                      | `POST`     | `{ "username": "user123", "password": "password" }`                                                           | `{ "message": "Login successful", "data": { "id": "6693a2c2c12a2383505b619c", "username": "adex012a", "email": "adex0011@gmail.com", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjkzYTJjMmMxMmEyMzgzNTA1YjYxOWMiLCJpYXQiOjE3MjA5NTE1MDQsImV4cCI6MTcyMDk1NTEwNH0.OlQrQmMEFTfijg5cq5H9XfZv0wTkeyWHg_QZzgUnehE" } }` |
| `/api/users/profile`                    | `GET`      | None                                                                                                          | `{ "message": "User Profile Retrieved.", "data": { "_id": "6693a901bd888719d0ee3f72", "username": "adex012a", "email": "adex0011@gmail.com" } }` |
| `/api/users/profile`                    | `PUT`      | `{ "username": "newUsername", "email": "newEmail@example.com" }`                                               | `{ "message": "Profile updated successfully.", "data": { "_id": "6693a901bd888719d0ee3f72", "username": "adex012a", "email": "adex0011@gmail.com" } }` |
| `/api/users/profile/picture`            | `POST`     | Form Data: `file`. File should be jpg, jpeg or png                                                            | `{ "message": "Profile picture uploaded successfully.", "data": { "_id": "6693a901bd888719d0ee3f72", "username": "adex012a", "email": "adex0011@gmail.com", "profilePicture": "file-1720954479499-988120496.png" } }` |
| `/api/users/profile/picture`            | `GET`      | None                                                                                                          | file            |


## Setup
1. Clone the repository:
```bash
git clone https://github.com/adex001/woven-assessment.git
cd woven-assessment
```
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables:
- Create a `.env` file and add the following variables:
```
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
PORT =  <application-port> Default is 3000
NODE_ENV = <can be either "development", "test" or "production">
```
4. Start the server:

In development mode: Run:

```bash
npm run dev
```

On production: Run: 

```bash
npm run build
npm run start
```


5. Run tests:
```bash
npm test
```

6. For coverage reporting

```bash
export COVERALLS_REPO_TOKEN= <coverall_repo_token>
npm run coverage
```

## Technologies
- Typescript
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer (for file uploads)