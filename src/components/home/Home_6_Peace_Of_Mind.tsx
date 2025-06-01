import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { add_LinkLog, youtubeLink } from "../../allapi/api";
import CustomLeftArrow from "../Carousel/CustomLeftArrow";
import CustomRightArrow from "../Carousel/CustomRightArrow";
import { useLanguage } from "../../context/LanguageContext";
import CarouselCardYoutube from "../cards/CarouselCardYoutube";
import { ToastContainer } from "react-toastify";

interface YouTubeVideo {
  YouTubeLink: string;
  thumbnail: string;
  thumbnailName?: string; // Added optional thumbnailName
}

const extractYouTubeID = (url: string): string | null => {
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

const peaceOfMindTranslations: Record<string, string> = {
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
        console.error("Error fetching YouTube videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const clickLinkLog = (name?: string) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    const payload = {
      userId,
      cardName: name || "Unknown Video",
    };

    axios
      .post(add_LinkLog, payload)
      .then((response) => {
        console.log("Log response:", response.data);
      })
      .catch((error) => {
        console.error("Error logging click:", error);
      });
  };

  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[24px] font-bold text-center font-cinzel mb-8">
            {peaceOfMindTranslations[language] || peaceOfMindTranslations["en"]}
          </h1>

          {loading ? (
            <div className="flex gap-4 flex-wrap justify-center py-12">
              {[1, 2, 3].map((_, index) => (
                <Skeleton
                  key={index}
                  height={200}
                  width={300}
                  style={{ borderRadius: "1rem" }}
                />
              ))}
            </div>
          ) : (
            <div className="relative z-0">
              <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={2000}
                keyBoardControl
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                containerClass="carousel-container relative"
                // Removed rtl unless explicitly needed for your use case
              >
                {sriVideos.map((video, index) => (
                  <div key={index} className="px-2 py-12">
                    <a
                      href={video.YouTubeLink || "#"}
                      onClick={() => clickLinkLog(video.thumbnailName)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-[200px] sm:h-[250px] overflow-hidden rounded-xl shadow-md"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.thumbnailName || "YouTube Video"}
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                ))}
              </Carousel>

              {/* Mobile view fallback (optional, can rely on Carousel for all breakpoints) */}
              <div className="sm:hidden flex gap-4 overflow-x-auto py-12">
                {sriVideos.map((video, index) => (
                  <div
                    key={index}
                    className="min-w-[200px] flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      clickLinkLog(video.thumbnailName);
                      if (video.YouTubeLink)
                        window.open(video.YouTubeLink, "_blank");
                    }}
                  >
                    <CarouselCardYoutube
                      img={video.thumbnail}
                      link={video.YouTubeLink}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <ToastContainer />
    </SkeletonTheme>
  );
};

export default Home_6_Peace_Of_Mind;
