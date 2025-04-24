'use client'
import { FIType, TransactionType } from "@/app/types/TransactionType";
import React, { useEffect } from "react";
import Transaction from "./Transaction";
import { formatarParaReal } from "@/helper/FormataReal";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoneyBillWave, FaChartLine } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdAccountBalance } from "react-icons/md";
import { ExportButtons } from "@/utils/exportData";

export default function Transactions({
  transactions,
  FI
}: {
  transactions?: TransactionType[];
  FI?: FIType;
}) {


  const [trntype, setTrntype] = React.useState("");
  const [filtro, setFiltro] = React.useState<TransactionType[]>([]);

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

  useEffect(() => {
    setFiltro(filtrado || []);
  }, [filtrado])
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
        </div>
      </div>
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-sm divide-y divide-gray-800">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <span>Tipo</span>
                  <IoMdArrowDropdown className="text-gray-400" />
                </div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Data</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Valor</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">TRNAMT</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">REFNUM</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Memorando</th>
            </tr>
          </thead>
          <AnimatePresence>
            <motion.tbody
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`divide-y divide-gray-800 ${trntype === "CREDIT" ? "text-green-400" : "text-red-400"}`}>
              {filtro?.map((transaction: TransactionType) => (
                <motion.tr
                  key={transaction.FITID}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}>
                  <Transaction transaction={transaction} />
                </motion.tr>
              ))}
            </motion.tbody>
          </AnimatePresence>
        </table>
      </div>
   </motion.div>
  );
}
