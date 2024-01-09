import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './output.css';

import App from './App';
import Socials from './About'
import Login from './Login'
import ErrorPage from './ErrorPage';
import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <RouterProvider router={router} />
  // </React.StrictMode>
  <BrowserRouter>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
    <App />
  </BrowserRouter>
);
