import React from "react";

interface ArrowProps {
  onClick?: () => void;
}

const CustomRightArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      className="z-0 absolute right-0 top-1/2 transform -translate-y-1/2  bg-white rounded-full shadow p-2  hover:bg-gray-200 w-9"
      onClick={onClick}
    >
      ▶
    </button>
  );
};

export default CustomRightArrow;
