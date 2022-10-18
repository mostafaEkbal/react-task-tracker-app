import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { UserAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

const AddTask = ({ onSave, setTasks, tasks }) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [reminder, setReminder] = useState(false);
  const { user } = UserAuth();

  const tConvert = time => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  };

  const addTask = async e => {
    e.preventDefault();
    const taskRef = collection(db, 'tasks');
    const data = {
      uid: user.uid,
      text: text,
      day: day,
      time: tConvert(time),
      reminder: reminder,
      createdAt: serverTimestamp(),
    };
    reminderCheck(data);
    const docAdded = await addDoc(taskRef, data);
    setTasks([...tasks, { ...data, id: docAdded.id }]);
    setText('');
    setDay('');
    setTime('');
    setReminder(false);
  };

  const reminderCheck = data => {
    if (reminder) {
      Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
          const notification = new Notification(
            `(${text}) Task has been created`,
            {
              body: `You will get a reminder on ${day} at ${tConvert(time)}`,
              data: data,
              tag: 'task reminder',
            }
          );
          notification.addEventListener('error', e => {
            console.log(e);
          });
        }
      });
    }
  };

  /* const onSumbit = e => {
    e.preventDefault();

    if (!text) {
      alert('please add a task');
      return;
    }

    onSave({ text, day, reminder });

    setText('');
    setDay('');
    setReminder(false);
  }; */

  return (
    <form className='add-form'>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          placeholder='Add Task'
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Day</label>
        <input type='date' value={day} onChange={e => setDay(e.target.value)} />
      </div>
      <div className='form-control'>
        <label>Time</label>
        <input
          type='time'
          value={time}
          onChange={e => setTime(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={e => setReminder(e.currentTarget.checked)}
        />
      </div>

      <button className='btn btn-block' onClick={addTask}>
        Save Task
      </button>
    </form>
  );
};

export default AddTask;
