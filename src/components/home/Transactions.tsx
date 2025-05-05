'use client'
import { FIType, TransactionType } from "@/app/types/TransactionType";
import React, { useEffect } from "react";
import { formatarParaReal } from "@/helper/FormataReal";
import { motion} from "framer-motion";
import { FaMoneyBillWave, FaChartLine, FaList } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { ExportButtons } from "@/components/ui/exportData";
import { CiGrid32 } from "react-icons/ci";
import TransactionChart from "../ui/TransactionChart";
import TransectionsList from "./TransectionsList";
import FinancialCharts from "../ui/FinancialCharts";

export default function Transactions({
  transactions,
  FI
}: {
  transactions?: TransactionType[];
  FI?: FIType;
}) {


  const [trntype, setTrntype] = React.useState("");
  const [viewMode, setViewMode] = React.useState<'list' | 'month'>('list');
  const filtrado = trntype ? transactions?.filter((transaction) => transaction.TRNTYPE == trntype) : transactions;  
  // Cálculos financeiros
  const totalCreditos = transactions?.filter(t => t.TRNTYPE === "CREDIT").reduce((acc, t) => acc + parseFloat(t.TRNAMT), 0) || 0;
  const totalDebitos = transactions?.filter(t => t.TRNTYPE === "DEBIT").reduce((acc, t) => acc + parseFloat(t.TRNAMT), 0) || 0;
  const saldoFinal = totalCreditos + totalDebitos; // Soma pois débitos já vêm com valor negativo

  const soma = filtrado?.reduce((acc, transaction) => acc + parseFloat(transaction.TRNAMT), 0);
  const [totalValor, setTotalValor] = React.useState("");

  useEffect(() => {
    const formattedTotal = formatarParaReal(soma || 0);
    setTotalValor(formattedTotal);
  }, [soma])


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col container max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-200">Extrato Financeiro</h2>
        {transactions && transactions.length > 0 && (
          <ExportButtons 
            data={filtrado || []} 
            tipo={trntype || 'Completo'} 
          />
        )}
      </div>
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-xl shadow-2xl text-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {!trntype ? (
            <>
              <div className="flex items-center space-x-4 bg-gray-800/50 p-4 rounded-lg">
                <FaMoneyBillWave className="text-3xl text-green-400" />
                <div>
                  <div className="text-sm text-gray-400">Total Créditos</div>
                  <div className="text-2xl font-bold text-green-400">
                    {formatarParaReal(totalCreditos)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-gray-800/50 p-4 rounded-lg">
                <FaMoneyBillWave className="text-3xl text-red-400" />
                <div>
                  <div className="text-sm text-gray-400">Total Débitos</div>
                  <div className="text-2xl font-bold text-red-400">
                    {formatarParaReal(totalDebitos)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-gray-800/50 p-4 rounded-lg">
                <FaChartLine className="text-3xl text-blue-400" />
                <div>
                  <div className="text-sm text-gray-400">Saldo Final</div>
                  <div className={`text-2xl font-bold ${saldoFinal >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {formatarParaReal(saldoFinal)}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-4 bg-gray-800/50 p-4 rounded-lg">
                <MdAccountBalance className="text-3xl text-blue-400" />
                <div>
                  <div className="text-sm text-gray-400">ID</div>
                  <div className="text-lg font-semibold">{FI?.FID}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-gray-800/50 p-4 rounded-lg">
                <FaChartLine className="text-3xl text-blue-400" />
                <div>
                  <div className="text-sm text-gray-400">Organização</div>
                  <div className="text-lg font-semibold">{FI?.ORG}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-gray-800/50 p-4 rounded-lg">
                <FaMoneyBillWave className="text-3xl text-blue-400" />
                <div>
                  <div className="text-sm text-gray-400">Total</div>
                  <div className={`text-2xl font-bold ${trntype === "CREDIT" ? "text-green-400" : "text-red-400"}`}>
                    {totalValor}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="flex justify-center space-x-4 mt-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 ${trntype === "CREDIT" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => setTrntype("CREDIT")}>
            <span>Créditos</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 ${trntype === "DEBIT" ? "bg-red-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => setTrntype("DEBIT")}>
            <span>Débitos</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 ${!trntype ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => setTrntype("")}>
            <span>Todos</span>
          </motion.button>
         <div className="flex w-full gap-4 justify-end items-center">
         <FaList className={`text-2xl cursor-pointer text-gray-400 hover:scale-110 ${viewMode === 'list' ? 'text-yellow-500':''}`} onClick={()=>setViewMode('list')} />
         <CiGrid32 className={`text-2xl cursor-pointer text-gray-400 hover:scale-110 ${viewMode === 'month' ? 'text-yellow-500':''}`} onClick={()=>setViewMode('month')} />
         </div>
        </div>
      </div>   

      {viewMode === 'month' ? (
        <div className="flex flex-col gap-4">
          <TransactionChart transactions={filtrado || []}/>
          <FinancialCharts transactions={filtrado || []}/>
        </div>
      ) : (
        <TransectionsList transections={filtrado || []} trntype={trntype}/> 
      )}
   </motion.div>
  );
}
