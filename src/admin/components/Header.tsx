import React from 'react';
import { Sparkles, LogOut, Store } from 'lucide-react';
import { SalonSettings, NavTab } from '../types';

interface HeaderProps {
  settings: SalonSettings;
  currentTab: NavTab;
  onLogout?: () => void;
  onNavigateToClient?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  currentTab,
  onLogout,
  onNavigateToClient,
}) => {
  const pageTitles: Record<NavTab, string> = {
    dashboard: 'Бизнес-аналитика и дашборд',
    appointments: 'Заявки гостей',
    services: 'Управление услугами',
  };

  const handleGoToClient = () => {
    if (onNavigateToClient) {
      onNavigateToClient();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#E3DED7] bg-[#FAF8F5]/95 px-6 py-3.5 backdrop-blur-md">
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

      <div className="flex items-center gap-2">
        <button
          onClick={handleGoToClient}
          title="Открыть витрину салона для гостей"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#54433E] hover:text-[#1F1F1E] bg-white border border-[#E3DED7] hover:border-[#8D4933]/30 shadow-2xs transition-all cursor-pointer"
        >
          <Store className="w-3.5 h-3.5 text-[#8D4933]" />
          <span className="hidden sm:inline">Витрина гостей</span>
        </button>

        {onLogout && (
          <button
            onClick={onLogout}
            title="Выйти из панели управления"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-red-700 bg-red-50/70 hover:bg-red-100/80 border border-red-200/80 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Выйти</span>
          </button>
        )}
      </div>
    </header>
  );
};

