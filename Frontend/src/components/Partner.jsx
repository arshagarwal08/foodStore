import React from "react";
import { useNavigate } from "react-router-dom";

const Partner = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/restaurant/login");
  };

  return (
    <>
    <div className="h-[80vh] flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg text-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">Partner with Foodie</h1>
        <p className="text-gray-600 text-lg mb-8">
          Join our growing community of restaurants and boost your business by
          reaching thousands of food lovers daily!
        </p>
        <button
          onClick={handleSignupClick}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
          >
          Become a Partner
        </button>
      </div>
    </div>
    </>
  );
};

export default Partner;
