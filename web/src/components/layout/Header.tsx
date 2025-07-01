import React from 'react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
    return (
        <header className="bg-[#122112] border-b-[3px] border-white">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold text-white">
                            NestFin
                        </h1>
                    </div>
                    <nav className="flex justify-end space-x-8">
                        <a href="#" className="text-white hover:text-[#E5E8EB] px-3 py-2 rounded-md text-sm font-medium">
                            Dashboard
                        </a>
                        <a href="#" className="text-white hover:text-[#E5E8EB] px-3 py-2 rounded-md text-sm font-medium">
                            Metas
                        </a>
                        <Button className="bg-[#264526] text-white hover:bg-[#264526]/90">
                            
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header; 