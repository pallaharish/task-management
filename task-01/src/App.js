import { useEffect, useState} from 'react';
import './App.css';

function App() {
  const [data,setdata] = useState([]);
  const [newTask, setNewTask] = useState('');
  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = {
        userId: 1,
        id: data.length + 1,
        title: newTask,
        completed: false,
      };
      setdata([...data, newTaskObject]);

      setNewTask('');
    }
  };
  const deleteTask = (dat)=>{
    const  newData = data.filter((data) => data.id !== dat);
     setdata(newData);

  }
  const editTask = (taskId, newTitle) => {
    const taskToEdit = data.find(task => task.id === taskId);
    console.log(taskToEdit)

    if (taskToEdit) {

      taskToEdit.title = newTitle;


      setdata([...data]);
    }
  };
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/todos").then((data)=> data.json()).then((data)=>setdata(data))
  },[]);
  return (
    <div className='form'>
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className='edit' onClick={addTask}>Add Task</button>
      </div>

      <ol className='form'>
        {data.map(task => (
          <div>
          <li key={task.id}>
            <span>{task.title}</span>
            <button className="delete-button"onClick={() => deleteTask(task.id)}>Delete</button>
            <button className='edit' onClick={() => editTask(task.id, prompt('Enter a new title:', task.title))}>Edit</button>
          
          </li>
          </div>
        ))}
      </ol>
    </div>
  );
}

export default App;
