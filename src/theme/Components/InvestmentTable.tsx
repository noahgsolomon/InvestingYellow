import { FC } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../@/components/ui/table"

const InvestmentTable: FC<{
    investments: {
        "name": string,
        "amount": number,
        "industry": string,
        "period": string,
      }[],
}> = ({investments}) => {
    
    return (
        <div className="overflow-y-auto max-h-[400px]">
            <Table>
                <TableCaption>Your Investment Portfolio</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">Period</TableHead>
                        <TableHead className="w-[100px]">Amount</TableHead>
                        <TableHead>Name &amp; Ticker</TableHead>
                        <TableHead>Industry</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {investments.map((investment) => (
                    <TableRow key={investment.name}>
                        <TableCell>{investment.period}</TableCell>
                        <TableCell className="text-right">${investment.amount}</TableCell>
                        <TableCell>{investment.name}</TableCell>
                        <TableCell>{investment.industry}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default InvestmentTable;