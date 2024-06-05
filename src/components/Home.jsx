import ProtectedRoute from './ProtectedRoute';
import PropTypes from 'prop-types';
import Button from './Button';
import AddTask from './AddTask';
import Tasks from './Tasks';
const Home = ({
  tasks,
  showAddTask,
  signOut,
  loading,
  setTasks,
  onDelete,
  onToggle,
}) => {
  return (
    <ProtectedRoute>
      {showAddTask && (
        <AddTask tasks={tasks} setTasks={setTasks} />
      )}
      {loading ? (
        <h3>Loading....</h3>
      ) : tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={onDelete} onToggle={onToggle} />
      ) : (
        'No Tasks to show'
      )}
      <Button color='blue' text='log out' onClick={signOut} />
    </ProtectedRoute>
  );
};

Home.propTypes = {
  tasks: PropTypes.array,
  addTask: PropTypes.func,
  ontoggle: PropTypes.func,
};

export default Home;
