import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import ContextAPI from './context/ContextAPI.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <ContextAPI>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextAPI>
  </>
)
