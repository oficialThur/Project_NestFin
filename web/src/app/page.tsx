'use client'
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import DashboardTabs from '@/components/layout/DashboardTabs';
import TitleDashboard from '@/components/layout/TitleDashboard';
import PatrimonioDashboard from '@/components/dashboard/PatrimonioDashboard';
import ContaCorrenteDashboard from '@/components/dashboard/ContaCorrenteDashboard';
import PoupancaDashboard from '@/components/dashboard/PoupancaDashboard';
import Footer from '@/components/layout/Footer';

const Page = () => {
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
    <Header />
    <main className="bg-[#122112] w-full h-full min-h-screen flex flex-col items-center gap-4 text-white font-semibold text-lg">
      <TitleDashboard title={getTitle()} subtitle={getSubtitle()} />
      <DashboardTabs selected={selectedTab} onSelect={setSelectedTab} />
      {renderDashboard()}  
    </main>
    <Footer />
    </>
  );
};

export default Page;