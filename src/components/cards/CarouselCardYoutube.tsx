// import { toast, ToastContainer } from "react-toastify";
// import React from "react";
// import axios from "axios";
// import { add_LinkLog } from "../../allapi/api";

// interface CardProps {
//   link?: string;
//   name: string;
//   img?: string;
//   id: string;
// }

// const CarouselCardYoutube: React.FC<CardProps> = ({
//   link = "#",
//   // name,
//   img,
//   // id,
// }) => {
//   const clickLinkLog = () => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       console.error("User ID not found in localStorage");
//       return;
//     }

//     const payload = {
//       userId: userId,
//       // cardId: id,
//       // cardName: name,
//     };

//     console.log("Logging click:", payload);

//     axios
//       .post(add_LinkLog, payload)
//       .then((response) => {
//         console.log("Log response:", response);
//       })
//       .catch((error) => {
//         console.error("Error logging click:", error);
//       });
//   };

//   const notify = () => {
//     toast.info("Coming Soon!", {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "light",
//       style: {
//         backgroundColor: "#E0F7FA",
//         color: "#004D40",
//         fontWeight: "600",
//         fontSize: "14px",
//         padding: "12px 16px",
//         borderRadius: "10px",
//         boxShadow: "0 4px 8px rgba(0, 77, 64, 0.2)",
//         maxWidth: "90vw",
//         wordWrap: "break-word",
//       },
//     });
//   };
//   return (
//     <div
//       className="rounded-lg shadow-2xl flex flex-col items-center p-10 transition-all duration-500 ease-in-out text-[#5A382D] hover:text-[#7B480F] hover:scale-105 hover:font-bold cursor-pointer w-[10rem] sm:w-[15rem]"
//       onClick={clickLinkLog}
//       style={{
//         height: "120px",
//         width: "220px",
//         // margin: "3rem auto",
//         // maxWidth: "10rem",
//         // boxShadow: "2px 2px 10px 0 rgb(97 75 66 / 70%)",
//         boxShadow: "rgba(97, 75, 66, 0.7) 2px 2px 5px 0px",
//         backgroundImage: img
//           ? `url(${img})`
//           : "linear-gradient(45deg, #b3b3b3, #e0e0e0)", // Fallback
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         borderRadius: "10px",
//         position: "relative",
//         display: "flex",
//         alignItems: "flex-end",
//       }}
//     >
//       <ToastContainer />
//     </div>
//   );
// };

// export default CarouselCardYoutube;

import React from "react";

interface CardProps {
  link?: string;
  name?: string; // Made optional to match YouTubeVideo interface
  img?: string;
  id?: string; // Made optional as it's not used
  onClick?: () => void; // Added to handle click events in parent
}

const CarouselCardYoutube: React.FC<CardProps> = ({
  link = "#",
  // name,
  img,
  // id,
  onClick,
}) => {
  return (
    <div
      className="rounded-lg shadow-2xl flex flex-col items-center transition-all duration-500 ease-in-out text-[#5A382D] hover:text-[#7B480F] hover:scale-105 hover:font-bold cursor-pointer w-[10rem] sm:w-[15rem] h-[120px]"
      onClick={onClick} // Delegate click handling to parent
      style={{
        backgroundImage: img
          ? `url(${img})`
          : "linear-gradient(45deg, #b3b3b3, #e0e0e0)", // Fallback gradient
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "rgba(97, 75, 66, 0.7) 2px 2px 5px 0px",
        borderRadius: "10px",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {/* Optional: Add overlay or text if needed */}
      {/* {name && (
        <span className="text-sm font-semibold bg-black bg-opacity-50 text-white p-2 w-full text-center">
          {name}
        </span>
      )} */}
    </div>
  );
};

export default CarouselCardYoutube;
