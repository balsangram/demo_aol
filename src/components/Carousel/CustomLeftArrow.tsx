import React from "react";

interface ArrowProps {
  onClick?: () => void;
}

const CustomLeftArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      className="z-0 absolute left-2 top-1/2 transform flex items-center justify-center -translate-y-1/2  bg-gray-100 rounded-full shadow p-2 hover:bg-gray-200 w-9"
      onClick={onClick}
    >
      ◀
    </button>
  );
};

export default CustomLeftArrow;
