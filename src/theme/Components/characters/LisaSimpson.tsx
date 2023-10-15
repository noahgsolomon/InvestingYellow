import { Shuffle } from "lucide-react";
import { FC } from "react";


const LisaSimpson:FC<{border: string}> = ({border}) => {
    
    return (
        <div className={`${border} items-center mb-2 py-2 px-2 flex justify-between`}>
            <div>
                <h4 className="leading-snug">Chat with Lisa Simpson</h4>
                <p className="text-xs leading-snug max-w-[20ch]">Let's explore your financial landscape, together!</p>
            </div> 
            <div className={`${border} relative px-2 py-2 hover:opacity-80 transition-all`}>
                <img width="64" height="64" src="https://img.icons8.com/doodle/80/lisa-simpson.png" alt="lisa-simpson"/>
                <button className={`${border} px-1 py-1 bg-white dark:bg-[#0d0d0d] absolute -top-2 -right-2`}><Shuffle className="w-5 h-5"/></button>
            </div>
        </div>
    )
};

export default LisaSimpson;