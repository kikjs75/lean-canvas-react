import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './components/StyledComponents/pages/Home';
import About from './components/StyledComponents/pages/About';
import Contact from './components/StyledComponents/pages/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// 1) 기존 방식
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// // import App from './App.jsx';
// // import App from './AppCssModules.jsx';
// // import App from './AppStyled.jsx';
// import App from './AppTailwindCSS.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );
