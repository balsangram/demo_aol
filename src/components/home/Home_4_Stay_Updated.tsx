import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../cards/Card";
import {
  all_Card,
  Home_Type_importance_id,
  Home_user_Type_importance,
} from "../../allapi/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLanguage } from "../../context/LanguageContext";

interface CardItem {
  name: string;
  link: string;
  img: string;
  _id: string;
}

const Home_4_Stay_Updated: React.FC = () => {
  const [items, setItems] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const { language } = useLanguage();
  const userId = localStorage.getItem("userId");

  const stayUpdatedTranslations: { [key: string]: string } = {
    en: "STAY UPDATED",
    hi: "अपडेट रहें",
    kn: "ನವೀಕೃತವಾಗಿರಿ",
    ta: "புதுப்பிப்புகளைப் பெறுங்கள்",
    te: "నవీకరించబడినట్లుగా ఉండండి",
    gu: "અપડેટ રહો",
    mr: "अपडेट राहा",
    ml: "അപ്‌ഡേറ്റ് ആയിരിക്കുക",
    pa: "ਅੱਪਡੇਟ ਰਹੋ",
    bn: "আপডেট থাকুন",
    ru: "Оставайтесь в курсе",
    es: "MANTÉNGASE ACTUALIZADO",
    zh: "保持更新",
    mn: "Шинэчлэгдэж байгаарай",
    pl: "BĄDŹ NA BIEŻĄCO",
    bg: "Бъдете в течение",
    fr: "RESTEZ INFORMÉ",
    de: "BLEIBEN SIE AUF DEM LAUFENDEN",
    nl: "BLIJF OP DE HOOGTE",
    it: "RIMANI AGGIORNATO",
    pt: "FIQUE ATUALIZADO",
    ja: "最新情報を入手",
    vi: "LUÔN CẬP NHẬT",
  };

  // Fetch favorite card IDs

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

  // Fetch card data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${all_Card}/Stay Updated/${language}`
        );
        console.log("🚀 ~ fetchData ~ response: 2", response);
        setItems(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  const handleToggleFavorite = async (cardId: string) => {
    try {
      if (!userId) return;

      await axios.post(`${Home_user_Type_importance}/${userId}`, {
        cardId: cardId,
      });

      setFavoriteIds((prev) =>
        prev.includes(cardId)
          ? prev.filter((id) => id !== cardId)
          : [...prev, cardId]
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="home-stay-updated">
      {loading ? (
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
                key={index}
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
      ) : (
        <div className="text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-cinzel mb-12">
            {stayUpdatedTranslations[language] || stayUpdatedTranslations.en}
          </h2>
          <div className="flex flex-wrap justify-center gap-3 py-12">
            {items.map((item) => (
              <Card
                key={item._id}
                id={item._id}
                link={item.link || "#"}
                name={item.name}
                img={item.img}
                isFavorite={favoriteIds.includes(item._id)}
                onFavoriteToggle={handleToggleFavorite}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home_4_Stay_Updated;
