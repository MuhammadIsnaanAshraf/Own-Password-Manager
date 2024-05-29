import React from "react";

export const Navbar = () => {
  return (
    <nav className="flex justify-around h-full bg-slate-900 text-white py-2 ">
      <div className="text-green-500 font-bold text-xl">
        <span>&lt;</span>
        <span className="text-white">
          <i>Lock</i>
        </span>
        <span>Box</span>
        <span>/&gt;</span>
      </div>
      <button className=" bg-green-900 rounded-full font-semiboldbold text-lg">
        <span className="px-2">
          <i className="fa-brands fa-github"></i>
        </span>
        <span className="px-2 py-3">GitHub</span>
      </button>
      {/* <div className="navLink">
          <ul className="flex gap-2">
          <li>Home</li>
          <li>Pricing</li>
          <li>SignUp</li>
        </ul>
      </div> */}
    </nav>
  );
};
