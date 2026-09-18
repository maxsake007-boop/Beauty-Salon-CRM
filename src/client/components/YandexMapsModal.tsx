import React from 'react';
import { BrandLogo } from './BrandLogo';

interface YandexMapsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const YandexMapsModal: React.FC<YandexMapsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-[340px] bg-white rounded-xl p-3.5 shadow-xl border border-[#eae8e5] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-md bg-[#fcf9f7] border border-[#d9c1bb] p-0.5 flex items-center justify-center">
              <BrandLogo variant="emblem" className="w-full h-full" strokeColor="#8d4933" />
            </div>
            <span className="font-epilogue text-[13px] font-semibold text-[#1c1c1b]">
              Ателье салона Lumière
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-[#f6f3f1] hover:bg-[#eae8e5] flex items-center justify-center text-[#54433e] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        </div>

        {/* Map Preview Mock */}
        <div className="relative h-32 rounded-lg overflow-hidden bg-[#e5e2e0] border border-[#d9c1bb] flex items-center justify-center">
          {/* Stylized aesthetic map background */}
          <div className="absolute inset-0 bg-[#f0edeb] opacity-80 flex items-center justify-center">
            <svg className="w-full h-full opacity-30" viewBox="0 0 200 120">
              <path d="M 10 30 Q 80 50 190 20" stroke="#86736d" strokeWidth="4" fill="none" />
              <path d="M 40 10 L 120 110" stroke="#86736d" strokeWidth="6" fill="none" />
              <path d="M 10 90 Q 100 80 190 100" stroke="#86736d" strokeWidth="3" fill="none" />
            </svg>
          </div>

          {/* Pin */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#8d4933] text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce p-1">
              <BrandLogo variant="emblem" className="w-full h-full" strokeColor="#ffffff" />
            </div>
            <div className="mt-0.5 bg-white/95 px-2 py-0.5 rounded-full shadow-md text-[9.5px] font-manrope font-bold text-[#1c1c1b]">
              Lumière Atelier
            </div>
          </div>
        </div>

        {/* Address Info */}
        <div className="flex flex-col gap-0.5 font-manrope text-[11px]">
          <span className="font-semibold text-[#1c1c1b]">
            ул. Мирабад, 14, Мирабадский район, Ташкент
          </span>
          <span className="text-[10px] text-[#686662]">
            Напротив отеля Grand Mir • Доступен персональный valet-паркинг
          </span>
          <span className="text-[9.5px] text-[#476554] font-medium mt-0.5">
            Ежедневно: 09:00 – 21:00
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-1.5 mt-0.5 font-manrope text-[11px]">
          <a
            href="https://yandex.com/maps"
            target="_blank"
            rel="noreferrer"
            className="h-8.5 rounded-lg bg-[#8d4933] text-white font-semibold flex items-center justify-center gap-1 hover:bg-[#ab6049] transition-colors"
          >
            <span>Открыть карты</span>
            <span className="material-symbols-outlined text-[13px]">open_in_new</span>
          </a>
          <button
            onClick={onClose}
            className="h-8.5 rounded-lg bg-[#f0edeb] text-[#1c1c1b] font-semibold hover:bg-[#eae8e5] transition-colors cursor-pointer"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
