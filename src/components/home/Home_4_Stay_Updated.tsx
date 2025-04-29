import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../cards/Card";
import { all_Card, Stay_Updated } from "../../allapi/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLanguage } from "../../context/LanguageContext"; // adjust path if needed

interface CardItem {
  name: string;
  link: string;
  img: string;
}

const Home_4_Stay_Updated: React.FC = () => {
  const [items, setItems] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { language } = useLanguage();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${all_Card}/Stay Updated/${language}`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full text-center sm:my-4 px-4">
          <Skeleton
            height={30}
            width={200}
            className="mx-auto mb-6"
            style={{ borderRadius: "8px" }}
          />
          <div className="flex gap-6 flex-wrap justify-center pb-12">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-[#ffffff7e] rounded-[16px] w-[150px] h-[150px] sm:w-[15rem] sm:h-[15rem]"
              >
                <Skeleton
                  height="5rem"
                  width="5rem"
                  circle
                  style={{ marginBottom: "1rem" }}
                />
                <Skeleton width="70%" height="1.5rem" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center px-4 ">
          <h2 className="sm:mt-2 text-2xl sm:text-3xl py-8 font-bold sm:py-8 leading-relaxed font-cinzel">
            {/* Stay Updated */}
            {/* STAY UPDATE */}
            {stayUpdatedTranslations[language] || stayUpdatedTranslations["en"]}
          </h2>
          <div className="flex flex-wrap justify-center gap-6 ">
            {items.map((item, index) => (
              <Card
                key={index}
                link={item.link}
                name={item.name}
                img={item.img}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home_4_Stay_Updated;
