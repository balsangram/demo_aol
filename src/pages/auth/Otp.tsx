import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { otpCheck } from "../../allapi/api";
import { useLocation, useNavigate } from "react-router-dom";

function Otp() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const type = location.state?.type; // email or phone
  const navigate = useNavigate();

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/, ""); // Only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputs.current[5]?.focus();
    }
  };

  const handleSubmit = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) {
      //   alert("Please enter a 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post(`${otpCheck}/${userId}`, {
        otp: fullOtp,
        type, // if needed by backend
      });

      console.log("✅ OTP verified:", response.data);
      //   alert("OTP verified successfully!");
      // Optionally redirect to dashboard/home
      navigate("/");
    } catch (error: any) {
      console.error(
        "❌ OTP verification failed:",
        error.response?.data || error.message
      );
      //   alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center bg-[#F3F4F6] fixed top-0 left-0 w-full z-50">
      <div className="bg-white rounded-xl shadow-xl text-center p-[2rem] sm:p-[4rem]">
        <h2 className="text-2xl font-semibold mb-[2rem] ">Enter OTP</h2>
        <div className="flex gap-2 justify-center" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength={1}
              inputMode="numeric"
              pattern="[0-9]*"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 text-center text-xl rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-[2rem] px-6 py-2 text-white bg-[#5F99AE] hover:bg-[#85cee2] rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Otp;
