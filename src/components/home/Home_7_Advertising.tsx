import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Advertisement_Img } from "../../allapi/api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CustomLeftArrow from "../Carousel/CustomLeftArrow";
import CustomRightArrow from "../Carousel/CustomRightArrow";

interface Advertisement {
  link: string;
  img: string;
}

interface RawAdvertisement {
  [key: string]: {
    link: string;
    img: string;
  };
}

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

const Home_7_Advertising: React.FC = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(Advertisement_Img);
        // console.log(data.data, "response adv");

        if (data.data.length > 0) {
          const adData: RawAdvertisement = data.data[0];
          const extractedAds = Object.values(adData)
            .filter(
              (item) => typeof item === "object" && item?.img && item?.link
            )
            .map((item) => ({
              link: item.link,
              img: item.img,
            }));

          setAds(extractedAds);
        }
      } catch (error) {
        console.error("Failed to fetch ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return (
    <div>
      {loading && (
        <div className="flex gap-4 flex-wrap justify-center pb-12">
          {[1, 2, 3].map((_, j) => (
            <Skeleton
              key={j}
              height={300}
              width="100%"
              className="rounded-xl"
              style={{ borderRadius: "1rem" }}
            />
          ))}
        </div>
      )}
      {!loading && (
        <section className="py-8 sm:py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 sm:mb-12 font-cinzel">
              {/* ADVERTISEMENT BAR */}
              UPCOMING PROGRAMS/ ACTIVITIES AT THE CENTER
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
                {ads.map((ad, index) => (
                  <div key={index}>
                    <a href={ad.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={ad.img}
                        alt={`Advertisement ${index + 1}`}
                        style={{
                          height: "40vh",
                          width: "96%",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </a>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home_7_Advertising;
