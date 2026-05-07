# 💬 Chatify - Real-time Chat Application

<div align="center">

![GitHub](https://img.shields.io/badge/GitHub-Chatify-black?style=flat-square&logo=github)
![React](https://img.shields.io/badge/React-19.2.5-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue?style=flat-square&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Bun%20Runtime-FFD700?style=flat-square&logo=bun)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-green?style=flat-square&logo=socket.io)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=flat-square&logo=mongodb)
![Express](https://img.shields.io/badge/Express-Backend-black?style=flat-square&logo=express)

**A Modern, Feature-Rich Real-time Chat Application with Authentication & Notifications**

[Features](#features) • [Tech Stack](#tech-stack) • [Setup Guide](#setup-guide) • [Architecture](#architecture) • [Contributing](#contributing)

</div>

---

## 📋 Overview

**Chatify** is a modern real-time messaging platform built with cutting-edge technologies. It enables users to communicate instantly with Socket.io-powered real-time updates, featuring authentication, online status tracking, and a beautiful responsive UI powered by React and Tailwind CSS.

The application is designed with scalability and performance in mind, using:

- **Bun runtime** for fast JavaScript execution
- **Socket.io** for real-time bi-directional communication
- **MongoDB** for persistent data storage
- **JWT authentication** for secure user sessions
- **Zustand** for efficient state management

---

## ✨ Features

### 🔐 Authentication & Security

- ✅ User signup with email verification
- ✅ Secure login with JWT tokens (HTTP-only cookies)
- ✅ Password hashing with bcryptjs
- ✅ Rate limiting with Arcjet
- ✅ Session management & auto logout

### 💬 Real-time Messaging

- ✅ Instant message delivery with Socket.io
- ✅ Online/offline user status tracking
- ✅ Typing indicators (coming soon)
- ✅ Read receipts (coming soon)
- ✅ Message notifications with sound

### 👥 User Management

- ✅ User profiles with profile pictures
- ✅ Contact list management
- ✅ Search users functionality
- ✅ User presence tracking
- ✅ Image uploads with Cloudinary

### 🎨 UI/UX

- ✅ Responsive design (mobile-friendly)
- ✅ Dark theme by default
- ✅ Smooth animations & transitions
- ✅ Loading skeletons for better UX
- ✅ Toast notifications
- ✅ Professional 404 page

---

## 🛠️ Tech Stack

### Frontend

```
Framework:    React 19.2.5
Language:     TypeScript 6.0+
Build Tool:   Vite 8.0+
State:        Zustand 5.0
Styling:      Tailwind CSS + DaisyUI
HTTP Client:  Axios
Real-time:    Socket.io-client 4.8.1
Routing:      React Router 7.14+
Icons:        Lucide React
Notifications: React Toastify
```

### Backend

```
Runtime:      Bun (JavaScript runtime)
Framework:    Express 4.21.2
Language:     TypeScript 5+
Database:     MongoDB with Mongoose 8.10+
Real-time:    Socket.io 4.8.1
Auth:         JWT (jsonwebtoken 9.0.2)
Password:     Bcryptjs 2.4.3
Upload:       Cloudinary 2.5.1
Email:        Nodemailer 8.0.7
Rate Limit:   Arcjet 1.4.0
Validation:   Zod 4.4.1
CORS:         Express CORS
```

---

## 📁 Project Structure

```
chatify-app/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand stores (auth, chat, user)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── config/          # Axios & app config
│   │   └── App.tsx          # Main App component
│   ├── public/              # Static assets
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # Express + Bun backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── middlewares/     # Express middlewares
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── config/          # Configuration files
│   │   ├── lib/             # Utility libraries
│   │   ├── app.ts           # Express app
│   │   └── server.ts        # Server entry point
│   ├── .env                 # Environment variables
│   └── package.json
│
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Bun** 1.0+ ([Install Bun](https://bun.sh))
- **Node.js** 18+ (for frontend tools)
- **MongoDB** database (local or cloud)
- **Cloudinary** account (for image uploads)
- **Nodemailer** compatible email service

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/nikhil969rockss/NK-chatify-web.git
cd chatify-app
```

#### 2. Setup Backend

```bash
cd backend

# Install dependencies
bun install

# Create .env file
cp .env.example .env

# Configure .env with your details
# DATABASE_URL=mongodb+srv://...
# JWT_SECRET=your_secret_key
# CLOUDINARY_NAME=your_cloudinary_name
# etc.

# Start backend server
bun run dev
```

**Backend runs on:** `http://localhost:3000`

#### 3. Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

**Frontend runs on:** `http://localhost:5173`

---

## 📡 API Architecture

### Real-time Architecture with Socket.io

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                  │
│  - Socket.io Client Connection                              │
│  - Zustand Store Management                                 │
│  - Responsive UI Components                                 │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP + WebSocket
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Express + Bun)                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Express HTTP Server + Socket.io Server              │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │  Authentication (JWT + Cookies)                       │  │
│  │  Socket Middleware (Header Validation)                │  │
│  │  Real-time Message Broadcasting                       │  │
│  │  User Presence Tracking                               │  │
│  └───────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ↓                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  MongoDB Database (Message, User, Models)             │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Key Real-time Events

**Client → Server:**

- `connection` - User connects
- `sendMessage` - Send message event
- `disconnect` - User disconnects

**Server → Client:**

- `newMessage` - New message received
- `getOnlineUsers` - Online users list
- `userStatusChanged` - User online/offline status

---

## 🔌 Socket.io Flow

### Message Delivery Flow

```
1. User sends message via UI
2. Frontend optimistically updates local store
3. Message sent to backend API endpoint
4. Backend validates & saves to MongoDB
5. Backend emits via Socket.io to recipient
6. Frontend receives "newMessage" event
7. UI updates in real-time ✨
```

### Authentication Flow

```
1. User logs in (email + password)
2. Backend generates JWT token
3. Token stored in HTTP-only cookie
4. Frontend initiates Socket connection
5. Cookies sent with handshake
6. Socket middleware validates cookie
7. Connection established ✅
```

---

## 📊 Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  profilePic: String (Cloudinary URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Messages Collection

```javascript
{
  _id: ObjectId,
  conversationId: ObjectId (ref: Conversation),
  senderId: ObjectId (ref: User),
  receiverId: ObjectId (ref: User),
  message: String,
  image: String (optional, Cloudinary URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Conversations Collection

```javascript
{
  _id: ObjectId,
  participants: [ObjectId, ObjectId] (ref: User),
  lastMessage: String,
  lastMessageAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Security Features

- ✅ **JWT Authentication** - Stateless, secure token-based auth
- ✅ **HTTP-only Cookies** - Protection against XSS attacks
- ✅ **Password Hashing** - Bcryptjs with salt rounds
- ✅ **CORS Configuration** - Controlled cross-origin requests
- ✅ **Rate Limiting** - Arcjet protection against abuse
- ✅ **Environment Variables** - Sensitive data in .env
- ✅ **Input Validation** - Zod schema validation
- ✅ **Socket Authentication** - Middleware verification

---

## 🎯 Performance Optimizations

- ⚡ **Bun Runtime** - ~4x faster than Node.js
- ⚡ **Vite** - Lightning-fast dev server & builds
- ⚡ **React Compiler** - Automatic optimization
- ⚡ **Socket.io Rooms** - Efficient message broadcasting
- ⚡ **Lazy Loading** - Route-based code splitting
- ⚡ **Image Optimization** - Cloudinary compression
- ⚡ **Loading Skeletons** - Perceived performance
- ⚡ **Zustand** - Minimal re-renders with selective updates

---

## 📦 Available Scripts

### Backend

```bash
# Development with file watching
bun run dev

# Production build
bun run start
```

### Frontend

```bash
# Development server with HMR
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# ESLint validation
npm run lint
```

---

## 🐛 Known Issues & Improvements

### Current Status

- ✅ Real-time messaging working
- ✅ User authentication complete
- ✅ Online status tracking active
- 🔄 Typing indicators (in progress)
- 🔄 Read receipts (planned)
- 🔄 File sharing (planned)
- 🔄 Group chats (planned)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Workflow

```bash
# Install dependencies
bun install      # backend
npm install      # frontend

# Start both services
# Terminal 1: backend
cd backend && bun run dev

# Terminal 2: frontend
cd frontend && npm run dev
```

---

## 📝 Environment Variables

### Backend `.env`

```env
# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/chatify

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Arcjet (Rate Limiting)
ARCJET_KEY=your_arcjet_key
```

### Frontend `.env.local`

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Nikhil Sharma**

- GitHub: [@nikhil969rockss](https://github.com/nikhil969rockss)
- Project: [NK-chatify-web](https://github.com/nikhil969rockss/NK-chatify-web)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Socket.io for real-time capabilities
- MongoDB for scalable database
- Bun for the blazingly fast runtime
- Tailwind CSS & DaisyUI for beautiful styling
- All open-source contributors

---

## 📞 Support

If you have any questions or issues:

1. Check the [Issues](https://github.com/nikhil969rockss/NK-chatify-web/issues) page
2. Create a new issue with detailed description
3. Contact via GitHub

---

<div align="center">

**⭐ If you found this helpful, please give it a star!**

Made with ❤️ by Nikhil

</div>
