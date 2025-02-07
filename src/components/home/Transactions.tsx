import { TransactionType } from "@/app/types/TransactionType";
import React from "react";
import Transaction from "./Transaction";

export default function Transactions({
  transactions,
}: {
  transactions?: TransactionType[];
}) {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>TRNTYPE</th>
          <th>DTPOSTED</th>
          <th>FITID</th>
          <th>TRNAMT</th>
          <th>REFNUM</th>
          <th>MEMO</th>
        </tr>
      </thead>
      <tbody>
        {transactions?.map((transaction: TransactionType) => (
          <Transaction key={transaction.FITID} transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
}
