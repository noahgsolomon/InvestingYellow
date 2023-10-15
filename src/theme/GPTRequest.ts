// export async function fetchGenerateClassAnalysis({
//     expenses,
//     balance
//   }: {
//     expenses: {
//       categories: {
//         category: string;
//         amount: string;
//       }[];
//     } | null;
//     balance: number;
//   }) {
//     console.log(balance * 0.02)
//     const completionData = {
//         model: "gpt-4",
//         messages: [
//             {
//                 role: "user",
//                 content: `class, investment, and overall are ALL REQUIRED!!!!! all investments together in total should only add up to 10% of their balance of ${balance}. So each individual investment should be max ${balance * 0.02} per month Create an investment plan comprising 8-12 stocks (each with name, ticker, period which is the investment frequency, amount in USD, and industry. ALWAYS PROVIDE ACTUAL STOCKS NEVER stock1 stock2, etc. proper name would be this for example: 'Apple Inc. (AAPL)') and 1-2 additional investment categories. Inside overall, for the summary attribute generate a 3-sentence financial summary based on user's expenses (${expenses}) and account balance (${balance})., providing liquidity for liquidity attribute in overall, saving for saving attribute in overall, and sustainability for sustainability attribute in overall ratings (0-5). Categorize the user into one of the classes in the class attribute in the object: BIG_SPENDER, FRUGAL_SAVER, DEBTOR, EXPERIENCE_SEEKER, SAFETY_NET_BUILDER, IMPULSIVE_SHOPPER, CHARITABLE_GIVER, or BALANCED_BUDGETER. Please be brutal and honest, we want to help them! Don't call them a balanced budgeter if they have low balance and high expenses for example.
//                 if they have low balance, they should generally be debtor, 
//                 if they have high expenses they should generally be big spender,
//                 if they have low expenses they should generally be frugal saver,
//                 if they have high balance they should generally be safety net builder,
//                 if they have high expenses in travel they should generally be experience seeker,
//                 if they have high expenses in categories like food and shopping they should generally be impulsive shopper,
//                 if they have high expenses in categories like charity they should generally be charitable giver,
//                 if they have high expenses in categories like rent they should generally be balanced budgeter,
//                 `
//             }
//         ],
//         functions: [
//             {
//                 name: "finance_analysis",
//                 description: "Generate a financial analysis based on the user's expenses and account balance.",
//                 parameters: {
//                     type: "object",
//                     properties: {
//                         metadata: {
//                             type: "object",
//                             properties: {
//                                 createdDate: { type: "string" },
//                                 lastUpdated: { type: "string" },
//                                 description: { type: "string" }
//                             }
//                         },
//                         investment: {
//                             type: "array",
//                             items: {
//                                 type: "object",
//                                 properties: {
//                                     name: { type: "string" },
//                                     amount: { type: "string" },
//                                     industry: { type: "string" },
//                                     period: { type: "string" }
//                                 }
//                             }
//                         },
//                         overall: {
//                             type: "object",
//                             properties: {
//                                 summary: { type: "string" },
//                                 liquidity: { type: "string" },
//                                 saving: { type: "string" },
//                                 sustainability: { type: "string" }
//                             }
//                         },
//                         class: {
//                             type: "object",
//                             properties: {
//                                 value: { type: "string" },
//                             }
//                         },
//                     },
//                     required: ["investment", "overall", "class"]
//                 }
//             }
//         ],
//         function_call: { name: "finance_analysis" }
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer hmm'
//             },
//             body: JSON.stringify(completionData)
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const responseData = await response.json();

//         const argumentsData = responseData.choices[0].message.function_call.arguments;

//         const cleanedData = argumentsData
//             .replace(/,\s*}/g, '}')
//             .replace(/,\s*]/g, ']');
        
//         const responseDict = JSON.parse(cleanedData);
//         return responseDict;
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

// export async function fetchGenerateOverallAnalysis({
//     expenses,
//     balance
//   }: {
//     expenses: {
//       categories: {
//         category: string;
//         amount: string;
//       }[];
//     } | null;
//     balance: number;
//   }) {
//     console.log(balance * 0.02)
//     const completionData = {
//         model: "gpt-4",
//         messages: [
//             {
//                 role: "user",
//                 content: `class, investment, and overall are ALL REQUIRED!!!!! all investments together in total should only add up to 10% of their balance of ${balance}. So each individual investment should be max ${balance * 0.02} per month Create an investment plan comprising 8-12 stocks (each with name, ticker, period which is the investment frequency, amount in USD, and industry. ALWAYS PROVIDE ACTUAL STOCKS NEVER stock1 stock2, etc. proper name would be this for example: 'Apple Inc. (AAPL)') and 1-2 additional investment categories. Inside overall, for the summary attribute generate a 3-sentence financial summary based on user's expenses (${expenses}) and account balance (${balance})., providing liquidity for liquidity attribute in overall, saving for saving attribute in overall, and sustainability for sustainability attribute in overall ratings (0-5). Categorize the user into one of the classes in the class attribute in the object: BIG_SPENDER, FRUGAL_SAVER, DEBTOR, EXPERIENCE_SEEKER, SAFETY_NET_BUILDER, IMPULSIVE_SHOPPER, CHARITABLE_GIVER, or BALANCED_BUDGETER. Please be brutal and honest, we want to help them! Don't call them a balanced budgeter if they have low balance and high expenses for example.
//                 if they have low balance, they should generally be debtor, 
//                 if they have high expenses they should generally be big spender,
//                 if they have low expenses they should generally be frugal saver,
//                 if they have high balance they should generally be safety net builder,
//                 if they have high expenses in travel they should generally be experience seeker,
//                 if they have high expenses in categories like food and shopping they should generally be impulsive shopper,
//                 if they have high expenses in categories like charity they should generally be charitable giver,
//                 if they have high expenses in categories like rent they should generally be balanced budgeter,
//                 `
//             }
//         ],
//         functions: [
//             {
//                 name: "finance_analysis",
//                 description: "Generate a financial analysis based on the user's expenses and account balance.",
//                 parameters: {
//                     type: "object",
//                     properties: {
//                         metadata: {
//                             type: "object",
//                             properties: {
//                                 createdDate: { type: "string" },
//                                 lastUpdated: { type: "string" },
//                                 description: { type: "string" }
//                             }
//                         },
//                         investment: {
//                             type: "array",
//                             items: {
//                                 type: "object",
//                                 properties: {
//                                     name: { type: "string" },
//                                     amount: { type: "string" },
//                                     industry: { type: "string" },
//                                     period: { type: "string" }
//                                 }
//                             }
//                         },
//                         overall: {
//                             type: "object",
//                             properties: {
//                                 summary: { type: "string" },
//                                 liquidity: { type: "string" },
//                                 saving: { type: "string" },
//                                 sustainability: { type: "string" }
//                             }
//                         },
//                         class: {
//                             type: "object",
//                             properties: {
//                                 value: { type: "string" },
//                             }
//                         },
//                     },
//                     required: ["investment", "overall", "class"]
//                 }
//             }
//         ],
//         function_call: { name: "finance_analysis" }
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer hmm'
//             },
//             body: JSON.stringify(completionData)
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const responseData = await response.json();

//         const argumentsData = responseData.choices[0].message.function_call.arguments;

//         const cleanedData = argumentsData
//             .replace(/,\s*}/g, '}')
//             .replace(/,\s*]/g, ']');
        
//         const responseDict = JSON.parse(cleanedData);
//         return responseDict;
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

interface InvestmentAnalysisParams {
    balance: number;
    risky: boolean;
}

export async function fetchGenerateInvestmentAnalysis(params: InvestmentAnalysisParams) {
    
    const budget = params.balance * (params.risky ? 0.4 : 0.2) * 0.08333;
    const min = budget * (params.risky ? 0.05 : 0.01);
    const max = budget * (params.risky ? 0.1 : 0.05);
    
    const riskLabel = params.risky ? 'risky' : 'safe';
    
    const completionData = {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `Generate a list of 8 distinct stocks for a recurring monthly investment based on a total monthly budget of ${budget}. Each stock should have a name (e.g., Apple Inc. (AAPL)), amount in USD, industry, and a 1-month recurring period. The investment amount for each stock should vary between ${min} and ${max}. This is a going to be a very ${riskLabel} investment strategy. round decimals to 2 places.`
            }
        ],
        functions: [
            {
                name: "investment_plan",
                description: `Generates a financial analysis and investment plan based on the user's monthly budget, and risk preference (${riskLabel}).`,
                parameters: {
                    type: "object",
                    properties: {
                        investment: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    amount: { type: "string" },
                                    industry: { type: "string" },
                                    period: { type: "string" }
                                }
                            }
                        },
                    },
                    required: ["investment"]
                }
            }
        ],
        function_call: { name: "investment_plan" }
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer hmm'
            },
            body: JSON.stringify(completionData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        console.log(responseData);

        const argumentsData = responseData.choices[0].message.function_call.arguments;

        const cleanedData = argumentsData
            .replace(/,\s*}/g, '}')
            .replace(/,\s*]/g, ']');
        
        const responseDict = JSON.parse(cleanedData);
        return responseDict;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// export async function fetchGenerateAnalysis({
//     expenses,
//     balance
//   }: {
//     expenses: {
//       categories: {
//         category: string;
//         amount: string;
//       }[];
//     } | null;
//     balance: number;
//   }) {

//     const risky = true;

//     const budget = balance * (risky ? 0.2 : 0.1) * 0.08333;
//     const min = budget * (risky ? 0.05 : 0.01);
//     const max = budget * (risky ? 0.1 : 0.05);
    
//     const riskLabel = risky ? 'risky' : 'safe';

//     const completionData = {
//         model: "gpt-4",
//         messages: [
//             {
//                 role: "user",
//                 content: `You are tasked with providing financial advice to a user based on their balance and saving across various categories. The user's balance is ${balance}, and their expenses are broken down as follows: ${expenses && expenses.categories.map(cat => `${cat.category}: $${Math.round(parseFloat(cat.amount))}`).join(', ')}.

//                 In the 'overall' object:
//                 - Provide a 3-4 sentence summary of the user's financial situation in the 'summary' attribute.
//                 - Assign a rating from 0 to 5 (where 5 is the best) for the 'liquidity', 'saving', and 'sustainability' attributes based on the user's financial data.
//                 - Provide a 1-2 sentence summary of the user's liquidity, saving, and sustainability ratings in the 'liquiditySummary', 'savingSummary', and 'sustainabilitySummary' attributes, respectively in the overall object.
                
//                 In the 'class' object:
//                 - Categorize the user into one of the following classes based on their financial behavior and assign this to the 'value' attribute: 
//                   - 'DEBTOR' if their balance is low.
//                   - 'BIG_SPENDER' if their balance is high but expenses are half their balance or more.
//                   - 'FRUGAL_SAVER' if their expenses are low.
//                   - 'SAFETY_NET_BUILDER' if their balance is high.
//                   - 'EXPERIENCE_SEEKER' if a significant portion of their expenses is on travel.
//                   - 'IMPULSIVE_SHOPPER' if they spend a lot on food and shopping.
//                   - 'CHARITABLE_GIVER' if charitable donations are a significant part of their expenses.
//                   - 'BALANCED_BUDGETER' if a large portion of their saving goes towards rent.
                
//                 In the 'investment' object:
//                 - Generate a list of 8 distinct stocks for a recurring monthly investment based on a total monthly budget of ${budget}. Each stock should have a 'name' (e.g., Apple Inc. (AAPL)), 'amount' in USD, 'industry', and a 1-month recurring 'period'. The investment amount for each stock should vary between ${min} and ${max}. This is a going to be a very ${riskLabel} investment strategy. round decimals to 2 places.
//                 - Examples of proper stock names are 'Apple Inc. (AAPL)', and ensure to provide actual stocks and realistic investment categories.
                
//                 Please provide accurate and honest financial advice to assist the user in better managing their financial situation.
//                 `
//             }
//         ],
//         functions: [
//             {
//                 name: "finance_analysis",
//                 description: "Generate a financial analysis based on the user's expenses and account balance.",
//                 parameters: {
//                     type: "object",
//                     properties: {
//                         investment: {
//                             type: "array",
//                             items: {
//                                 type: "object",
//                                 properties: {
//                                     name: { type: "string" },
//                                     amount: { type: "string" },
//                                     industry: { type: "string" },
//                                     period: { type: "string" }
//                                 }
//                             }
//                         },
//                         overall: {
//                             type: "object",
//                             properties: {
//                                 summary: { type: "string" },
//                                 liquidity: { type: "string" },
//                                 liquiditySummary: { type: "string" },
//                                 saving: { type: "string" },
//                                 savingSummary: { type: "string" },
//                                 sustainability: { type: "string" },
//                                 sustainabilitySummary: { type: "string" }
//                             }
//                         },
//                         class: {
//                             type: "object",
//                             properties: {
//                                 value: { type: "string" },
//                             }
//                         },
//                     },
//                     required: ["investment", "overall", "class"]
//                 }
//             }
//         ],
//         function_call: { name: "finance_analysis" }
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer hmm'
//             },
//             body: JSON.stringify(completionData)
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const responseData = await response.json();

//         const argumentsData = responseData.choices[0].message.function_call.arguments;

//         const cleanedData = argumentsData
//             .replace(/,\s*}/g, '}')
//             .replace(/,\s*]/g, ']');
        
//         const responseDict = JSON.parse(cleanedData);
//         return responseDict;
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// };


export async function fetchGenerateOverall({
    expenses,
    balance,
    investments
  }: {
    expenses: {
      categories: {
        category: string;
        amount: string;
      }[];
    } | null;
    investments: {amount: number} | null;
    balance: number;
  }) {

    const expensesStr = expenses && expenses.categories.map(cat => `${cat.category}: $${Math.round(parseFloat(cat.amount))}`).join(', ');

    const completionData = {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `Analyze a user's balance of ${balance} and expenses: ${expensesStr} and investment amount: $${investments !== null ? investments.amount : 0}. Generate an 'overall' object with:
                        - 'summary': a 3-4 sentence financial summary.
                        - Ratings (0-5 number): 'liquidity', 'saving', 'sustainability'.
                        - Summaries(1-2 sentences each):'liquiditySummary', 'savingSummary', 'sustainabilitySummary'.`
            }
        ],
        functions: [
            {
                name: "finance_analysis",
                description: "Generate a financial analysis based on the user's expenses and account balance.",
                parameters: {
                    type: "object",
                    properties: {
                        overall: {
                            type: "object",
                            properties: {
                                summary: { type: "string" },
                                liquidity: { type: "string" },
                                liquiditySummary: { type: "string" },
                                saving: { type: "string" },
                                savingSummary: { type: "string" },
                                sustainability: { type: "string" },
                                sustainabilitySummary: { type: "string" }
                            }
                        }
                    },
                    required: ["overall"]
                }
            }
        ],
        function_call: { name: "finance_analysis" }
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer hmm'
            },
            body: JSON.stringify(completionData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        const argumentsData = responseData.choices[0].message.function_call.arguments;

        const cleanedData = argumentsData
            .replace(/,\s*}/g, '}')
            .replace(/,\s*]/g, ']');
        
        const responseDict = JSON.parse(cleanedData);
        return responseDict;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export async function fetchGenerateClass({
    expenses,
    balance,
    investments
  }: {
    expenses: {
      categories: {
        category: string;
        amount: string;
      }[];
    } | null;
    investments: { amount: number} | null;
    balance: number;
  }) {

    const expensesStr = expenses && expenses.categories.map(cat => `${cat.category}: $${Math.round(parseFloat(cat.amount))}`).join(', ');

    const completionData = {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: `Categorize a user with balance ${balance} and expenses: ${expensesStr} and their investments amount to $${investments !== null ? investments.amount : 0} into a 'class' object. Use one value: 'DEBTOR', 'BIG_SPENDER', 'FRUGAL_SAVER', 'SAFETY_NET_BUILDER', 'EXPERIENCE_SEEKER', 'IMPULSIVE_SHOPPER', 'CHARITABLE_GIVER', 'BALANCED_BUDGETER', 'CAUTIOUS_CONSUMER', 'INVESTED_PLANNER'.`
            }
        ],
        functions: [
            {
                name: "finance_analysis",
                description: "Categorize the user based on their financial behavior.",
                parameters: {
                    type: "object",
                    properties: {
                        class: {
                            type: "object",
                            properties: {
                                value: { type: "string" },
                            }
                        },
                    },
                    required: ["class"]
                }
            }
        ],
        function_call: { name: "finance_analysis" }
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer hmm'
            },
            body: JSON.stringify(completionData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        const argumentsData = responseData.choices[0].message.function_call.arguments;

        const cleanedData = argumentsData
            .replace(/,\s*}/g, '}')
            .replace(/,\s*]/g, ']');
        
        const responseDict = JSON.parse(cleanedData);
        return responseDict;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};




export async function fetchGenerateMessage({expenses, balance, message, character, investments}: {
    expenses: {
      categories: {
        category: string;
        amount: string;
      }[];
    } | null;
    balance: number;
    investments: {amount: number} | null;
    message: string;
    character: 'LISA_SIMPSON' | 'MR_BURNS' | 'NED_FLANDERS';
  }) {


    let characterMessage: string = '';

    if (character === 'LISA_SIMPSON') {
        characterMessage = `You are Lisa Simpson from the Simpsons and you are a virtual financial assistant designed to provide insightful and compassionate guidance based on a user's financial situation. The user has a balance of ${balance}, and their investment amount is $${investments !== null ? investments.amount : 0} and their expenses are categorized as follows: ${expenses && expenses.categories.map(cat => `${cat.category}: $${Math.round(parseFloat(cat.amount))}`).join(', ')}.
    
        The user has a message or question/statement for you: "${message}". Based on the user's financial context provided, respond to them with a response that is appropriate for their situation. Round all numbers to 2 decimals.
    
        Remember, your responses should reflect Lisa's intelligence, ethical standpoint, and caring nature. What insightful advice would you provide to assist this user in navigating their financial situation?`
    }
    else if (character === 'MR_BURNS') {
        characterMessage = `You are Mr. Burns from the Simpsons and you are a virtual financial assistant designed to provide a response based on a user's financial situation. The user has a balance of ${balance}, and their expenses are categorized as follows: ${expenses && expenses.categories.map(cat => `${cat.category}: $${Math.round(parseFloat(cat.amount))}`).join(', ')}.
    
        The user has a message or question/statement for you: "${message}". Based on the user's financial context provided, respond to them with a response that is appropriate for their situation. round all numbers to the 2 decimals
    
        Remember, you are to respond in a way that Mr. Burns would respond, so be as mean and rude as possible. Your response should emanate the confidence and snobbery befitting of Mr. Burns, all while delivering the financial guidance sought. What say you to this humble inquirer?`
    }
    else if (character === 'NED_FLANDERS') {
        characterMessage = `You are Ned Flanders from the Simpsons and you are a virtual financial assistant designed to provide kind-hearted and neighborly financial advice based on a user's financial situation. The user has a balance of ${balance}, and their expenses are categorized as follows: ${expenses && expenses.categories.map(cat => `${cat.category}: $${Math.round(parseFloat(cat.amount))}`).join(', ')}.
    
        The user has a message or question/statement for you: "${message}". Based on the user's financial context provided, respond to them with a response that is appropriate for their situation. Round all numbers to 2 decimals.
    
        Remember, your responses should embody Ned's friendly and helpful demeanor. What neighborly advice would you provide to help this user with their financial concerns?`
    }
    

    const completionData = {
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content: characterMessage
            }
        ],
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer hmm'
            },
            body: JSON.stringify(completionData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        const messageData = responseData.choices[0].message.content;

        return messageData;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export async function fetchAndCombineResults(gptData: {
    expenses: {
      categories: {
        category: string;
        amount: string;
      }[],
    } | null,
    investments: {amount: number} | null,
    balance: number
  }) {
  
    const [overallResponse, investmentResponse, classResponse] = await Promise.all([
      fetchGenerateOverall(gptData),
      fetchGenerateInvestmentAnalysis({ balance: gptData.balance, risky: true }),
      fetchGenerateClass(gptData)
    ]);

    return {
        ...overallResponse,
        ...investmentResponse,
        ...classResponse
    };
  }