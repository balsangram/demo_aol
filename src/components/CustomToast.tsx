import React from "react";

interface CustomToastProps {
  title: string;
  body: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ title, body }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border-l-4 border-blue-500 p-4">
      <h4 className="text-blue-600 font-semibold text-lg">{title}</h4>
      <p className="text-gray-700 text-sm mt-1">{body}</p>
    </div>
  );
};

export default CustomToast;
