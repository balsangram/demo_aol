import Card from "../cards/Card";
import img1 from "../../assets/images/guruji1.jpg";
import img2 from "../../assets/images/guruji2.png";
import img3 from "../../assets/images/guruji3.jpg";
import img4 from "../../assets/images/guruji4.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";

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
  return (
    <div>
      <div
        className="flex gap-12 flex-wrap justify-around px-12"
        style={{
          // maxWidth:"00px",
          margin: " auto ",
          paddingBottom: "3rem",
        }}
      >
        {items.map((item, index) => (
          <Card
            key={index}
            link={item.Links}
            name={item.Contents}
            img={item.img}
          />
        ))}
      </div>
    </div>
  );
}

export default Home_1_TopCards;
