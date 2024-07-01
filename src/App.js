import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]); //array to store all todo items
  const [input, setInput] = useState(''); //new todo input field
  const [editingId, setEditingId] = useState(null); //tracking which todo item is being edited
  const [editInput, setEditInput] = useState(''); //store the text being edited

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, done: false, id: Date.now() }]);
      setInput('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditInput(text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editInput } : todo
    ));
    setEditingId(null);
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'center',
      color: '#333',
    },
    input: {
      width: '70%',
      padding: '10px',
      marginRight: '10px',
      fontSize: '16px',
    },
    addButton: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
    },
    todoList: {
      listStyleType: 'none',
      padding: 0,
    },
    todoItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      margin: '10px 0',
      backgroundColor: '#f1f1f1',
      borderRadius: '5px',
    },
    todoText: {
      flex: 1,
    },
    button: {
      marginLeft: '10px',
      padding: '5px 10px',
      fontSize: '14px',
      cursor: 'pointer',
    },
    editInput: {
      flex: 1,
      marginRight: '10px',
      padding: '5px',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>TODO List</h1>
      <div>
        <input 
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a new task"
        />
        <button style={styles.addButton} onClick={addTodo}>Add</button>
      </div>
      <ul style={styles.todoList}>
        {todos.map(todo => (
          <li key={todo.id} style={styles.todoItem}>
            {editingId === todo.id ? (
              <>
                <input
                  style={styles.editInput}
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button 
                  style={{...styles.button, backgroundColor: '#4CAF50'}}
                  onClick={() => saveEdit(todo.id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span 
                  style={{
                    ...styles.todoText,
                    textDecoration: todo.done ? 'line-through' : 'none'
                  }}
                >
                  {todo.text}
                </span>
                <button 
                  style={{...styles.button, backgroundColor: '#FFA500'}}
                  onClick={() => startEditing(todo.id, todo.text)}
                >
                  Edit
                </button>
                <button 
                  style={{...styles.button, backgroundColor: todo.done ? '#FFA500' : '#4CAF50'}}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.done ? 'Undo' : 'Done'}
                </button>
                <button 
                  style={{...styles.button, backgroundColor: '#f44336'}}
                  onClick={() => removeTodo(todo.id)}
                >
                  Remove
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
