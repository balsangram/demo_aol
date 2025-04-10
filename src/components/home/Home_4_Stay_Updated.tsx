import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../cards/Card";
import { Stay_Updated } from "../../allapi/api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface CardItem {
  name: string;
  link: string;
  img: string;
}

const Home_4_Stay_Updated: React.FC = () => {
  const [items, setItems] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Stay_Updated);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <SkeletonTheme>
          <div className="w-full text-center my-4">
            <Skeleton
              height={30}
              width={200}
              className="mx-auto mb-4"
              style={{ borderRadius: "8px" }}
            />
            <div className="flex gap-4 flex-wrap justify-center pb-12">
              {[1, 2, 3, 4].map((_, index) => (
                <Skeleton
                  key={index}
                  height={240}
                  width={240}
                  className="rounded-xl"
                  style={{ borderRadius: "1rem" }}
                />
              ))}
            </div>
          </div>
        </SkeletonTheme>
      ) : (
        <div className="text-center">
          <h2 className="mt-12 text-3xl font-bold py-8 leading-relaxed font-cinzel">
            Stay Updated
          </h2>
          <div className="flex items-center justify-center gap-8 ">
            {/* <div className="flex justify-center flex-wrap gap-4"> */}
            {items.map((item, index) => (
              <Card
                key={index}
                link={item.link}
                name={item.name}
                img={item.img}
              />
            ))}
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Home_4_Stay_Updated;
