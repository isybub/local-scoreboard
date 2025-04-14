import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from 'react-dom/client'
import Frontend from './Frontend';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/frontend" element={<Frontend />} />
    </Routes>
  </BrowserRouter>,
)
