import { TransactionType } from "@/app/types/TransactionType";
import React from "react";

export default function Transaction({
  transaction,
}: {
  transaction?: TransactionType;
}) {
  return (
    <tr>
      <td>{transaction?.TRNTYPE}</td>
      <td>{transaction?.DTPOSTED}</td>
      <td>{transaction?.TRNAMT}</td>
      <td>{transaction?.FITID}</td>
      <td>{transaction?.REFNUM}</td>
      <td>{transaction?.MEMO}</td>
    </tr>
  );
}
