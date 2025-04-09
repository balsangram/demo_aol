import React, { useEffect, useState } from "react";
// import img1 from "../../assets/images/image1.png"
import Card from "../cards/Card";
import axios from "axios";
import { Stay_Updated } from "../../allapi/api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface card {
  name: string;
  link: string;
  img: string;
}

function Home_4_Stay_Updated() {
  // const items = [
  //   { Contents: "Daily Events & Activities", Links: "", img: img1 },
  //   { Contents: "Upcoming Programs & Events", Links: "", img: img1 },
  // ];
  const [items, setItems] = useState<card[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(Stay_Updated);
        setItems(response.data);
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
        <div style={{ textAlign: "center", margin: "3rem " }}>
          <h2
            style={{
              marginTop: "3rem",
              fontSize: "2rem",
              fontWeight: "bold",
              padding: "2rem",
              lineHeight: "1.6",
              fontFamily: "Cinzel",
            }}
          >
            Stay Updated
          </h2>
          <div className="flex items-center justify-center gap-8">
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
        </div>
      )}
    </>
  );
}

export default Home_4_Stay_Updated;
