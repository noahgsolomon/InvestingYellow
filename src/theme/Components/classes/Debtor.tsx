import { FC } from "react";


const Debtor:FC<{border: string}> = ({border}) => {
    return (
        <div className={`${border} shadow-md mx-auto max-w-[600px] lg:w-[600px] px-2 py-2`}>
        <div className="mx-2 sm:mx-10 lg:mx-10">
            <div className="flex flex-row items-center justify-between mb-4">
                <h4 className="text-2xl">The Debtor</h4>
                <div className={`${border} px-1 py-1 hover:opacity-80 transition-all`}>
                    <img width="64" height="64" src="https://img.icons8.com/doodle/80/homer-simpson.png" alt="homer-simpson"/></div>
                </div>
            <p className="text-base opacity-80">Your spending patterns suggest that you might be living beyond your means or have faced significant expenses that have not been balanced by income.</p>
        </div>
        <div className="px-2 opacity-60 sm:px-10 lg:px-10 w-full flex justify-between flex-row mb-4">
            <div>
                <p>pros</p>
                <ul style={{ listStyleType: 'disc' }}>
                    <li className="text-xs mb-1 max-w-[15ch] xl:max-w-[20ch]">Likely enjoyed high-quality experiences or necessary expenditures.</li>
                    <li className="text-xs max-w-[15ch] xl:max-w-[20ch]">Flexibility to address immediate needs and desires.</li>
                </ul>
            </div>
            <div>
                <p>cons</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="text-xs mb-1 max-w-[15ch] xl:max-w-[20ch]">High potential for accumulating unsustainable debt.</li>
                        <li className="text-xs max-w-[15ch] xl:max-w-[20ch]">Possible future financial strain if debts aren't managed.</li>
                    </ul>
            </div>
        </div>
    </div>
    );
};

export default Debtor;