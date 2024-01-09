import {React,useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'


export default function Protected({children,authentication = true}){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const[loader,setLoader]=useState(true)
    const authStatus=useSelector((state)=>state.auth.status)
    useEffect(()=>{
    
        if(authentication && authStatus!==authentication){
            navigate('/login')
        }
        else if(!authentication && authStatus!==authentication){
            navigate('/')
        }
        setLoader(false)
    },[authStatus,authentication,navigate])
    
    return loader ? <h1>Loading...</h1> : <>{children}</>
}