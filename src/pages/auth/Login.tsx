import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  function loginHandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent page reload

    // Save the email and username to localStorage
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("userLoggedIn", "true");

    console.log("Login successfully");
    console.log("Saved Email:", email);
    console.log("Saved Username:", username);
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white absolute left-0 top-0 z-50">
      <div className="p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-[#0E1726] font-[Cinzel]">
          LOGIN
        </h1>

        <form onSubmit={loginHandle} className="flex flex-col gap-6">
          {/* Email Input */}
          <div className="flex items-center border-2 border-[#A7E6F8] rounded-md px-4 py-2">
            <EmailIcon className="text-[#A7E6F8] mr-2" />
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 focus:outline-none"
            />
          </div>

          {/* Username Input */}
          <div className="flex items-center border-2 border-[#A7E6F8] rounded-md px-4 py-2">
            <PersonOutlineIcon className="text-[#A7E6F8] mr-2" />
            <input
              type="text"
              placeholder="UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="flex-1 focus:outline-none"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-[#A7E6F8] hover:bg-[#85cee2] text-white py-2 rounded-full text-lg font-semibold transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
