import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const angle = Math.floor(Math.random() * 11) - 5; // Random angle between -5 and 5 degrees
      setTasks([...tasks, { id: Date.now(), message, urgency, angle }]);
      setMessage('');
      setUrgency('medium');
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  useEffect(() => {
    // Reapply random angles when tasks change
    const stickyNotes = document.querySelectorAll('.sticky-note');
    stickyNotes.forEach((note, index) => {
      note.style.setProperty('--rotate', `${tasks[index].angle}deg`);
    });
  }, [tasks]);

  return (
    <div className="App">
      <h1>to do stickies!</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="message">enter your task:</label>
            <input
              id="message"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="urgency">urgency:</label>
            <select
              id="urgency"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>
          <button type="submit">add task</button>
        </form>
      </div>
      
      <div className="sticky-container">
        {tasks.map((task) => (
          <div key={task.id} className={`sticky-note ${task.urgency}`} style={{ '--rotate': `${task.angle}deg` }}>
            <div className="sticky-content">
              <p>{task.message}</p>
              <span className="urgency-label">{task.urgency}</span>
            </div>
            <div className="sticky-footer">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  onChange={() => handleDelete(task.id)}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
