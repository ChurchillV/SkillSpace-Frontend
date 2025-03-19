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
import PageTitle from './components/PageTitle/index.tsx'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>

        <Toaster />

        <Routes>

        <Route 
          path="/" 
          element={
            <>
              <PageTitle title='Welcome to SkillSpace'/>
              <App />
            </>
          } 
        />
        
        <Route 
          path='/org/home' 
          element={ 
            <>
              <PageTitle title={`Organizer Home Page - SkillSpace`} />
              <ProtectedRoute 
                element={<OrgHomePage />}
                requiredRole='organizer'
              />  
            </>
          } 
        />

        <Route 
          path='/user/home'
          element={ 
            <>
              <PageTitle title='User Home Page - SkillSpace'/>
              <ProtectedRoute element={<UserHomePage />}/> 
            </>
          }
        />

        <Route 
          path='/login' 
          element={
            <>
              <PageTitle title='Login - SkillSpace'/>
              <Login />
            </>
          } />

        <Route 
          path='/signup' 
          element={
            <>
              <PageTitle title='Signup - SkillSpace' />
              <SignUp />
            </>
          } />
        
        </Routes>
    </AuthProvider>
  </BrowserRouter>

  )
