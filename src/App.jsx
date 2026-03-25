import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ListTodo, StickyNote } from 'lucide-react';
import TasksPage from './pages/TasksPage';
import NotesPage from './pages/NotesPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="header">
          <h1>Totes: Task & Notes Master</h1>
          <p>A beautiful way to manage your life.</p>
        </header>

        <nav className="top-nav glass-panel">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          >
            <ListTodo size={20} />
            <span>Tasks</span>
          </NavLink>
          <NavLink 
            to="/notes" 
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          >
            <StickyNote size={20} />
            <span>Standalone Notes</span>
          </NavLink>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/notes" element={<NotesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
