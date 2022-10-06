import ProtectedRoute from './ProtectedRoute';
import Button from './Button';
import AddTask from './AddTask';
import Tasks from './Tasks';
const Home = ({
  tasks,
  addTask,
  showAddTask,
  signOut,
  loading,
  setTasks,
  onDelete,
}) => {
  return (
    <ProtectedRoute>
      {showAddTask && (
        <AddTask onSave={addTask} tasks={tasks} setTasks={setTasks} />
      )}
      {loading ? (
        <h3>Loading....</h3>
      ) : tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={onDelete} />
      ) : (
        'No Tasks to show'
      )}
      <Button color='blue' text='log out' onClick={signOut} />
    </ProtectedRoute>
  );
};

export default Home;
