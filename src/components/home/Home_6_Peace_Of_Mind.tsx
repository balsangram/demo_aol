import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { youtubeLink } from "../../allapi/api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CustomLeftArrow from "../Carousel/CustomLeftArrow";
import CustomRightArrow from "../Carousel/CustomRightArrow";

interface YouTubeVideo {
  YouTubeLink: string;
  thumbnail: string;
}

const extractYouTubeID = (url: string) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/|.*shorts\/))([^?&/"'>]+)/
  );
  return match ? match[1] : null;
};

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

const Home_6_Peace_Of_Mind: React.FC = () => {
  const [sriVideos, setSriVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ links: YouTubeVideo[] }>(
          youtubeLink
        );
        setSriVideos(response.data.links);
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
          <div className="w-full text-center my-4">
            <Skeleton
              height={30}
              width={200}
              className="mx-auto mb-4"
              style={{ borderRadius: "8px" }}
            />

            <div className="flex gap-4 flex-wrap justify-center pb-12">
              {[1, 2, 3].map((_, j) => (
                <Skeleton
                  key={j}
                  height={300}
                  width="100%"
                  className="rounded-xl"
                  style={{ borderRadius: "1rem" }}
                />
              ))}
            </div>
          </div>
        </SkeletonTheme>
      )}
      {!loading && (
        <section className="  px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 sm:mb-8 font-cinzel">
              PEACE OF MIND
            </h1>

            <div className="relative z-0  ">
              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                containerClass="carousel-container relative"
                rtl={true}
              >
                {sriVideos.map((video, index) => (
                  <div key={index} className="px-2 z-0">
                    <a
                      href={video.YouTubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-[200px] sm:h-[250px] overflow-hidden rounded-xl shadow-md "
                    >
                      <video
                        className="w-full h-full object-cover pointer-events-none"
                        poster={video.thumbnail}
                        muted
                      >
                        <source src={video.YouTubeLink} type="video/mp4" />
                        {/* Your browser does not support the video tag. */}
                      </video>
                    </a>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home_6_Peace_Of_Mind;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { youtubeLink } from "../../allapi/api";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// interface YouTubeVideo {
//   YouTubeLink: string;
//   thumbnail: string;
// }

// const extractYouTubeID = (url: string) => {
//   const match = url.match(
//     /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/|.*shorts\/))([^?&/"'>]+)/
//   );
//   return match ? match[1] : null;
// };

// const responsive = {
//   superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
//   desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
//   tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
//   mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
// };

// const Home_6_Peace_Of_Mind: React.FC = () => {
//   const [sriVideos, setSriVideos] = useState<YouTubeVideo[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get<{ links: YouTubeVideo[] }>(
//           youtubeLink
//         );
//         setSriVideos(response.data.links);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <>
//       {loading && (
//         <SkeletonTheme>
//           <div className="w-full text-center my-4">
//             <Skeleton
//               height={30}
//               width={200}
//               className="mx-auto mb-4"
//               style={{ borderRadius: "8px" }}
//             />

//             <div className="flex gap-4 flex-wrap justify-center pb-12">
//               {[1, 2, 3].map((_, j) => (
//                 <Skeleton
//                   key={j}
//                   height={300}
//                   width="100%"
//                   className="rounded-xl"
//                   style={{ borderRadius: "1rem" }}
//                 />
//               ))}
//             </div>
//           </div>
//         </SkeletonTheme>
//       )}
//       {!loading && (
//         <div className="p-12 bg-white z-0">
//           <h2 className="text-3xl font-bold text-center mb-8 font-cinzel">
//             Peace Of Mind
//           </h2>

//           <Carousel
//             responsive={responsive}
//             infinite={true}
//             autoPlay={true}
//             autoPlaySpeed={2000}
//             arrows={true}
//             keyBoardControl={true}
//             containerClass="carousel-container"
//             rtl={true}
//             // className="bg-pink-400"
//           >
//             {sriVideos.map((video, index) => (
//               <div key={index} className="px-2 z-0">
//                 <a
//                   href={video.YouTubeLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block w-full h-[300px] overflow-hidden rounded-xl shadow-md "
//                 >
//                   <video
//                     className="w-full h-full object-cover pointer-events-none"
//                     poster={video.thumbnail}
//                     muted
//                   >
//                     <source src={video.YouTubeLink} type="video/mp4" />
//                     {/* Your browser does not support the video tag. */}
//                   </video>
//                 </a>
//               </div>
//             ))}
//           </Carousel>
//         </div>
//       )}
//     </>
//   );
// };

// export default Home_6_Peace_Of_Mind;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { youtubeLink } from "../../allapi/api";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// interface YouTubeVideo {
//   YouTubeLink: string;
//   thumbnail: string;
// }

// const extractYouTubeID = (url: string) => {
//   const match = url.match(
//     /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/|.*shorts\/))([^?&/"'>]+)/
//   );
//   return match ? match[1] : null;
// };

// const responsive = {
//   superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
//   desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
//   tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
//   mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
// };

// const Home_6_Peace_Of_Mind: React.FC = () => {
//   const [sriVideos, setSriVideos] = useState<YouTubeVideo[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get<{ links: YouTubeVideo[] }>(
//           youtubeLink
//         );
//         setSriVideos(response.data.links);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <SkeletonTheme>
//           <div className="w-full text-center my-4">
//             <Skeleton
//               height={30}
//               width={200}
//               className="mx-auto mb-4"
//               style={{ borderRadius: "8px" }}
//             />

//             <div className="flex gap-4 flex-wrap justify-center pb-12">
//               {[1, 2, 3].map((_, j) => (
//                 <Skeleton
//                   key={j}
//                   height={300}
//                   width="100%"
//                   className="rounded-xl"
//                   style={{ borderRadius: "1rem" }}
//                 />
//               ))}
//             </div>
//           </div>
//         </SkeletonTheme>
//       ) : (
//         <div className="p-12 bg-white">
//           <h2 className="text-3xl font-bold text-center mb-8 font-cinzel">
//             Peace Of Mind
//           </h2>

//           <Carousel
//             responsive={responsive}
//             infinite={true}
//             autoPlay={true}
//             autoPlaySpeed={2000}
//             arrows={true}
//             keyBoardControl={true}
//             containerClass="carousel-container"
//             rtl={true}
//           >
//             {sriVideos.map((video, index) => {
//               const videoId = extractYouTubeID(video.YouTubeLink);
//               return (
//                 videoId && (
//                   <div key={index} className="px-2">
//                     <iframe
//                       width="100%"
//                       height="300"
//                       src={`https://www.youtube.com/embed/${videoId}`}
//                       title={`Peace of Mind Video ${index + 1}`}
//                       frameBorder="0"
//                       allowFullScreen
//                       className="rounded-xl shadow-md"
//                     ></iframe>
//                   </div>
//                 )
//               );
//             })}
//           </Carousel>
//         </div>
//       )}
//     </>
//   );
// };

// export default Home_6_Peace_Of_Mind;
