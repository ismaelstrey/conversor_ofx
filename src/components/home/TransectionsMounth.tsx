import { TransactionType } from "@/app/types/TransactionType";
import { formatarParaReal } from "@/helper/FormataReal";
import { useMemo } from "react";

export function TransectionsMounth({transection}:{transection:TransactionType[]}) {
    const monthlyData = useMemo(() => {
        if (!transection) return [];
    
        const monthGroups = transection.reduce((acc, transaction) => {
          const date = new Date(transaction.DTPOSTED);
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          
          if (!acc[monthKey]) {
            acc[monthKey] = {
              credit: 0,
              debit: 0,
              total: 0,
              transactions: []
            };
          }
          
          const amount = parseFloat(transaction.TRNAMT);
          if (transaction.TRNTYPE === 'CREDIT') {
            acc[monthKey].credit += amount;
          } else {
            acc[monthKey].debit += amount;
          }
          acc[monthKey].total += amount;
          acc[monthKey].transactions.push(transaction);
          
          return acc;
        }, {} as Record<string, { credit: number; debit: number; total: number; transactions: TransactionType[] }>);
    
        return Object.entries(monthGroups)
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([month, data]) => ({ month, ...data }));
      }, [transection]);
return (
<div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl p-6">
          <div className="overflow-x-auto">
            <table className="flex flex-col w-full h-full text-sm">
              <thead className="bg-gray-800 w-full">
                <tr>
                  <th className="sticky left-0 bg-gray-800 px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Tipo</th>
                  {monthlyData.map(({ month }) => (
                    <th key={month} className="px-6 py-4 text-center">
                      <div className="transform -rotate-45 origin-center text-xs font-medium text-gray-300 uppercase whitespace-nowrap">
                        {new Date(month).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="hover:bg-gray-800/50 transition-colors">
                  <td className="sticky left-0 bg-gray-900 px-6 py-4 text-green-400 font-medium">Créditos</td>
                  {monthlyData.map(({ month, credit }) => (
                    <td key={month} className="px-6 py-4 text-center text-green-400">
                      {formatarParaReal(credit)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-800/50 transition-colors">
                  <td className="sticky left-0 bg-gray-900 px-6 py-4 text-red-400 font-medium">Débitos</td>
                  {monthlyData.map(({ month, debit }) => (
                    <td key={month} className="px-6 py-4 text-center text-red-400">
                      {formatarParaReal(debit)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-800/50 transition-colors">
                  <td className="sticky left-0 bg-gray-900 px-6 py-4 text-gray-300 font-medium">Total</td>
                  {monthlyData.map(({ month, total }) => (
                    <td key={month} className={`px-6 py-4 text-center font-medium ${total >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatarParaReal(total)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
)
}