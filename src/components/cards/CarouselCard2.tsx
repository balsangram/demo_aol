import { toast, ToastContainer } from "react-toastify";
import React from "react";

interface CardProps {
  link?: string;
  name: string;
  img?: string;
}

const CarouselCard2: React.FC<CardProps> = ({ link = "#", name, img }) => {
  return (
    <div
      className="rounded-lg shadow-2xl flex flex-col items-center p-10 transition-all duration-500 ease-in-out text-[#5A382D] hover:text-[#7B480F] hover:scale-105 hover:font-bold cursor-pointer w-[10rem] sm:w-[15rem]"
      style={{
        height: "15rem",
        margin: "3rem auto",
        // maxWidth: "10rem",
        // boxShadow: "2px 2px 10px 0 rgb(97 75 66 / 70%)",
        boxShadow: "rgba(97, 75, 66, 0.7) 2px 2px 5px 0px",
        backgroundImage: img
          ? `url(${img})`
          : "linear-gradient(45deg, #b3b3b3, #e0e0e0)", // Fallback
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "10px",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <ToastContainer />

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg w-full text-center  font-bold bg-[rgba(46,44,44,0.42)] text-white h-16 flex items-center justify-center rounded-b-lg bottom-0 absolute left-0 text-[16px] sm:text-xl"
        style={{ backdropFilter: "blur(0px)" }} // Smooth glass effect
      >
        {name && name.length > 10 ? "..." + name.slice(0, 10) : name}
        {/* {name} */}
      </a>
    </div>
  );
};

export default CarouselCard2;
