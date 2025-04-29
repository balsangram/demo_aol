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
    en: "Experience Center Digitally",
    hi: "डिजिटल रूप में अनुभव केंद्र",
    kn: "ಡಿಜಿಟಲ್ ಅನುಭವ ಕೇಂದ್ರ",
    ta: "டிஜிட்டல் அனுபவ மையம்",
    te: "డిజిటల్ అనుభవ కేంద్రం",
    gu: "ડિજિટલ અનુભવ કેન્દ્ર",
    mr: "डिजिटल अनुभव केंद्र",
    ml: "ഡിജിറ്റൽ അനുഭവ കേന്ദ്രം",
    pa: "ਡਿਜੀਟਲ ਅਨੁਭਵ ਕੇਂਦਰ",
    bn: "ডিজিটাল অভিজ্ঞতা কেন্দ্র",
    ru: "Центр цифрового опыта",
    es: "Centro de experiencia digital",
    zh: "数字体验中心",
    mn: "Дижитал туршлагын төв",
    pl: "Centrum Doświadczeń Cyfrowych",
    bg: "Център за дигитално изживяване",
    fr: "Centre d'expérience numérique",
    de: "Digitales Erlebniszentrum",
    nl: "Digitaal Ervaringscentrum",
    it: "Centro di Esperienza Digitale",
    pt: "Centro de Experiência Digital",
    ja: "デジタル体験センター",
    vi: "Trung tâm trải nghiệm kỹ thuật số",
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${all_Card}/Experience Center Digitally/${selectedLanguage}`
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
        <div className="w-full text-center sm:my-4 px-4">
          {/* Header Skeleton */}
          <Skeleton
            height={30}
            width={260}
            className="mx-auto mb-6"
            style={{ borderRadius: "8px" }}
          />

          {/* Responsive Skeleton Cards */}
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
        <div className="text-center py-8 px-4 ">
          <h2 className=" text-2xl sm:text-3xl font-bold font-[Cinzel] mb-8">
            {translations[selectedLanguage] || translations["en"]}
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
}

export default Home_2_Experience_Center_Digitally;
