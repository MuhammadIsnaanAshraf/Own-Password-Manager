import React from "react";

export const Footer = () => {
  return (
    <div className="bg-slate-900 flex flex-col justify-center items-center min-h-16 text-white py-1 mt-auto">
      <div className="text-green-500 font-bold text-xl py-1">
        <span>&lt;</span>
        <span className="text-white">
          <i>Lock</i>
        </span>
        <span>Box</span>
        <span>/&gt;</span>
      </div>
      <div className="credit pb-1 font-semibold text-lg">
        <span>Created With</span>
        <span>
          <i className="fa-solid fa-heart px-1.5 text-red-600"></i>
        </span>
        <span>by Isnaan Ashraf</span>
      </div>
    </div>
  );
};
