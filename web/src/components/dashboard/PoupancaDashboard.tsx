'use client'
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardCard from './DashboardCard';

const PoupancaDashboard = () => {
  const { personalInfo } = useAuth();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Calcular economia mensal (receita - gastos fixos - gastos variáveis)
  const calculateMonthlySavings = () => {
    if (!personalInfo) return 0;
    const income = personalInfo.monthlyIncome || 0;
    const fixedExpenses = personalInfo.monthlyFixedExpenses || 0;
    const variableExpenses = personalInfo.monthlyVariableExpenses || 0;
    return Math.max(0, income - fixedExpenses - variableExpenses);
  };

  const monthlySavings = calculateMonthlySavings();

  return (
    <div className="flex flex-col items-center gap-0 w-full">
      <div className="w-full max-w-[960px] px-4 sm:px-0 mb-6">
        <div className="bg-[#2B402B] rounded-lg flex flex-col justify-start p-4 sm:p-6">
          <p className="text-white text-sm sm:text-base">
            Economia Mensal
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {formatCurrency(monthlySavings)}
          </h2>
          {monthlySavings === 0 && (
            <p className="text-gray-400 text-sm mt-2">
              Preencha suas informações financeiras para ver quanto você economiza por mês
            </p>
          )}
        </div>
      </div>
      <DashboardCard type="poupanca" value={formatCurrency(monthlySavings)} />
    </div>
  );
};

export default PoupancaDashboard;
