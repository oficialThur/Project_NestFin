'use client'
import React from 'react';

const RecentTransactionsTable = () => {
  // Dados zerados para usuário novo
  const transactions: any[] = [];

  return (
    <div className="w-full max-w-[960px] bg-[#1a2d1a] border border-[#264526] rounded-xl p-4 sm:p-6 shadow-md mt-8">
      <div className="text-white text-sm sm:text-base font-semibold mb-2">Transações recentes</div>
      <div className="overflow-x-auto">
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">Nenhuma transação registrada</p>
            <p className="text-gray-500 text-xs mt-2">Adicione transações para ver seu histórico</p>
          </div>
        ) : (
          <table className="min-w-full border border-[#264526] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-transparent">
                <th className="px-2 sm:px-4 py-2 text-left text-[#9EBF9E] font-medium text-xs sm:text-sm">Data</th>
                <th className="px-2 sm:px-4 py-2 text-left text-[#9EBF9E] font-medium text-xs sm:text-sm">Descrição</th>
                <th className="px-2 sm:px-4 py-2 text-left text-[#9EBF9E] font-medium text-xs sm:text-sm hidden sm:table-cell">Categoria</th>
                <th className="px-2 sm:px-4 py-2 text-left text-[#9EBF9E] font-medium text-xs sm:text-sm">Valor</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className="border-t border-[#264526] hover:bg-[#223822] transition-colors">
                  <td className="px-2 sm:px-4 py-2 text-[#E5E8EB] whitespace-nowrap text-xs sm:text-sm">{t.date}</td>
                  <td className="px-2 sm:px-4 py-2 text-[#E5E8EB] text-xs sm:text-sm">{t.desc}</td>
                  <td className="px-2 sm:px-4 py-2 text-[#E5E8EB] text-xs sm:text-sm hidden sm:table-cell">{t.category}</td>
                  <td className="px-2 sm:px-4 py-2 text-[#E5E8EB] text-xs sm:text-sm">{t.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecentTransactionsTable; 