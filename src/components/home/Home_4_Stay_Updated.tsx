import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../cards/Card";
import { all_Card, Stay_Updated } from "../../allapi/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLanguage } from "../../context/LanguageContext"; // adjust path if needed
import { ToastContainer } from "react-toastify";

interface CardItem {
  name: string;
  link: string;
  img: string;
  _id: string;
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
        const response = await axios.get(
          `${all_Card}/Stay Updated/${language}`
          // `${all_Card}/STAY UPDATED/${language}`
        );
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
        <div className="w-full text-center sm:my-4 px-4 mt-4">
          {/* <ToastContainer /> */}

          {/* Header Skeleton */}
          <Skeleton
            height={30}
            width={260}
            className="mx-auto mb-6"
            style={{ borderRadius: "8px" }}
          />

          {/* Responsive Skeleton Cards */}
          <div className="flex gap-6 flex-wrap justify-center sm:pb-12">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-2xl w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px]"
              >
                <div className="mb-3">
                  <Skeleton height="5rem" width="5rem" circle />
                </div>
                <div className="w-[70%]">
                  <Skeleton
                    height="1rem"
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center px-4 ">
          {/* <ToastContainer /> */}
          <h2
            className=" text-[24px] sm:text-3xl font-bold leading-relaxed font-cinzel "
            style={{
              lineHeight: "2rem",
            }}
          >
            {stayUpdatedTranslations[language] || stayUpdatedTranslations["en"]}
          </h2>
          <div className="flex flex-wrap justify-center gap-3 py-12 ">
            {items.map((item, index) => (
              <Card
                id={item._id}
                key={index}
                link={item?.link ? item.link : "#"}
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
