import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './views/Login'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotFound from './views/NotFound'
import Home from './views/Home'
import Regsiter from './views/Register'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/register" element={<Regsiter/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  </StrictMode>,
)
