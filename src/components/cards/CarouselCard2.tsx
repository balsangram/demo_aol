import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { add_LinkLog, Home_Type_importance_id, Home_user_Type_importance } from "../../allapi/api";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface CardProps {
  link?: string;
  name: string;
  img?: string;
  id?: string;
}

const CarouselCard2: React.FC<CardProps> = ({ id, link = "#", name, img }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const userId = localStorage.getItem("userId");

  const isFavorite = id ? favoriteIds.includes(id) : false;

  useEffect(() => {
    axios
      .get(`${Home_Type_importance_id}/${userId}`)
      .then((response) => {
        console.log(response, "Home_Type_importance_id");
        setFavoriteIds(response.data?.CardTypes || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const logClick = async () => {
    if (!userId || !id) {
      console.error("Missing userId or cardId");
      return;
    }

    const payload = {
      userId,
      cardId: id,
      cardName: name,
    };

    try {
      const res = await axios.post(add_LinkLog, payload);
      console.log("Click logged:", res.data);
    } catch (error) {
      console.error("Error logging click:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!userId || !id) {
      console.error("Missing userId or cardId");
      return;
    }

    try {
      await axios.post(`${Home_user_Type_importance}/${userId}`, {
        cardId: id,
      });

      setFavoriteIds((prev) =>
        prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to toggle favorite");
    }
  };

  return (
    <div
      onClick={() => {
        logClick();
      }}
      className="rounded-lg shadow-2xl flex flex-col items-center p-10 transition-all duration-500 ease-in-out text-[#5A382D] hover:text-[#7B480F] hover:scale-105 hover:font-bold cursor-pointer w-[10rem] sm:w-[15rem]"
      style={{
        height: "15rem",
        margin: "3rem auto",
        boxShadow: "rgba(97, 75, 66, 0.7) 2px 2px 5px 0px",
        backgroundImage: img
          ? `url(${img})`
          : "linear-gradient(45deg, #b3b3b3, #e0e0e0)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "10px",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <ToastContainer />
      <div className="flex w-full pr-2 pt-2 absolute top-0 right-0">
        {isFavorite ? (
          <FavoriteIcon
            className="text-red-500 "
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
          />
        ) : (
          <FavoriteBorderIcon
           className="text-gray-300 "
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
          />
        )}
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg w-full text-center font-bold bg-[rgba(46,44,44,0.42)] text-white h-16 flex items-center justify-center rounded-b-lg bottom-0 absolute left-0 text-[16px] sm:text-xl"
        style={{ backdropFilter: "blur(0px)" }}
      >
        {name && name.length > 10 ? name.slice(0, 10) + "..." : name}
      </a>
    </div>
  );
};

export default CarouselCard2;
