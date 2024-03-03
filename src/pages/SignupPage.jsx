import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../appwrite/auth";
import { useDispatch , useSelector } from "react-redux";
import authSlice from "../store/authSlice";
import { login as storeLogin } from "../store/authSlice";
function SignupPage() {
    const [userName , setUserName] = useState("");
    const [password , setPassword] = useState("");
    const [email , setEmail] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = async(e) => {
      e.preventDefault();
        try {
          const userData = await authServices.signUp({email , password , userName});
        if(userData){
                navigate("/login")
        }
        } catch (error) {
          console.log("signup form error : " , error);
        }
    }


  return (
    <main className="bg-gradient-to-b  from-slate-700 to-slate-900 h-screen flex items-center justify-center">
      <div className="bg-cyan-900 p-8 rounded-xl shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-slate-50 text-center">
          Sign Up
        </h2>
        <p className="text-center text-slate-50 text-sm mt-1 mb-6">
          Sign up to ChatRoom
        </p>

        <form onSubmit={(e) => submitHandler(e)}>
          <div className="mb-4 flex items-center">
            <i className="fas fa-user-circle text-gray-500 mr-2"></i>
            <input
              type="text"
              id="username"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4 flex items-center">
            <i className="fas fa-envelope text-gray-500 mr-2"></i>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4 flex items-center">
            <i className="fas fa-lock text-gray-500 mr-2"></i>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-50">
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
}

export default SignupPage;
