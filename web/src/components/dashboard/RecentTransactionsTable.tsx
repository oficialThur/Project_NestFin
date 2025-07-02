'use client'

const transactions = [
  { date: 'Jul 29', desc: 'Mercearia', category: 'Compras', value: '+R$75,23' },
  { date: 'Jul 28', desc: 'Posto de gasolina', category: 'Transporte', value: '-R$45,67' },
  { date: 'Jul 27', desc: 'Depósito Salarial', category: 'Renda', value: '+R$2,500.00' },
  { date: 'Jul 26', desc: 'Restaurante', category: 'Jantar', value: '-R$60,50' },
  { date: 'Jul 25', desc: 'Compras on-line', category: 'Compras', value: '+R$120,75' },
];

const RecentTransactionsTable = () => (
  <div className="w-[960px] bg-[#1a2d1a] border border-[#264526] rounded-xl p-6 shadow-md mt-8">
    <div className="text-white text-base font-semibold mb-2">Transações recentes</div>
    <div className="overflow-x-auto">
      <table className="min-w-full border border-[#264526] rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-transparent">
            <th className="px-4 py-2 text-left text-[#9EBF9E] font-medium">Data</th>
            <th className="px-4 py-2 text-left text-[#9EBF9E] font-medium">Descrição</th>
            <th className="px-4 py-2 text-left text-[#9EBF9E] font-medium">Category</th>
            <th className="px-4 py-2 text-left text-[#9EBF9E] font-medium">Valor</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={i} className="border-t border-[#264526] hover:bg-[#223822] transition-colors">
              <td className="px-4 py-2 text-[#E5E8EB] whitespace-nowrap">{t.date}</td>
              <td className="px-4 py-2 text-[#E5E8EB]">{t.desc}</td>
              <td className="px-4 py-2 text-[#E5E8EB]">{t.category}</td>
              <td className="px-4 py-2 text-[#E5E8EB]">{t.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentTransactionsTable; 