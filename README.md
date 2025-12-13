# 📚 Library Management System – BookBridge

A full-stack **Library Management System** built using **NestJS, Prisma, PostgreSQL** for the backend and **React (TypeScript) + Vite + Tailwind CSS** for the frontend.

The system supports **book management, authors, users, borrowing/returning books**, and **JWT-based authentication**.

---

## 🏗️ Tech Stack

### Backend
- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **JWT Authentication**

### Frontend
- **React (TypeScript)**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Context API**

---

## 📂 Project Structure

```
repo-root/
├── backend/        # NestJS + Prisma backend
├── frontend/       # React (TypeScript) frontend
├── README.md
└── .env.example
```

---

## 🚀 Backend Setup (NestJS + Prisma)

### 1️⃣ Install dependencies
```bash
cd backend
npm install
```

---

### 2️⃣ Environment variables

Create a `.env` file inside `backend/`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/library_db"
JWT_SECRET="your_jwt_secret"
```

---

### 3️⃣ Run Prisma migrations
```bash
npx prisma migrate dev
```

---

### 4️⃣ Seed the database (if seed exists)
```bash
npx prisma db seed
```

---

### 5️⃣ Start backend server
```bash
npm run start:dev
```

Backend will run on:
```
http://localhost:3000
```

---

## 🧪 Testing Authentication & Protected Routes

### 🔐 Get JWT Token
Use the **Sign In API**:

```http
POST /auth/signin
```

Example body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "JWT_TOKEN_HERE"
}
```

---

### 🔑 Use token in protected routes
Add header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📦 Data Models

This project follows a clear separation between **backend database models** (Prisma) and **frontend TypeScript interfaces**, ensuring consistency and type safety across the application.

---

## 🗄️ Backend Data Models (Prisma ORM)

The backend uses **NestJS + Prisma ORM** with a relational database.  
The core entities are:

- User
- Author
- Book
- BorrowedBook

These models are defined in `schema.prisma` and migrated using Prisma migrations.

---

### 👤 User

Represents an authenticated user who can borrow and return books.

**Fields:**
- `id` – Unique identifier
- `name` – User’s full name
- `email` – Unique email address
- `password` – Hashed password
- `createdAt` – Timestamp of user creation

**Relations:**
- One-to-many relation with `BorrowedBook`

---

### ✍️ Author

Represents a book author.

**Fields:**
- `id` – Unique identifier
- `name` – Author name
- `bio` – Short biography
- `createdAt` – Timestamp
- `updatedAt` – Timestamp

**Relations:**
- One-to-many relation with `Book`

---

### 📚 Book

Represents a book in the library.

**Fields:**
- `id` – Unique identifier
- `title` – Book title
- `description` – Book description
- `genre` – Book genre
- `isbn` – Optional ISBN
- `isBorrowed` – Boolean indicating whether the book is currently borrowed
- `authorId` – Foreign key referencing Author
- `createdAt` – Timestamp
- `updatedAt` – Timestamp

**Relations:**
- Many-to-one relation with `Author`
- One-to-many relation with `BorrowedBook`

---

### 🔁 BorrowedBook

Tracks borrowing history of books by users.

**Fields:**
- `id` – Unique identifier
- `bookId` – Foreign key referencing Book
- `userId` – Foreign key referencing User
- `borrowedAt` – Timestamp when the book was borrowed
- `returnedAt` – Timestamp when the book was returned (nullable)

**Relations:**
- Many-to-one relation with `Book`
- Many-to-one relation with `User`

---

## 💻 Frontend Data Models (TypeScript Interfaces)

The frontend is built using **React + TypeScript**.  
API responses are strongly typed using interfaces to ensure reliability and maintainability.

---

### 📘 Book Interface

```typescript
export interface Book {
  id: number
  title: string
  description: string
  genre: string
  isBorrowed: boolean
  author: {
    id: number
    name: string
  }
}

```ts
export interface Author{
    id : number,
    name:string,
    bio : string
}



## 📌 Backend API Endpoints

### 📘 Books
- `POST /books` – Add new book
- `PUT /books/:id` – Update book
- `DELETE /books/:id` – Delete book
- `GET /books` – List all books (with filters)

### ✍️ Authors
- `POST /authors`
- `PUT /authors/:id`
- `DELETE /authors/:id`
- `GET /authors`

### 👤 Users
- `GET /users`

### 🔄 Borrowed Books
- `POST /borrowing/borrow` – Borrow a book
- `PATCH /borrowing/return/:id` – Return a book
- `GET /borrowing/user/:userId` – Fetch borrowed books of a user

### 🔐 Authentication
- `POST /auth/signup`
- `POST /auth/signin`

---

## 🎨 Frontend Setup (React + TypeScript)

### 1️⃣ Install dependencies
```bash
cd frontend
npm install
```

---

### 2️⃣ Environment variables

Create `.env` inside `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

---

### 3️⃣ Start frontend
```bash
npm run dev
```

Frontend will run on:
```
http://localhost:5173
```

---

## 🖥️ Frontend Features

- JWT Authentication (Context API)
- Dashboard showing borrowed books
- Books page:
  - List all books
  - Add / Edit / Delete books
  - Borrow book
  - Filter by author & genre
- Authors page:
  - Add / Edit / Delete authors
- Protected routes using token
- Clean UI using Tailwind CSS

---

## 🧠 Design & Architecture Notes

- **Separation of concerns**
  - Backend handles business logic
  - Frontend handles UI & state
- **API response normalization** on frontend
- **JWT stored securely** and accessed via AuthContext
- **Reusable components & modular structure**
- **No Docker used**, everything runs locally

---

## ⚠️ Assumptions

- Single role user system (no admin/user separation yet)
- PostgreSQL is running locally
- Seed data may be optional depending on setup
- Images for books are replaced with icons

---

## 📄 .env.example

```env
# Backend
DATABASE_URL=
JWT_SECRET=


# Frontend
VITE_API_URL=
```

---

## ✅ Submission Checklist

- [x] Backend source code (NestJS + Prisma)
- [x] Frontend source code (React + TypeScript)
- [x] REST APIs for Books, Authors, Users, Borrowing
- [x] JWT Authentication
- [x] README.md
- [x] .env.example

---

## 👨‍💻 Author
**Arshad Jamil**

---

⭐ If you like this project, feel free to star the repository!
