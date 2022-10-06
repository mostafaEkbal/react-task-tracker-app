import { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import TaskDetails from './components/TaskDetails';
import { AuthContextProvider } from './contexts/AuthContext';
import Signup from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import { UserAuth } from './contexts/AuthContext';
import { auth, db } from './firebase';
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState(0);
  const location = useLocation();
  const { logOut } = UserAuth();
  const tasksRef = collection(db, 'tasks');

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const fetchTasks = async user => {
          const data = await getDocs(
            query(tasksRef, where('uid', '==', user.uid))
          );

          return data.docs.map(doc => {
            return doc.data();
          });
        };

        const getTasks = async () => {
          if (count === 0) {
            const tasksFromServer = await fetchTasks(user);
            setTasks(tasksFromServer);
            setLoading(false);
            setCount(1);
          }
        };
        const getAddState = () => {
          if (localStorage.getItem('showAdd')) {
            setShowAddTask(localStorage.getItem('showAdd') === 'true');
          }
        };

        getTasks();
        getAddState();
      }
    });
  }, [setTasks, setLoading, setShowAddTask, tasksRef, count]);

  //Toggle Add
  const toggleAdd = () => {
    localStorage.setItem('showAdd', `${!showAddTask}`);
    setShowAddTask(localStorage.getItem('showAdd') === 'true');
  };

  //Fetch Tasks

  /* //Fetch Task
  const fetchTask = async id => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  }; */

  // handle log out
  const signOut = async () => {
    try {
      await logOut();
      Navigate('/signIn');
    } catch (e) {
      console.log(e.message);
    }
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
    await deleteDoc(query(tasksRef, where('createdAt', '==', id)));

    setTasks(tasks.filter(task => task.id !== id));
  };
  /*
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
  }; */

  return (
    <div className='container'>
      <Header toggleAdd={toggleAdd} showAdd={showAddTask} />
      <AuthContextProvider>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                tasks={tasks}
                setTasks={setTasks}
                addTask={addTask}
                showAddTask={showAddTask}
                signOut={signOut}
                loading={loading}
                onDelete={deleteTask}
              />
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
