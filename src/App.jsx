import { useContext, useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Header from './components/header/Header'
import 'bootstrap-icons/font/bootstrap-icons.css'
import LandingPage from './components/landingPage/LandingPage'
import { context } from './store/context'
import Login from './components/Login/Login'
import Signup from './components/signup/signup'
import AiLoader from './components/loader/Loader.jsx'
import { ToastContainer, toast } from 'react-toastify';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import ProtectedRoute from './protected/protectedRoute.jsx'
import { useAuth } from './auth/hooks/hook.js'
import GetUser from './getme.jsx'
import FilePopup from './components/filePopup.jsx'
import CreateResume from './components/CreateResume/CreateResume.jsx'
import ResumeAnalyzePage from './components/createresumepage/ResumeAnalyzePage.jsx'
import AboutPage from './components/about/About.jsx'
import ContactPage from './components/contact/Contact.jsx'

function App() {
  let { theme, state, setLoader, loader, loaderText, setLoaderText, user, file } = useContext(context)

  console.log(user)

  useEffect(() => {
    setLoaderText({ mainText: "Welcome…", subText: "Ready to analyze your resume" })
    setTimeout(() => {
      setLoader(false)
    }, 3000)
  }, [])
  return (
    <>

      <ToastContainer position='top-center' style={{ zIndex: 999999999999 }} />
      <div className={theme === "dark" ? "dark" : "light"}>
        {loader ? <AiLoader welcome={loaderText.mainText} second={loaderText.subText} /> : ""}
      </div>


      <Router>
        {file ? <FilePopup /> : ''}
        <GetUser />
        <div style={{ zIndex: "100000000" }}>{state === "Login" ? <Login /> : state === "Signup" ? <Signup /> : ""}</div>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/ResumeAnalyzePage' element={<ResumeAnalyzePage />} />
          <Route path='/dashboard' element={<ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage/>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
