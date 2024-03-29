Description:

This is a full-stack web application built using Node.js, Express.js, Prisma, React, and TypeScript. It provides a seamless experience for users to interact with the backend services and frontend interface.

Features:

Backend:

Built with Node.js and Express.js for handling server-side logic and API endpoints.
Utilizes Prisma as an ORM for interacting with the PostgreSQL database.

Frontend:

Developed with React for building a dynamic and responsive user interface.
Axios is used for making HTTP requests to the backend API.

Database:

PostgreSQL database is used to store and manage application data.
pgAdmin is utilized as the database management tool.

Installation

1.Clone the repository:
git clone https://github.com/YaelMetz1/Hadasim4.git

2.Install dependencies:

# Navigate to the backend directory
cd server
npm install

# Navigate to the frontend directory
cd client
npm install

3.Database setup:

Make sure you have PostgreSQL installed and running.
Set up your database connection details in the backend's .env file.

4.Start the backend server:
# Navigate to the backend directory
cd server
npx ts-node src/index.ts

5.Start the frontend development server:
# Navigate to the frontend directory
cd client
npm start

6.Accessing the application:

Once both the backend server and frontend development server are running, you can access the application by visiting http://localhost:3000 in your web browser.
