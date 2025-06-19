import React from "react";
// import { X } from "lucide-react";

interface CustomToastProps {
  title: string;
  body: string;
  onClose?: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ title, body, onClose }) => {
  return (
    <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-4 flex items-start justify-between">
      <div className="flex-1 pr-2">
        <h4 className="text-gray-900 font-medium text-sm">{title}</h4>
        <p className="text-gray-600 text-sm mt-1">{body}</p>
      </div>

      {/* {onClose && (
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      )} */}
    </div>
  );
};

export default CustomToast;
