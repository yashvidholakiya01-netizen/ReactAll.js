import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/UserContext";

export default function Profile() {
  const [user, setUser] = useState({
    username: "yashvi",
    email: "yashvi@gmail.com",
    role: "User",
  });
  const [error, setError] = useState();
 const {centerData} = useContext(DataContext)
console.log(centerData)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }

        })
        setUser(response.data?.user);
      } catch (error) {
        console.log(error.response)
        setError(error.response?.data)
      }
    }
    fetchData();
  }, [])

  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user/update`,
        {
          username: user.username,
          email: user.email
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setEdit(false);

    } catch (error) {
      console.log(error.response);
    }
  };
  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>

      {error && (
        <div className="w-full h-screen flex items-center justify-center text-9xl font-bold text-red-600">
          Access Denied !
        </div>
      )}


      {user.username && (<div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-100 to-purple-100">

        <div className="bg-white shadow-2xl rounded-2xl p-8 w-96">

          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-indigo-500 text-white flex items-center justify-center rounded-full text-3xl font-bold shadow-md">
              {user.username.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center">
            {user.username}
          </h2>
          <p className="text-center text-gray-500 mb-4">
            {user.role}
          </p>

          {/* Edit Mode */}
          {edit ? (
            <div className="space-y-3">
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
              />

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
              />



              <button
                onClick={handleSave}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-xl p-4 space-y-2">
              <p><b>Email:</b> {user.email}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2 mt-5">
            {/* <Link to="/edit-profile" > */}

            {/* <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              onClick={() => setEdit(!edit)}
             
             >
              {edit ? "Cancel" : "Edit"}
            </button> */}
            {/* </Link> */}

            <Link to="/edit-profile" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              <button >
                edit profile

              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>

        </div>
      </div>)}


    </>


  );
}