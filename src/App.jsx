import { useDispatch } from 'react-redux'
import { useEffect, useState } from "react"
import authService from './Appwrite/auth'
import { login, logout } from './store/authSlice'
import Header from './components/index'
import { Outlet } from 'react-router-dom'
import Footer from './components/index'
import './App.css'

function App() {
  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  } , [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className="w-full block">
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App

