import { TransactionType } from "@/app/types/TransactionType";
import { formatarData, formatarParaReal } from "@/helper/FormataReal";
import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Transaction({
  transaction,
}: {
  transaction?: TransactionType;
}) {

  const data = formatarData(transaction?.DTPOSTED || "");
  const {TRNTYPE} = transaction || {};
  return (
    <>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          {TRNTYPE === 'DEBIT' ? 
            <FaArrowDown className="text-red-400" /> : 
            <FaArrowUp className="text-green-400" />
          }
          <span>{transaction?.TRNTYPE}</span>
        </div>
      </td>
      <td className="px-6 py-4">{data}</td>
      <td className="px-6 py-4 font-medium">
        {formatarParaReal(parseFloat(transaction?.TRNAMT || "0"))}
      </td>
      <td className="px-6 py-4 text-gray-400">{transaction?.FITID}</td>
      <td className="px-6 py-4 text-gray-400">{transaction?.REFNUM}</td>
      <td className="px-6 py-4 text-gray-400">{transaction?.MEMO}</td>
    </>
  );
}
