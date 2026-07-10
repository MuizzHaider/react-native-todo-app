# React Native Todo App

A full-stack, cross-platform Todo application built with React Native and Expo. This project demonstrates modern mobile development practices including file-based routing, global state management, and local data persistence.

## 🚀 Features

- **Authentication Flow:** Secure login and signup mock screens with session persistence.
- **Task Management:** Full CRUD operations (Create, Read, Update, Delete) for your tasks.
- **Dynamic Routing:** Built with Expo Router for seamless file-based navigation.
- **State Management:** Utilizes React's Context API to manage global Authentication and Todo state.
- **Local Storage:** Leverages `AsyncStorage` to persist tasks and user sessions across app reloads.
- **Modern UI:** Sleek, dark-mode inspired interface with custom components.

## 🛠️ Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/) (SDK 51+)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [Date-Fns](https://date-fns.org/)

## 📂 Project Structure

This project follows a clean architectural pattern:

```
src/
├── app/                  # File-based routing (Expo Router)
│   ├── (auth)/           # Public routes (Login, Signup)
│   ├── (app)/            # Protected routes (Dashboard, Create, Details, Profile)
│   └── _layout.tsx       # Root layout acting as an Authentication Guard
├── components/           # Reusable UI components (TodoCard)
└── context/              # Global State Management
    ├── AuthContext.tsx   # Manages user session
    └── TodoContext.tsx   # Manages task data
```

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/MuizzHaider/react-native-todo-app.git
cd react-native-todo-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run web
```
*(You can also use `npx expo start` to run it on an iOS/Android simulator or scan the QR code with the Expo Go app).*

## 👨‍💻 Author

Built by Muizz Haider as a React Internship Project.
