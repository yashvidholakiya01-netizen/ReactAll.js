
import { Mail, LockKeyholeIcon } from "lucide-react";

import React, { useState } from 'react'

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function SubmitFrom() {
  // e.preventDefault();
  console.log("data send to backend",{
    "email":email,
    "password":password,
  })
  setEmail("");
  setPassword("");
  }

  return (
    <>
      <section className="flex justify-center items-center h-screen">
        <div className="bg-gray-200/50 shadow-2xl w-full max-w-sm p-2 h-auto rounded-t-4xl rounded-b-2xl">
          <form className="bg-white text-black text-center rounded-3xl px-8 py-6" onSubmit={(e)=>{
            e.preventDefault();
            SubmitFrom();
          }}>
            <img src="https://i.pinimg.com/control1/1200x/6c/ac/7e/6cac7ebb906f588718fc66d1468c4e79.jpg" alt="logo" className="w-84 h-24 object-cover my-6" />
            <h1 className="text-3xl font-semibold my-2">Sign in to continue</h1>
            <p className="text-gray-400 text-sm mb-6">
              please sign in to start your rental application
            </p>
            <div className="text-gray-700 rounded-xl my-2 bg-gray-300 w-full flex items-center px-3">
              <Mail className="w-5 h-5" />
              <input
                className="outline-none w-full px-3 py-2 "
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
            </div>
            <div className="text-gray-700 rounded-xl my-2 bg-gray-300 w-full flex items-center px-3">
              <LockKeyholeIcon className="w-5 h-5" />
              <input
                className="outline-none  w-full px-3 py-2"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
              />
            </div>
            <input
              className="bg-black text-white active:bg-black/50 active:text-black active:scale-95 px-4 py-2 w-full rounded-xl mt-4"
              type="submit"
              value="Sign In"
            />
          </form>
          <p className="py-3 text-center text-gray-400">
            Don't have an Account?{" "}
            <span className="font-semibold text-black">Sign Up</span>
          </p>
        </div>
      </section>
    </>
  )
}

export default Form


