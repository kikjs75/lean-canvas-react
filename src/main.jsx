import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App.jsx';
// import App from './AppCssModules.jsx';
// import App from './AppStyled.jsx';
import App from './AppTailwindCSS.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
