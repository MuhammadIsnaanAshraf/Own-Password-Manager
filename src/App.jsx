import { useState } from "react";

import "./App.css";
import { Navbar } from "./Component/Navbar";
import { Manager } from "./Component/Manager";
import { Footer } from "./Component/Footer";
function App() {
  return (
    <>
      <Navbar />
      <Manager />
      <Footer />
    </>
  );
}

export default App;
