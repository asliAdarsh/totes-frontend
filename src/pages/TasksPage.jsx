import React, { useState, useEffect } from 'react';
import { Plus, ListTodo } from 'lucide-react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api';
import TodoItem from '../components/TodoItem';

function TasksPage() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    try {
      await createTodo({ title, notes, completed: false });
      setTitle('');
      setNotes('');
      fetchTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleToggle = async (todo) => {
    try {
      await updateTodo(todo.id, { ...todo, completed: !todo.completed });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="page-content">
      <section className="glass-panel" style={{ marginBottom: '2rem' }}>
        <form className="todo-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title">Task Title</label>
            <input 
              id="title"
              type="text" 
              placeholder="What needs to be done?" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea 
              id="notes"
              placeholder="Add any extra details or steps..." 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button type="submit" className="btn success" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
            <Plus size={20} /> Add Task
          </button>
        </form>
      </section>

      <section className="todo-list">
        {todos.length === 0 ? (
          <div className="glass-panel empty-state">
            <ListTodo size={48} />
            <h3>No tasks yet</h3>
            <p>Add a task above to get started!</p>
          </div>
        ) : (
          todos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </section>
    </div>
  );
}

export default TasksPage;
