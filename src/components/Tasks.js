const tasks = [
    {
        id: 1,
        name: 'mostafa',
    },
    {
        id: 2,
        name: 'mariam',
    },
    {
        id: 3,
        name: 'soha',
    }
]

const Tasks = () => {
  return (
    <>
        {tasks.map((task) => (
            <h3 key={task.id}>{task.name}</h3>
        )
        )}
    </>
  )
}

export default Tasks