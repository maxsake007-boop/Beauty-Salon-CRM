import React from 'react';
import { BrandLogo } from './BrandLogo';

interface GuestProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuestProfileModal: React.FC<GuestProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-[340px] bg-white rounded-xl p-3.5 shadow-xl border border-[#eae8e5] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-[#fcf9f7] border border-[#d9c1bb] p-0.5 flex items-center justify-center">
              <BrandLogo variant="emblem" className="w-full h-full" strokeColor="#8d4933" />
            </div>
            <span className="font-epilogue text-[13px] font-semibold text-[#1c1c1b]">
              Профиль гостя
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-[#f6f3f1] hover:bg-[#eae8e5] flex items-center justify-center text-[#54433e] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-2.5 p-2.5 bg-[#fcf9f7] rounded-lg border border-[#eae8e5]">
          <div className="w-9 h-9 rounded-full bg-[#ffdbd0] text-[#3a0b00] flex items-center justify-center font-manrope font-bold text-[12px]">
            АК
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-manrope text-[12px] font-semibold text-[#1c1c1b]">
                Анна Каримова
              </span>
              <span className="material-symbols-outlined text-[13px] text-[#476554]">
                verified
              </span>
            </div>
            <span className="font-manrope text-[10px] text-[#54433e]">+998 90 123 45 67</span>
            <span className="font-manrope text-[9.5px] text-[#476554]">@anna_karimova • Привязан</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-1.5 text-center font-manrope">
          <div className="p-2 bg-[#f6f3f1] rounded-lg">
            <span className="text-[8px] uppercase font-bold text-[#86736d] block">
              СТАТУС ГОСТЯ
            </span>
            <span className="text-[11px] font-bold text-[#8d4933]">Atelier Privé</span>
          </div>
          <div className="p-2 bg-[#f6f3f1] rounded-lg">
            <span className="text-[8px] uppercase font-bold text-[#86736d] block">
              ВИЗИТОВ ЗАВЕРШЕНО
            </span>
            <span className="text-[11px] font-bold text-[#1c1c1b]">4 визита</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-8.5 rounded-lg bg-[#8d4933] hover:bg-[#ab6049] text-white font-manrope text-[11px] font-semibold transition-colors cursor-pointer"
        >
          Готово
        </button>
      </div>
    </div>
  );
};
