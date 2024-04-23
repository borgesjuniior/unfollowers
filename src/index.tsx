import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const INSTAGRAM_HOSTNAME = 'www.instagram.com';

if (document.location.hostname !== INSTAGRAM_HOSTNAME) {
  alert('This app can only run on Instagram routes');
} else {
  document.title = 'Unfollowers';
  document.body.innerHTML = '<div id="root"></div>';

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(<App />);
}
