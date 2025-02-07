"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface Transaction {
    date: string;
    amount: number;
    type: "CREDIT" | "DEBIT";
}

export default function Dashboard({ transactions }: { transactions: Transaction[] }) {
    const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
    const [chartData, setChartData] = useState<{ date: string; income: number; expense: number }[]>([]);

    useEffect(() => {
        // Processa os dados para os gráficos
        const groupedData: Record<string, { income: number; expense: number }> = {};

        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach(({ date, amount, type }) => {
            const formattedDate = date.slice(0, 7); // YYYY-MM para agrupar por mês

            if (!groupedData[formattedDate]) {
                groupedData[formattedDate] = { income: 0, expense: 0 };
            }

            if (type === "CREDIT") {
                groupedData[formattedDate].income += amount;
                totalIncome += amount;
            } else {
                groupedData[formattedDate].expense += amount;
                totalExpense += amount;
            }
        });

        setSummary({
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
        });

        setChartData(Object.entries(groupedData).map(([date, values]) => ({
            date,
            income: values.income,
            expense: values.expense,
        })));
    }, [transactions]);

    return (
        <div className="grid gap-6 p-6 container">
            {/* Resumo Financeiro */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardHeader><CardTitle>Total Receitas</CardTitle></CardHeader>
                    <CardContent className="text-green-600 text-xl font-bold">R$ {summary.totalIncome.toFixed(2)}</CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Total Despesas</CardTitle></CardHeader>
                    <CardContent className="text-red-600 text-xl font-bold">R$ {summary.totalExpense.toFixed(2)}</CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Saldo Final</CardTitle></CardHeader>
                    <CardContent className={`text-xl font-bold ${summary.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                        R$ {summary.balance.toFixed(2)}
                    </CardContent>
                </Card>
            </div>

            {/* Gráfico de Linha */}
            <div className="w-full h-96 container bg-white shadow rounded-lg my-8">
                <h2 className="text-lg font-semibold mb-2">Evolução Mensal</h2>
                <ResponsiveContainer width="98%" height="85%" className={"bg-white shadow rounded-lg"}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="income" stroke="#34D399" name="Receitas" />
                        <Line type="monotone" dataKey="expense" stroke="#EF4444" name="Despesas" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Gráfico de Pizza */}
            <div className="w-full h-64 bg-white shadow rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">Distribuição Financeira</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={[
                            { name: "Receitas", value: summary.totalIncome },
                            { name: "Despesas", value: summary.totalExpense }
                        ]}
                            cx="50%"
                            cy="50%"
                            dataKey="value"
                            outerRadius={80}
                            label>
                            <Cell fill="#34D399" />
                            <Cell fill="#EF4444" />
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
