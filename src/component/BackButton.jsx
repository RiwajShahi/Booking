import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center space-x-2 text-sky-600 hover:text-sky-800 font-medium mb-6"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
