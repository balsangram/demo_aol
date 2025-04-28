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
    <div className="text-center px-4 mt-12 min-h-[100vh]">
      <h2 className="text-3xl font-bold font-[Cinzel] mb-8 capitalize">
        {userType}
      </h2>

      <div className="flex gap-12 flex-wrap justify-center">
        {loading ? (
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
