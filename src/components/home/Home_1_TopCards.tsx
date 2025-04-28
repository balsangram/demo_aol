import Card from "../cards/Card";
import img1 from "../../assets/images/guruji1.jpg";
import img2 from "../../assets/images/guruji2.png";
import img3 from "../../assets/images/guruji3.jpg";
import img4 from "../../assets/images/guruji4.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";

const items = [
  {
    Contents: "Our Founder",
    Links: "https://gurudev.artofliving.org/",
    img: img1,
  },
  {
    Contents: "Bengaluru International Center",
    Links: "https://bangaloreashram.org/",
    img: img2,
  },
  {
    Contents: "Register for Programs",
    Links: "https://programs.vvmvp.org/",
    img: img3,
  },
  {
    Contents: "Visitor Service",
    Links: "http://aolic.org/kiosk",
    img: img4,
  },
];

function Home_1_TopCards() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4 pt-8 sm:pt-0">
      <div className="flex flex-wrap justify-center gap-6">
        {loading ? (
          items.map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-2xl w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px]"
            >
              <Skeleton height="5rem" width="5rem" circle />
              <Skeleton width="70%" height="1.5rem" className="mt-2" />
            </div>
          ))
        ) : (
          <div className="flex flex-wrap justify-center gap-6 ">
            {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 "> */}
            {items.map((item, index) => (
              <Card
                key={index}
                link={item.Links}
                name={item.Contents}
                img={item.img}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home_1_TopCards;
