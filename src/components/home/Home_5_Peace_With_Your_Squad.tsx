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

interface Card {
  link: string;
  img: string;
  name: string;
}

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
    // axios
    //   .get(Experience_Peace_With_Your_Squad)
    //   .then((response) => {
    //     console.log(response.data);
    //     setSlides(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
        <section className="bg-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-12 font-cinzel">
              Facilities & Services at Center
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
