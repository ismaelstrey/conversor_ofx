'use client';

import { TransactionType } from '@/app/types/TransactionType';
import { formatarParaReal } from '@/helper/FormataReal';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


interface TransactionChartProps {
  transactions: TransactionType[];
}

interface ChartData {
  date: string;
  credito: number;
  debito: number;
  total: number;
}

export default function TransactionChart({ transactions }: TransactionChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = useMemo(() => {
    console.log('Calculando chartData...');
    if (!transactions.length) {
      console.log('Nenhuma transação encontrada');
      return [];
    }

    const validTransactions = transactions.filter(t => {
      if (!t.DTPOSTED || !t.TRNAMT) {
        console.log('Transação inválida:', t);
        return false;
      }
      // Extrai a data do formato OFX (YYYYMMDDHHMMSS[TZ:GMT])
      const dateMatch = t.DTPOSTED.match(/^(\d{4})(\d{2})(\d{2})/); // Extrai ano, mês e dia
      const date = dateMatch ? new Date(parseInt(dateMatch[1]), parseInt(dateMatch[2]) - 1, parseInt(dateMatch[3])) : new Date(t.DTPOSTED);
      const amount = parseFloat(t.TRNAMT);
      const isValid = !isNaN(date.getTime()) && !isNaN(amount);
      if (!isValid) {
        console.log('Data ou valor inválido:', { date: t.DTPOSTED, amount: t.TRNAMT });
      }
      return isValid;
    });

    console.log('Transações válidas:', validTransactions.length);

    const sortedTransactions = [...validTransactions].sort(
      (a, b) => new Date(a.DTPOSTED).getTime() - new Date(b.DTPOSTED).getTime()
    );

    if (!sortedTransactions.length) return [];

    // const firstDate = new Date(sortedTransactions[0].DTPOSTED);
    // const lastDate = new Date(sortedTransactions[sortedTransactions.length - 1].DTPOSTED);

    const groupedData = new Map<string, ChartData>();

    sortedTransactions.forEach(transaction => {
      try {
        const dateMatch = transaction.DTPOSTED.match(/^(\d{4})(\d{2})(\d{2})/);
        const date = dateMatch ? new Date(parseInt(dateMatch[1]), parseInt(dateMatch[2]) - 1, parseInt(dateMatch[3])) : new Date(transaction.DTPOSTED);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        const amount = parseFloat(transaction.TRNAMT);
        if (isNaN(amount)) return;

        const currentData = groupedData.get(key) || { date: key, credito: 0, debito: 0, total: 0 };

        if (amount > 0) {
          currentData.credito += amount;
        } else {
          currentData.debito += Math.abs(amount);
        }
        currentData.total = currentData.credito - currentData.debito;

        groupedData.set(key, currentData);
      } catch (error) {
        console.error('Erro ao processar transação:', error);
      }
    });

    const result = Array.from(groupedData.values());
    console.log('Dados do gráfico processados:', result);
    return result;
  }, [transactions]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[400px] p-4 shadow-lg bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 40, bottom: 0 }}
        >
          <defs>
            <linearGradient id="creditoGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="debitoGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f87171" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F3F821" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#F3F821" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="date"
            stroke="#666"
            tick={{ fill: '#666' }}
            tickFormatter={(value) => {
              const [, , day] = value.split('-');
              const [, month] = value.split('-');
              return `${day}/${month}`;
            }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            stroke="#666"
            tick={{ fill: '#666' }}
            tickFormatter={(value) => formatarParaReal(value)}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
            labelStyle={{ color: '#666' }}
            formatter={(value: number) => formatarParaReal(value)}
          />
          <Area
            type="monotone"
            dataKey="credito"
            stroke="#4ade80"
            fillOpacity={1}
            fill="url(#creditoGradient)"
          />
          <Area
            type="monotone"
            dataKey="debito"
            stroke="#f87171"
            fillOpacity={1}
            fill="url(#debitoGradient)"
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#F3F821"
            fillOpacity={1}
            fill="url(#totalGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}