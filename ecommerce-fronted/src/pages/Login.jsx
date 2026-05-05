import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/UserContext";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
 
  const [error, setError] = useState("");

const {setCenterData} = useContext(DataContext)

const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(form);
    console.log("form submited !")

  try {
         let response =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, form)
        if(response.status === 200){
        const data = response.data;
        localStorage.setItem("token",data.token);
        setCenterData(data.checkUser);
      navigate("/profile");
      }

    setForm({
      email: "",
      password: ""
    })
      } catch (e) {
     
        let Err = e.response?.data?.error 
        setError(Err);
        console.log(e.response)
      }

  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

         {/* {error && 
             <div >
               {error.map((val,index) => {
                 return <p key={index} className="bg-red-100 rounded-xl p-2 w-full text-red-400 font-semibold mb-2 text-center">{val.msg}</p>
               })}
             </div> 
           } */}
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
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/joinus" className="text-blue-500 hover:underline">
            JoinUs
          </a>
        </p>

      </div>
    </div>
  );
}