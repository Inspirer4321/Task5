import React, { useReducer, useEffect } from 'react';
import './mycomponent.css';

const initialState = {
  isConnected: false,
  isConnecting: false,
  showPleaseWait: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CONNECT':
      return {
        isConnected: false,
        isConnecting: true,
        showPleaseWait: true,
      };
    case 'CONNECTED':
      return {
        isConnected: true,
        isConnecting: false,
        showPleaseWait: false,
      };
    case 'DISCONNECT':
      return {
        isConnected: false,
        isConnecting: false,
        showPleaseWait: false,
      };
    default:
      return state;
  }
};

const MyComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let timer;

    if (state.isConnecting) {
      timer = setTimeout(() => {
        dispatch({ type: 'CONNECTED' });
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [state.isConnecting]);

  const handleConnect = () => {
    dispatch({ type: 'CONNECT' });
  };

  const handleDisconnect = () => {
    dispatch({ type: 'DISCONNECT' });
  };

  return (
    <div className="my-component">
      {state.isConnected ? (
        <>
          <div className="connected-text">Connected</div>
          <button className="disconnect-button" onClick={handleDisconnect}>
            Disconnect
          </button>
        </>
      ) : (
        <>
          <div className="disconnected-text">
            {state.isConnecting && state.showPleaseWait
              ? 'Connecting...'
              : 'Disconnected'}
          </div>
          <button className="connect-button" onClick={handleConnect}>
            {state.isConnecting && state.showPleaseWait ? 'Please wait...' : 'Connect'}
          </button>
        </>
      )}
    </div>
  );
};

export default MyComponent;
