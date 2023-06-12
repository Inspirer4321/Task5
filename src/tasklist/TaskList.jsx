import React, { useReducer } from 'react';
import './tasklist.css';

function TaskList() {
  const initialState = {
    inputText: '',
    tasks: [],
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'CHANGE_INPUT':
        return { ...state, inputText: action.payload };
      case 'ADD_TASK':
        return {
          ...state,
          inputText: '',
          tasks: [...state.tasks, action.payload],
        };
      case 'REMOVE_TASK':
        return {
          ...state,
          tasks: state.tasks.filter(task => task !== action.payload),
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = e => {
    dispatch({ type: 'CHANGE_INPUT', payload: e.target.value });
  };

  const handleAddTask = () => {
    if (state.inputText.trim() !== '') {
      dispatch({ type: 'ADD_TASK', payload: state.inputText });
    }
  };

  const handleRemoveTask = task => {
    dispatch({ type: 'REMOVE_TASK', payload: task });
  };

  return (
    <div className="task-list">
      <input
        type="text"
        value={state.inputText}
        onChange={handleInputChange}
        placeholder="New task"
        className={`input-field ${state.inputText !== '' ? 'input-field-green' : ''}`}
      />
      <button className={`add-button ${state.inputText !== '' ? 'add-button-green' : ''}`} onClick={handleAddTask}>
        Add
      </button>
      <div className="word-list">
        {state.tasks.map(task => (
          <div key={task} className="word-item">
            <span>{task}</span>
            <button className="remove-button" onClick={() => handleRemoveTask(task)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
