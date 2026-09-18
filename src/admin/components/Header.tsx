import React from 'react';
import { Sparkles } from 'lucide-react';
import { SalonSettings, NavTab } from '../types';

interface HeaderProps {
  settings: SalonSettings;
  currentTab: NavTab;
}

export const Header: React.FC<HeaderProps> = ({ settings, currentTab }) => {
  const pageTitles: Record<NavTab, string> = {
    dashboard: 'Бизнес-аналитика и дашборд',
    appointments: 'Заявки гостей',
    services: 'Управление услугами',
  };

  return (
    <header className="sticky top-0 z-30 flex items-center border-b border-[#E3DED7] bg-[#FAF8F5]/95 px-6 py-3.5 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#B86B53]/10 text-[#8D4933]">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex items-baseline gap-2">
          <h1 className="font-display text-base font-bold tracking-tight text-[#1F1F1E]">
            {settings.name}
          </h1>
          <span className="text-[#86736D] text-xs font-normal">/</span>
          <span className="text-xs font-semibold text-[#8D4933]">
            {pageTitles[currentTab]}
          </span>
        </div>
      </div>
    </header>
  );
};
