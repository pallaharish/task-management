import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Fetch tasks from the API
    axios.get(API_URL)
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      // Create a new task object
      const newTaskObject = {
        userId: 1,
        title: newTask,
        completed: false,
      };

      // Send a POST request to the API to add a new task
      axios.post(API_URL, newTaskObject)
        .then(response => {
          // Update the tasks state with the new task from the API response
          setTasks([...tasks, response.data]);

          // Clear the input field
          setNewTask('');
        })
        .catch(error => console.error('Error adding task:', error));
    }
  };

  const deleteTask = (taskId) => {
    // Send a DELETE request to the API to delete the task with the given ID
    axios.delete(`${API_URL}/${taskId}`)
      .then(() => {
        // Filter out the deleted task from the tasks state
        const updatedTasks = tasks.filter(task => task.id !== taskId);

        // Update the tasks state
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const editTask = (taskId, newTitle) => {
    // Send a PATCH request to the API to edit the task with the given ID
    axios.patch(`${API_URL}/${taskId}`, { title: newTitle })
      .then(response => {
        // Update the tasks state with the edited task from the API response
        const updatedTasks = tasks.map(task => (task.id === taskId ? response.data : task));
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error editing task:', error));
  };

  return (
    <div className="App">
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

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => editTask(task.id, prompt('Enter a new title:', task.title))}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
