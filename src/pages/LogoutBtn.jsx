import React from 'react'
import {useDispatch} from 'react-redux'
import authServices from '../appwrite/auth'
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
  const navigate = useNavigate();
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authServices.logout().then(() => {
            dispatch(logout())
            navigate("/")
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 border text-white bg-teal-900 hover:bg-blue-100 hover:text-black font-bold rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn