# Notion 📝

## Description
Notion is a web application that enables users to create, delete, and edit their notes. Utilizing Redux for state management, the app ensures a predictable and efficient way to handle the application's state, making it easy to manage and synchronize data across components. 🌟

## Routes
The application has the following routes:

- **Home:** `/` 🏠
- **Registration:** `/registration` ✍️
- **Log In:** `/log-in` 🔑
- **Notes:**
  - **All notes:** `/notes` 📒
  - **Create Note:** `/notes/create` ➕
  - **Edit Note:** `/notes/edit/:id` ✏️
  - **Show Note:** `/notes/:id` 📄

## Technologies Used
- **React**
- **TypeScript**
- **Redux**
- **React Hook Form**
- **Zod**
- **React Router**
- **json-server**

## Instructions for Running
To run the project, execute the following commands:

1. Install dependencies:
   ```bash
   pnpm i
   ```
2. Start the application in development mode:
   ```bash
   pnpm dev
   ```
3. Start the database:
   ```bash
   pnpm dev:db
   ```
