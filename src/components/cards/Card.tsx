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
        // boxShadow: "0px 4px 10px rgba(0, 255, 0, 0.5)",
        boxShadow: "rgba(97, 75, 66, 0.7) 2px 2px 5px 0px",
      },
    });
  };

  return (
    <div
      className="   flex  sm:p-10 p-4 
                 transition-all duration-500 ease-in-out
                 bg-[#ffffffa3]
                  text-[#06202B]
                  hover:font-bold  hover:scale-105 hover:px-7
                  flex-col  cursor-pointer min-w-6  h-[150px] w-[150px] sm:w-[15rem] sm:h-[15rem] md:rounded-[4px] rounded-[16px]"
      onClick={() => window.open(link, "_blank")}
      style={
        {
          // backgroundColor: "#fff",
          // boxShadow: "10px 10px 20px 0 rgb(97 75 66 / 70%)",
          // boxShadow: "rgba(97, 75, 66, 0.7) 2px 2px 5px 0px",
          // borderRadius: "4px",
          // maxWidth: "15rem",
          // maxHeight: "15rem",
          // minWidth:"15rem"
        }
      }
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
        className="text-center m-auto text-[14px] sm:text-lg sm:mt-4 mt-1 flex justify-center items-center w-full bold font-bold"
      >
        {name && name.length > 13 ? name.slice(0, 13) + "..." : name}
      </a>

      {/* <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center m-auto text-[14px] sm:text-xl sm:mt-4 mt-1 flex justify-center items-center w-full bold font-bold"
      >
        {name.length > 13 ? name.slice(0, 13) + "..." : name}
      </a> */}
    </div>
  );
};

export default Card;
