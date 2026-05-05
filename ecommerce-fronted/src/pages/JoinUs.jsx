import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinUs() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
const [error, setError] = useState("");
const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("form submited !!", form);
     
      try {
         let response =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, form)

         console.log("url",import.meta.env.VITE_BACKEND_URL)
         
        if(response.status === 200){
        const data = response.data;
        localStorage.setItem("token",data.token);
      navigate("/login");
      }

    setForm({
      username: "",
      email: "",
      password: ""
    })
      } catch (err) {
          console.log("FULL ERROR 👉", err.response);   

        let Err = err.response?.data?.error || "Something went wrong"
        setError(Err);
        console.log(Err)
      }

   
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Join Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">


           {/* {error && 
             <div >
               {error.map((val,index) => {
                 return <p key={index} className="bg-red-100 rounded-xl p-2 w-full text-red-400 font-semibold mb-2 text-center">{val.msg}</p>
               })}
             </div> */}
           {/* } */}
           {error && (
  Array.isArray(error) ? (
    error.map((val, index) => (
      <p
        key={index}
        className="bg-red-100 rounded-xl p-2 w-full text-red-400 font-semibold mb-2 text-center"
      >
        {val.msg}
      </p>
    ))
  ) : (
    <p className="bg-red-100 rounded-xl p-2 w-full text-red-400 font-semibold mb-2 text-center">
      {error}
    </p>
  )
)}

          {/* Username */}
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Register
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}