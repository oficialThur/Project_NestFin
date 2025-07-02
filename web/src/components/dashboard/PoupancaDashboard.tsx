'use client'
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jul 1', value: 4000 },
  { name: 'Jul 8', value: 9000 },
  { name: 'Jul 15', value: 5000 },
  { name: 'Jul 22', value: 11000 },
  { name: 'Jul 29', value: 12345.67 },
];

const PoupancaDashboard = () => (
  <div className="w-[960px] bg-[#1a2d1a] border border-[#264526] rounded-xl p-6 flex flex-col gap-4 shadow-md">
    <div>
      <div className="text-white text-base font-semibold">Poupança ao Longo do Tempo</div>
      <div className="text-4xl font-bold text-white mt-1">R$12,345.67</div>
      <div className="text-[#9EBF9E] text-sm mt-1">
        Últimos 30 dias <span className="text-green-400 font-semibold">+5%</span>
      </div>
    </div>
    <div className="w-full h-40 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#9EBF9E" fontSize={14} dy={10} />
          <Bar dataKey="value" fill="#9EBF9E" radius={[8, 8, 0, 0]} barSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default PoupancaDashboard; 