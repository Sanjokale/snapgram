# Snapgram

Snapgram is a feature-rich social media platform that combines the best elements of Facebook and Instagram. Built with the MERN stack, it offers a seamless and interactive user experience.

## 📋 Features

- [x] User Authentication
  - Secure sign-up and login functionality
  - JWT-based authentication
- [x] Profile Management
  - Create and customize user profiles
  - Update profile picture and bio
- [x] Post Creation and Sharing
  - Share photos, videos, and text posts
  - Support for hashtags and mentions
- [x] News Feed
  - Personalized feed of posts from friends and followed accounts
  - Infinite scrolling for seamless browsing
- [x] Interactions
  - Like and comment on posts
  - Share posts to your profile
- [x] Friend/Follow System
  - Send and accept friend requests
  - Follow other users' public profiles
- [x] Direct Messaging
  - Real-time private messaging between users
  - Support for text, emojis, and media sharing
- [x] Notifications
  - Real-time notifications for likes, comments, and messages
  - Email notifications for important updates
- [x] Search Functionality
  - Find users, posts, and hashtags easily
  - Advanced filtering options
- [x] Responsive Design
  - Fully responsive web application for desktop and mobile use

## 🛠️ Technologies Used

- [x] **Frontend**
  - [x] React: Building user interface components
  - [x] Redux: State management for React components
  - [x] React Router: Handling routing in the application
  - [x] RTK Query: Making HTTP requests to the backend
  - [x] Socket.io-client: Real-time, bidirectional communication

- [x] **Backend**
  - [x] Node.js: Runtime environment for the server
  - [x] Express.js: Web application framework for Node.js
  - [x] MongoDB: NoSQL database for storing application data
  - [x] Mongoose: MongoDB object modeling for Node.js
  - [x] Socket.io: Real-time, bidirectional server-side communications

- [x] **Authentication & Security**
  - [x] JSON Web Tokens (JWT): Secure authentication mechanism
  - [x] Bcrypt: Password hashing

- [x] **File Handling**
  - [x] Cloudinary: Cloud storage for images and videos
  - [x] Multer: Handling multipart/form-data for file uploads

- [x] **Development & Deployment**
  - [x] Git: Version control
  - [x] ESLint: JavaScript linting utility
  - [x] Prettier: Code formatter
  - [x] Heroku: Cloud platform for deployment (optional)

## 🚀 Installation and Setup

For detailed installation and setup instructions, please refer to our [Setup Guide](#setup-guide) below.

## 📘 Usage

After setting up and starting the development servers, open your browser and navigate to `http://localhost:3000`. You can now:

- [ ] Create a new account or log in
- [ ] Set up your profile
- [ ] Create your first post
- [ ] Connect with friends
- [ ] Explore the news feed
- [ ] Try out the messaging feature

## 🤝 Contributing

We welcome contributions to Snapgram! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgements

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Socket.io](https://socket.io/)
- [Cloudinary](https://cloudinary.com/)

## 📞 Contact

If you have any questions, feel free to reach out to us at ct9812145@gmail.com

## Setup Guide

This guide will walk you through setting up both the backend and frontend of the Snapgram project.

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the backend root directory and add the following variables:

   ```env
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   ```

   Replace `your-mongodb-uri` with your actual MongoDB connection string and `your-jwt-secret` with a secure random string for JWT encryption.

4. Initialize the database:

   ```bash
   npm run init-db
   ```

   Note: Ensure that you have created an `init-db` script in your `package.json` file that sets up your initial database schema or seeds any necessary data.

5. Start the development server:

   ```bash
   npm run dev
   ```

   This command should start your backend server, typically on `http://localhost:5000` or another specified port.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the frontend root directory and add any necessary variables. For example:

   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```

   This sets the base URL for your API calls to the backend.

4. Start the React development server:

   ```bash
   npm start
   ```

   This will start your frontend application, typically on `http://localhost:3000`.

### Verifying the Setup

1. Backend: Open your browser or use a tool like Postman to make a GET request to `http://localhost:5000/api/` (adjust the port if necessary). You should receive a response indicating that the server is running.

2. Frontend: Open your browser and navigate to `http://localhost:3000`. You should see the Snapgram application running.

3. Full Stack: Try to register a new user or log in with an existing user to verify that the frontend can communicate with the backend successfully.

### Troubleshooting

- If you encounter any issues with MongoDB connection, ensure that your MongoDB server is running and that the connection string in the `.env` file is correct.
- For any missing dependencies, run `npm install` in the respective directories again.
- Check the console output for both backend and frontend for any error messages that might indicate specific issues.

If you continue to face problems, please refer to the project documentation or reach out to the development team for support.

Happy coding! 🚀