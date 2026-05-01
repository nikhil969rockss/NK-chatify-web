# Chatify Backend API

A modern real-time chat application backend built with Express.js, TypeScript, and MongoDB. The API provides comprehensive endpoints for user authentication, profile management, and real-time messaging.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
  - [Authentication Endpoints](#authentication-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Message Endpoints](#message-endpoints)
- [Error Handling](#error-handling)
- [Security Features](#security-features)

## Prerequisites

- Node.js 18.x or higher
- Bun 1.3.12 or higher
- MongoDB Atlas account
- Git

## Installation

To install dependencies:

```bash
bun install
```

2. Or install and setup from scratch:

```bash
git clone <repository-url>
cd chatify-app/backend
bun install
```

## Environment Configuration

Create a `.env` file in the backend root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# JWT
JWT_SECRET=<your-secret-key>

# Email Service (Gmail)
EMAIL_USER=<your-email@gmail.com>
GMAIL_CLIENT_ID=<your-client-id>
GMAIL_CLIENT_SECRET=<your-client-secret>
REFRESH_TOKEN=<your-refresh-token>

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>

# Rate Limiting (Arcjet)
ARCJET_KEY=<your-arcjet-key>
ARCJET_ENV=development
```

**Important:** Never commit the `.env` file. Add it to `.gitignore`.

## Running the Application

### Development Mode (with watch)

```bash
bun run dev
```

### Production Mode

```bash
bun run start
```

The server will start on `http://localhost:3000` by default.

## Project Structure

```
backend/
├── src/
│   ├── app.ts                 # Express application setup
│   ├── config/                # Configuration files
│   │   ├── db.ts             # MongoDB connection
│   │   ├── env.ts            # Environment variables
│   │   ├── arcjet.ts         # Rate limiting configuration
│   │   └── cloudinary.ts     # Image upload configuration
│   ├── controllers/           # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   └── message.controller.ts
│   ├── routes/                # API routes
│   │   ├── auth.route.ts
│   │   ├── user.route.ts
│   │   └── message.route.ts
│   ├── models/                # Mongoose schemas
│   │   ├── user.model.ts
│   │   ├── message.model.ts
│   │   └── blackListToken.model.ts
│   ├── services/              # Business logic
│   │   ├── user.service.ts
│   │   ├── message.service.ts
│   │   ├── email.service.ts
│   │   └── blackList.service.ts
│   ├── middlewares/           # Custom middlewares
│   │   ├── auth.middleware.ts
│   │   ├── arjet.middleware.ts
│   │   ├── globalError.middleware.ts
│   │   └── validateObjectId.middleware.ts
│   └── lib/                   # Utilities
│       ├── ApiError.ts
│       ├── ApiResponse.ts
│       ├── asyncHandler.ts
│       ├── cloudinaryUpload.ts
│       ├── token.ts
│       └── validate.ts
├── server.ts                  # Server entry point
├── package.json
└── tsconfig.json
```

## API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Authentication

Most endpoints (except signup and login) require a JWT token. The token is sent as:

- **Cookie**: `token` (automatically set on login/signup)
- **Header**: `Authorization: Bearer <token>`

---

## Authentication Endpoints

### 1. Signup

Creates a new user account and returns JWT token.

**Endpoint:** `POST /auth/signup`

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**

```json
{
  "statusCode": 201,
  "message": "User created successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "profilePic": "default profile picutre"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**

```json
// 400 - User already exists
{
  "statusCode": 400,
  "message": "User already exists with this email"
}

// 400 - Validation error
{
  "statusCode": 400,
  "message": "Invalid email format"
}
```

---

### 2. Login

Authenticates a user and returns JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "profilePic": "https://..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**

```json
// 404 - User not found
{
  "statusCode": 404,
  "message": "User does not exist"
}

// 400 - Invalid credentials
{
  "statusCode": 400,
  "message": "Invalid credentials"
}
```

---

### 3. Logout

Logs out the user by adding token to blacklist.

**Endpoint:** `POST /auth/logout`

**Headers:**

```
Cookie: token=<jwt-token>
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "message": "User logged out successfully",
  "data": null
}
```

---

### 4. Check Authentication

Verifies user is authenticated and returns user info.

**Endpoint:** `GET /auth/check`

**Headers:**

```
Cookie: token=<jwt-token>
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "message": "User verified",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "profilePic": "https://..."
  }
}
```

**Error Response:**

```json
// 401 - Unauthorized
{
  "statusCode": 401,
  "message": "Unauthorized: Invalid token"
}
```

---

## User Endpoints

### 1. Update Profile

Updates user profile information and profile picture.

**Endpoint:** `POST /users/update-profile`

**Headers:**

```
Cookie: token=<jwt-token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "profilePic": "data:image/jpeg;base64,/9j/4AAQSkZJR..."
}
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "message": "Profile updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "profilePic": "https://res.cloudinary.com/..."
  }
}
```

**Error Responses:**

```json
// 400 - Missing profile picture
{
  "statusCode": 400,
  "message": "profilePic is required"
}

// 401 - Unauthorized
{
  "statusCode": 401,
  "message": "Unauthorized: Token not provided"
}
```

---

## Message Endpoints

All message endpoints require authentication.

### 1. Get All Contacts

Retrieves list of all other users (excluding current user).

**Endpoint:** `GET /messages/contacts`

**Headers:**

```
Cookie: token=<jwt-token>
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "message": "All contacts fetched",
  "data": {
    "users": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "fullName": "Jane Smith",
        "email": "jane@example.com",
        "profilePic": "https://..."
      },
      {
        "_id": "507f1f77bcf86cd799439013",
        "fullName": "Bob Johnson",
        "email": "bob@example.com",
        "profilePic": "https://..."
      }
    ]
  }
}
```

---

### 2. Get All Chats

Retrieves list of users with whom current user has exchanged messages.

**Endpoint:** `GET /messages/chats`

**Headers:**

```
Cookie: token=<jwt-token>
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "message": "All chats fetched",
  "data": {
    "users": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "fullName": "Jane Smith",
        "email": "jane@example.com",
        "profilePic": "https://..."
      }
    ]
  }
}
```

---

### 3. Get Messages with User

Retrieves all messages between current user and a specific user.

**Endpoint:** `GET /messages/:id`

**Parameters:**

- `id` (string, required): MongoDB ObjectId of the other user

**Headers:**

```
Cookie: token=<jwt-token>
```

**Success Response (200):**

```json
{
  "statusCode": 200,
  "message": "All messages fetched",
  "data": {
    "messages": [
      {
        "_id": "507f1f77bcf86cd799439020",
        "senderId": "507f1f77bcf86cd799439011",
        "receiverId": "507f1f77bcf86cd799439012",
        "text": "Hello, how are you?",
        "image": null,
        "createdAt": "2024-01-15T10:30:00.000Z"
      },
      {
        "_id": "507f1f77bcf86cd799439021",
        "senderId": "507f1f77bcf86cd799439012",
        "receiverId": "507f1f77bcf86cd799439011",
        "text": "I'm doing great!",
        "image": null,
        "createdAt": "2024-01-15T10:32:00.000Z"
      }
    ]
  }
}
```

**Error Responses:**

```json
// 400 - Invalid user ID
{
  "statusCode": 400,
  "message": "Invalid user ID format"
}

// 401 - Unauthorized
{
  "statusCode": 401,
  "message": "Unauthorized: Token not provided"
}
```

---

### 4. Send Message

Sends a text or image message to another user.

**Endpoint:** `POST /messages/send/:id`

**Parameters:**

- `id` (string, required): MongoDB ObjectId of recipient

**Headers:**

```
Cookie: token=<jwt-token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "text": "Hello, this is my message",
  "image": null
}
```

Or with image:

```json
{
  "text": null,
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJR..."
}
```

**Success Response (201):**

```json
{
  "statusCode": 201,
  "message": "Message sent successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439022",
    "senderId": "507f1f77bcf86cd799439011",
    "receiverId": "507f1f77bcf86cd799439012",
    "text": "Hello, this is my message",
    "image": null,
    "createdAt": "2024-01-15T10:35:00.000Z"
  }
}
```

**Error Responses:**

```json
// 400 - Missing message content
{
  "statusCode": 400,
  "message": "Message text or image is required"
}

// 400 - Cannot send message to yourself
{
  "statusCode": 400,
  "message": "You can't send message to yourself"
}

// 400 - Invalid recipient ID
{
  "statusCode": 400,
  "message": "Invalid user ID format"
}

// 401 - Unauthorized
{
  "statusCode": 401,
  "message": "Unauthorized: Token not provided"
}
```

---

## Error Handling

The API uses a standardized error response format:

```json
{
  "statusCode": 400,
  "message": "Error description",
  "errors": []
}
```

### Common HTTP Status Codes

| Status Code | Description                                     |
| ----------- | ----------------------------------------------- |
| 200         | OK - Request successful                         |
| 201         | Created - Resource created successfully         |
| 400         | Bad Request - Invalid input or validation error |
| 401         | Unauthorized - Missing or invalid token         |
| 404         | Not Found - Resource not found                  |
| 500         | Internal Server Error - Server error            |

---

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Token Blacklisting**: Logout functionality via token blacklist
- **Rate Limiting**: Arcjet rate limiting to prevent abuse
- **CORS Protection**: Cross-Origin Resource Sharing configuration
- **CSRF Protection**: SameSite cookie policy
- **HTTP Only Cookies**: Tokens stored securely in HTTP-only cookies
- **Input Validation**: Zod schema validation for all inputs
- **Image Upload Security**: Cloudinary for secure media handling

---

## Technologies Used

- **Runtime**: Bun
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcryptjs
- **Validation**: Zod
- **Image Upload**: Cloudinary
- **Rate Limiting**: Arcjet
- **Email Service**: Gmail API

---

## Support

For issues or questions, please contact the development team or create an issue in the repository.
