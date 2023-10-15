
import { FC } from "react";


const BalancedBudgeter:FC<{border: string}> = ({border}) => {
    return (
        <div className={`${border} shadow-md mx-auto max-w-[600px] lg:w-[600px] px-2 py-2`}>
        <div className="mx-2 sm:mx-10 lg:mx-10">
            <div className="flex flex-row items-center justify-between mb-4">
                <h4 className="text-2xl">The Balanced Budgeter</h4>
                <div className={`${border} px-1 py-1 hover:opacity-80 transition-all`}>
                    <img width="64" height="64" src="https://img.icons8.com/doodle/80/ned-flanders.png" alt="ned-flanders"/></div>
                </div>
            <p className="text-base opacity-80">
                Your finances reflect a well-thought-out balance between spending, saving, and investing. You are mindful of your financial health while also enjoying life's pleasures.
            </p>
        </div>
        <div className="px-2 opacity-60 sm:px-10 lg:px-10 w-full flex justify-between flex-row mb-4">
            <div>
                <p>pros</p>
                <ul style={{ listStyleType: 'disc' }}>
                    <li className="text-xs mb-1 max-w-[15ch] xl:max-w-[20ch]">
                    Stability in both present enjoyment and future planning.
                        </li>
                    <li className="text-xs max-w-[15ch] xl:max-w-[20ch]">
                    Reduced financial stress due to balanced habits.
                    </li>
                </ul>
            </div>
            <div>
                <p>cons</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="text-xs mb-1 max-w-[15ch] xl:max-w-[20ch]">
                        Occasional challenges in adjusting to unexpected expenses.
                            </li>
                        <li className="text-xs max-w-[15ch] xl:max-w-[20ch]">
                        Potential to miss out on some high-reward opportunities due to a balanced approach.
                            </li>
                    </ul>
            </div>
        </div>
       
    </div>
    );
};

export default BalancedBudgeter;