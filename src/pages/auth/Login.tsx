import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

  // Handle validation
  const validateEmail = (email: string): boolean => {
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError("Email cannot be empty.");
      return false;
    }
    if (email !== trimmed) {
      setEmailError(
        "Spaces allowed only between characters; not at the start or end."
      );
      return false;
    }
    if (!emailRegex.test(trimmed)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateUsername = (username: string): boolean => {
    const trimmed = username.trim();
    if (!trimmed) {
      setUsernameError("Username cannot be empty.");
      return false;
    }
    if (username !== trimmed) {
      setUsernameError(
        "Spaces allowed only between characters; not at the start or end."
      );
      return false;
    }
    if (!usernameRegex.test(trimmed)) {
      setUsernameError(
        "Username must contain only alphabets (no numbers or special characters)."
      );
      return false;
    }
    setUsernameError("");
    return true;
  };

  // Submit handler
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) return;

    const isUsernameValid = validateUsername(username);
    if (!isUsernameValid) return;

    // Save to localStorage
    localStorage.setItem("email", email.trim());
    localStorage.setItem("username", username.trim());
    localStorage.setItem("userLoggedIn", "true");

    console.log("Login successful");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white absolute left-0 top-0 z-50">
      <div className="p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-[#0E1726] font-[Cinzel]">
          LOGIN
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col space-y-1">
          {/* Email Field */}
          <div
            className={`flex items-center border-2 rounded-md px-4 py-2 bg-white ${
              emailError ? "border-red-500" : "border-[#5F99AE]"
            }`}
          >
            <EmailIcon className="text-[#5F99AE] mr-2" />
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 focus:outline-none bg-white"
            />
          </div>
          <p className="text-red-500 text-sm min-h-[1rem]">{emailError}</p>

          {/* Username Field */}
          <div
            className={`flex items-center border-2 rounded-md px-4 py-2 bg-white ${
              usernameError ? "border-red-500" : "border-[#5F99AE]"
            }`}
          >
            <PersonOutlineIcon className="text-[#5F99AE] mr-2" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 focus:outline-none bg-white"
            />
          </div>
          <p className="text-red-500 text-sm min-h-[1rem]">{usernameError}</p>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#5F99AE] hover:bg-[#85cee2] text-white py-2 rounded-full text-lg font-semibold transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
