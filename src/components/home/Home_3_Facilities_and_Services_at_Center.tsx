import React, { useEffect, useState } from "react";
import axios from "axios";
import { all_Card } from "../../allapi/api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselCard from "../cards/CarouselCard";
import CustomLeftArrow from "../Carousel/CustomLeftArrow";
import CustomRightArrow from "../Carousel/CustomRightArrow";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLanguage } from "../../context/LanguageContext";
import CarouselCard2 from "../cards/CarouselCard2";

interface Card {
  link: string;
  img: string;
  name: string;
}

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

const facilitiesAndServices: { [key: string]: string } = {
  en: "FACILITIES & SERVICES",
  hi: "सुविधाएँ और सेवाएँ",
  kn: "ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಸೇವೆಗಳು",
  ta: "வசதிகள் மற்றும் சேவைகள்",
  te: "సౌకర్యాలు మరియు సేవలు",
  gu: "સુવિધાઓ અને સેવાઓ",
  mr: "सुविधा आणि सेवा",
  ml: "സൗകര്യങ്ങളും സേവനങ്ങളും",
  pa: "ਸੁਵਿਧਾਵਾਂ ਅਤੇ ਸੇਵਾਵਾਂ",
  bn: "সুবিধা এবং সেবা",
  ru: "Услуги и удобства",
  es: "Instalaciones y servicios",
  zh: "设施与服务",
  mn: "Байгууламж, үйлчилгээ",
  pl: "Udogodnienia i usługi",
  bg: "Удобства и услуги",
  fr: "Installations et services",
  de: "Einrichtungen und Dienstleistungen",
  nl: "Faciliteiten en diensten",
  it: "Strutture e servizi",
  pt: "Instalações e serviços",
  ja: "施設とサービス",
  vi: "Cơ sở vật chất và dịch vụ",
};

const Home_3_Facilities_and_Services_at_Center = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState<Card[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
           `${all_Card}/Facilities & Services at Center/${language}`
          // `${all_Card}/FACILITIES & SERVICES/${language}`
        );
        setSlides(response.data);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  const translatedTitle =
    facilitiesAndServices[language] || facilitiesAndServices["en"];

  return (
    <>
      {/* Desktop View */}
      <div className="w-full text-center sm:my-4 px-4 mt-4 sm:block hidden">
        <h1
          className="text-[24px] font-bold text-center font-cinzel "
          style={{
            lineHeight: "2rem",
          }}
        >
          {translatedTitle}
        </h1>

        {loading ? (
          <div className="flex gap-6 flex-wrap justify-center sm:pb-12">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="my-12 flex flex-col items-center justify-center p-4  rounded-2xl w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px]"
              >
                <Skeleton height="15rem" width="15rem" />
              </div>
            ))}
          </div>
        ) : (
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={2000}
            keyBoardControl
            // customLeftArrow={<CustomRightArrow />}
            // customRightArrow={<CustomLeftArrow />}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            containerClass="carousel-container relative"
            rtl
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                onClick={() => {
                  const link = slide?.link || "#";
                  if (link !== "#") window.open(link, "_blank");
                }}
                className="cursor-pointer"
              >
                <div key={index}>
                  <CarouselCard2
                    img={slide.img}
                    // link={slide.link}
                    // link={slide?.link ? slide.link : "#"}
                    name={slide.name}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden">
        {/* <h1 className="text-3xl font-bold text-center font-cinzel mb-6"> */}
        <h1
          className="text-[24px] font-bold text-center font-cinzel "
          style={{
            lineHeight: "2rem",
          }}
        >
          {translatedTitle}
        </h1>

        <div className="flex overflow-x-auto gap-3 pb-2 px-1">
          {loading
            ? [...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className=" flex-shrink-0  rounded-2xl my-[3rem] h-[15rem] w-[10rem] gap-8"
                >
                  <Skeleton
                    height="15rem"
                    width="10rem"
                    className=" mb-4 rounded-2xl mx-4"
                  />
                </div>
              ))
            : slides.map((slide, index) => (
                <div
                  key={index}
                  className="min-w-[200px] flex-shrink-0 "
                  onClick={() => {
                    const link = slide?.link || "#";
                    if (link !== "#") window.open(link, "_blank");
                  }}
                >
                  <CarouselCard
                    img={slide.img}
                    link={slide.link}
                    name={slide.name}
                  />
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Home_3_Facilities_and_Services_at_Center;
