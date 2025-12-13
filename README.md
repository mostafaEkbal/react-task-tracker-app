# React Task Tracker App

A modern, feature-rich task management application built with React and Firebase. Track your daily tasks, set reminders, and stay organized with a beautiful, responsive interface.

## ✨ Features

- **User Authentication**: Secure sign-up and sign-in using Firebase Authentication
- **Task Management**: Create, view, update, and delete tasks
- **Reminder System**: Set reminders for important tasks
- **Task Details**: View detailed information for each task
- **Protected Routes**: Secured pages accessible only to authenticated users
- **Real-time Updates**: Tasks sync in real-time with Firebase Firestore
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Custom Styling**: Beautiful UI with SASS/SCSS styling

## 🚀 Tech Stack

- **Frontend**: React 18.2.0
- **Routing**: React Router DOM v6
- **Authentication**: Firebase Authentication v9
- **Database**: Firebase Firestore
- **Styling**: SASS/SCSS
- **Icons**: React Icons
- **Development Server**: JSON Server (for local development)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- A Firebase account and project

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mostafaEkbal/react-task-tracker-app.git
   cd react-task-tracker-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase configuration

4. **Configure environment variables**
   - Create a `.env` file in the root directory
   - Add your Firebase configuration:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

## 🎯 Available Scripts

### Development

**Start the React app**
```bash
npm start
```
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

**Start the JSON server** (for local development)
```bash
npm run server
```
Runs a mock API server on port 5000

### Testing

```bash
npm test
```
Launches the test runner in interactive watch mode

### Production

```bash
npm run build
```
Builds the app for production to the `build` folder with optimized performance

## 📁 Project Structure

```
react-task-tracker-app/
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   │   ├── About.jsx
│   │   ├── AddTask.js
│   │   ├── Button.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── Home.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   ├── Task.js
│   │   ├── TaskDetails.jsx
│   │   └── Tasks.js
│   ├── contexts/        # React Context for state management
│   │   └── AuthContext.js
│   ├── sass/            # SCSS styling files
│   │   ├── base.scss
│   │   └── main.scss
│   ├── App.js           # Main application component
│   ├── index.js         # Application entry point
│   └── index.css        # Global styles
├── db.json              # Mock database for JSON server
├── package.json         # Dependencies and scripts
└── README.md           # Project documentation
```

## 🔐 Authentication Flow

1. Users can sign up with email and password
2. After authentication, users are redirected to the home page
3. Protected routes ensure only authenticated users can access task management features
4. Users can log out at any time

## 💾 Database Structure

Tasks are stored in Firebase Firestore with the following structure:
```javascript
{
  text: "Task description",
  day: "Date and time",
  reminder: true/false,
  uid: "user_id",
  id: "task_id"
}
```

## 🎨 Styling

The app uses SASS/SCSS for styling, providing:
- Modular and maintainable CSS
- Variables for consistent theming
- Responsive design patterns
- Custom component styles

## 📝 Usage

1. **Sign Up**: Create a new account with your email and password
2. **Sign In**: Log in to access your tasks
3. **Add Task**: Click the "Add" button to create a new task
4. **Toggle Reminder**: Double-click a task to toggle its reminder status
5. **Delete Task**: Click the delete icon to remove a task
6. **View Details**: Click on a task to view its details
7. **Log Out**: Use the logout button to sign out

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Mostafa Ekbal**
- GitHub: [@mostafaEkbal](https://github.com/mostafaEkbal)

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- Firebase by [Google](https://firebase.google.com/)

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Made with ❤️ by Mostafa Ekbal
