'use client'
import React from 'react';
import FormSection from '@/components/ui/FormSection';
import { usePersonalInfo } from '@/hooks/usePersonalInfo';

const PersonalInfoView = () => {
  const {
    info,
    setInfo,
    goalName,
    setGoalName,
    goalValue,
    setGoalValue,
    feedback,
    isLoading,
    handleSave,
  } = usePersonalInfo();

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-[960px] grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <FormSection title="Informações Pessoais">
          <div className="space-y-3">
            <input
              className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A] text-sm"
              placeholder="Nome completo"
              value={info.fullName ?? ''}
              onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
            />
            <input
              className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A] text-sm"
              placeholder="Email"
              type="email"
              value={info.email ?? ''}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
            <input
              className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A] text-sm"
              placeholder="Telefone"
              value={info.phone ?? ''}
              onChange={(e) => setInfo({ ...info, phone: e.target.value })}
            />
          </div>
        </FormSection>

        <FormSection title="Financeiro Mensal">
          <div className="space-y-3">
            <input
              className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A] text-sm"
              placeholder="Receita mensal (R$)"
              type="number"
              value={info.monthlyIncome ?? ''}
              onChange={(e) => setInfo({ ...info, monthlyIncome: Number(e.target.value) })}
            />
            <input
              className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A] text-sm"
              placeholder="Gastos fixos mensais (R$)"
              type="number"
              value={info.monthlyFixedExpenses ?? ''}
              onChange={(e) => setInfo({ ...info, monthlyFixedExpenses: Number(e.target.value) })}
            />
            <input
              className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A] text-sm"
              placeholder="Gastos variáveis mensais (R$)"
              type="number"
              value={info.monthlyVariableExpenses ?? ''}
              onChange={(e) => setInfo({ ...info, monthlyVariableExpenses: Number(e.target.value) })}
            />
          </div>
        </FormSection>

        <FormSection title="Definir Meta" className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A] md:col-span-2 text-sm"
              placeholder="Nome da meta"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
            />
            <input
              className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A] text-sm"
              placeholder="Valor da meta (R$)"
              type="number"
              value={goalValue}
              onChange={(e) => setGoalValue(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>
        </FormSection>

        <FormSection title="Outras Informações" className="md:col-span-2">
          <textarea
            className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A] h-32 text-sm"
            placeholder="Observações, objetivos financeiros, etc."
            value={info.notes ?? ''}
            onChange={(e) => setInfo({ ...info, notes: e.target.value })}
          />
        </FormSection>

        <div className="md:col-span-2 flex justify-end">
          <button
            className="px-6 sm:px-8 py-3 rounded bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 'Salvar Tudo'}
          </button>
        </div>

        {feedback && (
          <div className="md:col-span-2 text-sm text-center opacity-80">{feedback}</div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoView;
