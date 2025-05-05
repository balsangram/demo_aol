import { toast, ToastContainer } from "react-toastify";
import React from "react";

interface CardProps {
  link?: string;
  //   name: string;
  img?: string;
}

const CarouselCardYoutube: React.FC<CardProps> = ({
  link = "#",
  //   name,
  img,
}) => {
  return (
    <div
      className="rounded-lg shadow-2xl flex flex-col items-center p-10 transition-all duration-500 ease-in-out text-[#5A382D] hover:text-[#7B480F] hover:scale-105 hover:font-bold cursor-pointer w-[10rem] sm:w-[15rem]"
      style={{
        height: "120px",
        width: "220px",
        // margin: "3rem auto",
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
    </div>
  );
};

export default CarouselCardYoutube;
