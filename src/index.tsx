import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const INSTAGRAM_HOSTNAME = 'www.instagram.com';

if (document.location.hostname !== INSTAGRAM_HOSTNAME && false) {
  alert('Você precisa está no Instagram para executar esse Script');
} else {
  document.title = 'Unfollowers';
  document.body.innerHTML = '<div id="root"></div>';

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(<App />);
}
