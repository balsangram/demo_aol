import React, { useEffect, useState } from "react";
import { Live_Date_Time, Live_Link } from "../allapi/api";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface LiveData {
  link: string;
}

interface UpdateData {
  content: string;
}

const LiveVideo: React.FC = () => {
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateMessage, setUpdateMessage] = useState<string>("");

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ data: LiveData[] }>(Live_Link);
        const rawLink = response.data.data[0]?.link;

        const videoIdMatch = rawLink?.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        const embedLink = videoIdMatch
          ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
          : null;

        setVideoLink(embedLink);
      } catch (error) {
        console.error("Error fetching video link:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, []);

  useEffect(() => {
    axios
      .get<{ data: UpdateData[] }>(Live_Date_Time)
      .then((response) => {
        const message = response.data.data[0]?.content;
        setUpdateMessage(message || "");
      })
      .catch((error) => {
        console.error("Error fetching update message:", error);
      });
  }, []);

  return (
    <div className="w-[60vw] h-[80vh] m-auto">
      {loading ? (
        <div className="flex justify-center items-center pb-12 w-full h-full mt-8">
          <Skeleton
            height="450px"
            width="800px"
            className="rounded-xl"
            style={{ borderRadius: "1rem" }}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center pb-12 w-full h-full mt-8">
          {videoLink ? (
            <iframe
              src={videoLink}
              width="800"
              height="450"
              title="Live Video"
              allowFullScreen
              className="rounded-xl shadow-lg"
            />
          ) : (
            <div className="flex flex-col justify-center items-center bg-gray-100 p-10 rounded-xl">
              <p className="text-center text-xl sm:text-3xl">
                {updateMessage || "Coming Soon"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveVideo;
