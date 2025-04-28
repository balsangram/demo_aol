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
  onClick?: () => void;
  // id: string;
  img: string;
}

const CardComming: React.FC<CardProps> = ({ link, name, onEdit, img }) => {
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
      className="bg-white rounded-lg shadow-2xl h-40 flex  p-10 
                 transition-all duration-500 ease-in-out 
                 hover:text-yellow-700 hover:font-bold hover:shadow-2xl hover:scale-105 
                 w-full md:w-1/3  cursor-pointer"
      //  onClick={()=>{
      //   navigate()
      //  }}
      style={{
        backgroundImage:
          "linear-gradient(45deg, rgb(23, 22, 21), rgb(255, 132, 0), rgb(255, 173, 58))",
        color: "white",
        // boxShadow: "10px 10px 20px 0 rgb(97 75 66 / 70%)",
        boxShadow: "rgba(97, 75, 66, 0.7) 2px 2px 5px 0px",
      }}
    >
      <img
        src={img}
        alt=""
        style={{
          height: "6rem",
          width: "6rem",
          margin: "auto",
          // borderRadius: "5rem"
        }}
      />
      {/* <ToastContainer /> */}
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center m-auto text-xl"
        >
          {name}
        </a>
      ) : (
        <div
          // onClick={notify}
          className="text-center m-auto text-xl cursor-pointer relative"
        >
          <div
            style={{
              position: "absolute",
              height: "7rem",
            }}
          >
            <img
              style={{
                // height: "5rem",
                margin: "-5rem 0px 0px 5rem",
                height: "7rem",
                // fontSize:"2rem",
                // color:"red"
              }}
              // src={comingSoon}
              alt=""
            />
          </div>
          {name}
          {/* (Coming Soon) */}
        </div>
      )}
    </div>
  );
};

export default CardComming;
