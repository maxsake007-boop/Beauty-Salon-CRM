import React from 'react';
import { AppScreen } from '../types';

interface BottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  bookingCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  bookingCount = 1,
}) => {
  // Only show bottom nav on main browsing tabs (Home, Services, Bookings)
  const isMainTab =
    currentScreen === 'home' ||
    currentScreen === 'services' ||
    currentScreen === 'bookings';

  if (!isMainTab) return null;

  return (
    <nav className="fixed bottom-0 w-full max-w-[390px] z-40 bg-[#fcf9f7]/95 backdrop-blur-xl border-t border-[#eae8e5] shadow-[0_-2px_12px_rgba(31,31,30,0.03)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex justify-around items-center h-12 px-2">
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-10 transition-all cursor-pointer ${
            currentScreen === 'home'
              ? 'text-[#8d4933] font-semibold scale-105'
              : 'text-[#54433e] hover:text-[#1c1c1b]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[18px] transition-transform ${
              currentScreen === 'home' ? 'fill-1' : ''
            }`}
          >
            spa
          </span>
          <span className="font-manrope text-[9.5px] tracking-wide">Главная</span>
        </button>

        {/* Services */}
        <button
          onClick={() => onNavigate('services')}
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-10 transition-all cursor-pointer ${
            currentScreen === 'services'
              ? 'text-[#8d4933] font-semibold scale-105'
              : 'text-[#54433e] hover:text-[#1c1c1b]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[18px] transition-transform ${
              currentScreen === 'services' ? 'fill-1' : ''
            }`}
          >
            auto_awesome
          </span>
          <span className="font-manrope text-[9.5px] tracking-wide">Услуги</span>
        </button>

        {/* Bookings */}
        <button
          onClick={() => onNavigate('bookings')}
          className={`relative flex flex-col items-center justify-center gap-0.5 w-16 h-10 transition-all cursor-pointer ${
            currentScreen === 'bookings'
              ? 'text-[#8d4933] font-semibold scale-105'
              : 'text-[#54433e] hover:text-[#1c1c1b]'
          }`}
        >
          <div className="relative">
            <span
              className={`material-symbols-outlined text-[18px] transition-transform ${
                currentScreen === 'bookings' ? 'fill-1' : ''
              }`}
            >
              calendar_today
            </span>
            {bookingCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-[#8d4933] text-white font-manrope text-[8.5px] font-bold flex items-center justify-center shadow-2xs">
                {bookingCount}
              </span>
            )}
          </div>
          <span className="font-manrope text-[9.5px] tracking-wide">Записи</span>
        </button>
      </div>
    </nav>
  );
};
