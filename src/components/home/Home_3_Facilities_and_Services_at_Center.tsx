import React, { useEffect, useState } from "react";
import axios from "axios";
import { all_Card, Facilities_Services_at_Center } from "../../allapi/api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselCard from "../cards/CarouselCard";
import CustomLeftArrow from "../Carousel/CustomLeftArrow";
import CustomRightArrow from "../Carousel/CustomRightArrow";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLanguage } from "../../context/LanguageContext"; // Import the hook

// Define the structure of each card
interface Card {
  link: string;
  img: string;
  name: string;
}

// Responsive breakpoints for carousel
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

// Multilingual translations for the section title
const facilitiesAndServices: { [key: string]: string } = {
  en: "FACILITIES & SERVICES AT CENTER",
  hi: "केंद्र में सुविधाएँ और सेवाएँ",
  kn: "ಕೇಂದ್ರದಲ್ಲಿ ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಸೇವೆಗಳು",
  ta: "மையத்தில் வசதிகள் மற்றும் சேவைகள்",
  te: "కేంద్రంలో సౌకర్యాలు మరియు సేవలు",
  gu: "કेंद्रમાં સુવિધાઓ અને સેવાઓ",
  mr: "केंद्रात सुविधा आणि सेवा",
  ml: "കേന്ദ്രത്തിലെ സൗകര്യങ്ങളും സേവനങ്ങളും",
  pa: "ਕੇਂਦਰ ਵਿੱਚ ਸੁਵਿਧਾਵਾਂ ਅਤੇ ਸੇਵਾਵਾਂ",
  bn: "কেন্দ্রে সুবিধা এবং সেবা",
  ru: "Услуги и удобства в центре",
  es: "Instalaciones y servicios en el centro",
  zh: "中心的设施与服务",
  mn: "Төвийн үйлчилгээ болон үйлчилгээ",
  pl: "Usługi i udogodnienia w centrum",
  bg: "Услуги и удобства в центъра",
  fr: "Installations et services au centre",
  de: "Einrichtungen und Dienstleistungen im Zentrum",
  nl: "Faciliteiten en diensten in het centrum",
  it: "Strutture e servizi al centro",
  pt: "Instalações e serviços no centro",
  ja: "センターの施設とサービス",
  vi: "Cơ sở vật chất và dịch vụ tại trung tâm",
};

const Home_3_Facilities_and_Services_at_Center = () => {
  const { language } = useLanguage(); // Use language from context
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState<Card[]>([]);

  // Fetch the data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${all_Card}/Facilities & Services at Center/${language}`
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
      {loading && (
        <SkeletonTheme>
          {[1].map((_, i) => (
            <div key={i} className="w-full text-center my-4">
              {/* Headline Skeleton */}
              <Skeleton
                height={30}
                width={200}
                className="mx-auto mb-4"
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
        <section className="px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center font-cinzel">
              {/* Displaying the translated text */}
              {facilitiesAndServices[language] || facilitiesAndServices["en"]}
            </h1>

            <div className="relative z-0">
              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                containerClass="carousel-container relative"
                rtl={true}
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
};

export default Home_3_Facilities_and_Services_at_Center;
