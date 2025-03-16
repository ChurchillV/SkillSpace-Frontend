import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './pages/Auth/Login/index.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from 'react-hot-toast'
import OrgHomePage from './pages/OrganizerHomePage/index.tsx'
import ProtectedRoute from './components/ProtectedRoute/index.tsx'
import UserHomePage from './pages/UserHomePage/index.tsx'
import SignUp from './pages/Auth/Signup/index.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <AuthProvider>

      <Toaster />

      <Routes>

      <Route path="/" element={<App />} />
      

      <Route path='/org/home' 
        element={ <ProtectedRoute element={<OrgHomePage />}/> } 
      />

      <Route path='/user/home'
        element={ <ProtectedRoute element={<UserHomePage />}/> }
      />

      <Route path='/login' element={<Login />} />

      <Route path='/signup' element={<SignUp />} />
      
      </Routes>
  </AuthProvider>

  </BrowserRouter>

  )
