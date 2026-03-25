import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, CheckCircle, Circle } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`glass-panel todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="item-header">
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            className="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo)}
          />
        </label>
        
        <div className="item-content" onClick={() => todo.notes && setIsExpanded(!isExpanded)}>
          <span className="item-title">{todo.title}</span>
          
          <div className="item-actions">
            {todo.notes && (
              <button 
                className="btn icon-only" 
                onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                title="Toggle Notes"
              >
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            )}
            <button 
              className="btn icon-only danger" 
              onClick={(e) => { e.stopPropagation(); onDelete(todo.id); }}
              title="Delete Todo"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {isExpanded && todo.notes && (
        <div className="item-notes">
          {todo.notes}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
