import React, { useReducer } from 'react';
import './increment.css';

const ActionType = {
  TOGGLE_HIDDEN: 'TOGGLE_HIDDEN',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT'
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.TOGGLE_HIDDEN:
      return { ...state, isHidden: !state.isHidden };
    case ActionType.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ActionType.DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const ButtonControls = () => {
  const [state, dispatch] = useReducer(reducer, { isHidden: false, count: 0 });

  const handleToggleHidden = () => {
    dispatch({ type: ActionType.TOGGLE_HIDDEN });
  };

  const handleIncrement = () => {
    dispatch({ type: ActionType.INCREMENT });
  };

  const handleDecrement = () => {
    dispatch({ type: ActionType.DECREMENT });
  };

  return (
    <div className="button-controls">
      <button onClick={handleToggleHidden} className="hidden-button">
        Hidden
      </button>
      {!state.isHidden && (
        <div>
          <div className="count-display">Count: {state.count}</div>
          <button onClick={handleIncrement} className="increment-button">
            Increment
          </button>
          <button onClick={handleDecrement} className="decrement-button">
            Decrement
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonControls;
