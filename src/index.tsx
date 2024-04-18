import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// document.title = 'Unfollowers';
// document.body.innerHTML = '<div id="root"></div>';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
