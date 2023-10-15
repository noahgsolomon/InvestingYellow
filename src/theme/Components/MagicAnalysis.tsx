import { FC, useEffect, useState } from "react";
import { Textarea } from "../../@/components/ui/textarea"
import { Button } from "../../@/components/ui/button";
import InvestmentTable from "./InvestmentTable";
import { AlertTriangle, ShieldCheck, Star } from "lucide-react";
import BigSpender from "./classes/BigSpender";
import CautiousConsumer from "./classes/CautiousConsumer";
import ExperienceSeeker from "./classes/ExperienceSeeker";
import ImpulsiveShopper from "./classes/ImpulsiveShopper";
import BalancedBudgeter from "./classes/BalancedBudgeter";
import FrugalSaver from "./classes/FrugalSaver";
import Debtor from "./classes/Debtor";
import SafetyNetBuilder from "./classes/SafetyNetBuilder";
import CharitableGiver from "./classes/CharitableGiver";
import InvestedPlanner from "./classes/InvestedPlanner";
import { fetchAndCombineResults, fetchGenerateInvestmentAnalysis, fetchGenerateMessage } from "../../theme/GPTRequest";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "../../@/components/ui/hover-card"
import MrBurns from "./characters/MrBurns";
import LisaSimpson from "./characters/LisaSimpson";
import NedFlanders from "./characters/NedFlanders";
import { Leaderboard } from "theme/leaderboard";

type Investment = {
    name: string;
    amount: number;
    industry: string;
    period: string;
};

type Overall = {
    summary: string;
    liquidity: number;
    liquiditySummary: string;
    saving: number;
    savingSummary: string;
    sustainability: number;
    sustainabilitySummary: string;
};

type ClassValue = {
    value: string;
};

type AnalysisType = {
    investment: Investment[];
    overall: Overall;
    class: ClassValue;
};

type ExpenseCategory = {
    category: string;
    amount: string;
};

type GptDataType = {
    expenses: { categories: ExpenseCategory[] } | null;
    investments: {amount: number} | null;
    balance: number;
};

type MagicAnalysisProps = {
    analysis: AnalysisType;
    gptData: GptDataType;
    setAnalysis: React.Dispatch<React.SetStateAction<AnalysisType>>;
    setAILoading: React.Dispatch<React.SetStateAction<boolean>>;
    toast: any;
    setUserLeaderboardData: React.Dispatch<React.SetStateAction<Leaderboard>>;
    children?: React.ReactNode; 
};

const border = "rounded-lg border-[1px] border-gray-200 dark:border-opacity-[5%]"

type Character = 'MR_BURNS' | 'LISA_SIMPSON' | 'NED_FLANDERS'

const MagicAnalysis: FC<MagicAnalysisProps> = ({toast, analysis, gptData, setAnalysis, setAILoading, children, setUserLeaderboardData}) => {

    const [prompt, setPrompt] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [promptLoading, setPromptLoading] = useState<boolean>(false);
    const [dots, setDots] = useState('.');
    const [investmentLoading, setInvestmentLoading] = useState<boolean>(false);
    const [currentCharacter, setCurrentCharacter] = useState<Character>("MR_BURNS");

    useEffect(() => {
        let interval: NodeJS.Timeout;
      if (promptLoading || investmentLoading) {
        interval = setInterval(() => {
          setDots(prev => (prev.length < 3 ? prev + '.' : '.'));
        }, 500);  // Adjust the interval time to speed up or slow down the animation
      }
      return () => clearInterval(interval);  // Cleanup interval on component unmount
    }, [promptLoading, investmentLoading]);

    return (
        <div className={`relative mt-10 py-8 px-8 mx-10 ${border} shadow-md`}>
            <div className="w-full flex flex-col lg:flex-row justify-center md:justify-between mb-2">
                <h2 className="text-2xl w-full mb-4 text-center lg:text-left">AI Analysis</h2>
                <Button className="mx-auto max-w-[100px]"
                onClick={async () => {
                    setUserLeaderboardData((prev) => ({...prev, character: 'NONE', rating: 0}))
                    setAILoading(true);
                    toast({
                        title: 'Generating new analysis',
                        description: 'This may take a few moments',
                    });
                    const aiResponse = await fetchAndCombineResults(gptData);
                    setAnalysis(aiResponse);
                    setUserLeaderboardData((prev) => ({...prev, 
                        rating: (aiResponse.overall.sustainability+aiResponse.overall.liquidity+aiResponse.overall.saving),
                        character: aiResponse.class.value === 'BIG_SPENDER' ? 'MR_BURNS' :
                         aiResponse.class.value === 'DEBTOR' ? 'HOMER' :
                          aiResponse.class.value === 'SAFETY_NET_BUILDER' ? 'MARGE'
                           : aiResponse.class.value === 'BIG_SPENDER' ? 'LISA' : 
                           aiResponse.class.value === 'INVESTED_PLANNER' ? 'MR_BURNS' :
                           aiResponse.class.value === 'CAUTIOUS_CONSUMER' ? 'MARGE' :
                           aiResponse.class.value === 'EXPERIENCE_SEEKER' ? 'BARNEY' :
                           aiResponse.class.value === 'FRUGAL_SAVER' ? 'NED' : 
                           aiResponse.class.value === 'BALANCED_BUDGETER' ? 'NED' : 
                           aiResponse.class.value === 'CHARITABLE_GIVER' ? 'NED' : 'MR_BURNS'
                      }));
                    setAILoading(false);
                }}
                >regenerate</Button> 
            </div>
            
            <div className="w-full flex justify-center lg:justify-between flex-col lg:flex-row gap-4">
                <div className="ai-chat-box flex w-full justify-center lg:justify-start">
                    <div className={`w-full px-2 py-2 ${border} shadow-md flex flex-col lg:flex-row gap-2 max-w-[600px] justify-center lg:justify-between`}>
                        <div className="h-60 lg:h-full flex flex-col justify-center lg:w-[50%]">
                            
                            <div className="hover:opacity-80 cursor-pointer"
                                onClick={() => {
                                    if (currentCharacter === 'MR_BURNS') {
                                        setCurrentCharacter('LISA_SIMPSON')
                                    } else if (currentCharacter === 'LISA_SIMPSON') {
                                        setCurrentCharacter('NED_FLANDERS')
                                    } else if (currentCharacter === 'NED_FLANDERS') {
                                        setCurrentCharacter('MR_BURNS')
                                    }
                                }}
                            >
                                { currentCharacter === 'MR_BURNS' && <MrBurns border={border} />}
                                { currentCharacter === 'LISA_SIMPSON' && <LisaSimpson border={border} />}
                                { currentCharacter === 'NED_FLANDERS' && <NedFlanders border={border} />}
                            </div>
                            <Textarea placeholder="enter your prompt..." value={prompt} onChange={(e) => setPrompt(e.target.value)} className="h-full dark:bg-[#0d0d0d] dark:bg-opacity-50"/>
                            <Button className="mt-2"
                            disabled={promptLoading || prompt.length === 0}
                            onClick={async () => {
                                setPromptLoading(true);
                                setResponse("loading...");
                                const aiMessage = await fetchGenerateMessage({expenses: gptData.expenses, investments: gptData.investments, balance: gptData.balance, message: prompt, character: currentCharacter});
                                setResponse(aiMessage);
                                setPromptLoading(false);
                            }}
                            >{promptLoading ? dots : 'Send'}</Button>
                        </div>
                        <Textarea value={response} readOnly={true} placeholder="output..." className={`${border} lg:w-[50%] px-2 py-2 dark:bg-[#0d0d0d] lg:h-full h-32 dark:bg-opacity-50`}>
                        </Textarea>
                    </div>
                </div>
                {
                    analysis.class.value.toUpperCase() === "BIG_SPENDER" ? <BigSpender border={border}/> :
                    analysis.class.value.toUpperCase() === "CAUTIOUS_CONSUMER" ? <CautiousConsumer border={border}/> :
                    analysis.class.value.toUpperCase() === "EXPERIENCE_SEEKER" ? <ExperienceSeeker border={border}/> :
                    analysis.class.value.toUpperCase() === "IMPULSIVE_SHOPPER" ? <ImpulsiveShopper border={border}/> :
                    analysis.class.value.toUpperCase() === "FRUGAL_SAVER" ? <FrugalSaver border={border}/> :
                    analysis.class.value.toUpperCase() === "DEBTOR" ? <Debtor border={border}/> :
                    analysis.class.value.toUpperCase() === "SAFETY_NET_BUILDER" ? <SafetyNetBuilder border={border}/> :
                    analysis.class.value.toUpperCase() === "CHARITABLE_GIVER" ? <CharitableGiver border={border}/> :
                    analysis.class.value.toUpperCase() === "INVESTED_PLANNER" ? <InvestedPlanner border={border}/> :
                    <BalancedBudgeter border={border}/> // Fallback option if none of the conditions above are met
                }
            </div>
            <div className="mt-10 flex mx-auto lg:justify-between w-full flex-col lg:flex-row gap-4">
                {investmentLoading ?(
                    <div className={`flex justify-center items-center px-5 py-5 ${border} rounded-lg mx-auto max-w-[600px] h-full w-full shadow-md`}>
                        <p className="text-3xl text-center">{dots}</p>
                    </div>
                ): (
                    <div className={`px-5 py-5 ${border} rounded-lg mx-auto max-w-[600px] h-full w-full shadow-md`}>
                    <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row justify-between mb-2 items-center">
                            <h3 className="text-2xl">Investment plan</h3>
                            <div className={`${border} px-2 py-2 gap-2 flex flex-col justify-center items-center`}>
                                <h4 className="text-left text-base">generate new strategy</h4>
                            <div className="flex flex-row gap-4">
                                    <Button className="gap-1"
                                        onClick={async () => {
                                            setInvestmentLoading(true);
                                            toast({
                                                title: 'Creating risky investment plan',
                                                description: 'This may take a few moments',
                                            });
                                            const aiFetch = await fetchGenerateInvestmentAnalysis({balance: gptData.balance, risky: true});
                                            setAnalysis(prevAnalysis => ({
                                                ...prevAnalysis,
                                                investment: aiFetch.investment 
                                            }));
                                            setInvestmentLoading(false);
                                        }}
                                    ><AlertTriangle className="w-4 h-4 text-red-500"/>Risky</Button>
                                    <Button 
                                        onClick={async () => {
                                            setInvestmentLoading(true);
                                            toast({
                                                title: 'Creating safe investment plan',
                                                description: 'This may take a few moments',
                                            });
                                            const aiFetch = await fetchGenerateInvestmentAnalysis({balance: gptData.balance, risky: false});
                                            setAnalysis(prevAnalysis => ({
                                                ...prevAnalysis,
                                                investment: aiFetch.investment 
                                            }));
                                            setInvestmentLoading(false);
                                        }}
                                    className="gap-1"><ShieldCheck className="w-4 h-4 text-blue-500"/>Safe</Button>
                            </div> 
                        </div>
                            
                    </div>
                    <div className={`${border} rounded-lg `}>
                            <InvestmentTable investments={analysis.investment}/>
                        </div> 
                    </div>
                )}
                
                <div className={`${border} shadow-md w-full max-w-[600px] mx-auto px-4 py-4`}>
                    <div>
                        <h3 className="text-2xl mb-4">Overall</h3>
                        <p className="text-base">{analysis.overall.summary}</p>
                    </div>
                    <div className="mt-10 flex flex-col gap-12">
                        <div className={`flex flex-col lg:flex-row items-center lg:gap-8`}>
                            <div>
                                <HoverCard>
                                    <HoverCardTrigger className="underline cursor-pointer hover:opacity-80 transition-all">Liquidity</HoverCardTrigger>
                                    <HoverCardContent className="text-sm">
                                        {analysis.overall.liquiditySummary}
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                           <div className="flex flex-row gap-2">
                                <Star className={`${analysis.overall.liquidity > 0 ? 'text-yellow-500 fill-yellow-500': ''} `}/>
                                <Star className={`${analysis.overall.liquidity > 1 ? 'text-yellow-500 fill-yellow-500': ''} `}/>
                                <Star className={`${analysis.overall.liquidity > 2 ? 'text-yellow-500 fill-yellow-500': ''} `}/>
                                <Star className={`${analysis.overall.liquidity > 3 ? 'text-yellow-500 fill-yellow-500': ''} `}/>
                                <Star className={`${analysis.overall.liquidity > 4 ? 'text-yellow-500 fill-yellow-500': ''} `}/>
                           </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center lg:gap-8">
                            <div>                           
                                    <HoverCard>
                                        <HoverCardTrigger className="underline cursor-pointer hover:opacity-80 transition-all">Saving</HoverCardTrigger>
                                        <HoverCardContent className="text-sm">
                                            {analysis.overall.savingSummary}
                                        </HoverCardContent>
                                    </HoverCard>
                           </div>
                           <div className="flex flex-row gap-2">
                           <Star className={`${analysis.overall.saving > 0 ? 'text-yellow-500 fill-yellow-500': ''} `}/>
                                <Star className={`${analysis.overall.saving > 1 ? 'text-yellow-500 fill-yellow-500': ''} `}/>
                                <Star className={`${analysis.overall.saving > 2 ? 'text-yellow-500 fill-yellow-500': ''} `}/>
                                <Star className={`${analysis.overall.saving > 3 ? 'text-yellow-500 fill-yellow-500': ''} `}/>
                                <Star className={`${analysis.overall.saving > 4 ? 'text-yellow-500 fill-yellow-500': ''} `}/>
                           </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center lg:gap-8">
                            <div>
                                <HoverCard>
                                    <HoverCardTrigger className="underline cursor-pointer hover:opacity-80 transition-all">Sustainability</HoverCardTrigger>
                                    <HoverCardContent className="text-sm">
                                        {analysis.overall.sustainabilitySummary}
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                           <div className="flex flex-row gap-2">
                           <Star className={`${analysis.overall.sustainability > 0 ? 'text-yellow-500 fill-yellow-500': ''} `}/>
                                <Star className={`${analysis.overall.sustainability > 1 ? 'text-yellow-500 fill-yellow-500': ''} `}/>
                                <Star className={`${analysis.overall.sustainability > 2 ? 'text-yellow-500 fill-yellow-500': ''} `}/>
                                <Star className={`${analysis.overall.sustainability > 3 ? 'text-yellow-500 fill-yellow-500': ''} `}/>
                                <Star className={`${analysis.overall.sustainability > 4 ? 'text-yellow-500 fill-yellow-500': ''} `}/>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
};

export default MagicAnalysis;