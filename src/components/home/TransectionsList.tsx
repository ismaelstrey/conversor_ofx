import { TransactionType } from "@/app/types/TransactionType";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdArrowDropdown } from "react-icons/io";
import Transaction from "./Transaction";

export default function TransectionsList({transections,trntype}: {transections: TransactionType[],trntype: string}) {
  return (
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
              {transections?.map((transaction: TransactionType) => (
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
  )
}