import React, { useEffect, useState } from "react";
import axios from "axios";
import { Experience_Peace_With_Your_Squad } from "../../allapi/api";

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
        const response = await axios.get(Experience_Peace_With_Your_Squad);
        setSlides(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  },[])
  
    

  return (
    <>
      {loading && (
        <SkeletonTheme>
          {[1].map((_, i) => (
            <div key={i} className="w-full text-center my-4">
              {/* Headline Skeleton */}
              <Skeleton
                height={30}
                width={200}
                className="mx-auto sb:mb-4"
                style={{ borderRadius: "8px" }}
              />

              {/* Card Grid Skeletons */}
              <div className="flex gap-4 flex-wrap justify-center pb-12">
                {[1, 2, 3, 4].map((_, j) => (
                  <Skeleton
                    key={j}
                    height={240}
                    width={240}
                    className="rounded-xl"
                    style={{ borderRadius: "1rem" }}
                  />
                ))}
              </div>
            </div>
          ))}
        </SkeletonTheme>
      )}

      {!loading && (
        <section className=" sm:py-2 pt-4 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center font-cinzel">
              {/* WHATS'S NEW */}
              
              {whatsNewTranslations[language] || whatsNewTranslations["en"]}
            </h1>

            <div className="relative z-0  ">
              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                containerClass="carousel-container relative"
                // rtl={true}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="">
                    <CarouselCard
                      img={slide.img}
                      link={slide.link}
                      name={slide.name}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Home_5_Peace_With_Your_Squad;
