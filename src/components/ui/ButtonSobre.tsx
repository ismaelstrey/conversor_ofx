'use client';
import { useCallback, useState } from "react";
import About from "./About";

export default function ButtonSobre() {
    const [showAbout, setShowAbout] = useState(false);

    const toggleAbout = useCallback(() => {
        setShowAbout(!showAbout);
    }, [showAbout]);
  return (
    <div>
      <button onClick={toggleAbout} className=" fixed top-4 right-4 text-white font-bold py-2 px-4 rounded">
        Sobre?
      </button>
     {
        showAbout && <About/>
     }
    </div>
  )
}