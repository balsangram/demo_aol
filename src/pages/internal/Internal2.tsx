import React, { useEffect, useState } from "react";
import Card from "../../components/cards/Card";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { userType_action } from "../../allapi/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface card {
  action: string;
  link: string;
  img: string;
}

function Internal2() {
  const location = useLocation();
  const userType = location.state?.usertype;

  const [loading, setLoading] = useState(true);
  const [internal, setInternal] = useState<card[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${userType_action}/${userType}`);
        setInternal(response.data);
      } catch (error) {
        console.error("Error fetching user types:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userType) {
      fetchData();
    }
  }, [userType]);

  return (
    <div className="text-center px-4 mt-12">
      <h2 className="text-3xl font-bold font-[Cinzel] mb-8 capitalize">
        {userType}
      </h2>

      <div className="flex gap-12 flex-wrap justify-center">
        {loading ? (
          <div className="flex gap-6 flex-wrap justify-center pb-12">
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
        ) : internal.length > 0 ? (
          internal.map((item, index) => (
            <Card
              key={index}
              link={item.link}
              name={item.action}
              img={item.img}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg mt-4">No actions available.</p>
        )}
      </div>
    </div>
  );
}

export default Internal2;
