import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const API_URL = 'https://jsonplaceholder.typicode.com/todos';


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setTasks(response.data))
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = {
        userId: 1,
        title: newTask,
        completed: false,
      };
      axios.post(API_URL, newTaskObject)
        .then(response => {
          setTasks([...tasks, response.data]);
          setNewTask('');
        })
    }
  };

  const deleteTask = (taskId) => {
    axios.delete(`${API_URL}/${taskId}`)
      .then(() => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
      })
  };

  const editTask = (taskId, newTitle) => {
    axios.patch(`${API_URL}/${taskId}`, { title: newTitle })
      .then(response => {
        const updatedTasks = tasks.map(task => (task.id === taskId ? response.data : task));
        setTasks(updatedTasks);
      })
  };

  return (
    <div className="form">
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className='form'>
        {tasks.map(task => (
          <li key={task.id}>
            <span>{task.title}</span>
            <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
            <button className='edit'onClick={() => editTask(task.id, prompt('Enter a new title:', task.title))}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
