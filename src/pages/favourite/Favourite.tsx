"use client";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import {
  display_facourite,
  display_facourite_home,
  Home_Type_importance_id,
  Home_user_Type_importance,
  user_Type,
  user_Type_importance,
} from "../../allapi/api";
import Card from "../../components/cards/Card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface CardItem {
  _id: string;
  name: string;
  link: string;
  img: string;
}

function Favourite() {
  const userId = localStorage.getItem("userId");
  const [internalItems, setInternalItems] = useState<CardItem[]>([]);
  const [homeItems, setHomeItems] = useState<CardItem[]>([]);
  const [loadingInternal, setLoadingInternal] = useState(true);
  const [loadingHome, setLoadingHome] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Unified favorite toggle function for internal items
  const handleToggleInternalFavorite = useCallback(
    async (cardId: string) => {
      if (!userId) return;

      try {
        await axios.post(`${user_Type_importance}/${userId}`, { cardId });
        setFavoriteIds((prev) => {
          const isFavorite = prev.includes(cardId);
          return isFavorite
            ? prev.filter((itemId) => itemId !== cardId)
            : [...prev, cardId];
        });
      } catch (error) {
        console.error("Error toggling internal favorite:", error);
      }
    },
    [userId]
  );

  // Unified favorite toggle function for home items
  const handleToggleHomeFavorite = useCallback(
    async (cardId: string) => {
      if (!userId) return;

      try {
        await axios.post(`${Home_user_Type_importance}/${userId}`, { cardId });
        setFavoriteIds((prev) => {
          const isFavorite = prev.includes(cardId);
          return isFavorite
            ? prev.filter((itemId) => itemId !== cardId)
            : [...prev, cardId];
        });
      } catch (error) {
        console.error("Error toggling home favorite:", error);
      }
    },
    [userId]
  );

  // Fetch favorite IDs
  useEffect(() => {
    const fetchFavoriteIds = async () => {
      if (!userId) return;

      try {
        const [homeResponse, userResponse] = await Promise.all([
          axios.get(`${Home_Type_importance_id}/${userId}`),
          axios.get(`${user_Type}/${userId}`),
        ]);

        const combinedIds = [
          ...(homeResponse.data?.CardTypes || []),
          ...(userResponse.data?.userTypes || []),
        ];

        const uniqueIds = [...new Set(combinedIds)];
        setFavoriteIds(uniqueIds);
      } catch (error) {
        console.error("Error fetching favorite IDs:", error);
        setFavoriteIds([]);
      }
    };

    fetchFavoriteIds();
  }, [userId]);

  // Fetch internal favorites
  useEffect(() => {
    const fetchInternalFavorites = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`${display_facourite}/${userId}`);
        console.log("🚀 ~ fetchInternalFavorites ~ response:", response.data);
        const data = response.data.userTypes || [];
        setInternalItems(data);
      } catch (error) {
        console.error("Error fetching internal favorites:", error);
        setInternalItems([]);
      } finally {
        setLoadingInternal(false);
      }
    };

    fetchInternalFavorites();
  }, [userId]);

  // Fetch home favorites
  useEffect(() => {
    const fetchHomeFavorites = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`${display_facourite_home}/${userId}`);
        const data = response.data.userTypes || [];
        setHomeItems(data);
      } catch (error) {
        console.error("Error fetching home favorites:", error);
        setHomeItems([]);
      } finally {
        setLoadingHome(false);
      }
    };

    fetchHomeFavorites();
  }, [userId]);

  const renderSkeletonCards = (keyPrefix: string) => (
    <div className="w-full text-center sm:my-4 px-4 mt-4 mb-6">
      <Skeleton
        height={30}
        width={260}
        className="mx-auto mb-6"
        style={{ borderRadius: "8px" }}
      />
      <div className="flex gap-6 flex-wrap justify-center sm:pb-12">
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={`${keyPrefix}-skeleton-${index}`}
            className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-2xl w-[140px] h-[140px] sm:w-[200px] sm:h-[200px]"
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
    </div>
  );

  const renderFavoriteSection = (
    title: string,
    items: CardItem[],
    loading: boolean,
    onToggle: (cardId: string) => void,
    keyPrefix: string
  ) => (
    <div className="favorites-section">
      {loading ? (
        renderSkeletonCards(keyPrefix)
      ) : (
        <div className="text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel mb-12">
            {title}
          </h2>
          {items.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-3 py-12">
              {items.map((item) => (
                <Card
                  key={`${keyPrefix}-${item._id}`}
                  id={item._id}
                  link={item.link || "#"}
                  name={item.name}
                  img={item.img}
                  isFavorite={favoriteIds.includes(item._id)}
                  onFavoriteToggle={onToggle}
                />
              ))}
            </div>
          ) : (
            <p className="py-12">No {title.toLowerCase()} found</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="favorites-container">
      {renderFavoriteSection(
        "Internal Favorites",
        internalItems,
        loadingInternal,
        handleToggleInternalFavorite,
        "internal"
      )}
      {renderFavoriteSection(
        "Home Favorites",
        homeItems,
        loadingHome,
        handleToggleHomeFavorite,
        "home"
      )}
    </div>
  );
}

export default Favourite;
