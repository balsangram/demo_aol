import React from "react";

interface ArrowProps {
  onClick?: () => void;
}

const CustomRightArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2  hover:bg-gray-200 w-9"
      onClick={onClick}
    >
      ▶
    </button>
  );
};

export default CustomRightArrow;
