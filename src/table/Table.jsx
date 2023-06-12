import React, { useReducer } from 'react';
import './table.css';

const initialState = {
  words: [
    { id: 1, name: 'Red', status: 'alive' },
    { id: 2, name: 'Blue', status: 'alive' },
    { id: 3, name: 'Purple', status: 'alive' },
    { id: 4, name: 'Green', status: 'alive' },
    { id: 5, name: 'White', status: 'alive' },
    { id: 6, name: 'Pink', status: 'alive' },
    { id: 7, name: 'Orange', status: 'alive' },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'KILL_WORD':
      return {
        ...state,
        words: state.words.map(word =>
          word.id === action.payload ? { ...word, status: 'dead' } : word
        ),
      };
    case 'REVIVE_WORD':
      return {
        ...state,
        words: state.words.map(word =>
          word.id === action.payload ? { ...word, status: 'alive' } : word
        ),
      };
    case 'RESET_WORDS':
      return {
        ...state,
        words: state.words.map(word => ({ ...word, status: 'alive' })),
      };
    default:
      return state;
  }
}

function Table() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleKillWord = id => {
    dispatch({ type: 'KILL_WORD', payload: id });
  };

  const handleReviveWord = id => {
    dispatch({ type: 'REVIVE_WORD', payload: id });
  };

  const handleResetWords = () => {
    dispatch({ type: 'RESET_WORDS' });
  };

  return (
    <div className="table">
        <button className="reset-button" onClick={handleResetWords}>
        Reset
      </button>
      <table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.words.map(word => (
            <tr key={word.id}>
              <td className={word.status === 'dead' ? 'dead' : ''}>{word.name}</td>
              <td>
                {word.status === 'alive' ? (
                  <button className="kill-button" onClick={() => handleKillWord(word.id)}>
                    Kill
                  </button>
                ) : (
                  <button className="revive-button" onClick={() => handleReviveWord(word.id)}>
                    Revive
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
