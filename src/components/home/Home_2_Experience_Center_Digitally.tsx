import React, { useEffect, useState } from "react";
import Card from "../cards/Card";
import { Experience_Center_Digitally } from "../../allapi/api";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface cards {
  link: string;
  name: string;
  img: string;
}

function Home_2_Experience_Center_Digitally() {
  const [items, setItems] = useState<cards[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(Experience_Center_Digitally);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching experience center data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full text-center  sm:my-4 px-4">
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
        <div className="text-center  py-8 px-4 ">
          <h2 className=" text-2xl sm:text-3xl font-bold font-[Cinzel] mb-8">
            {/* Experience Center Digitally */}
            EXPERIENCE CENTER DIGITALLY
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
