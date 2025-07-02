import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const Header: React.FC = () => {
    return (
        <header className="bg-[#122112] border-b-[3px] border-white w-full">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-xl font-semibold text-white">
                            NestFin
                        </h1>
                    </div>
                    <nav className="flex justify-end space-x-8">
                        <a href="#" className="flex items-center space-x-1 text-white hover:text-[#E5E8EB] px-3 py-2 rounded-md text-sm font-medium">
                            <span>Dashboard</span>
                        </a>
                        <a href="#" className="flex items-center space-x-1 text-white hover:text-[#E5E8EB] px-3 py-2 rounded-md text-sm font-medium"> 
                            <span>Metas</span>
                        </a>
                        <Button className="bg-[#264526] text-white hover:bg-[#264526]/90 flex items-center space-x-1 w-10 h-10">
                            <Icon name="notifications" size="sm" />
                        </Button>
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