import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

interface CardProps {
  link?: string;
  name: string;
  onEdit?: () => void;
  img: string;
}

const Card: React.FC<CardProps> = ({ link, name, onEdit, img }) => {
  const [maxChar, setMaxChar] = useState(15); // default desktop

  // Detect screen size and update character limit
  useEffect(() => {
    const updateCharLimit = () => {
      setMaxChar(window.innerWidth < 640 ? 11 : 15); // 640px is Tailwind's 'sm' breakpoint
    };

    updateCharLimit(); // run on mount
    window.addEventListener("resize", updateCharLimit); // run on resize

    return () => window.removeEventListener("resize", updateCharLimit); // cleanup
  }, []);
  // const navigate = useNavigate();
  const [soon, setSoon] = useState(false);

  const notify = () => {
    console.log("coming soon");

    toast.info("Coming Soon!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      style: {
        backgroundColor: "#E0F7FA", // light cyan
        color: "#004D40", // dark teal
        fontWeight: "600",
        fontSize: "14px",
        padding: "12px 16px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 77, 64, 0.2)",
        maxWidth: "90vw", // responsive width
        wordWrap: "break-word", // prevent overflow
      },
    });
  };

  const handleClick = () => {
    if (link && link !== "#") {
      window.open(link, "_blank");
    } else {
      if (!soon) {
        setSoon(true);
        notify();
        setTimeout(() => {
          setSoon(false);
        }, 4000);
      }
    }
  };

  return (
    <>
      <div
        className="flex sm:p-10 p-4 
       transition-all duration-500 ease-in-out
       bg-[#ffffff7e]
       text-[#06202B]
       hover:font-bold hover:scale-105 hover:px-7
       flex-col cursor-pointer min-w-6 h-[140px] w-[140px] sm:w-[15rem] sm:h-[15rem] md:rounded-[4px] rounded-[16px]"
        onClick={handleClick}
      >
        <img
          src={img}
          alt=""
          style={{
            height: "5rem",
            width: "5rem",
            margin: "auto",
            borderRadius: "5rem",
          }}
        />
        <p className="text-center m-auto text-[14px] sm:text-[16px] h-20 sm:mt-4 mt-1 flex justify-center items-center font-bold">
          {name.length > maxChar ? name.slice(0, maxChar) + "..." : name}
        </p>
      </div>
      <ToastContainer />
    </>
  );
};

export default Card;
