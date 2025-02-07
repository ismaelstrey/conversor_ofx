import { TransactionType } from "@/app/types/TransactionType";
import React, { useEffect } from "react";
import Transaction from "./Transaction";
import { formatarParaReal } from "@/helper/FormataReal";

export default function Transactions({
  transactions,
}: {
  transactions?: TransactionType[];
}) {




  const filtrado = transactions?.filter((transaction) => transaction.TRNTYPE === "CREDIT");
  const soma = filtrado?.reduce((acc, transaction) => acc + parseFloat(transaction.TRNAMT), 0);
  const total = formatarParaReal(soma || 0);
  const [totalValor, setTotalValor] = React.useState(total || 0);
  useEffect(() => {
    setTotalValor(total || 0);
  }, [total])
  return (
    <div className="flex flex-col">
      <div className="flex justify-end text-5xl mr-10">Total: {totalValor}</div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-2xl ">
            <th scope="col" className="px-6 py-3">TIPO</th>
            <th scope="col" className="px-6 py-3">DATA</th>
            <th scope="col" className="px-6 py-3">VALOR</th>
            <th scope="col" className="px-6 py-3">TRNAMT</th>
            <th scope="col" className="px-6 py-3">REFNUM</th>
            <th scope="col" className="px-6 py-3">MEMORANDO</th>
          </tr>
        </thead>
        <tbody>
          {filtrado?.map((transaction: TransactionType) => (
            <Transaction key={transaction.FITID} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
