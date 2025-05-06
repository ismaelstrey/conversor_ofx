'use client';
import { useCallback, useState } from "react";
import About from "./About";
import { ArrowUpIcon } from "lucide-react";

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
    {showAbout &&    <div className="flex flex-col justify-center w-full items-center">
            <button title="Esconder Sobre" onClick={toggleAbout} className=" animate-bounce text-white font-bold py-2 px-4 rounded">
                <ArrowUpIcon size={50}/>
            </button>
       </div>}
    </div>
  )
}