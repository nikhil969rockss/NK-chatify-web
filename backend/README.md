# 🚀 Chatify Backend

<div align="center">

![Bun](https://img.shields.io/badge/Bun-JavaScript%20Runtime-FFD700?style=flat-square&logo=bun)
![Express](https://img.shields.io/badge/Express-4.21.2-black?style=flat-square&logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8.10-green?style=flat-square&logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-green?style=flat-square&logo=socket.io)
![Node](https://img.shields.io/badge/Node-API-lightgrey?style=flat-square)

**High-Performance Real-time Chat Backend API**

[Features](#features) • [Setup](#setup) • [API Routes](#api-routes) • [Architecture](#architecture)

</div>

---

## 📋 Overview

Chatify Backend is a robust, scalable Express.js server running on the Bun JavaScript runtime. It powers real-time messaging with Socket.io, secure authentication, and MongoDB persistence.

**Why Bun?**

- ⚡ 4-5x faster than Node.js
- 🔥 Built-in bundler & transpiler
- 📦 Native TypeScript support
- 🎯 Lower resource consumption

---

## ✨ Key Features

### 🔐 Authentication & Authorization

- JWT-based token authentication
- HTTP-only cookie storage (XSS protection)
- Bcryptjs password hashing (10 salt rounds)
- Session management with automatic logout
- Email verification for sign-up

### 💬 Real-time Messaging

- Socket.io for bi-directional communication
- User presence tracking (online/offline status)
- Instant message delivery
- Notification sound support
- User socket mapping for efficient broadcasting

### 👥 User Management

- User registration & login
- Profile management
- User search functionality
- Contact list operations
- Cloudinary image uploads

### 🛡️ Security & Protection

- **Rate Limiting** - Arcjet protection against DDoS/brute force
- **Input Validation** - Zod schema validation on all endpoints
- **CORS** - Strict cross-origin policies
- **JWT Secrets** - Secure token generation
- **Password Security** - Salted bcryptjs hashing
- **MongoDB ObjectId Validation** - Custom middleware validation

### 🔧 Infrastructure

- **Error Handling** - Global error middleware with proper status codes
- **Async Handler** - Wrapper for try-catch in routes
- **Environment Config** - Centralized configuration management
- **Logging** - Console logging for debugging

---

## 🛠️ Tech Stack

```
Runtime:        Bun 1.0+
Framework:      Express 4.21.2
Language:       TypeScript 5+
Database:       MongoDB with Mongoose 8.10.1
Real-time:      Socket.io 4.8.1
Authentication: JWT (jsonwebtoken 9.0.2)
Password Hash:  Bcryptjs 2.4.3
Upload Service: Cloudinary 2.5.1
Email:          Nodemailer 8.0.7
Rate Limiting:  Arcjet 1.4.0
Validation:     Zod 4.4.1
Utilities:      Cookie-parser, CORS, Dotenv
```

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
