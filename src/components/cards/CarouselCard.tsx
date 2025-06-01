import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { add_LinkLog, Home_Type_importance_id, Home_user_Type_importance } from "../../allapi/api";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface CardProps {
  id?: string;
  link?: string;
  name: string;
  img?: string;
}

const CarouselCard: React.FC<CardProps> = ({ id, link = "#", name, img }) => {
  const notifyComingSoon = () => {
    toast.info("Coming Soon!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
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
      },
    });
  };

  const logClick = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    const payload = {
      userId,
      // cardId: id,
      // cardName: name,
    };
    console.log(payload, "payload");

    axios
      .post(add_LinkLog, payload)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const userId = localStorage.getItem("userId");
  // console.log(id,"🚀 ~ userId:", userId);
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

  const handleCardClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await logClick();

      if (!link || link === "#") {
        notifyComingSoon();
        return;
      }

      window.open(link, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error handling card click:", error);
    }
  };

  return (
    <>
      <div
        className="relative rounded-lg shadow-2xl flex flex-col items-center p-10 transition-all duration-500 ease-in-out text-[#5A382D] hover:text-[#7B480F] hover:scale-105 hover:font-bold cursor-pointer w-[10rem] sm:w-[15rem] h-[15rem] my-12 mx-auto"
        style={{
          boxShadow: "rgba(97, 75, 66, 0.7) 2px 2px 5px 0px",
          backgroundImage: img
            ? `url(${img})`
            : "linear-gradient(45deg, #b3b3b3, #e0e0e0)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleCardClick(e as any)}
      >
        <div className="flex w-full flex-row-reverse pr-2 pt-2 absolute top-0 right-0">
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
        <div className="absolute bottom-0 left-0 w-full h-16 flex items-center justify-center rounded-b-lg bg-[rgba(46,44,44,0.42)] text-white font-bold text-center text-[16px] sm:text-xl backdrop-blur-sm">
          {name.length > 10 ? `${name.slice(0, 10)}...` : name}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CarouselCard;
