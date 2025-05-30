import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChooseDirection() {
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState(""); // Error message state
  const navigate = useNavigate();

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
    setError(""); // Clear error when user selects something
  };

  const handleConfirm = () => {
    if (selectedOption) {
      navigate("/display_direction", { state: { direction: selectedOption } });
    } else {
      setError("❌ Please select an option before continuing.");
    }
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "50px", minHeight: "65vh" }}
      className="flex justify-center items-center"
    >
      <div className="bg-[#ffffffa6] w-[22rem] rounded-md p-3">
        <h1 className="font-bold text-xl">I am a</h1>

        <div style={{ margin: "20px 0" }} className="flex gap-4">
          <label
            className={`bg-white w-[50%] h-[5rem] rounded-md flex justify-center items-center cursor-pointer ${
              selectedOption === "Visitor"
                ? "border-2 border-blue-500"
                : "border-2 border-transparent"
            }`}
          >
            <input
              type="radio"
              value="Visitor"
              checked={selectedOption === "Visitor"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Visitor
          </label>

          <label
            className={`bg-white w-[50%] h-[5rem] rounded-md flex justify-center items-center cursor-pointer ${
              selectedOption === "Participant"
                ? "border-2 border-blue-500"
                : "border-2 border-transparent"
            }`}
          >
            <input
              type="radio"
              value="Participant"
              checked={selectedOption === "Participant"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Participant
          </label>
        </div>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button
          onClick={handleConfirm}
          className="w-full py-2 px-4 text-base bg-[#70cfeb] text-[#fff] border-none rounded-md cursor-pointer hover:bg-[#a5e7fb] hover:text-[#000] transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ChooseDirection;
