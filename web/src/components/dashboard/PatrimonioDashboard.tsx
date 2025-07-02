'use client'
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 9000 },
  { name: 'Feb', value: 12000 },
  { name: 'Mar', value: 9500 },
  { name: 'Apr', value: 11000 },
  { name: 'May', value: 13000 },
  { name: 'Jun', value: 12345 },
];

const PatrimonioDashboard = () => {
  return (
    <div className="w-[960px] bg-[#1a2d1a] border border-[#264526] rounded-xl p-6 flex flex-col gap-4 shadow-md">
      <div>
        <div className="text-white text-base font-semibold">Patrimônio líquido</div>
        <div className="text-4xl font-bold text-white mt-1">R$12,345</div>
        <div className="text-[#9EBF9E] text-sm mt-1">
          Últimos 6 meses <span className="text-green-400 font-semibold">+12%</span>
        </div>
      </div>
      <div className="w-full h-40 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#9EBF9E" fontSize={14} dy={10} />
            <Bar dataKey="value" fill="#9EBF9E" radius={[6, 6, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PatrimonioDashboard; 