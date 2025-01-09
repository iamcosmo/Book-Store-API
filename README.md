# 📚 Book Store API

A RESTful **Book Store API** built using **Node.js**, **Express**, **MongoDB**, and **Redis** for efficient book management with caching and rate-limiting features. The API also includes **Role-Based Access Control (RBAC)** for secure endpoint access and **Mock Redis** for testing environments.

---

## 📖 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
   - [Forking and Cloning](#forking-and-cloning)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [API Endpoints](#api-endpoints)
7. [Redis & Mock Redis Integration](#redis--mock-redis-integration)
8. [Testing](#testing)
9. [Example Responses](#example-responses)
10. [Project Structure](#project-structure)
11. [License](#license)

---

## 🧩 Overview

The **Book Store API** allows users to manage book records with the following features:

- ✅ Perform **CRUD** operations (Create, Read, Update, Delete) for books.
- ✅ **Redis Caching** for faster responses.
- ✅ **Rate Limiting** to prevent API abuse.
- ✅ **Role-Based Access Control (RBAC)** for Admin and User roles.
- ✅ **Mock Redis Integration** for testing without a live Redis server.

---

## 🎯 Features

- 📌 **CRUD Operations**: Manage books with Create, Read, Update, and Delete functionality.
- 🚀 **Redis Caching**: Speeds up data retrieval and reduces database load.
- 📊 **MongoDB Integration**: Persistent data storage for books.
- 🔒 **RBAC**: Secure API endpoints with Admin/User role access.
- ⚡ **Rate Limiting**: Limits the number of requests per minute for each user.
- 🧪 **Mock Redis**: Simulate Redis in testing environments.

---

## 💡 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **Redis & Mock Redis**
- **JWT for Authentication**
- **Jest for Testing**

---

## 🚀 Getting Started

### 📥 Forking and Cloning

1. Go to the [GitHub Repository](https://github.com/iamcosmo/Book-Store-API.git).
2. **Fork** the repository to your GitHub account.
3. Clone the forked repository:
   ```bash
   git clone https://github.com/iamcosmo/Book-Store-API.git
   cd Book_Store_Api
   ```

### 📦 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis Server](https://redis.io/)

### 📦 Installation

1. Install project dependencies:
   ```bash
   npm install
   ```
2. Ensure **MongoDB** and **Redis** servers are running.
3. Start the application:
   ```bash
   npm start
   ```
4. The server will run at: `http://localhost:3000`

---

## 📑 Environment Variables

Create a `.env` file in the root directory with the following:

```plaintext
PORT=3000
MONGODB_URL=mongodb://localhost:27017/bookAPI
REDIS_URL=redis://localhost:6380
NODE_ENV=development
JWT_SECRET=GNFNFN2323DSJ3E2DN29
```

---

## 📡 API Endpoints

### 🚪 Public Endpoints

- **Welcome Endpoint:**
  - `GET /`
  - Response:
    ```json
    { "status": 200, "message": "Books Store View" }
    ```

### 📚 Book Endpoints (Protected)

| **Method** | **Endpoint** | **Description**     | **Role Required** |
| ---------- | ------------ | ------------------- | ----------------- |
| `GET`      | `/books`     | Retrieve all books  | Admin/User        |
| `POST`     | `/books`     | Create a new book   | Admin             |
| `PUT`      | `/books/:id` | Update a book by ID | Admin             |
| `DELETE`   | `/books/:id` | Delete a book by ID | Admin             |

---

## 🗃️ Redis & Mock Redis Integration

### **Redis Caching**

- **Purpose:** Speeds up response time and reduces database queries.
- **Configuration:** Handled using `redis` npm package.

### **Mock Redis for Testing**

- **Purpose:** Simulates Redis behavior during testing without an actual Redis server.
- **Use Case:** Useful for CI/CD pipelines and local tests.
- **Library:** `ioredis-mock`

---

## ✅ Testing

### 📦 Running Tests

```bash
npm test -- --detectOpenHandles
```

- **Unit Tests:** Check individual functions.
- **Integration Tests:** Validate endpoint responses and caching behavior.
- **Mock Redis:** Used during tests for simulating cache operations.

---

## 📊 Example Responses

### ✅ Fetch Books (Database)

```json
{
  "status": 200,
  "source": "database",
  {
    "book": [
        {
            "_id": "677fec7fc3ea1cf1283f69c4",
            "title": "Wednessday adams",
            "topic": "Thriller,comedy",
            "summary": "The adventuresd of Wednessday adams and the thing",
            "createdAt": "2025-01-09T15:34:23.122Z",
            "updatedAt": "2025-01-09T15:34:23.122Z",
            "__v": 0
        },
        {
            "_id": "678000f89668fa82d146e6f7",
            "title": "To Sir WIth Love",
            "topic": "Autobiography",
            "summary": "Idealistic engineer-trainee and his experiences in teaching a group of rambunctious white high school students from the slums of London's East End.",
            "createdAt": "2025-01-09T17:01:44.347Z",
            "updatedAt": "2025-01-09T17:01:44.347Z",
            "__v": 0
        }
    ],
    "message": "Books Store View"
}
}
```

### ✅ Fetch Books (Cache)

```json
{
  "status": 200,
  "source": "cache",
  "book": [
        {
            "_id": "677fec7fc3ea1cf1283f69c4",
            "title": "Wednessday adams",
            "topic": "Thriller,comedy",
            "summary": "The adventuresd of Wednessday adams and the thing",
            "createdAt": "2025-01-09T15:34:23.122Z",
            "updatedAt": "2025-01-09T15:34:23.122Z",
            "__v": 0
        },
    ]
}
```

---


## 📂 Project Structure

```plaintext
📦 Book_Store_Api
│── 📂 __mocks__     # Mocks tests
│── 📂 db            # MongoDB connection file 
│── 📂 controllers   # Route Handlers
│── 📂 models        # Mongoose Models
│── 📂 middlewares   # Middlewares for auth and cache
│── 📂 routes        # API Route Definitions
│── 📂 tests         # Unit & Integration Tests
├── 📄 index.js          # Main Entry Point
├── 📄 jest.config.js    # Jest config file
├── 📄 package.json      # Dependencies & Scripts
├── 📄 package-lock.json # Dependencies & Scripts
├── 📄 .gitignore        # contains files / folders to ignore
├── 📄 README.md         # Project Documentation
└── 📄 .env              # Environment Variables
```

---

## 📜 License

This project is licensed under the **MIT License**.

---

🎯 **Contributions Welcome!**  
Feel free to open issues or submit pull requests. 😊

---
