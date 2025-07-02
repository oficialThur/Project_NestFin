'use client'
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import DashboardTabs from '@/components/layout/DashboardTabs';
import TitleDashboard from '@/components/layout/TitleDashboard';
import PatrimonioDashboard from '@/components/dashboard/PatrimonioDashboard';
import ContaCorrenteDashboard from '@/components/dashboard/ContaCorrenteDashboard';
import PoupancaDashboard from '@/components/dashboard/PoupancaDashboard';
import Metas from '@/components/metas/Metas';
import Footer from '@/components/layout/Footer';

const Page = () => {
  const [mainView, setMainView] = useState<'dashboard' | 'metas'>('dashboard');
  const [selectedTab, setSelectedTab] = useState('patrimonio');

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
        onSelectMetas={() => setMainView('metas')}
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
        ) : (
          <Metas />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Page;