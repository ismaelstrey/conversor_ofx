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
      <table className="table-auto mt-10 ">
        <thead>
          <tr className="bg-gray-500">
            <th>TIPO</th>
            <th>DATA</th>
            <th>VALOR</th>
            <th>TRNAMT</th>
            <th>REFNUM</th>
            <th>MEMORANDO</th>
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
