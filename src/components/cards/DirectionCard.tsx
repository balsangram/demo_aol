import React, { useState, useRef, useEffect } from "react";

interface CardProps {
  link?: string;
  directionName: string;
  description?: string;
  img: string;
  onEdit?: () => void;
}

const DirectionCard: React.FC<CardProps> = ({
  link,
  directionName,
  description,
  img,
  onEdit,
}) => {
  const [maxChar, setMaxChar] = useState(40); // default character limit
  const [isOpen, setIsOpen] = useState(false); // state for popup
  const popupRef = useRef<HTMLDivElement>(null); // ref for popup

  // Detect screen size and update character limit
  useEffect(() => {
    const updateCharLimit = () => {
      setMaxChar(window.innerWidth < 640 ? 11 : 35); // 640px is Tailwind's 'sm' breakpoint
    };

    updateCharLimit(); // run on mount
    window.addEventListener("resize", updateCharLimit); // run on resize

    return () => window.removeEventListener("resize", updateCharLimit); // cleanup
  }, []);

  // Handle clicks outside the popup to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleClick = () => {
    // If there's a valid link, open it; otherwise, show the popup
    if (link && link !== "#") {
      window.open(link, "_blank");
    } else {
      setIsOpen(true); // Open the popup
    }
  };

  const handleClose = () => {
    setIsOpen(false); // Close the popup
  };

  return (
    <>
      <div
        className="flex items-center sm:p-10 p-4 transition-all duration-500 ease-in-out
        bg-[#ffffff7e] text-[#06202B] hover:scale-105 hover:px-10
        flex-col cursor-pointer min-w-6 w-[140px] sm:w-[15rem] md:rounded-[4px] rounded-[16px] px-2"
        onClick={handleClick}
      >
        {/* Image */}
        <img
          src={img}
          alt={directionName}
          className="h-[4rem] sm:h-[5rem] w-[4rem] sm:w-[5rem] rounded-full"
        />

        {/* Direction Name */}
        <p
          className="text-center text-[14px] sm:text-[16px] sm:mt-4 mt-1 font-poppins font-bold m-0 h-10
          break-words overflow-hidden text-ellipsis"
        >
          {directionName.length > 20
            ? directionName.slice(0, 20) + "..."
            : directionName}
        </p>

        {/* Direction Description (optional) */}
        {description && (
          <p
            className="text-center text-[12px] sm:text-[14px] mt-2 text-gray-500 font-poppins
            break-words overflow-hidden text-ellipsis"
          >
            {description.length > 50
              ? description.slice(0, 50) + "..."
              : description}
          </p>
        )}
      </div>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="bg-[#DBF3FA] p-6 rounded-lg shadow-lg w-[90%] sm:w-[20rem] max-w-md relative"
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
            >
              ×
            </button>

            <img
              src={img}
              alt={directionName}
              className="h-[10rem] mx-auto rounded"
            />
            <h2 className="text-xl font-bold text-center mt-4 break-words">
              {directionName}
            </h2>
            {description && (
              <p className="text-gray-600 text-center mt-2 break-words">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DirectionCard;
