import { FC, useEffect, useState } from "react";
import { Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler, } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DARK_THEME_KEY, LIGHT_THEME_KEY, LOCALSTORAGE_THEME_KEY } from "./constants";
import { toggleTheme } from "./toggleTheme";
import { CircleDollarSign, CandlestickChart, Flame, LogOut, Star } from "lucide-react";
import { NAME } from "../../config";
import { Button } from "../pages/Home/button.tsx";
import Loader from "Components/Loader/Loader.tsx";
import {
  ColumnDef,
} from "@tanstack/react-table"
import { DataTable } from "./DataTable.tsx";
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "../@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../@/components/ui/alert-dialog"
import MagicAnalysis from "./Components/MagicAnalysis.tsx";
import { fetchAndCombineResults} from "./GPTRequest.ts";
import { Toaster } from "../@/components/ui/toaster";
import { useToast } from "../@/components/ui/use-toast";
import { Leaderboard, fullLeaderboardList } from "./leaderboard.ts";
import { Table } from "../@/components/ui/table.tsx";
import { TableHeader } from "../@/components/ui/table.tsx";
import { TableHead } from "../@/components/ui/table.tsx";
import { TableBody } from "../@/components/ui/table.tsx";
import { TableRow } from "../@/components/ui/table.tsx";
import { TableCell } from "../@/components/ui/table.tsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

//////////////////

type Payment = {
  date: string
  amount: number
  location: string
  category: string
}

type Investment = {
  name: string
  value: number
  total_gain: number
  quantity: number
}

let aiRendered = 0;

const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
];


const border = "rounded-lg border-[1px] border-gray-200 dark:border-opacity-[5%]"

const investmentColumns: ColumnDef<Investment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("value"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "total_gain",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Gain
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_gain"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue("quantity"))
 
      return <div className="font-medium">{quantity}</div>
    },
  },
];
/////////////////

const pastelColors = [
  ['rgba(255, 182, 193, 0.6)', '#ffffff'], // Pastel Pink
  ['rgba(255, 160, 160, 0.6)', '#ffffff'], // Salmon Pink
  ['rgba(255, 210, 210, 0.6)', '#ffffff'], // Light Coral
  ['rgba(255, 173, 173, 0.6)', '#ffffff'], // Indian Red Light
  ['rgba(255, 204, 204, 0.6)', '#ffffff'], // Pastel Red
  ['rgba(255, 192, 183, 0.6)', '#ffffff'], // Light Salmon
  ['rgba(255, 183, 178, 0.6)', '#ffffff'], // Pastel Coral
  ['rgba(255, 165, 165, 0.6)', '#ffffff'], // Pastel Rose
  ['rgba(250, 192, 192, 0.6)', '#ffffff'], // Pastel Ruby
  ['rgba(255, 205, 205, 0.6)', '#ffffff'], // Light Carmine Pink
  ['rgba(255, 190, 190, 0.6)', '#ffffff'], // Light Red
];

const greenPastelColors = [
  ['rgba(152, 251, 152, 0.6)', '#ffffff'], // Pale Green
  ['rgba(144, 238, 144, 0.6)', '#ffffff'], // Light Green
  ['rgba(124, 252, 0, 0.6)', '#ffffff'],   // Lawn Green
  ['rgba(173, 255, 47, 0.6)', '#ffffff'],  // Green Yellow
  ['rgba(143, 188, 143, 0.6)', '#ffffff'], // Dark Sea Green
  ['rgba(193, 255, 193, 0.6)', '#ffffff'], // Mint
  ['rgba(0, 250, 154, 0.6)', '#ffffff'],   // Medium Spring Green
  ['rgba(60, 179, 113, 0.6)', '#ffffff'],  // Medium Sea Green
  ['rgba(46, 139, 87, 0.6)', '#ffffff'],   // Sea Green
  ['rgba(127, 255, 0, 0.6)', '#ffffff'],   // Chartreuse
];


ChartJS.register(ArcElement, Tooltip);

const imageMap = (character: 'MR_BURNS' | 'LISA' | 'HOMER' | 'CLOWN' | 'NED' | 'MARGE' | 'BARNEY' | 'NONE') => {
  if (character === 'MR_BURNS') {
    return 'https://img.icons8.com/doodle/80/charles-montgomery-burns.png';
  } else if (character === 'LISA') {
    return 'https://img.icons8.com/doodle/80/lisa-simpson.png';
  } else if (character === 'HOMER') {
    return 'https://img.icons8.com/doodle/80/homer-simpson.png';
  } else if (character === 'CLOWN') {
    return 'https://img.icons8.com/doodle/80/krusty-the-clown.png';
  } else if (character === 'NED') {
     return 'https://img.icons8.com/doodle/80/ned-flanders.png'
  } else if (character === 'MARGE') {
    return 'https://img.icons8.com/doodle/80/marge-simpson.png'
  } else if (character === 'BARNEY') {
    return 'https://img.icons8.com/doodle/80/barney-gumble.png';
  } else if (character === 'NONE') {
    return 'https://img.icons8.com/doodle/80/charles-montgomery-burns.png';
  } else {
    return 'https://img.icons8.com/doodle/80/charles-montgomery-burns.png';
  }
}

const users = [
  "Barney Gumblebee",
  "Lenny LeMonade",
  "Carl Carrottop",
  "Moe Muffintop",
  "Krusty Kookie",
  "Ned Noodle",
  "Maude Marmalade",
  "Ralph Raspberry",
  "Milhouse Marshmallow",
  "Nelson Nutmeg",
  "Sideshow Cinnamon",
  "Fat Tony Tofu",
  "Apu Applepie",
  "Comic Book Cookie",
  "Kirk Kiwi",
  "Luann Lemon",
  "Otto Oatmeal",
  "Principal Prune",
  "Martin Muffin",
  "Sherri Sherbet",
  "Terri Tangerine",
  "Edna Eclair",
  "Groundskeeper Grits",
  "Dr. Hibbert Hummus",
  "Rev. Lovejoy Lollipop",
  "Mayor Quimby Quiche",
  "Snake Salad",
  "Bumblebee Berry",
  "Duffman Doughnut",
  "Troy McClurecake",
  "Lionel Hutz Hazelnut",
  "Sideshow Boba Tea",
  "Rabbi Krustofski Kreme",
  "Cletus Clementine",
  "Brandine Brownie",
  "Disco Stew Stroopwafel",
  "Gil Gelato",
  "Rainier Raspberry",
  "Doris Dough",
  "Lurleen Lumpia",
  "Rex Banner Butter",
  "Uter Zorker Ziti",
  "Legs Linguini",
  "Lou Lollipop",
  "Eddie Eclair",
  "Frank Grimey Grape",
  "Judge Snyder Snickerdoodle",
  "Herman Hermits Pie",
  "Mindy Mint",
  "Roger Myers Meringue"
];



const Themes: FC<{
}> = () => {

  const [leaderboardData, setLeaderboardData] = useState<fullLeaderboardList>([]);
  const [userLeaderboardData, setUserLeaderboardData] = useState<Leaderboard>({character: 'NONE', rating: 0, account_id: ''});

  const [balance, setBalance] = useState<number>(0);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [aiLoading, setAILoading] = useState<boolean>(true);
  const [, setTransformedData] = useState<any>([]);
  const [, setInvestmentData] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<{
    investment: {
      "name": string,
      "amount": number,
      "industry": string,
      "period": string,
    }[],
    overall: {
      summary: string,
      liquidity: number,
      liquiditySummary: string,
      saving: number,
      savingSummary: string,
      sustainability: number,
      sustainabilitySummary: string,
    },
    class: {
      value: string
    }
  }>({investment: [], overall: {summary: '', liquidity: 0, liquiditySummary: '', saving: 0, savingSummary: '', sustainability: 0, sustainabilitySummary: ''}, class: {value: ''}});

  const [donutData, setDonutData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Costs',
        data: [] as number[],
        backgroundColor: [] as string[],
        borderColor: [] as string[],
        borderWidth: 1,
      },
    ],
  });

  const [investmentDonut, setInvestmentDonut] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Stake',
        data: [] as number[],
        backgroundColor: [] as string[],
        borderColor: [] as string[],
        borderWidth: 1,
      },
    ],
  });

  const [gptData, setGptData] = useState<{
    expenses: {
      categories: {
        category: string;
        amount: string;
      }[],
    } | null,
    investments: {
      amount: number;
    } | null,
    balance: number
  }>({expenses: null, investments: null, balance: 0});

  const { toast } = useToast();

  const getLeaderboard = async () => {
    const response = await fetch(`https://rk2ew5j6ftiwaurvmsnqfpnfbe0cveda.lambda-url.us-east-1.on.aws/`, { 
      method: "POST",
      body: JSON.stringify({
        account_id: 'ANONYMOUS',
        rating: 0,
        character: 'NONE',
        type: 'GET'
      })
     });
    const data = await response.json();
    setLeaderboardData(data);
  }

  const getTransactions = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken !== '') {
      try{
          const getData = async () => {
              const response = await fetch(`https://loadbalancer.codefoli.com/api/transactions`, { method: "GET" });
              const investmentResponse = await fetch(`https://loadbalancer.codefoli.com/api/investments_transactions`, { method: "GET" });
              const investmentData = await investmentResponse.json();
              console.log(investmentData);
              console.log('getting holdings')
              const balanceResponse = await fetch(`https://loadbalancer.codefoli.com/api/balance`, { method: "GET" });
              const balanceData = await balanceResponse.json();
              const data = await response.json();
              console.log(data);
              if (data.latest_transactions.length > 0){
                    try {
                    const authResponse = await fetch(`https://loadbalancer.codefoli.com/api/auth`, { method: "GET" });
                    console.log(authResponse);
                    const authData = await authResponse.json();
                    const accountId = authData.error ? 'ANONYMOUS' : authData.accounts[0].account_id;
                    setUserLeaderboardData((prev) => ({ ...prev, account_id: accountId }));
                } catch (error) {
                    console.log("An error occurred during auth:", error);
                    setUserLeaderboardData((prev) => ({ ...prev, account_id: 'ANONYMOUS' }));
                }
              }
                          
              let currBalance = 0;
              const holdingsResponse = await fetch(`https://loadbalancer.codefoli.com/api/holdings`, { method: "GET" });
              console.log(holdingsResponse);
              const holdingsData = await holdingsResponse.json();
              console.log(balanceData);
              for (const account of balanceData.accounts){
                currBalance += account.balances.current;
              }
              setInvestmentData(holdingsData);
              setBalance(currBalance);
              setGptData((prev) => ({...prev, balance: currBalance}));
              setTransformedData(data);
              await updateDonutDataWithTransaction(data, holdingsData);
              setLoading(false);
      };
      await getData();
      } catch (error) {
        console.log(error);
        setError(true);
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Please try refreshing your page.",
        })
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = '/';
    }
    getTransactions();
    getLeaderboard();
  }, []);

  const [theme, setTheme] = useState<
    typeof LIGHT_THEME_KEY | typeof DARK_THEME_KEY
  >(
    (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
      | typeof LIGHT_THEME_KEY
      | typeof DARK_THEME_KEY) || LIGHT_THEME_KEY
  );

  const handleToggleTheme = () => {
    toggleTheme();
    setTheme(
      (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
        | typeof LIGHT_THEME_KEY
        | typeof DARK_THEME_KEY) || typeof LIGHT_THEME_KEY
    );
  };

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("link_token");
    window.location.href = '/';
  }


  const updateDonutDataWithTransaction = async (transformedData: any, holdingsData: any) => {
    const currDonut = {
      labels: [] as string[],
      datasets: [
        {
          label: 'Costs',
          data: [] as number[],
          backgroundColor: [] as string[],
          borderColor: [] as string[],
          borderWidth: 1,
        },
      ],
    };

    const investDonut = {
      labels: [] as string[],
      datasets: [
        {
          label: 'Stake',
          data: [] as number[],
          backgroundColor: [] as string[],
          borderColor: [] as string[],
          borderWidth: 1,
        },
      ],
    }

    const expenses = {
      categories: [] as {
        category: string;
        amount: string;
      }[],
    }

    let totalInvested = 0;

    const currPayments: Payment[] = [];
    const currInvestments: Investment[] = [];

    // Convert the timestamps to Date objects for easy comparison


    if (transformedData !== null){
      for (const transaction of transformedData.latest_transactions) {
        // Access transaction properties
        const category = transaction.category[transaction.category ? transaction.category.length-1 : 0] || 'Other';
        const amount = transaction.amount;
        const transactionDate = new Date(transaction.date);
  
        currPayments.push({category, amount, date: transactionDate.toLocaleDateString(), location: transaction.location.city || ''})
  
        // Check if category label exists
        if (category === 'Other') {
          //where expenses.categories.category = 'Other', add amount to expenses.categories.amount
          continue;
        } else if (currDonut.labels.includes(category)) {
          const index = currDonut.labels.indexOf(category);
          currDonut.datasets[0].data[index] += amount;
          expenses.categories[index].amount = (parseFloat(expenses.categories[index].amount) + amount).toString();
        } else {
          currDonut.labels.push(category);
          currDonut.datasets[0].data.push(amount);
          const [colorWithOpacity, borderColor] = pastelColors[(currDonut.labels.length - 1) % pastelColors.length];
          currDonut.datasets[0].backgroundColor.push(colorWithOpacity);
          currDonut.datasets[0].borderColor.push(borderColor);
          expenses.categories.push({category, amount: amount.toString()});
        }
      };
    }

    if (holdingsData.error === null){
      const securities = holdingsData.holdings.securities;
      for (const holding of holdingsData.holdings.holdings) {
        const securityId = holding.security_id;
        let value = holding.institution_value;
        let cost_basis = holding.cost_basis;
        let institution_value = holding.institution_value;
      
        const security = securities.find((s: any) => s.security_id === securityId);
      
        if (security) {
          investDonut.labels.push(security.name);
      
          if (typeof value === "string") {
            value = parseFloat(value.replace(/\$/g, ''));
            cost_basis = parseFloat(cost_basis.replace(/\$/g, ''));
            institution_value = parseFloat(institution_value.replace(/\$/g, ''));
          }
      
          const numericValue = parseFloat(value.toFixed(2));
          investDonut.datasets[0].data.push(numericValue);
  
          cost_basis = parseFloat(cost_basis.toFixed(2));
          institution_value = parseFloat(institution_value.toFixed(2));
  
          const [colorWithOpacity, borderColor] = greenPastelColors[(investDonut.labels.length - 1) % greenPastelColors.length];
          investDonut.datasets[0].backgroundColor.push(colorWithOpacity);
          investDonut.datasets[0].borderColor.push(borderColor);
          
          totalInvested += numericValue;
  
          currInvestments.push({name: security.name, value: numericValue, total_gain: (institution_value - cost_basis), quantity: holding.quantity});
        }
      }
    }
    // Update the state with modified labelsOneYear (use your state update function if this is in a React component)
    setDonutData(currDonut); // Assuming you have a state update function for this as well
    setInvestmentDonut(investDonut);
    setPayments(currPayments);
    setInvestments(currInvestments);
    setGptData((prev) => ({...prev, investments: {amount: totalInvested}, expenses}));
  };

  useEffect(() => {
    if (gptData.balance === 0 || !aiLoading || aiRendered > 0) {
      return
    }
    aiRendered++;
    (async () => {
      const aiResponse = await fetchAndCombineResults(gptData);
      console.log(aiResponse)
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
      toast({
        title: "AI analysis generated!",
        description: "We hope you find insight.",
      })
      setAILoading(false);
    })();
  }, [gptData]);

  useEffect(() => {
    if (userLeaderboardData.account_id === '' || userLeaderboardData.character === 'NONE') {
      return
    }
    (async () => {
      const response = await fetch(`https://rk2ew5j6ftiwaurvmsnqfpnfbe0cveda.lambda-url.us-east-1.on.aws/`, { 
        method: "POST" ,
        body: JSON.stringify({
          account_id: userLeaderboardData.account_id,
          rating: userLeaderboardData.rating,
          character: userLeaderboardData.character,
          type: 'POST'
        })
      });
      await response.json();
      await getLeaderboard();
    })();
  }, [userLeaderboardData])

  if (loading && !error) {
    return <Loader />;
  }

  if (error) {
    return (<div className="h-screen w-screen">
        <Toaster />
    </div>)
  }

  return (
    <div className="h-screen w-screen max-w-[100%]">
      <header className="border-b-black border-opacity-10 border-[1px] pb-2">
            <div
              className={
                "mx-5 flex flex-row items-center justify-between pt-10 lg:mx-20"
              }
            >
              <div
                className={"flex cursor-pointer flex-row items-center gap-4"}
              >
                <div className="text-5xl opacity-80 transition-all hover:opacity-60 w-[60px] h-[60px] lg:h-16 lg:w-16"><CircleDollarSign className="w-12 h-12 hover:opacity-80 transition-all"/></div>
              </div>
              <div className="bg-gradient-to-r py-3 bg-clip-text text-2xl from-gray-800 to-black dark:from-white dark:to-gray-300 text-transparent sm:text-4xl lg:text-6xl">
                {NAME}
              </div>
              <div className="flex flex-row items-center gap-4">
                {theme === LIGHT_THEME_KEY ? (
                  <svg
                    onClick={handleToggleTheme}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 cursor-pointer transition-all hover:opacity-80"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                ) : (
                  <svg
                    onClick={handleToggleTheme}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 cursor-pointer transition-all hover:opacity-80"
                    aria-hidden="true"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </svg>
                )}
                <div className={"cursor-pointer flex items-center"}>
                  <AlertDialog>
                    <AlertDialogTrigger><LogOut className="h-5 w-5 transition-all hover:opacity-80"/></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                          We will miss you!
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleLogOut()}>Log out</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

              </div>
            </div>
          </header>
          <div>
          <div className={`shadow-md overflow-y-auto max-h-[400px] mx-10 mt-10 ${border}`}>
            <p className="text-center border-b-[1px] border-gray-200 dark:border-opacity-[5%]">Leaderboard</p>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Character</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Rating</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {leaderboardData.sort((a, b) => b.rating - a.rating).map((user, index) => (
                    <TableRow className={`${user.account_id === userLeaderboardData.account_id ? 'bg-yellow-500 bg-opacity-40 hover:bg-yellow-500 hover:bg-opacity-20' : ''}`} key={user.account_id}>
                        <TableCell>{<img width='48' src={imageMap(user.character)} />}</TableCell>
                        <TableCell>{users[index % users.length]}</TableCell>
                        <TableCell><Star className="w-5 h-5 text-yellow-500 fill-yellow-500"/>x{user.rating}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
          </div>
          {aiLoading ? (
              <MagicAnalysis setUserLeaderboardData={setUserLeaderboardData} toast={toast} setAILoading={setAILoading} analysis={analysis} gptData={gptData} setAnalysis={setAnalysis}>
               <div className="absolute inset-0 bg-black bg-opacity-20 dark:bg-opacity-60 rounded-lg">
                <div className="w-full h-[75%] flex justify-center flex-col items-center mt-20">
                    <div className={`w-[350px] h-[350px] flex flex-col items-center justify-center border-gray-800 border-[1px] dark:border-gray-600 rounded-lg bg-white/20 dark:bg-black/30`}>
                          <div
                          role="status"
                          className={`loader ${
                            localStorage.getItem(LOCALSTORAGE_THEME_KEY) === DARK_THEME_KEY
                              ? "dark"
                              : ""
                          }`}
                        ></div> 
                        <h4 className="text-base mt-5">generating ai report</h4>
                        <img width="300px" className={` ${border}`} src={'https://images.codefoli.com/mrburns.gif'} />
                    </div>
                  </div>
               </div>
              </MagicAnalysis>
        ):(<MagicAnalysis setUserLeaderboardData={setUserLeaderboardData} toast={toast} setAILoading={setAILoading} analysis={analysis} gptData={gptData} setAnalysis={setAnalysis}/>)}
          <div className="flex justify-center w-full text-center mb-5 mt-10">
          <div
              className={`shadow-md hover:shadow-lg transition-all from-[#8E8E8E] to-[#B0B0B0] dark:to-[#C0C0C0] rounded-full bg-gradient-to-r p-[1px] brightness-90 contrast-150 focus:outline-none focus:ring-[#C0C0C0] focus-visible:ring-2 dark:brightness-125 dark:contrast-100`}
          >
              <div className="overflow-hidden rounded-full bg-white/80 px-3 py-1 duration-300 dark:bg-black/80">
                  <span
                      className={`bg-gradient-to-r from-[#8E8E8E] to-[#B0B0B0] dark:to-[#C0C0C0] bg-clip-text text-transparent`}
                  >
                      $ {balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}                  
                  </span>
              </div>
          </div>

          </div>
        <div className="flex w-full flex-wrap items-center pb-10">
            <div className="flex flex-wrap gap-8 justify-center w-full">
              {donutData.labels.length > 0 && (
              <div className="w-[300px] sm:w-[400px] lg:w-[500px]">
                <p className="text-center mb-4 text-2xl flex justify-center items-center gap-2 flex-row opacity-50"><Flame className="w-5 h-5"/>Expense Donut</p>
                <Doughnut data={donutData} />
              </div>
              )}
              {investmentDonut.labels.length > 0 && (
                <div className="w-[300px] sm:w-[400px] lg:w-[500px]">
                  <p className="text-center mb-4 text-2xl flex justify-center items-center gap-2 flex-row opacity-50"><CandlestickChart className='w-5 h-5'/>Investments Donut</p>
                  <Doughnut data={investmentDonut} />
                </div>
              )}
            </div>
            {payments.length > 0 && (
              <div className="container mx-auto py-10 lg:w-[800px]">
                <p>Transactions table</p>
                <DataTable type="TRANSACTIONS" columns={columns} data={payments} />
              </div>
            )}
            {investments.length > 0 && (
              <div className="container mx-auto py-10 lg:w-[800px]">
                <p>Investment table</p>
                <DataTable type="INVESTMENTS" columns={investmentColumns} data={investments} />
              </div>
            )}
        </div>
          
        {/* <div className="flex w-full justify-end items-center pr-10">
          <div className="w-[500px] lg:w-[600px]">
            <Line options={options} data={chartData} />
          </div>
        </div> */}
        <Toaster />        
    </div>
  );
};

export default Themes;

