import React, { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { display_popup } from "../../allapi/api";

function Popups() {
  const [show, setShow] = useState<boolean>(false);
  const [popupImg, setPopupImg] = useState<string>("");

  function clearPage() {
    setShow(false);
    localStorage.setItem("popupShown", "true"); // Save flag to localStorage
  }

  useEffect(() => {
    const alreadyShown = localStorage.getItem("popupShown");

    if (!alreadyShown) {
      setShow(true);
      axios
        .get(display_popup)
        .then((response) => {
          console.log(response);
          setPopupImg(response.data.img);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Set a timer to reset the popupShown after 15 minutes (900,000 ms)
    const timer = setTimeout(() => {
      // localStorage.setItem("popupShown", "false");
      localStorage.removeItem("popupShown");
    }, 900000); // 15 minutes

    // Cleanup function to clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        clearPage();
      }, 500000); // Auto close after 5 seconds

      return () => clearTimeout(timer); // Cleanup timer when popup closes manually
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        animation: "fadeIn 0.5s ease-in-out",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "16px",
          padding: "2rem",
          width: "90%",
          maxWidth: "600px",
          animation: "popupZoom 0.4s ease-in-out",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Popup Image */}
        {popupImg ? (
          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "100%",
              // maxHeight: "400px",
              borderRadius: "12px",
              objectFit: "contain",
            }}
          >
            <img
              src={popupImg}
              alt="Popup"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "12px",
                objectFit: "contain",
              }}
            />

            {/* Close Button inside image */}
            <button
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                backgroundColor: "#f3f4f6",
                border: "none",
                borderRadius: "50%",
                padding: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onClick={clearPage}
            >
              <CloseIcon style={{ color: "#333", fontSize: "24px" }} />
            </button>
          </div>
        ) : (
          <p style={{ color: "#555" }}>Loading...</p>
        )}
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes popupZoom {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Popups;
