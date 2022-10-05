import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';
import TaskDetails from './components/TaskDetails';
import { AuthContextProvider } from './contexts/AuthContext';
import Signup from './components/SignUp';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import { UserAuth } from './contexts/AuthContext';
import { db } from './firebase';
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

function App() {
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const { user } = UserAuth();
  const tasksRef = collection(db, 'tasks');
  const tasksQuery = query(
    collection(db, 'tasks'),
    where('reminder', '==', true)
  );

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
      setLoading(false);
    };
    const getAddState = () => {
      if (localStorage.getItem('showAdd')) {
        setShowAddTask(localStorage.getItem('showAdd') === 'true');
      }
    };

    getTasks();
    getAddState();
  }, []);

  //Toggle Add
  const toggleAdd = () => {
    localStorage.setItem('showAdd', `${!showAddTask}`);
    setShowAddTask(localStorage.getItem('showAdd') === 'true');
  };

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await getDocs(tasksRef);
    const data = [];
    res.forEach(doc => {
      data.push(doc.data());
    });

    return data;
  };

  //Fetch Task
  const fetchTask = async id => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Task
  const addTask = async task => {
    /* const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]); */
  };

  // Delete Task
  const deleteTask = async id => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });

    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async id => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <div className='container'>
      <Header toggleAdd={toggleAdd} showAdd={showAddTask} />
      <AuthContextProvider>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                {showAddTask && <AddTask onSave={addTask} />}
                {loading ? (
                  <h3>Loading....</h3>
                ) : tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks to show'
                )}
              </ProtectedRoute>
            }
          />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/about' element={<About />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Routes>
      </AuthContextProvider>
      {location.pathname !== '/about' && <Footer />}
    </div>
  );
}

export default App;
