import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { youtubeLink } from "../../allapi/api";
import CustomLeftArrow from "../Carousel/CustomLeftArrow";
import CustomRightArrow from "../Carousel/CustomRightArrow";
import { useLanguage } from "../../context/LanguageContext";
import CarouselCardYoutube from "../cards/CarouselCardYoutube";
// import CarouselCard from "../cards/CarouselCard";
// import CarouselCardYoutube from "../cards/CarouselCardYoutube";

interface YouTubeVideo {
  YouTubeLink: string;
  thumbnail: string;
}

const extractYouTubeID = (url: string) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/|.*shorts\/))([^?&/"'>]+)/
  );
  return match ? match[1] : null;
};

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

const peaceOfMindTranslations: { [key: string]: string } = {
  en: "PEACE OF MIND",
  hi: "मन की शांति",
  kn: "ಮನಸ್ಸಿನ ಶಾಂತಿ",
  ta: "மன அமைதி",
  te: "మానసిక శాంతి",
  gu: "મનની શાંતિ",
  mr: "मनःशांती",
  ml: "മനസ്സിന്റെ സമാധാനം",
  pa: "ਮਨ ਦੀ ਸ਼ਾਂਤੀ",
  bn: "মানসিক শান্তি",
  ru: "Душевное спокойствие",
  es: "PAZ MENTAL",
  zh: "心灵的平静",
  mn: "Сэтгэлийн амар амгалан",
  pl: "SPOKÓJ UMYSŁU",
  bg: "Спокойствие на ума",
  fr: "SÉRÉNITÉ D'ESPRIT",
  de: "Seelenfrieden",
  nl: "Gemoedsrust",
  it: "PACE DELLA MENTE",
  pt: "PAZ DE ESPÍRITO",
  ja: "心の平安",
  vi: "Sự yên tâm",
};

const Home_6_Peace_Of_Mind: React.FC = () => {
  const { language } = useLanguage();
  const [sriVideos, setSriVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ links: YouTubeVideo[] }>(
          youtubeLink
        );
        setSriVideos(response.data.links);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <SkeletonTheme>
        <div className="w-full text-center my-4">
          <Skeleton
            height={30}
            width={200}
            className="mx-auto mb-4"
            style={{ borderRadius: "8px" }}
          />
          <div className="flex gap-4 flex-wrap justify-center pb-12">
            {[1, 2, 3].map((_, index) => (
              <Skeleton
                key={index}
                height={300}
                width="100%"
                className="rounded-xl"
                style={{ borderRadius: "1rem" }}
              />
            ))}
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <section className="px-4">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-[24px] font-bold text-center font-cinzel pb-8"
          style={{
            lineHeight: "2rem",
          }}
        >
          {peaceOfMindTranslations[language] || peaceOfMindTranslations["en"]}
        </h1>
        {loading ? (
          <div className="flex overflow-x-auto gap-8 pb-2 px-1 ">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className=" flex-shrink-0  rounded-2xl my-[3rem] h-[12rem] w-[20rem] gap-8"
              >
                <Skeleton height="12rem" width="20rem" className=" " />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative z-0 hidden sm:block">
            <Carousel
              responsive={responsive}
              infinite
              autoPlay
              autoPlaySpeed={2000}
              keyBoardControl
              customLeftArrow={<CustomLeftArrow />}
              customRightArrow={<CustomRightArrow />}
              containerClass="carousel-container relative"
              rtl
            >
              {sriVideos.map((video, index) => (
                <div key={index} className="px-2 z-0 py-12">
                  <a
                    // href={video.YouTubeLink}
                    href={video?.YouTubeLink ? video.YouTubeLink : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block sm:w-full w-[220px] h-[120px] sm:h-[250px] overflow-hidden rounded-xl shadow-md"
                  >
                    <video
                      className="w-full h-full object-cover pointer-events-none "
                      poster={video.thumbnail}
                      muted
                    >
                      <source src={video.YouTubeLink} type="video/mp4" />
                      {/* Your browser does not support the video tag. */}
                    </video>
                  </a>
                </div>
              ))}
            </Carousel>
          </div>
        )}
        <div className="relative z-0 sm:hidden overflow-x-auto flex gap-4 pb-4">
          {loading
            ? [...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 rounded-2xl my-12 h-[15rem] w-[10rem] gap-8"
                >
                  <Skeleton
                    height="15rem"
                    width="10rem"
                    className="mb-4 rounded-2xl mx-4"
                  />
                </div>
              ))
            : sriVideos.map((slide, index) => (
                <div
                  key={index}
                  className="min-w-[200px] flex-shrink-0 cursor-pointer"
                  onClick={() => {
                    const link = slide?.YouTubeLink || "#";
                    if (link !== "#") window.open(link, "_blank");
                  }}
                >
                  <CarouselCardYoutube
                    img={slide.thumbnail}
                    link={slide.YouTubeLink}
                  />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Home_6_Peace_Of_Mind;
