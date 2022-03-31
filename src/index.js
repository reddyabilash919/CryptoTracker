import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContextAPI from './ContextAPI';

ReactDOM.render(
  <React.StrictMode>
    <ContextAPI>
    <App />
    </ContextAPI>
     
    
  </React.StrictMode>,
  document.getElementById('root')
);

