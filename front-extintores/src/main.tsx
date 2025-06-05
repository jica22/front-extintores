import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/NavBar.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import Group from './context/Group.tsx'

createRoot(document.getElementById('root')!).render(
  <div className='font-poppins'>
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<App />} />} />
          <Route path="/extintores" element={<PrivateRoute element={<App />} />} />
          <Route path="/grupo" element={<PrivateRoute element={<Group />} />} />
          <Route path="/demonstracao-react" element={<PrivateRoute element={<App />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </div>
)
