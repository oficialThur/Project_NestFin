'use client'
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import DashboardTabs from '@/components/layout/DashboardTabs';
import TitleDashboard from '@/components/layout/TitleDashboard';
import PatrimonioDashboard from '@/components/dashboard/PatrimonioDashboard';
import ContaCorrenteDashboard from '@/components/dashboard/ContaCorrenteDashboard';
import PoupancaDashboard from '@/components/dashboard/PoupancaDashboard';
import Metas from '@/components/metas/Metas';
import Footer from '@/components/layout/Footer';
import AuthForms from '@/components/auth/AuthForms';
import { personalService, PersonalInfoDto } from '@/lib/api';

const Page = () => {
  const [mainView, setMainView] = useState<'dashboard' | 'personal' | 'metas' | 'api'>('dashboard');
  const [selectedTab, setSelectedTab] = useState('patrimonio');
  const [info, setInfo] = useState<PersonalInfoDto>({});
  const [goalName, setGoalName] = useState('');
  const [goalValue, setGoalValue] = useState<number | ''>('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const getTitle = () => {
    switch (selectedTab) {
      case 'patrimonio':
        return 'Patrimônio líquido';
      case 'conta':
        return 'Conta corrente';
      case 'poupanca':
        return 'Poupança';
      default:
        return '';
    }
  };

  const getSubtitle = () => {
    switch (selectedTab) {
      case 'patrimonio':
        return 'Valor total dos seus ativos';
      case 'conta':
        return 'Saldo disponível na conta';
      case 'poupanca':
        return 'Valor total da poupança';
      default:
        return '';
    }
  };

  const renderDashboard = () => {
    switch (selectedTab) {
      case 'patrimonio':
        return <PatrimonioDashboard />;
      case 'conta':
        return <ContaCorrenteDashboard />;
      case 'poupanca':
        return <PoupancaDashboard />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header
        onSelectDashboard={() => setMainView('dashboard')}
        onSelectPersonal={() => setMainView('personal')}
        onSelectMetas={() => setMainView('metas')}
        onSelectApi={() => setMainView('api')}
      />
      <main className="bg-[#122112] w-full h-full min-h-screen flex flex-col items-center gap-4 text-white font-semibold text-lg">
        {mainView === 'dashboard' ? (
          <>
            <TitleDashboard title={getTitle()} subtitle={getSubtitle()} />
            <DashboardTabs selected={selectedTab} onSelect={setSelectedTab} />
            {(selectedTab === 'patrimonio' || selectedTab === 'poupanca') && (
              <div className="w-[960px] h-[100px] bg-[#2B402B] rounded-lg flex flex-col justify-start p-6 ">
                <p className="text-white">
                  {getTitle()}
                </p>
                <h2 className="text-2xl font-bold text-white ">{selectedTab === 'patrimonio' ? '12,345' : '12,345.67'}</h2>
              </div>
            )}
            {renderDashboard()}
          </>
        ) : mainView === 'personal' ? (
          <div className="w-full flex justify-center">
            <div className="w-[960px] grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-[#2B402B] rounded-lg p-6 border border-[#4A5D4A]">
                <h3 className="text-xl font-semibold mb-4">Informações Pessoais</h3>
                <div className="space-y-3">
                  <input className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A]" placeholder="Nome completo" value={info.fullName ?? ''} onChange={(e)=>setInfo({...info, fullName: e.target.value})} />
                  <input className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A]" placeholder="Email" type="email" value={info.email ?? ''} onChange={(e)=>setInfo({...info, email: e.target.value})} />
                  <input className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A]" placeholder="Telefone" value={info.phone ?? ''} onChange={(e)=>setInfo({...info, phone: e.target.value})} />
                </div>
              </div>
              <div className="bg-[#2B402B] rounded-lg p-6 border border-[#4A5D4A]">
                <h3 className="text-xl font-semibold mb-4">Financeiro Mensal</h3>
                <div className="space-y-3">
                  <input className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A]" placeholder="Receita mensal (R$)" type="number" value={info.monthlyIncome ?? ''} onChange={(e)=>setInfo({...info, monthlyIncome: Number(e.target.value)})} />
                  <input className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A]" placeholder="Gastos fixos mensais (R$)" type="number" value={info.monthlyFixedExpenses ?? ''} onChange={(e)=>setInfo({...info, monthlyFixedExpenses: Number(e.target.value)})} />
                  <input className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A]" placeholder="Gastos variáveis mensais (R$)" type="number" value={info.monthlyVariableExpenses ?? ''} onChange={(e)=>setInfo({...info, monthlyVariableExpenses: Number(e.target.value)})} />
                </div>
              </div>
              <div className="bg-[#2B402B] rounded-lg p-6 border border-[#4A5D4A] md:col-span-2">
                <h3 className="text-xl font-semibold mb-4">Definir Meta</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A] md:col-span-2" placeholder="Nome da meta" value={goalName} onChange={(e)=>setGoalName(e.target.value)} />
                  <input className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A]" placeholder="Valor da meta (R$)" type="number" value={goalValue} onChange={(e)=>setGoalValue(e.target.value===''? '' : Number(e.target.value))} />
                </div>
              </div>
              <div className="bg-[#2B402B] rounded-lg p-6 border border-[#4A5D4A] md:col-span-2">
                <h3 className="text-xl font-semibold mb-4">Outras Informações</h3>
                <textarea className="w-full p-3 rounded bg-[#122112] border border-[#4A5D4A] h-32" placeholder="Observações, objetivos financeiros, etc." value={info.notes ?? ''} onChange={(e)=>setInfo({...info, notes: e.target.value})} />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  className="px-8 py-3 rounded bg-green-600 hover:bg-green-700"
                  onClick={async ()=>{
                    try {
                      await personalService.upsertInfo(info);
                      if (goalName && goalValue !== '' && Number(goalValue) > 0) {
                        await personalService.createGoal({ name: goalName, targetAmount: Number(goalValue) });
                        setGoalName('');
                        setGoalValue('');
                      }
                      setFeedback('Dados salvos com sucesso');
                    } catch {
                      setFeedback('Erro ao salvar');
                    }
                  }}
                >
                  Salvar Tudo
                </button>
              </div>
              {feedback && <div className="md:col-span-2 text-sm text-center opacity-80">{feedback}</div>}
            </div>
          </div>
        ) : mainView === 'metas' ? (
          <Metas />
        ) : (
          <div className="w-full flex-1 flex items-center justify-center py-10">
            <div className="w-full max-w-[720px] px-4">
              <AuthForms onSuccessLogin={() => setMainView('dashboard')} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Page;