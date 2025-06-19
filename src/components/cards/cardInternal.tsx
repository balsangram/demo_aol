import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { add_LinkLog, Home_user_Type_importance } from "../../allapi/api";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface CardProps {
  link?: string;
  name: string;
  onEdit?: () => void;
  img: string;
  id: string;
}

const CardInternal: React.FC<CardProps> = ({ link, name, img }) => {
  const [maxChar, setMaxChar] = useState(15);
  const [soon, setSoon] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const updateCharLimit = () => {
      setMaxChar(window.innerWidth < 640 ? 11 : 15);
    };
    updateCharLimit();
    window.addEventListener("resize", updateCharLimit);
    return () => window.removeEventListener("resize", updateCharLimit);
  }, []);

  const notify = () => {
    toast.info("Coming Soon!", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
      style: {
        backgroundColor: "#E0F7FA",
        color: "#004D40",
        fontWeight: "600",
        fontSize: "14px",
        padding: "12px 16px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 77, 64, 0.2)",
        maxWidth: "90vw",
        wordWrap: "break-word",
      },
    });
  };

  const handleClick = () => {
    if (link && link !== "#") {
      window.open(link, "_blank");
    } else if (!soon) {
      setSoon(true);
      notify();
      setTimeout(() => setSoon(false), 4000);
    }
  };

  const logCardClick = async () => {
    try {
      //   if (!userId) return;
      //   const response = await axios.post(`${add_LinkLog}/${userId}`, {
      //     cardId: id,
      //   });
      //   console.log("Click logged:", response.data);
    } catch (error) {
      console.error("Error logging card click:", error);
    }
  };

  //   const toggleFavorite = async () => {
  //     try {
  //       if (!userId) return;

  //       //   await axios.post(`${Home_user_Type_importance}/${userId}`, {
  //       //     cardId: id,
  //       //   });

  //       setFavoriteIds((prevIds) =>
  //         prevIds.includes(id)
  //           ? prevIds.filter((favId) => favId !== id)
  //           : [...prevIds, id]
  //       );
  //     } catch (error) {
  //       console.error("Error toggling favorite:", error);
  //     }
  //   };

  //   const isFavorite = favoriteIds.includes(id);

  return (
    <>
      <div
        className="flex sm:p-10 p-2 bg-[#ffffff7e] text-[#06202B] 
                   hover:font-bold hover:scale-105 hover:px-7 
                   flex-col cursor-pointer min-w-6 h-[140px] 
                   w-[140px] sm:w-[15rem] sm:h-[15rem] 
                   md:rounded-[4px] rounded-[16px] transition-all duration-500 ease-in-out "
        onClick={() => {
          handleClick();
          logCardClick();
        }}
      >
        {/* <div className="flex flex-row-reverse">
          {isFavorite ? (
            <FavoriteIcon
              className="text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite();
              }}
            />
          ) : (
            <FavoriteBorderIcon
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite();
              }}
            />
          )}
        </div> */}

        <img src={img} alt={name} className="h-20 w-20 mx-auto rounded-full" />

        <p className="text-center m-auto text-[14px] sm:text-[16px] sm:mt-4 mt-1 flex justify-center items-center font-bold h-[1rem]">
          {name.length > maxChar ? name.slice(0, maxChar) + "..." : name}
        </p>
      </div>
      <ToastContainer />
    </>
  );
};

export default CardInternal;
