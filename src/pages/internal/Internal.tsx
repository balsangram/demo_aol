import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { user_Type } from "../../allapi/api";
import InternalLoginSearch from "../../components/search/InternalLoginSearch";
import Skeleton from "react-loading-skeleton";
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
    <div className="h-[80vh]">
      <InternalLoginSearch onSearch={(val) => setSearchTerm(val)} />
      {loading ? (
        <div className="flex gap-12 flex-wrap justify-center my-12">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="flex sm:p-10 p-4 
                bg-[#ffffff7e]
                text-[#06202B]
                flex-col 
                cursor-pointer 
                min-w-6  
                h-[150px] 
                w-[150px] 
                sm:w-[15rem] 
                sm:h-[15rem] 
                md:rounded-[4px] 
                rounded-[16px]"
            >
              <Skeleton
                height="5rem"
                width="5rem"
                circle
                style={{ margin: "auto" }}
              />
              <div className="text-center m-auto text-[14px] sm:text-xl h-20 sm:mt-4 mt-1 flex justify-center items-center font-bold">
                <Skeleton width="80%" height="1.5rem" />
              </div>
            </div>
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
                className="flex sm:p-10 p-4 
                  transition-all duration-500 ease-in-out
                  bg-[#ffffff7e]
                  text-[#06202B]
                  hover:font-bold hover:scale-105 hover:px-7
                  flex-col cursor-pointer min-w-6 h-[150px] w-[150px] sm:w-[15rem] sm:h-[15rem] md:rounded-[4px] rounded-[16px]"
                style={{ overflow: "hidden" }}
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
                <div className="text-center m-auto text-[14px] sm:text-xl h-20 sm:mt-4 mt-1 flex justify-center items-center font-bold">
                  {item.usertype}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Internal;
