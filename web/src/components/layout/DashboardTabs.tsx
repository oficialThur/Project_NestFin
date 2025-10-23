import React from 'react';
import { DASHBOARD_TABS } from '@/constants/dashboard';

interface DashboardTabsProps {
  selected: string;
  onSelect: (value: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ selected, onSelect }) => {
  return (
    <div className="w-full max-w-[960px] px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row bg-[#264526] rounded-lg p-1 gap-1 sm:gap-2">
        {DASHBOARD_TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => onSelect(tab.value)}
            className={`flex-1 py-2 sm:py-2.5 transition-colors rounded-md text-center font-medium text-xs sm:text-sm
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
