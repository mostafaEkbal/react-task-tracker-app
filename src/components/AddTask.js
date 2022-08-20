import { useState } from "react"

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSumbit = (e) => {
        e.preventDefault()

        if(!text) {
            alert('please add a task');
            return
        }

        onAdd({ text, day, reminder });

        setText('')
        setDay('')
        setReminder(false)
    }

  return (
    <form className="add-form" >
        <div className="form-control">
            <label>Task</label>
            <input type="text" placeholder='Add Task' value={text}
             onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="form-control">
            <label>Day & time</label>
            <input type="text" placeholder='Add Task' value={day}
             onChange={(e) => setDay(e.target.value)} />
        </div>
        <div className="form-control form-control-check">
            <label>Set Reminder</label>
            <input type="checkbox" checked={reminder} value={reminder}
             onChange={(e) => setReminder(e.currentTarget.checked)} />
        </div>

        <button className='btn btn-block' onClick={onSumbit}>Save Task</button>
    </form>
  )
}

export default AddTask