import { FIType, TransactionType } from "@/app/types/TransactionType";
import React, { useEffect } from "react";
import Transaction from "./Transaction";
import { formatarParaReal } from "@/helper/FormataReal";

export default function Transactions({
  transactions,
  FI
}: {
  transactions?: TransactionType[];
  FI?: FIType;
}) {


  const [trntype, setTrntype] = React.useState("");
  const [filtro, setFiltro] = React.useState<TransactionType[]>([]);

  const filtrado = trntype ? transactions?.filter((transaction) => transaction.TRNTYPE == trntype) :transactions;
  const soma = filtrado?.reduce((acc, transaction) => acc + parseFloat(transaction.TRNAMT), 0);
  const total = formatarParaReal(soma || 0);
  const [totalValor, setTotalValor] = React.useState(total || 0);
  useEffect(() => {
    setTotalValor(total || 0);
  }, [total])
  useEffect(() => {
    setFiltro(filtrado || []);
  }, [filtrado])
  console.log(filtrado)
  return (
    <div className="flex flex-col container">
      <div className="flex justify-between bg-gray-900 p-4 rounded-t-lg text-gray-200">
        <div className="flex flex-col ">
          <div className="flex"> <span className="flex flex-col text-blue-500 px-2">ID:{" "}</span> {FI?.FID}</div>
          <div className="flex"><span className="flex flex-col text-blue-500 px-2">ORG:{" "}</span> {FI?.ORG}</div>
        </div>
        <button className="bg-blue-500 p-2 rounded-md" onClick={() =>  setTrntype("CREDIT")}>CREDIT</button>
        <button className="bg-red-500 p-2 rounded-md" onClick={() =>  setTrntype("DEBIT")}>DEBIT</button>
        <button className="bg-green-500 p-2 rounded-md" onClick={() =>  setTrntype("")}>TODOS</button>
        <div className={`flex text-3xl text-white ${trntype === "CREDIT" ? "text-green-700" : "text-red-400"}`}>{trntype || "Todos"}</div>
        <div className={`flex justify-end text-5xl mr-10 ${trntype === "CREDIT" ? "text-green-700" : "text-red-400"}`}> {`${!trntype ||'Total:' + totalValor}`}</div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-2xl ">
            <th scope="col" className={`flex px-2 m-2 py-2 cursor-pointer rounded-lg text-white`}>

       
              TIPO</th>
            <th scope="col" className="px-6 py-3">DATA</th>
            <th scope="col" className="px-6 py-3">VALOR</th>
            <th scope="col" className="px-6 py-3">TRNAMT</th>
            <th scope="col" className="px-6 py-3">REFNUM</th>
            <th scope="col" className="px-6 py-3">MEMORANDO</th>
          </tr>
        </thead>
        <tbody className={`text-white ${trntype === "CREDIT" ? "text-green-800" : "text-red-900"}`}>
          { filtro?.map((transaction: TransactionType) => (
            <Transaction key={transaction.FITID} transaction={transaction} />
          ))}
  
        </tbody>
      </table>
    </div>
  );
}
