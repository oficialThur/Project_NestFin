import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NotificationModal from './NotificationModal';

const notifications = [
  { id: 1, title: 'Nova meta criada', description: 'Sua meta "Viagem" foi criada com sucesso.', date: 'Hoje, 10:30' },
  { id: 2, title: 'Depósito recebido', description: 'Você recebeu R$500,00 na conta corrente.', date: 'Ontem, 16:12' },
  { id: 3, title: 'Alerta de saldo', description: 'Seu saldo está abaixo de R$100,00.', date: '27/07/2024' },
];

interface HeaderProps {
  onSelectDashboard: () => void;
  onSelectMetas: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSelectDashboard, onSelectMetas }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const notifBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="bg-[#122112] border-b-[3px] border-white w-full relative">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-white">
              NestFin
            </h1>
          </div>
          <nav className="flex justify-end space-x-8 relative">
            <button
              onClick={onSelectDashboard}
              className="flex items-center space-x-1 text-white hover:text-[#E5E8EB] px-3 py-2 rounded-md text-sm font-medium bg-transparent border-none outline-none"
            >
              <span>Dashboard</span>
            </button>
            <button
              onClick={onSelectMetas}
              className="flex items-center space-x-1 text-white hover:text-[#E5E8EB] px-3 py-2 rounded-md text-sm font-medium bg-transparent border-none outline-none"
            >
              <span>Metas</span>
            </button>
            <div className="relative">
              <Button
                ref={notifBtnRef}
                className="bg-[#264526] text-white hover:bg-[#264526]/90 flex items-center space-x-1 w-10 h-10"
                onClick={() => setModalOpen((v) => !v)}
                aria-label="Abrir notificações"
              >
                <Icon name="notifications" size="sm" />
              </Button>
              <NotificationModal open={modalOpen} onClose={() => setModalOpen(false)} notifications={notifications} anchorRef={notifBtnRef} />
            </div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 