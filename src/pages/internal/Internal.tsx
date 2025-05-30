import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  all_user_Type,
  user_Type,
  user_Type_importance,
} from "../../allapi/api";
import InternalLoginSearch from "../../components/search/InternalLoginSearch";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLanguage } from "../../context/LanguageContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Card {
  _id: string;
  link: string;
  usertype: string;
  img: string;
  state: string;
  name: string;
  isLiked?: boolean;
  favourite: boolean;
}

function Internal() {
  const navigate = useNavigate();
  const [internal, setInternal] = useState<Card[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const userId = localStorage.getItem("userId");
  console.log("🚀 ~ Internal ~ userId:", userId);

  // Fetch user types data
  const fetchUserTypes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${all_user_Type}/${language}`);
      const dataWithLikes = response.data.map((item: Card) => ({
        ...item,
        isLiked: item.favourite,
      }));
      setInternal(dataWithLikes);
    } catch (error) {
      console.error("Error fetching user types:", error);
    } finally {
      setLoading(false);
    }
  }, [language]);

  // Fetch favorite IDs for the user
  const fetchFavoriteIds = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await axios.get(`${user_Type}/${userId}`);
      setFavoriteIds(response.data.userTypes || []);
    } catch (error) {
      console.error("Error fetching favorite IDs:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserTypes();
    fetchFavoriteIds();
  }, [fetchUserTypes, fetchFavoriteIds]);

  // Toggle favorite status
  const toggleFavorite = useCallback(
    async (id: string) => {
      if (!userId) return;

      try {
        await axios.post(`${user_Type_importance}/${userId}`, { cardId: id });
        setFavoriteIds((prev) => {
          const isFavorite = prev.includes(id);
          return isFavorite
            ? prev.filter((itemId) => itemId !== id)
            : [...prev, id];
        });
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    },
    [userId]
  );

  // Sort function to put favorite items first
  const sortByFavorite = (a: Card, b: Card) => {
    const aIsFavorite = favoriteIds.includes(a._id);
    const bIsFavorite = favoriteIds.includes(b._id);

    if (aIsFavorite && !bIsFavorite) return -1;
    if (!aIsFavorite && bIsFavorite) return 1;
    return 0;
  };

  // Filter and sort the data
  const filteredCards = internal
    .filter(
      (item) =>
        item.usertype.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort(sortByFavorite);

  // Handle card click
  const handleCardClick = (usertype: string) => {
    navigate("/internal2", { state: { usertype } });
  };

  return (
    <div className="min-h-[80vh]">
      <InternalLoginSearch onSearch={setSearchTerm} />

      {loading ? (
        <div className="flex gap-12 flex-wrap justify-center my-12">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-2xl w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px]"
            >
              <div className="mb-3">
                <Skeleton height="5rem" width="5rem" circle />
              </div>
              <div className="w-[70%]">
                <Skeleton height="1rem" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-12 flex-wrap justify-center my-12 font-poppins">
          {filteredCards.map((item) => (
            <div
              key={item._id}
              className={`flex sm:p-10 p-4 
                transition-all duration-500 ease-in-out
                bg-[#ffffff7e]
                text-[#06202B]
                hover:font-bold hover:scale-105 hover:px-7
                flex-col cursor-pointer min-w-6 h-[150px] w-[150px] sm:w-[15rem] sm:h-[15rem] md:rounded-[4px] rounded-[16px]
                shadow-md hover:shadow-lg
                `}
              style={{ overflow: "hidden" }}
            >
              <div className="flex flex-row-reverse">
                {favoriteIds.includes(item._id) ? (
                  <FavoriteIcon
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item._id);
                    }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item._id);
                    }}
                  />
                )}
              </div>

              <img
                src={item.img}
                alt={item.usertype}
                className="h-20 w-20 mx-auto rounded-full object-cover"
                onClick={() => handleCardClick(item.usertype)}
              />

              <div
                className="text-center m-auto text-[14px] sm:text-xl h-20 sm:mt-4 mt-1 flex justify-center items-center font-bold"
                onClick={() => handleCardClick(item.usertype)}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Internal;
