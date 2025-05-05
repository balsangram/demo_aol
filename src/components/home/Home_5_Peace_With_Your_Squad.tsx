import React, { useEffect, useState } from "react";
import axios from "axios";
import { all_Card, Experience_Peace_With_Your_Squad } from "../../allapi/api";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselCard from "../cards/CarouselCard";
import CustomLeftArrow from "../Carousel/CustomLeftArrow";
import CustomRightArrow from "../Carousel/CustomRightArrow";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLanguage } from "../../context/LanguageContext";

interface Card {
  link: string;
  img: string;
  name: string;
}

const whatsNewTranslations: { [key: string]: string } = {
  en: "WHAT'S NEW",
  hi: "क्या नया है",
  kn: "ಏನು ಹೊಸದು",
  ta: "புதியவை என்ன",
  te: "ఏమి కొత్తది",
  gu: "શું નવું છે",
  mr: "नवीन काय आहे",
  ml: "പുതിയത് എന്താണ്",
  pa: "ਨਵਾਂ ਕੀ ਹੈ",
  bn: "নতুন কী",
  ru: "Что нового",
  es: "Qué hay de nuevo",
  zh: "最新动态",
  mn: "Шинэ юу байна",
  pl: "Co nowego",
  bg: "Какво ново",
  fr: "Quoi de neuf",
  de: "Was gibt's Neues",
  nl: "Wat is nieuw",
  it: "Cosa c'è di nuovo",
  pt: "O que há de novo",
  ja: "新着情報",
  vi: "Có gì mới",
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};
function Home_5_Peace_With_Your_Squad() {
  const { language } = useLanguage();
  const [slides, setSlides] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${all_Card}/Experience Peace With Your Squad/${language}`
        );
        setSlides(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Desktop View */}
      <div className="w-full text-center sm:my-0 px-4 mt-4 sm:mt-0 sm:block hidden">
        <h1 className="text-3xl font-bold text-center font-cinzel ">
          {whatsNewTranslations[language] || whatsNewTranslations["en"]}
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
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            containerClass="carousel-container relative"
          >
            {slides.map((slide, index) => (
              <div
                className="flex-shrink-0"
                key={index}
                onClick={() => {
                  const link = slide?.link || "#";
                  if (link !== "#") window.open(link, "_blank");
                }}
              >
                <CarouselCard
                  img={slide.img}
                  // link={slide.link}
                  // link={slide?.link ? slide.link : "#"}
                  name={slide.name}
                />
              </div>
            ))}
          </Carousel>
        )}
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden">
        <h1
          className="text-[24px] font-bold text-center font-cinzel"
          style={{
            lineHeight: "2rem",
          }}
        >
          {whatsNewTranslations[language] || whatsNewTranslations["en"]}
        </h1>

        <div className="flex overflow-x-auto gap-4 pb-2 px-1">
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
                  className="min-w-[200px] flex-shrink-0  "
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
}

export default Home_5_Peace_With_Your_Squad;
