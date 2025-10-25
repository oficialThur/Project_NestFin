'use client'
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";

const Metas = () => {
  const { goal, updateGoal } = useAuth();
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSaveGoal = () => {
    if (newGoalName && newGoalAmount) {
      const newGoal = {
        id: Date.now(),
        name: newGoalName,
        targetAmount: parseFloat(newGoalAmount)
      };
      updateGoal(newGoal);
      setNewGoalName('');
      setNewGoalAmount('');
      setShowForm(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      {/* Header */}
      <div className="w-full max-w-[960px] p-4 sm:p-6 text-white mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#2B402B] rounded-lg">
        <h2 className="text-xl sm:text-2xl font-bold">Minhas Metas</h2>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#264526] hover:bg-[#264526]/90 text-white text-sm sm:text-base w-full sm:w-auto"
        >
          {showForm ? 'Cancelar' : 'Adicionar Meta'}
        </Button>
      </div>

      {/* Formulário para adicionar meta */}
      {showForm && (
        <div className="w-full max-w-[960px] bg-[#2B402B] rounded-lg p-6 mt-6 border border-[#4A5D4A]">
          <h3 className="text-lg font-semibold text-white mb-4">Nova Meta</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Nome da Meta</label>
              <input
                type="text"
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#122112] border border-[#4A5D4A] text-white placeholder-gray-400"
                placeholder="Ex: Comprar um carro"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Valor da Meta (R$)</label>
              <input
                type="number"
                value={newGoalAmount}
                onChange={(e) => setNewGoalAmount(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#122112] border border-[#4A5D4A] text-white placeholder-gray-400"
                placeholder="Ex: 50000"
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleSaveGoal}
                disabled={!newGoalName || !newGoalAmount}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
              >
                Salvar Meta
              </Button>
              <Button
                onClick={() => setShowForm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Meta atual */}
      <div className="w-full max-w-[960px] text-white mt-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Meta Atual</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goal && goal.name ? (
            <div className="bg-[#2B402B] rounded-lg p-4 flex items-center justify-between border border-[#4A5D4A]">
              <div className="flex-1 min-w-0">
                <h4 className="text-base sm:text-lg font-semibold">Minha Meta</h4>
                <p className="text-xs sm:text-sm text-gray-300 break-words truncate">{goal.name}</p>
              </div>
              <div className="text-right ml-4">
                <p className="text-xs sm:text-sm text-gray-300">Objetivo</p>
                <p className="text-sm sm:text-base text-white font-bold whitespace-nowrap">
                  {formatCurrency(goal.targetAmount)}
                </p>
              </div>
            </div>
          ) : (
            <div className="col-span-2 bg-[#2B402B] rounded-lg p-6 text-center border border-[#4A5D4A]">
              <p className="text-gray-300 opacity-80 mb-4">Nenhuma meta cadastrada.</p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Criar Primeira Meta
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Progresso da meta */}
      {goal && goal.name && (
        <div className="w-full max-w-[960px] bg-[#2B402B] rounded-lg p-6 mt-6 border border-[#4A5D4A]">
          <h3 className="text-lg font-semibold text-white mb-4">Progresso da Meta</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">{goal.name}</span>
              <span className="text-white font-medium">0%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full" style={{ width: '0%' }} />
            </div>
            <div className="text-center">
              <p className="text-gray-300 text-sm">
                Economize {formatCurrency(goal.targetAmount)} para atingir sua meta
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Metas; 
export default Metas; 
