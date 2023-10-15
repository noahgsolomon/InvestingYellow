import { FC } from "react";


const FrugalSaver:FC<{border: string}> = ({border}) => {
    return (
        <div className={`${border} shadow-md mx-auto max-w-[600px] lg:w-[600px] px-2 py-2`}>
        <div className="mx-2 sm:mx-10 lg:mx-10">
            <div className="flex flex-row items-center justify-between mb-4">
                <h4 className="text-2xl">The Frugal Saver</h4>
                <div className={`${border} px-1 py-1 hover:opacity-80 transition-all`}>
                    <img width="64" height="64" src="https://img.icons8.com/doodle/80/ned-flanders.png" alt="ned-flanders"/></div>
                </div>
            <p className="text-base opacity-80">You tend to live well below your means, focusing primarily on essential purchases and saving a significant portion of your income.</p>
        </div>
        <div className="px-2 opacity-60 sm:px-10 lg:px-10 w-full flex justify-between flex-row mb-4">
            <div>
                <p>pros</p>
                <ul style={{ listStyleType: 'disc' }}>
                    <li className="text-xs mb-1 max-w-[15ch] xl:max-w-[20ch]">High savings rate means greater financial security.</li>
                    <li className="text-xs max-w-[15ch] xl:max-w-[20ch]">Lower risk of accumulating debt.</li>
                    <li className="text-xs max-w-[15ch] xl:max-w-[20ch]">Flexibility for future large expenses or investments.</li>
                </ul>
            </div>
            <div>
                <p>cons</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="text-xs mb-1 max-w-[15ch] xl:max-w-[20ch]">Might miss out on experiences or quality of life enhancements.</li>
                        <li className="text-xs max-w-[15ch] xl:max-w-[20ch]">LOver-saving can lead to missed investment opportunities.</li>
                    </ul>
            </div>
        </div>
    </div>
    );
};

export default FrugalSaver;