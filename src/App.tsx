import './App.css'
import LandingPage from './pages/LandingPage'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router'
import Login from './pages/Auth/Login/index.tsx'
import { AuthProvider, useAuth } from './context/AuthContext.tsx'
import { Toaster } from 'react-hot-toast'
import OrgHomePage from './pages/OrganizerHomePage/index.tsx'
import ProtectedRoute from './components/ProtectedRoute/index.tsx'
import UserHomePage from './pages/UserHomePage/index.tsx'
import SignUp from './pages/Auth/Signup/index.tsx'
import PageTitle from './components/PageTitle/index.tsx'
import { useEffect } from 'react'
import Layout from './components/Layout/index.tsx'

function AppRoutes() {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) {
      const redirectEndpoint = role === "user" ? "/user/home" : "/org/home";
      navigate(redirectEndpoint);
    }
  }, []);

  return (
    <>
      <Toaster />

      <Routes>

        <Route 
          path="/" 
          element={
            <>
              <PageTitle title='Welcome to SkillSpace'/>
              <LandingPage />
            </>
          } 
        />
        
        <Route 
          path='/org/home' 
          element={ 
              <Layout>
                <PageTitle title={`Organizer Home Page - SkillSpace`} />
                <ProtectedRoute 
                  element={<OrgHomePage />}
                  requiredRole='organizer'
                />  
              </Layout>
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
    </>
  )
}

const App = () => {
  return(
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
