'use client'
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import { DashboardTab, DASHBOARD_CONFIG, CHART_DATA } from '@/constants/dashboard';

interface DashboardCardProps {
  type: DashboardTab;
  value: string;
}

const DashboardCard = ({ type, value }: DashboardCardProps) => {
  const config = DASHBOARD_CONFIG[type];
  const data = CHART_DATA[type];

  return (
    <div className="w-full max-w-[960px] bg-[#1a2d1a] border border-[#264526] rounded-xl p-4 sm:p-6 flex flex-col gap-4 shadow-md">
      <div>
        <div className="text-white text-sm sm:text-base font-semibold">{config.chartLabel}</div>
        <div className="text-2xl sm:text-4xl font-bold text-white mt-1">R$ {value}</div>
        <div className="text-[#9EBF9E] text-xs sm:text-sm mt-1">
          {config.period} <span className="text-green-400 font-semibold">{config.growth}</span>
        </div>
      </div>
      <div className="w-full h-32 sm:h-40 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              stroke="#9EBF9E" 
              fontSize={12}
              dy={10} 
            />
            <Bar 
              dataKey="value" 
              fill="#9EBF9E" 
              radius={[6, 6, 0, 0]} 
              barSize={32} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCard;
