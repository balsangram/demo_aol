import React, { useEffect, useState } from "react";
import Card from "../cards/Card";
import { all_Card, Experience_Center_Digitally } from "../../allapi/api";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLanguage } from "../../context/LanguageContext"; // Import useLanguage

interface cards {
  link: string;
  name: string;
  img: string;
}

function Home_2_Experience_Center_Digitally() {
  const [items, setItems] = useState<cards[]>([]);
  const [loading, setLoading] = useState(true);

  const { language: selectedLanguage, setLanguage } = useLanguage(); // Use context here

  const translations: { [key: string]: string } = {
    en: "EXPERIENCE THE CENTER DIGITALLY",
    hi: "केंद्र को डिजिटल रूप से अनुभव करें",
    kn: "ಕೇಂದ್ರವನ್ನು ಡಿಜಿಟಲ್ ರೂಪದಲ್ಲಿ ಅನುಭವಿಸಿ",
    ta: "மையத்தை டிஜிட்டலாக அனுபவிக்கவும்",
    te: "కేంద్రాన్ని డిజిటల్‌గా అనుభవించండి",
    gu: "કેન્દ્રને ડિજિટલ રીતે અનુભવો",
    mr: "केंद्राचा डिजिटल अनुभव घ्या",
    ml: "സെന്ററെ ഡിജിറ്റലായി അനുഭവിക്കൂ",
    pa: "ਕੇਂਦਰ ਨੂੰ ਡਿਜੀਟਲ ਤਰੀਕੇ ਨਾਲ ਅਨੁਭਵ ਕਰੋ",
    bn: "কেন্দ্রটিকে ডিজিটালভাবে অনুভব করুন",
    ru: "Ощутите центр в цифровом формате",
    es: "Experimenta el centro digitalmente",
    zh: "数字化体验中心",
    mn: "Төвийг дижитал байдлаар мэдрээрэй",
    pl: "Doświadcz centrum cyfrowo",
    bg: "Изживейте центъра дигитално",
    fr: "Découvrez le centre numériquement",
    de: "Erleben Sie das Zentrum digital",
    nl: "Ervaar het centrum digitaal",
    it: "Vivi il centro digitalmente",
    pt: "Experimente o centro digitalmente",
    ja: "センターをデジタルで体験してください",
    vi: "Trải nghiệm trung tâm theo cách kỹ thuật số",
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${all_Card}/Experience Center Digitally/${selectedLanguage}`
          // `${all_Card}/EXPERIENCE THE CENTER DIGITALLY/${selectedLanguage}`
        );
        // const response = await axios.get(Experience_Center_Digitally);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching experience center data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang); // Store the selected language
    window.dispatchEvent(new Event("languageChange")); // Dispatch event for re-render
  };

  return (
    <>
      {loading ? (
        <div className="w-full text-center sm:my-4 px-4 mt-4 mb-6">
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
          <h2
            className=" text-[24px] sm:text-3xl   font-bold font-[Cinzel]"
            style={{
              lineHeight: "2rem",
            }}
          >
            {translations[selectedLanguage] || translations["en"]}
          </h2>

          <div className="flex flex-wrap justify-center gap-3 py-12 ">
            {items.map((item, index) => (
              <Card
                key={index}
                // link={item.link}
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
}

export default Home_2_Experience_Center_Digitally;
