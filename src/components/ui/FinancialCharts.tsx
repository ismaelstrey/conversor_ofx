'use client';

import { TransactionType } from '@/app/types/TransactionType';
import { formatarParaReal } from '@/helper/FormataReal';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FinancialChartsProps {
  transactions: TransactionType[];
}

interface ChartData {
  name: string;
  value: number;
}

interface MonthlyData {
  month: string;
  creditos: number;
  debitos: number;
}

interface ScatterData {
  data: string;
  valor: number;
  tipo: string;
}

export default function FinancialCharts({ transactions }: FinancialChartsProps) {
  const COLORS = ['#4ade80', '#f87171', '#F3F821', '#60a5fa'];

  const processedData = useMemo(() => {
    if (!transactions?.length) return {
      pieData: [],
      monthlyData: [],
      scatterData: []
    };

    // Dados para o gráfico de pizza (distribuição por tipo)
    const typeDistribution = transactions.reduce((acc, curr) => {
      const tipo = curr.TRNTYPE === 'CREDIT' ? 'Créditos' : 'Débitos';
      const valor = Math.abs(parseFloat(curr.TRNAMT));
      acc[tipo] = (acc[tipo] || 0) + valor;
      return acc;
    }, {} as Record<string, number>);

    const pieData: ChartData[] = Object.entries(typeDistribution).map(([name, value]) => ({
      name,
      value
    }));

    // Função para extrair data do formato OFX
    const parseOFXDate = (dateStr: string) => {
      const match = dateStr.match(/^(\d{4})(\d{2})(\d{2})/); // Extrai ano, mês e dia
      if (match) {
        return new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
      }
      return new Date(dateStr);
    };

    // Dados para o gráfico de barras (análise mensal)
    const monthlyTransactions = transactions.reduce((acc, curr) => {
      const date = parseOFXDate(curr.DTPOSTED);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const valor = parseFloat(curr.TRNAMT);

      if (!acc[monthKey]) {
        acc[monthKey] = { month: monthKey, creditos: 0, debitos: 0 };
      }

      if (valor > 0) {
        acc[monthKey].creditos += valor;
      } else {
        acc[monthKey].debitos += Math.abs(valor);
      }

      return acc;
    }, {} as Record<string, MonthlyData>);

    const monthlyData = Object.values(monthlyTransactions).sort((a, b) => a.month.localeCompare(b.month));

    // Dados para o gráfico de dispersão (padrões de transação)
    const scatterData: ScatterData[] = transactions.map(t => {
      const date = parseOFXDate(t.DTPOSTED);
      return {
        data: date.toISOString().split('T')[0], // Formato YYYY-MM-DD
        valor: Math.abs(parseFloat(t.TRNAMT)),
        tipo: t.TRNTYPE === 'CREDIT' ? 'Crédito' : 'Débito'
      };
    });

    return {
      pieData,
      monthlyData,
      scatterData
    };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Gráfico de Pizza - Distribuição de Transações */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-[300px] p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-lg"
      >
        <h3 className="text-gray-200 font-semibold mb-4">Distribuição de Transações</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData.pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {processedData.pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatarParaReal(value)} />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Gráfico de Barras - Análise Mensal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full h-[300px] p-4 pb-10 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-lg"
      >
        <h3 className="text-gray-200 font-semibold mb-4">Análise Mensal</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="month"
              stroke="#666"
              tick={{ fill: '#666' }}
              tickFormatter={(value) => {
                const [year, month] = value.split('-');
                return `${month}/${year}`;
              }}
            />
            <YAxis
              stroke="#666"
              tick={{ fill: '#666' }}
              tickFormatter={(value) => formatarParaReal(value)}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              formatter={(value: number) => formatarParaReal(value)}
            />
            <Bar dataKey="creditos" name="Créditos" fill="#4ade80" />
            <Bar dataKey="debitos" name="Débitos" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Gráfico de Dispersão - Padrões de Transação */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full h-[300px] p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-lg md:col-span-2 pb-16"
      >
        <h3 className="text-gray-200 font-semibold mb-4">Padrões de Transação</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData.scatterData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="data"
              stroke="#666"
              tick={{ fill: '#666' }}
              tickFormatter={(value) => {
                const [month, day] = value.split('-');
                return `${day}/${month}`;
              }}
            />
            <YAxis
              stroke="#666"
              tick={{ fill: '#666' }}
              tickFormatter={(value) => formatarParaReal(value)}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              formatter={(value: number) => formatarParaReal(value)}
            />
            <Bar dataKey="valor" name="Valor" fill="#F3F821" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}