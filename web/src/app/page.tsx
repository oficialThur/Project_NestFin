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
import AuthForms from '@/components/auth/AuthForms';
import PersonalInfoView from '@/components/views/PersonalInfoView';
import { DASHBOARD_CONFIG, DashboardTab } from '@/constants/dashboard';

type DashboardTabsProps = {
  selected: "patrimonio" | "conta" | "poupanca";
  onSelect: (value: "patrimonio" | "conta" | "poupanca") => void;
}

const Page = () => {
  const [mainView, setMainView] = useState<'dashboard' | 'personal' | 'metas' | 'api'>('dashboard');
  const [selectedTab, setSelectedTab] = useState<DashboardTab>('patrimonio');

  const dashboardConfig = DASHBOARD_CONFIG[selectedTab];

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
      <main className="bg-[#122112] w-full min-h-screen flex flex-col items-center gap-4 text-white font-semibold text-sm sm:text-base lg:text-lg">
        {mainView === 'dashboard' ? (
          <>
            <TitleDashboard title={dashboardConfig.title} subtitle={dashboardConfig.subtitle} />
            <DashboardTabs selected={selectedTab} onSelect={setSelectedTab} />
            {(selectedTab === 'patrimonio' || selectedTab === 'poupanca') && (
              <div className="w-full max-w-[960px] px-4 sm:px-0">
                <div className="bg-[#2B402B] rounded-lg flex flex-col justify-start p-4 sm:p-6">
                  <p className="text-white text-sm sm:text-base">
                    {dashboardConfig.title}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    R$ {selectedTab === 'patrimonio' ? '12,345' : '12,345.67'}
                  </h2>
                </div>
              </div>
            )}
            <div className="w-full flex justify-center px-4">
              {renderDashboard()}
            </div>
          </>
        ) : mainView === 'personal' ? (
          <PersonalInfoView />
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
