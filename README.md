# Contact Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing contacts with features like pagination, sorting, and CRUD operations.

## Features

- Create, Read, Update, and Delete contacts
- Responsive Material-UI design
- Sortable columns
- Pagination
- Inline editing
- Real-time updates
- Form validation
- Animated transitions

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- Framer Motion for animations
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/contact-management.git
cd contact-management
```
2.Install Backend Dependencies
```
cd backend
npm install
```
3.Install Frontend Dependencies
```
cd frontend
npm install
```
4.Create a .env file in the backend directory
```
PORT=8080
MONGODB_URI=mongodb://localhost:27017/contact_management
```

##starting project
###Start the Backend Server
```
cd backend
npm start
```

###Start the Frontend Development Server
```
cd frontend
npm run dev
```

###The application should now be running on:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8080](http://localhost:8080)

## API Endpoints

- GET `/api/contacts` - Get all contacts (with pagination and sorting)
- POST `/api/contacts` - Create a new contact
- PUT `/api/contacts/:id` - Update a contact
- DELETE `/api/contacts/:id` - Delete a contact

  ## Challenges Faced and Solutions

 **Pagination Implementation**

1. Challenge: Implementing efficient pagination with MongoDB
2. Solution: Used MongoDB's skip() and limit() methods along with proper indexing for better performance


**Real-time Updates**

1. Challenge: Keeping the UI in sync with database changes
2. Solution: Implemented a refresh mechanism after CRUD operations


 **Form Validation**

1. Challenge: Maintaining consistent validation between frontend and backend
2. Solution: Used Mongoose schemas for backend validation and Material-UI's built-in validation for frontend





**CORS Issues**

1. Challenge: Cross-Origin Resource Sharing issues during development
2. Solution: Properly configured CORS middleware in Express


This project is licensed under the MIT License - see the LICENSE file for details.
