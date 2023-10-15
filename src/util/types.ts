//interfaces for categories in each individual product
interface AuthDataItem {
    routing: string;
    account: string;
    balance: string;
    name: string;
  }
  interface TransactionsDataItem {
    amount: string;
    date: string;
    name: string;
  }
  
  interface IdentityDataItem {
    addresses: string;
    phoneNumbers: string;
    emails: string;
    names: string;
  }
  
  interface BalanceDataItem {
    balance: string;
    subtype: string | null;
    mask: string;
    name: string;
  }
  
  interface InvestmentsDataItem {
    mask: string;
    quantity: string;
    price: string;
    value: string;
    name: string;
  }
  
  interface InvestmentsTransactionItem {
    amount: number;
    date: string;
    name: string;
  }
  
  interface LiabilitiessDataItem {
    amount: string;
    date: string;
    name: string;
    type: string;
  }
  
  interface PaymentDataItem {
    paymentId: string;
    amount: string;
    status: string;
    statusUpdate: string;
    recipientId: string;
  }
  interface ItemDataItem {
    billed: string;
    available: string;
    name: string;
  }
  
  interface AssetsDataItem {
    account: string;
    balance: string;
    transactions: number;
    daysAvailable: number;
  }
  
  export interface TransferDataItem {
    transferId: string;
    amount: string;
    type: string;
    achClass: string;
    network: string;
  }
  
  interface IncomePaystubsDataItem {
    description: string;
    currentAmount: number | null;
    currency: number | null;
  }
  
  export interface ErrorDataItem {
    error_type: string;
    error_code: string;
    error_message: string;
    display_message: string | null;
    status_code: number | null;
  }
  
  //all possible product data interfaces
  export type DataItem =
    | AuthDataItem
    | TransactionsDataItem
    | IdentityDataItem
    | BalanceDataItem
    | InvestmentsDataItem
    | InvestmentsTransactionItem
    | LiabilitiessDataItem
    | ItemDataItem
    | PaymentDataItem
    | AssetsDataItem
    | TransferDataItem
    | IncomePaystubsDataItem;
  
  export type Data = Array<DataItem>;