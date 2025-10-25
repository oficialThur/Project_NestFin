"use client"
import React, { useState, useEffect } from 'react';

interface PersonalInfo {
  fullName?: string;
  email?: string;
  phone?: string;
  monthlyIncome?: number;
  monthlyFixedExpenses?: number;
  monthlyVariableExpenses?: number;
  notes?: string;
}

interface Goal {
  name: string;
  targetAmount: number;
}

interface MonthlySavings {
  month: string;
  savings: number;
  goalProgress: number;
}

const PersonalDashboard: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({});
  const [goal, setGoal] = useState<Goal>({ name: '', targetAmount: 0 });
  const [monthlySavings, setMonthlySavings] = useState<MonthlySavings[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersonalData();
  }, []);

  const fetchPersonalData = async () => {
    try {
      setLoading(true);
      
      // Simular dados do cliente (em produção, buscar da API)
      const mockPersonalInfo: PersonalInfo = {
        fullName: "João Silva",
        email: "joao@email.com",
        phone: "(11) 99999-9999",
        monthlyIncome: 5000,
        monthlyFixedExpenses: 2000,
        monthlyVariableExpenses: 1500,
        notes: "Objetivo: Comprar um carro em 2 anos"
      };

      const mockGoal: Goal = {
        name: "Comprar Carro",
        targetAmount: 50000
      };

      // Simular dados de economia mensal dos últimos 6 meses
      const mockMonthlySavings: MonthlySavings[] = [
        { month: "Jul/2024", savings: 1200, goalProgress: 2.4 },
        { month: "Ago/2024", savings: 1500, goalProgress: 3.0 },
        { month: "Set/2024", savings: 1100, goalProgress: 2.2 },
        { month: "Out/2024", savings: 1800, goalProgress: 3.6 },
        { month: "Nov/2024", savings: 1600, goalProgress: 3.2 },
        { month: "Dez/2024", savings: 2000, goalProgress: 4.0 }
      ];

      setPersonalInfo(mockPersonalInfo);
      setGoal(mockGoal);
      setMonthlySavings(mockMonthlySavings);
    } catch (error) {
      console.error('Erro ao carregar dados pessoais:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const calculateTotalSavings = () => {
    return monthlySavings.reduce((total, month) => total + month.savings, 0);
  };

  const calculateAverageMonthlySavings = () => {
    if (monthlySavings.length === 0) return 0;
    return calculateTotalSavings() / monthlySavings.length;
  };

  const calculateGoalProgress = () => {
    if (goal.targetAmount === 0) return 0;
    return (calculateTotalSavings() / goal.targetAmount) * 100;
  };

  const calculateRemainingAmount = () => {
    return Math.max(0, goal.targetAmount - calculateTotalSavings());
  };

  const calculateMonthsToGoal = () => {
    const average = calculateAverageMonthlySavings();
    if (average === 0) return 0;
    return Math.ceil(calculateRemainingAmount() / average);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Carregando suas informações...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Informações Pessoais */}
      <div className="bg-[#2B402B] p-6 rounded-xl border border-[#4A5D4A]">
        <h2 className="text-2xl font-bold text-white mb-4">👤 Suas Informações</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">Dados Pessoais</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Nome:</span>
                <span className="text-white font-medium">{personalInfo.fullName || 'Não informado'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Email:</span>
                <span className="text-white font-medium">{personalInfo.email || 'Não informado'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Telefone:</span>
                <span className="text-white font-medium">{personalInfo.phone || 'Não informado'}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-3">Situação Financeira</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Receita Mensal:</span>
                <span className="text-green-400 font-medium">{formatCurrency(personalInfo.monthlyIncome || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Gastos Fixos:</span>
                <span className="text-red-400 font-medium">{formatCurrency(personalInfo.monthlyFixedExpenses || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Gastos Variáveis:</span>
                <span className="text-orange-400 font-medium">{formatCurrency(personalInfo.monthlyVariableExpenses || 0)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {personalInfo.notes && (
          <div className="mt-4 p-4 bg-[#122112] rounded-lg">
            <h4 className="text-yellow-400 font-semibold mb-2">📝 Observações</h4>
            <p className="text-gray-300">{personalInfo.notes}</p>
          </div>
        )}
      </div>

      {/* Meta Financeira */}
      {goal.name && (
        <div className="bg-[#2B402B] p-6 rounded-xl border border-[#4A5D4A]">
          <h2 className="text-2xl font-bold text-white mb-4">🎯 Sua Meta</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Meta</h3>
              <p className="text-white text-xl font-bold">{goal.name}</p>
              <p className="text-gray-300 text-sm">Valor: {formatCurrency(goal.targetAmount)}</p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-400 mb-2">Progresso</h3>
              <p className="text-white text-2xl font-bold">{formatPercentage(calculateGoalProgress())}</p>
              <p className="text-gray-300 text-sm">Concluído</p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Restante</h3>
              <p className="text-white text-xl font-bold">{formatCurrency(calculateRemainingAmount())}</p>
              <p className="text-gray-300 text-sm">
                {calculateMonthsToGoal() > 0 ? `${calculateMonthsToGoal()} meses` : 'Meta atingida!'}
              </p>
            </div>
          </div>
          
          {/* Barra de Progresso da Meta */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Progresso da Meta</span>
              <span className="text-white font-medium">{formatPercentage(calculateGoalProgress())}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, calculateGoalProgress())}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Gráfico de Economia Mensal */}
      <div className="bg-[#2B402B] p-6 rounded-xl border border-[#4A5D4A]">
        <h2 className="text-2xl font-bold text-white mb-4">📊 Sua Economia Mensal</h2>
        
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#122112] p-4 rounded-lg text-center">
            <h3 className="text-green-400 font-semibold mb-2">Total Economizado</h3>
            <p className="text-2xl font-bold text-white">{formatCurrency(calculateTotalSavings())}</p>
          </div>
          
          <div className="bg-[#122112] p-4 rounded-lg text-center">
            <h3 className="text-blue-400 font-semibold mb-2">Média Mensal</h3>
            <p className="text-2xl font-bold text-white">{formatCurrency(calculateAverageMonthlySavings())}</p>
          </div>
          
          <div className="bg-[#122112] p-4 rounded-lg text-center">
            <h3 className="text-yellow-400 font-semibold mb-2">Último Mês</h3>
            <p className="text-2xl font-bold text-white">
              {monthlySavings.length > 0 ? formatCurrency(monthlySavings[monthlySavings.length - 1].savings) : 'R$ 0,00'}
            </p>
          </div>
        </div>

        {/* Gráfico de Barras */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Evolução dos Últimos 6 Meses</h3>
          <div className="space-y-3">
            {monthlySavings.map((month, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-20 text-sm text-gray-300 font-medium">{month.month}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{formatCurrency(month.savings)}</span>
                    <span className="text-gray-400 text-sm">{formatPercentage(month.goalProgress)} da meta</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (month.savings / 2000) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projeção */}
        <div className="mt-6 p-4 bg-[#122112] rounded-lg">
          <h4 className="text-yellow-400 font-semibold mb-2">🔮 Projeção</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-300">Economia projetada em 12 meses:</span>
              <span className="text-green-400 font-bold ml-2">
                {formatCurrency(calculateAverageMonthlySavings() * 12)}
              </span>
            </div>
            <div>
              <span className="text-gray-300">Tempo para atingir a meta:</span>
              <span className="text-blue-400 font-bold ml-2">
                {calculateMonthsToGoal() > 0 ? `${calculateMonthsToGoal()} meses` : 'Meta já atingida!'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDashboard;

