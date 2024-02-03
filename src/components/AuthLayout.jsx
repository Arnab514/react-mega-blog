import React, {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function Protected ({children , authentication = true}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)
    const [loader , setLoader] = useState(true)

    useEffect(() => {
      if (authentication && authStatus !== authentication ) {
        navigate("/login")
      }
      elseif (!authentication && authStatus !== authentication) {
        navigate("/")
      }
      setLoader(false)
    }, [authStatus , authentication , navigate])
    
  return loader ? <h1> Loading... </h1> : <div> {children} </div> 
}

