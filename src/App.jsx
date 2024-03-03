
import { Outlet } from "react-router-dom"
import ChatBox from "./Components/ChatBox"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { useEffect, useState } from "react"
import authServices from "./appwrite/auth"
import { login , logout } from "./store/authSlice"
import { useDispatch } from "react-redux"
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authServices.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

 
  
  return (
    <>
     <Outlet/>
    </>
  )
}

export default App
