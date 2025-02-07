import { FIType, TransactionType } from "@/app/types/TransactionType";
import React, { useEffect } from "react";
import Transaction from "./Transaction";
import { formatarParaReal } from "@/helper/FormataReal";
import { tr } from "motion/react-client";
import { ChevronDownIcon } from "lucide-react";

export default function Transactions({
  transactions,
  FI
}: {
  transactions?: TransactionType[];
  FI?: FIType;
}) {


  const [trntype, setTrntype] = React.useState("CREDIT");

  const filtrado = transactions?.filter((transaction) => transaction.TRNTYPE === trntype);
  const soma = filtrado?.reduce((acc, transaction) => acc + parseFloat(transaction.TRNAMT), 0);
  const total = formatarParaReal(soma || 0);
  const [totalValor, setTotalValor] = React.useState(total || 0);
  useEffect(() => {
    setTotalValor(total || 0);
  }, [total])
  return (
    <div className="flex flex-col container">
      <div className="flex justify-between bg-gray-900 p-4 rounded-sm text-gray-200">
        <div className="flex flex-col ">
          <div className="flex"> <span className="flex flex-col text-blue-500 px-2">ID:{" "}</span> {FI?.FID}</div>
          <div className="flex"><span className="flex flex-col text-blue-500 px-2">ORG:{" "}</span> {FI?.ORG}</div>
        </div>
        <div className={`flex text-3xl ${trntype === "CREDIT" ? "text-green-500" : "text-red-500"}`}>{trntype}</div>
        <div className={`flex justify-end text-5xl mr-10 ${trntype === "CREDIT" ? "text-green-500" : "text-red-500"}`}>Total: {totalValor}</div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-2xl ">
            <th scope="col" className={`flex px-6 py-3 cursor-pointer  rounded-lg ${trntype === "CREDIT" ? "text-green-500 bg-green-200" : "text-red-500 bg-red-300"}`} onClick={() => trntype === "CREDIT" ? setTrntype("DEBIT") : setTrntype("CREDIT")}>

              <ChevronDownIcon />
              TIPO</th>
            <th scope="col" className="px-6 py-3">DATA</th>
            <th scope="col" className="px-6 py-3">VALOR</th>
            <th scope="col" className="px-6 py-3">TRNAMT</th>
            <th scope="col" className="px-6 py-3">REFNUM</th>
            <th scope="col" className="px-6 py-3">MEMORANDO</th>
          </tr>
        </thead>
        <tbody className={`${trntype === "CREDIT" ? "text-green-500" : "text-red-500"}`}>
          {filtrado?.map((transaction: TransactionType) => (
            <Transaction key={transaction.FITID} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
