import React, { useEffect, useState } from "react";
import Card from "../cards/Card";
import { Experience_Center_Digitally } from "../../allapi/api";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
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
      {loading && (
        <SkeletonTheme>
          {[1].map((_, i) => (
            <div key={i} className="w-full text-center my-4 ">
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
        <div
          style={{
            textAlign: "center",
            // marginBottom: "1rem",
            // backgroundColor: "red",
            paddingBottom: "3rem",
          }}
        >
          <h2
            style={{
              marginTop: "1rem",
              fontSize: "2rem",
              fontWeight: "bold",
              padding: "2rem",
              lineHeight: "1.6",
              fontFamily: "Cinzel",
            }}
          >
            Experience Center Digitally
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
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
