import { TransactionType } from "@/app/types/TransactionType";
import { formatarParaReal } from "@/helper/FormataReal";
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
      <td>{formatarParaReal(parseFloat(transaction?.TRNAMT || "0"))}</td>
      <td>{transaction?.FITID}</td>
      <td>{transaction?.REFNUM}</td>
      <td>{transaction?.MEMO}</td>
    </tr>
  );
}
