import { Style } from "@mui/icons-material";
import { Button } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import comingSoon from "../../assets/comingSoon/comingSoon.png";

interface CardProps {
  link?: string;
  name: string;
  onEdit?: () => void;
  // id: string;
  img: string;
}

const Card: React.FC<CardProps> = ({ link, name, onEdit, img }) => {
  const navigate = useNavigate();

  const handleEditClick = (event: React.MouseEvent) => {
    // event.preventDefault();
    // if (onEdit) {
    //   onEdit();
    // } else {
    //   navigate(`/update/${id}`);
    // }
  };

  const notify = () => {
    console.log("Coming Soon triggered!"); // Debugging log
    toast.info(" Coming Soon!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      style: {
        backgroundColor: "green",
        color: "white",
        fontWeight: "bold",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 255, 0, 0.5)",
      },
    });
  };

  return (
    <div
      className="  shadow-2xl flex  p-10 
                 transition-all duration-500 ease-in-out
                  text-[#5A382D]
                 hover:text-[#7B480F] hover:font-bold hover:shadow-2xl hover:scale-105 hover:px-7
                 w-full flex-col  cursor-pointer min-w-6 "
      style={{
        backgroundColor: "white",
        boxShadow: "10px 10px 20px 0 rgb(97 75 66 / 70%)",
        borderRadius: "4px",
        maxWidth: "15rem",
        maxHeight: "15rem",
        // minWidth:"15rem"
      }}
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
      {/* <ToastContainer /> */}

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center m-auto text-xl h-20 mt-4 flex justify-center items-center"
      >
        {name}
      </a>
    </div>
  );
};

export default Card;
