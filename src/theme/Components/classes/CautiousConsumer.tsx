import { FC } from "react";


const CautiousConsumer:FC<{border: string}> = ({border}) => {
    return (
        <div className={`${border} shadow-md mx-auto max-w-[600px] lg:w-[600px] px-2 py-2`}>
        <div className="mx-2 sm:mx-10 lg:mx-10">
            <div className="flex flex-row items-center justify-between mb-4">
                <h4 className="text-2xl">The Cautious Consumer</h4>
                <div className={`${border} px-1 py-1 hover:opacity-80 transition-all`}>
                    <img width="64" height="64" src="https://img.icons8.com/doodle/80/marge-simpson.png" alt="marge-simpson"/></div>
                </div>
            <p className="text-base opacity-80">You spend primarily on necessities with occasional discretionary purchases. Your saving rate is moderate, balancing both spending and saving.</p>
        </div>
        <div className="px-2 opacity-60 sm:px-10 lg:px-10 w-full flex justify-between flex-row mb-4">
            <div>
                <p>pros</p>
                <ul style={{ listStyleType: 'disc' }}>
                    <li className="text-xs mb-1 max-w-[15ch] xl:max-w-[20ch]">Balanced financial approach.</li>
                    <li className="text-xs max-w-[15ch] xl:max-w-[20ch]">Potential to grow savings over time.</li>
                    <li className="text-xs max-w-[15ch] xl:max-w-[20ch]">Less likely to experience financial strain.</li>
                </ul>
            </div>
            <div>
                <p>cons</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="text-xs mb-1 max-w-[15ch] xl:max-w-[20ch]">Limited indulgence in luxuries or experiences.</li>
                        <li className="text-xs max-w-[15ch] xl:max-w-[20ch]">Potential missed investment opportunities.</li>
                    </ul>
            </div>
        </div>
    </div>
    );
};

export default CautiousConsumer;