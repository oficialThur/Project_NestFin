import React from 'react';

const TABS = [
  { label: 'Patrimônio líquido', value: 'patrimonio' },
  { label: 'Conta corrente', value: 'conta' },
  { label: 'Poupança', value: 'poupanca' },
];

interface DashboardTabsProps {
  selected: string;
  onSelect: (value: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ selected, onSelect }) => {
  return (
    <div className="w-[960px] mt-5">
      <div className="flex bg-[#264526] rounded-lg p-1 gap-1">
        {TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => onSelect(tab.value)}
            className={`flex-1 py-1 transition-colors rounded-md text-center font-medium
              ${selected === tab.value
                ? 'bg-[#1a2d1a] text-white shadow-inner'
                : 'bg-transparent text-[#E5E8EB] hover:bg-[#1a2d1a]/60'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardTabs; 