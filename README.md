# Advanced User Management API
This is a RESTful API for managing user accounts and profiles, including authentication and
file upload capabilities, built with Node.js and Express.js.

## Endpoints
- **User Registration**
- `POST /users/register`
- Request Body: `{ "username": "user123", "password": "password", "email":
"user@example.com" }`

- **User Login**
- `POST /users/login`
- Request Body: `{ "username": "user123", "password": "password" }`

- **Get User Profile**
- `GET /users/profile`
- **Update User Profile**
- `PUT /users/profile`
- Request Body: `{ "username": "newUsername", "email": "newEmail@example.com" }`
- **Upload Profile Picture**
- `POST /users/profile/picture`
- Form Data: `file`

- **Get User Profile Picture**
- `GET /users/profile/picture`
## Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-directory>
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
```
4. Start the server:
```bash
npm start
```
5. Run tests:
```bash
npm test
```
## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer (for file uploads)