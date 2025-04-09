import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { user_Type } from "../../allapi/api";
import InternalLoginSearch from "../../components/search/InternalLoginSearch";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface card {
  link: string;
  usertype: string;
  img: string;
  state: string;
}

function Internal() {
  const [internal, setInternal] = useState<card[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(user_Type);
        setInternal(response.data);
      } catch (error) {
        console.error("Error fetching user types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = internal.filter((item) =>
    item.usertype.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <InternalLoginSearch onSearch={(val) => setSearchTerm(val)} />
      {loading ? (
        <div className="flex gap-4 flex-wrap justify-center pb-12 mt-10">
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
      ) : (
        <>
          <div className="flex gap-12 flex-wrap justify-center my-12">
            {filtered.map((item, index) => (
              <Link
                key={index}
                to="/internal2"
                state={{ usertype: item.usertype }}
                className="shadow-2xl flex p-10 transition-all duration-500 ease-in-out w-full flex-col cursor-pointer min-w-6 text-[#5A382D]
                  hover:text-[#7B480F] hover:font-bold hover:shadow-2xl hover:scale-105 hover:px-7"
                style={{
                  backgroundColor: "white",
                  boxShadow: "10px 10px 20px 0 rgb(97 75 66 / 70%)",
                  borderRadius: "4px",
                  maxWidth: "15rem",
                  maxHeight: "15rem",
                }}
              >
                <img
                  src={item.img}
                  alt={item.usertype}
                  style={{
                    height: "5rem",
                    width: "5rem",
                    margin: "auto",
                    borderRadius: "5rem",
                  }}
                />
                <div className="text-center m-auto text-xl mt-4">
                  {item.usertype}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Internal;
