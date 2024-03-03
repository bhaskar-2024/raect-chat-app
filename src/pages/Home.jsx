import React from "react";
import { useNavigate } from "react-router-dom";



function Home() {
    const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row items-center justify-center bg-slate-900">
      <div className="px-9 h-[50%] md:h-full md:py-20 ">
        <img src="/chat app .png" className="max-w-full max-h-full" alt="" />
      </div>
      <div className="flex flex-col gap-y-5 items-center justify-center" >
      <div className="text-5xl font-mono text-white text-center">
        Welcome to the <span className="border-b-2">ChatRoom</span>
      </div>
      <div className="text-4xl font-mono text-white text-center">
        Please Login to continue!
      </div>
      <div className="mt-5">
        <span className="text-white border-2 px-4 py-2 mx-3  rounded-lg pb-3 hover:text-slate-900 hover:bg-white cursor-pointer font-bold font-mono"
        onClick={() => {navigate('/login')}}
        >
          Log In
        </span>
        <span className="text-white border-2 px-4 py-2 rounded-lg pb-3 hover:text-slate-900 hover:bg-white cursor-pointer font-bold font-mono"
        onClick={() => {navigate('/signin')}}>
          Sign Up
        </span>
        
      </div>
      </div>
      
    </div>
  );
}

export default Home;
