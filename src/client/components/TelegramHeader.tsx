import React from 'react';
import { AppScreen } from '../types';
import { SALON_LOGO_URL } from '../data/salonData';
import { BrandLogo } from './BrandLogo';

interface TelegramHeaderProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onOpenProfile: () => void;
}

export const TelegramHeader: React.FC<TelegramHeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenProfile,
}) => {
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Главная';
      case 'services':
        return 'Услуги';
      case 'timeslot':
        return 'Выбор времени';
      case 'confirmation':
        return 'Подтверждение записи';
      case 'bookings':
        return 'Мои записи';
      default:
        return 'Lumière';
    }
  };

  const handleBack = () => {
    if (currentScreen === 'timeslot') {
      onNavigate('services');
    } else if (currentScreen === 'confirmation') {
      onNavigate('home');
    } else if (currentScreen === 'services' || currentScreen === 'bookings') {
      onNavigate('home');
    } else {
      onNavigate('home');
    }
  };

  const showBackButton = currentScreen === 'timeslot' || currentScreen === 'confirmation';

  return (
    <header className="fixed top-0 w-full max-w-[390px] z-40 bg-[#fcf9f7]/95 backdrop-blur-xl border-b border-[#f0edeb]/80 shadow-[0_1px_8px_rgba(31,31,30,0.03)] transition-all">
      {/* Mini App System Bar */}
      <div className="px-3 h-8 flex items-center justify-between">
        {showBackButton ? (
          <button
            aria-label="Back"
            className="w-7 h-7 flex items-center justify-center text-[#54433e] hover:text-[#1c1c1b] transition-colors rounded-full active:bg-[#eae8e5]"
            onClick={handleBack}
            type="button"
          >
            <span className="material-symbols-outlined text-[17px]">arrow_back_ios_new</span>
          </button>
        ) : (
          <div className="w-7 h-7" />
        )}

        <span className="font-manrope text-[10px] font-semibold uppercase text-[#86736d] tracking-[0.22em]">
          LUMIÈRE
        </span>

        <button
          aria-label="Close Mini App"
          className="w-7 h-7 flex items-center justify-center text-[#54433e] hover:text-[#1c1c1b] transition-colors rounded-full active:bg-[#eae8e5]"
          onClick={() => onNavigate('home')}
          type="button"
        >
          <span className="material-symbols-outlined text-[17px]">close</span>
        </button>
      </div>

      {/* Salon Brand Title Row */}
      <div className="h-13 px-3.5 flex items-center justify-between border-t border-[#f0edeb]/60">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('home')}
            className="flex-shrink-0 cursor-pointer transition-transform active:scale-95 focus:outline-none flex items-center justify-center"
            title="Lumière Haute Beauté"
            type="button"
          >
            {/* Logo scaled ~1.5x from original 36px to 48px height with refined proportions */}
            <BrandLogo variant="emblem" className="w-[38px] h-[48px]" strokeColor="#8d4933" />
          </button>
          <div className="flex flex-col">
            <h1 className="font-epilogue text-[15px] font-semibold text-[#1c1c1b] leading-tight">
              {getScreenTitle()}
            </h1>
            <span className="font-manrope text-[9px] font-semibold text-[#86736d] tracking-widest uppercase">
              Haute Beauté
            </span>
          </div>
        </div>

        <button
          onClick={onOpenProfile}
          title="Guest Profile"
          className="w-7 h-7 rounded-full bg-[#8d4933] hover:bg-[#ab6049] flex items-center justify-center shadow-xs text-white transition-all active:scale-90 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px]">person</span>
        </button>
      </div>
    </header>
  );
};
