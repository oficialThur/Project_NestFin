'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { personalService } from '@/lib/api';

type Goal = { id: number; name: string; targetAmount: number };

const Metas = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await personalService.listGoals();
        setGoals(data);
      } catch {
        setGoals([]);
      }
    })();
  }, []);

  const metasVisiveis = goals.slice(0, 4);

  return (
    <>
      {/* Header */}
      <div className="w-[960px] p-6 text-white mt-6 flex justify-between items-center gap-4 bg-[#2B402B] rounded-lg">
        <h2 className="text-2xl font-bold">Minhas Metas</h2>
        <Button className="bg-[#264526] hover:bg-[#264526]/90 text-white">Adicionar Meta</Button>
      </div>

      {/* Grid de metas atuais */}
      <div className="w-[960px] text-white mt-6">
        <h3 className="text-xl font-semibold mb-4">Metas Atuais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metasVisiveis.length === 0 && (
            <div className="col-span-2 text-gray-300 opacity-80">Nenhuma meta cadastrada.</div>
          )}
          {metasVisiveis.map((g, idx) => (
            <div key={g.id} className="bg-[#2B402B] rounded-lg p-4 flex items-center justify-between border border-[#4A5D4A]">
              <div>
                <h4 className="text-lg font-semibold">Meta {idx + 1}</h4>
                <p className="text-sm text-gray-300 break-words">{g.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">Objetivo</p>
                <p className="text-white font-bold">R$ {Number(g.targetAmount).toLocaleString('pt-BR')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metas alcançadas (placeholder) */}
      <div className="w-[960px] text-white mt-8">
        <h3 className="text-xl font-semibold mb-4">Metas Alcançadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1A2A1A] rounded-lg p-4 border border-[#4A5D4A] opacity-80">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold">—</h4>
                <p className="text-sm text-gray-400">Sem metas concluídas</p>
              </div>
              <span className="px-2 py-1 rounded-full text-xs bg-green-700">—</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Metas; 