import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={task.reminder ? 'task reminder' : 'task'}
      onDoubleClick={() => onToggle(task.createdAt)}>
      <h3>
        {task.text}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
      <p>
        <Link to={`/task/${task.id}`}></Link>
      </p>
    </div>
  );
};

export default Task;
