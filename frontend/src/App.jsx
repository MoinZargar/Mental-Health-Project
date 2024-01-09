import { React,useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Header } from './components/index.jsx'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/AuthSlice.js'
import getAuthService from './Services/auth.js'

export default function App() {
  
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => { 
    getAuthService.connectDb()
    getAuthService.getCurrentUser()
    .then((user)=>{
      
      if(user.status==200){
        
        dispatch(login(user))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoading(false)
    })
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
         <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  ) : null
}




