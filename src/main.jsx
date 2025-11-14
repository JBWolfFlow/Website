import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/index.css'

/**
 * Application Entry Point
 * Initializes React 18 with StrictMode for development checks
 * Wraps app with BrowserRouter for routing support
 * Mounts the root App component to the DOM
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)