# 🎨 Chatify Frontend

<div align="center">

![React](https://img.shields.io/badge/React-19.2.5-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.0-purple?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwindcss)
![Socket.io](https://img.shields.io/badge/Socket.io-Client-green?style=flat-square&logo=socket.io)

**Modern, Responsive Real-time Chat UI with React & Vite**

[Features](#features) • [Setup](#setup) • [Architecture](#architecture) • [Components](#components)

</div>

---

## 📋 Overview

Chatify Frontend is a modern, responsive React application built with Vite for lightning-fast development and build times. It provides a seamless real-time chat experience with Socket.io integration, state management via Zustand, and beautiful UI powered by Tailwind CSS + DaisyUI.

**Why This Stack?**

- ⚡ **Vite** - 10-100x faster than Webpack
- 🎯 **React Compiler** - Automatic performance optimization
- 🎨 **Tailwind + DaisyUI** - Beautiful, accessible components
- 📦 **Zustand** - Lightweight state management
- 🌐 **Socket.io Client** - Real-time bidirectional communication
- 🛣️ **React Router** - Client-side routing

---

## ✨ Features

### 🎯 User Interface

- ✅ **Responsive Design** - Works on all devices (mobile, tablet, desktop)
- ✅ **Dark Theme** - Eye-friendly default design
- ✅ **Smooth Animations** - Fluid transitions & micro-interactions
- ✅ **Real-time Updates** - Live message delivery with Socket.io
- ✅ **Loading States** - Beautiful skeleton loaders
- ✅ **Toast Notifications** - User feedback & alerts

### 💬 Chat Features

- ✅ **Instant Messaging** - Real-time message delivery
- ✅ **Conversation History** - Chat persistence
- ✅ **Contact List** - View all contacts
- ✅ **Online Status** - See who's online
- ✅ **Message Search** - Find conversations
- ✅ **Notification Sounds** - Audio alerts for new messages

### 👤 User Management

- ✅ **Authentication** - Secure login/signup
- ✅ **Profile Customization** - Upload profile pictures
- ✅ **User Search** - Find & add contacts
- ✅ **Session Management** - Automatic logout
- ✅ **Protected Routes** - Auth-gated pages

### 🎨 UI Components

- ✅ **Responsive Layout** - Sidebar + chat area
- ✅ **Message Groups** - Date-separated messages
- ✅ **Profile Cards** - User information display
- ✅ **Input Fields** - Message input with emoji
- ✅ **404 Page** - Professional error page
- ✅ **Loading Pages** - Skeleton loading states

---

## 🛠️ Tech Stack

```
Framework:     React 19.2.5
Language:      TypeScript 6.0+
Build Tool:    Vite 8.0+
State:         Zustand 5.0.12
Styling:       Tailwind CSS 3 + DaisyUI 4
HTTP Client:   Axios 1.15.2
Real-time:     Socket.io-client 4.8.1
Routing:       React Router 7.14+
Icons:         Lucide React 1.14+
Notifications: React Toastify 11.1+
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/                    # Reusable UI components
│   │   ├── ActiveTabSwitch.tsx
│   │   ├── AnimatedBorderContainer.tsx
│   │   ├── ChatContainer.tsx          # Message display area
│   │   ├── ChatHeader.tsx             # Chat top bar
│   │   ├── ChatList.tsx               # Conversations list
│   │   ├── ContactList.tsx            # All contacts
│   │   ├── Layout.tsx                 # Main layout wrapper
│   │   ├── MessageInput.tsx           # Message compose area
│   │   ├── MessageLoadingSkeleton.tsx
│   │   ├── NoChatHistory.tsx
│   │   ├── NoChatsFound.tsx
│   │   ├── NoConversationPlaceholder.tsx
│   │   ├── ProfileHeader.tsx          # User profile section
│   │   ├── ProtectedAuthRoute.tsx     # Auth route guard
│   │   ├── ProtectedRoute.tsx         # General route guard
│   │   └── UserLoadingSkeleton.tsx
│   │
│   ├── pages/                         # Page components
│   │   ├── ChatPage.tsx               # Main chat interface
│   │   ├── LoadingPage.tsx            # Initial loading state
│   │   ├── LoginPage.tsx              # User login
│   │   ├── NotFoundPage.tsx           # 404 error page
│   │   └── SignupPage.tsx             # User registration
│   │
│   ├── store/                         # Zustand state stores
│   │   ├── useAuthStore.ts            # Auth state + Socket init
│   │   ├── useChatStore.ts            # Chat & messages state
│   │   └── useUserProfile.ts          # User profile state
│   │
│   ├── hooks/                         # Custom React hooks
│   │   └── useKeyboardSound.ts
│   │
│   ├── utils/                         # Utility functions
│   │   └── formatDate.ts              # Date formatting
│   │
│   ├── config/                        # App configuration
│   │   └── axios.ts                   # Axios interceptors & setup
│   │
│   ├── types.ts                       # TypeScript type definitions
│   ├── App.tsx                        # App root component
│   ├── index.css                      # Global styles
│   └── main.tsx                       # React entry point
│
├── public/                            # Static assets
│   ├── images/                        # Image files
│   └── sounds/                        # Notification sounds
│
├── index.html                         # HTML entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── postcss.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **npm/yarn/pnpm**
- **Bun** (optional, for faster package management)
- **Backend server** running on `http://localhost:5000`

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

**Frontend runs on:** `http://localhost:5173`

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

---

## 🔌 State Management with Zustand

### useAuthStore - Authentication & Socket

```typescript
{
  user: User | null,
  isAuthenticated: boolean,
  socket: Socket | null,
  isLoading: boolean,
  signup: (email, password, username) => Promise
  login: (email, password) => Promise
  logout: () => void
  connectSocket: () => void
  disconnectSocket: () => void
}
```

### useChatStore - Messages & Conversations

```typescript
{
  messages: Message[],
  selectedUser: User | null,
  chats: Conversation[],
  contacts: User[],
  onlineUsers: string[],
  activeTab: 'chats' | 'contacts',
  addMessage: (message) => void
  fetchMessages: (userId) => void
  fetchChats: () => void
  subscribeToMessages: () => void
  searchContacts: (query) => Promise
}
```

### useUserProfile - User Information

```typescript
{
  profile: User | null,
  isLoading: boolean,
  error: string | null,
  fetchProfile: (userId) => Promise
  updateProfile: (data) => Promise
}
```

---

## 🔌 Socket.io Integration

### Connection Flow

```javascript
// In useAuthStore.ts
const connectSocket = () => {
  const socket = io(SOCKET_URL, {
    withCredentials: true, // Send cookies
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on("newMessage", (message) => {
    // Handle incoming message
    addMessage(message);
  });

  socket.on("getOnlineUsers", (users) => {
    // Update online status
    setOnlineUsers(users);
  });
};
```

### Real-time Message Delivery

```
User Types & Sends
    ↓
MessageInput → API call to /api/messages/send/:id
    ↓
Optimistic UI update (immediate display)
    ↓
Backend saves to MongoDB
    ↓
Backend emits via Socket.io to recipient
    ↓
useChatStore listener receives 'newMessage'
    ↓
Zustand state updates
    ↓
ChatContainer re-renders with new message
    ↓
Real-time update ✨
```

---

## 🎨 Key Components

### ChatContainer

Displays all messages in a conversation with date separators.

```typescript
<ChatContainer
  messages={messages}
  selectedUser={selectedUser}
  currentUser={user}
/>
```

### MessageInput

Compose and send messages with image upload.

```typescript
<MessageInput
  selectedUser={selectedUser}
  onSend={(message, image?) => {}}
/>
```

### ChatList

Display all conversations with last message preview.

```typescript
<ChatList
  chats={chats}
  onSelectChat={(user) => {}}
  selectedUser={selectedUser}
/>
```

### ContactList

Browse all users and start new conversations.

```typescript
<ContactList
  contacts={contacts}
  onlineUsers={onlineUsers}
  onSelectContact={(user) => {}}
/>
```

---

## 📡 API Integration

### Axios Configuration

```typescript
// config/axios.ts
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Include cookies
  timeout: 10000,
});

// Auto-attach JWT from cookies
axiosInstance.interceptors.request.use((config) => {
  return config;
});
```

### Example API Call

```typescript
// Get all conversations
const { data } = await axiosInstance.get('/messages/chats')

// Send message
const { data } = await axiosInstance.post(
  `/messages/send/${userId}`,
  { message: 'Hello!', image?: imageUrl }
)

// Search contacts
const { data } = await axiosInstance.get(
  `/users/search?q=john`
)
```

---

## 🎯 Routing

```typescript
// App-level routes
/ → ChatPage (protected)
/signup → SignupPage
/login → LoginPage
/404 → NotFoundPage
/* → NotFoundPage (catch-all)

// Protected routes require authentication
// Auth routes redirect to login if already authenticated
```

---

## 🎨 Styling with Tailwind + DaisyUI

```typescript
// Example component styling
<div className="flex flex-col h-screen bg-base-200">
  <header className="navbar bg-base-300">
    <h1 className="text-2xl font-bold text-primary">Chatify</h1>
  </header>

  <main className="flex-1 overflow-y-auto p-4">
    <div className="chat chat-start">
      <div className="chat-bubble">Hello!</div>
    </div>
  </main>
</div>
```

---

## 📱 Responsive Design

**Mobile First Approach**

- Sidebar collapses on mobile
- Full-width chat on small screens
- Touch-friendly buttons & inputs
- Optimized for all viewport sizes

```typescript
// Responsive classes
<div className="hidden md:block lg:w-1/3">  {/* Desktop only */}
<div className="block md:hidden">            {/* Mobile only */}
<div className="w-full md:w-2/3 lg:w-1/2">  {/* Responsive width */}
```

---

## 🔐 Authentication Flow

```
1. User enters email & password
2. Submits to /api/auth/signup or /api/auth/login
3. Backend returns JWT in HTTP-only cookie
4. Frontend stores auth state in Zustand
5. useAuthStore.connectSocket() initializes Socket.io
6. Cookies sent with socket handshake
7. Socket authenticated ✅
8. Can now receive real-time messages
```

---

## 🧪 Development Tips

### Hot Module Replacement (HMR)

```typescript
// Vite auto-reloads on file changes
// No manual refresh needed during development
```

### React DevTools

```bash
# Install React DevTools browser extension
# Inspect component hierarchy & state
```

### Network Tab

```typescript
// Monitor API calls in browser DevTools
// Check headers, cookies, response status
```

---

## 📦 Available Scripts

```bash
# Development server with HMR
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# ESLint validation
npm run lint

# Fix ESLint issues
npm run lint --fix
```

---

## 🐛 Common Issues

| Issue                  | Solution                                         |
| ---------------------- | ------------------------------------------------ |
| Socket not connecting  | Ensure backend is running on :5000               |
| Messages not appearing | Check socket connection in DevTools              |
| CSS not loading        | Clear cache: `npm run build`                     |
| Cookies not sent       | Verify `withCredentials: true` in axios & socket |
| State not updating     | Check Zustand subscription in components         |

---

## 🚀 Performance Optimizations

- ⚡ **React Compiler** - Automatic re-render optimization
- ⚡ **Lazy Loading** - Route-based code splitting
- ⚡ **Vite** - Fast dev server & optimized builds
- ⚡ **Zustand** - Selective state subscriptions
- ⚡ **Memoization** - useMemo for expensive calculations
- ⚡ **Image Optimization** - Cloudinary compression

---

## 🤝 Contributing

```bash
# Fork repository
git clone https://github.com/YOUR_USERNAME/NK-chatify-web.git

# Create feature branch
git checkout -b feature/YourFeature

# Make changes & commit
git commit -m 'Add YourFeature'

# Push to branch
git push origin feature/YourFeature

# Open Pull Request
```

---

#

## 👨‍💻 Author

**Nikhil Randhawa**  
Frontend Developer | Full-stack JavaScript  
GitHub: [@nikhil969rockss](https://github.com/nikhil969rockss)

---

<div align="center">

**Made with ❤️ using React + Vite + Tailwind**

</div>

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
