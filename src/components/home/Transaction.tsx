import { TransactionType } from "@/app/types/TransactionType";
import { formatarData, formatarParaReal } from "@/helper/FormataReal";
import React from "react";

export default function Transaction({
  transaction,
}: {
  transaction?: TransactionType;
}) {

  const data = formatarData(transaction?.DTPOSTED || "");
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">{transaction?.TRNTYPE}</td>
      <td>{data}</td>
      <td>{formatarParaReal(parseFloat(transaction?.TRNAMT || "0"))}</td>
      <td>{transaction?.FITID}</td>
      <td>{transaction?.REFNUM}</td>
      <td>{transaction?.MEMO}</td>
    </tr>
  );
}
