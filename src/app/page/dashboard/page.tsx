"use client";
import { OFXResponse } from "@/app/types/TransactionType";
import Dashboard from "@/components/dashboard";
import { formatarData, formatarDataGrafico } from "@/helper/FormataReal";
import { ofx } from "@/services/indexDb";
import React, { useEffect } from "react";
interface TransactionType {
  date: string; amount: number; type: "CREDIT" | "DEBIT";
}

//const tansections = dataOfx?.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;


export default function PageOFX() {
  const [transactions, setTransactions] = React.useState<TransactionType[]>([]);
  const transectionParse = JSON.parse(ofx || "[]") as OFXResponse;
  const geraRelatorio = () => transectionParse.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.map((transaction: any) => {
    setTransactions((prevTransactions) => [...prevTransactions, {
      date: formatarDataGrafico(transaction?.DTPOSTED || ""),
      amount: parseFloat(transaction.TRNAMT),
      type: transaction.TRNTYPE
    }])
  })
  useEffect(() => {
    geraRelatorio()
  }, [])
  return (
    <div className="flex justify-center w-full">
      <Dashboard transactions={transactions} />
    </div>
  );
}
