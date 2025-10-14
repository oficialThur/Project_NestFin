"use client"
import React, { useState, useRef, useEffect } from 'react';
import { authService } from '@/lib/auth';

const notifications = [
  { id: 1, title: 'Nova meta criada', description: 'Sua meta "Viagem" foi criada com sucesso.', date: 'Hoje, 10:30' },
  { id: 2, title: 'Depósito recebido', description: 'Você recebeu R$500,00 na conta corrente.', date: 'Ontem, 16:12' },
  { id: 3, title: 'Alerta de saldo', description: 'Seu saldo está abaixo de R$100,00.', date: '27/07/2024' },
];

interface HeaderProps {
  onSelectDashboard: () => void;
  onSelectPersonal: () => void;
  onSelectMetas: () => void;
  onSelectApi: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSelectDashboard, onSelectPersonal, onSelectMetas, onSelectApi }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const notifBtnRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem('nestfin_user');
      if (raw) {
        const u = JSON.parse(raw);
        setUserName(u?.name ?? null);
      }
    } catch {
      setUserName(null);
    }
  }, []);

  return (
    <header className="bg-[#122112] border-b-[1px] border-white w-full relative">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex flex-col items-start space-y-1">
            <h1 className="text-xl font-semibold text-white">NestFin</h1>
          </div>
          <nav className="flex justify-end items-center space-x-8 relative">
            <button
              onClick={onSelectDashboard}
              className="group flex items-center space-x-1 text-white hover:text-[#c6ffe9] px-3 py-2 rounded-md text-sm font-medium bg-transparent border-none outline-none transition-colors duration-200"
            >
              <span>Dashboard</span>
            </button>
            <button
              onClick={onSelectPersonal}
              className="group flex items-center space-x-1 text-white hover:text-[#c6ffe9] px-3 py-2 rounded-md text-sm font-medium bg-transparent border-none outline-none transition-colors duration-200"
            >
              <span>Informações Pessoais</span>
            </button>
            <button
              onClick={onSelectMetas}
              className="group flex items-center space-x-1 text-white hover:text-[#c6ffe9] px-3 py-2 rounded-md text-sm font-medium bg-transparent border-none outline-none transition-colors duration-200"
            >
              <span>Metas</span>
            </button>
            <button
              onClick={onSelectApi}
              className="group flex items-center space-x-1 text-white hover:text-[#c6ffe9] px-3 py-2 rounded-md text-sm font-medium bg-transparent border-none outline-none transition-colors duration-200"
            >
              <span>Cadastrar</span>
            </button>
            {/* Botão de sair (cliente) */}
            {mounted && userName && (
              <button
                onClick={() => { authService.logout(); setUserName(null); window.location.reload(); }}
                className="group flex items-center space-x-1 text-red-300 hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium bg-transparent border-none outline-none transition-colors duration-200"
              >
                <span className="group-hover:underline">Sair</span>
              </button>
            )}
          </nav>
        </div>
        {/* Chip com nome do usuário (cliente) */}
        {mounted && userName && (
          <div className="absolute left-[160px] top-1/2 -translate-y-1/2 px-3 py-1 rounded-full border border-green-600 bg-[#122112] text-green-400 text-xs sm:text-sm font-medium">
            Usuário: {userName}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 