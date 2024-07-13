# User Management API
This is a RESTful API for managing user accounts and profiles, including authentication and
file upload capabilities, built with Node.js and Express.js.

## Endpoints
- **User Registration**
- `POST /api/users/register`
- Request Body: `{ "username": "user123", "password": "password", "email": "user@example.com" }`

- **User Login**
- `POST /api/users/login`
- Request Body: `{ "username": "user123", "password": "password" }`

- **Get User Profile**
- `GET /api/users/profile`

- **Update User Profile**
- `PUT /api/users/profile`
- Request Body: `{ "username": "newUsername", "email": "newEmail@example.com" }`

- **Upload Profile Picture**
- `POST /api/users/profile/picture`
- Form Data: `file`

- **Get User Profile Picture**
- `GET /api/users/profile/picture`

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
PORT =  <application-port> or 3000
NODE_ENV = <can be either "development", "test" or "production">
```
4. Start the server:

Imn development mode: Run:

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
## Technologies
- Typescript
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer (for file uploads)