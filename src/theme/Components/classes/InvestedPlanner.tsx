import { FC } from "react";


const InvestedPlanner:FC<{border: string}> = ({border}) => {
    return (
        <div className={`${border} shadow-md mx-auto max-w-[600px] lg:w-[600px] px-2 py-2`}>
        <div className="mx-2 sm:mx-10 lg:mx-10">
            <div className="flex flex-row items-center justify-between mb-4">
                <h4 className="text-2xl">The Invested Planner</h4>
                <div className={`${border} px-1 py-1 hover:opacity-80 transition-all`}>
                    <img width="64" height="64" src="https://img.icons8.com/doodle/80/charles-montgomery-burns.png" alt="charles-montgomery-burns"/></div>
                </div>
            <p className="text-base opacity-80">A significant portion of your finances is directed towards investments, indicating a focus on growing your wealth over time.</p>
        </div>
        <div className="px-2 opacity-60 sm:px-10 lg:px-10 w-full flex justify-between flex-row mb-4">
            <div>
                <p>pros</p>
                <ul style={{ listStyleType: 'disc' }}>
                    <li className="text-xs mb-1 max-w-[15ch] xl:max-w-[20ch]">High potential for wealth accumulation.</li>
                    <li className="text-xs max-w-[15ch] xl:max-w-[20ch]">Diversified financial assets.</li>
                    <li className="text-xs max-w-[15ch] xl:max-w-[20ch]">Long-term financial security.</li>
                </ul>
            </div>
            <div>
                <p>cons</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="text-xs mb-1 max-w-[15ch] xl:max-w-[20ch]">Investments carry inherent risks.</li>
                        <li className="text-xs max-w-[15ch] xl:max-w-[20ch]">Might have less liquidity or accessible cash.</li>
                    </ul>
            </div>
        </div>
    </div>
    );
};

export default InvestedPlanner;