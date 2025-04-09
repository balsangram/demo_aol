import React, { useEffect, useState } from "react";
import { Live_Date_Time, Live_Link } from "../allapi/api";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface LiveData {
  link: string;
}

const LiveVideo: React.FC = () => {
  const [item, setItem] = useState<LiveData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  useEffect(() => {
    const functionData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ data: LiveData[] }>(Live_Link);
        const rawLink = response.data.data[0]?.link;

        // Extract video ID from the YouTube link (supporting m.youtube.com or www.youtube.com)
        const videoIdMatch = rawLink?.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        const embedLink = videoIdMatch
          ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
          : null;

        setItem({ link: embedLink || "" });
      } catch (error) {
        console.error("Error fetching live video:", error);
      } finally {
        setLoading(false);
      }
    };

    functionData();
  }, []);

  useEffect(() => {
    axios
      .get(Live_Date_Time)
      .then((response) => {
        console.log(response.data.data[0], "response date time");
        setDate(response.data.data[0]?.date);
        setTime(response.data.data[0]?.time);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-[60vw] h-[80vh] m-auto ">
      {loading ? (
        <div className="flex justify-center items-center pb-12 w-full h-full  m-auto mt-8">
          <Skeleton
            height="450px"
            width="800px"
            className="rounded-xl"
            style={{ borderRadius: "1rem" }}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center pb-12 w-full h-full m-auto mt-8 ">
          {item?.link ? (
            <iframe
              src={item.link}
              width="800"
              height="450"
              title="Live Video"
              allowFullScreen
              className="rounded-xl shadow-lg"
            />
          ) : (
            <div className="flex flex-col justify-center items-center sm:bg-gray-100 sm:p-24 rounded-xl">
              <p className=" text-center mb-6 sm:text-3xl text-lg">
                Scheduled Live Video on
              </p>

              <p className=" text-center sm:text-3xl text-lg">
                <strong>{date}</strong> at <strong>{time}</strong>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveVideo;
