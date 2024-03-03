import React, { useState } from "react";
import authServices from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../store/authSlice";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = await authServices.login({ email, password });
      if (userData) {
        const userData = await authServices.getCurrentUser();
        if (userData) {
          console.log(userData);
          dispatch(storeLogin({userData}))};
        navigate("/chatroom");
      }
    } catch (error) {
      console.log("signIn form error : ", error);
    }
  };

  return (
    <>
      <div className="h-screen w-full">
        <div className="bg-gray-800 flex flex-col justify-center h-full">
          <form 
          onSubmit={(e) => submitHandler(e)}
          className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8">
            <h2 className="text-4xl dark:text-white font-bold text-center">
              Welcome Back!
            </h2>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Email</label>
              <input 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Password</label>
              <input
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="password"
              />
            </div>

            <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
