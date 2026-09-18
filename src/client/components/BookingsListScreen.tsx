import React from 'react';
import { AppScreen, BookingRecord } from '../types';
import { BrandLogo } from './BrandLogo';

interface BookingsListScreenProps {
  bookings: BookingRecord[];
  onSelectBooking: (booking: BookingRecord) => void;
  onNavigate: (screen: AppScreen) => void;
}

export const BookingsListScreen: React.FC<BookingsListScreenProps> = ({
  bookings,
  onSelectBooking,
  onNavigate,
}) => {
  return (
    <div className="flex flex-col w-full pb-20 pt-[86px] px-3 gap-y-2.5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col gap-0.5">
        <h2 className="font-epilogue text-[16px] font-semibold text-[#1c1c1b]">
          Мои записи
        </h2>
        <p className="font-manrope text-[10px] text-[#86736d]">
          Просматривайте и управляйте запланированными визитами в Lumière Haute Beauté.
        </p>
      </div>

      {/* Bookings List */}
      <div className="flex flex-col gap-2">
        {bookings.map((b) => {
          const hasMultipleServices = b.services && b.services.length > 1;
          return (
            <div
              key={b.id}
              onClick={() => {
                onSelectBooking(b);
                onNavigate('confirmation');
              }}
              className="bg-white rounded-xl p-3 shadow-2xs border border-[#eae8e5] hover:border-[#ffb59e] transition-all cursor-pointer flex flex-col gap-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-manrope text-[9.5px] font-bold text-[#8d4933] bg-[#ffdbd0]/60 px-2 py-0.5 rounded-full">
                    {b.bookingCode}
                  </span>
                  {hasMultipleServices && (
                    <span className="font-manrope text-[8.5px] font-bold text-[#3a0b00] bg-[#f0edeb] px-1.5 py-0.5 rounded-full">
                      {b.services!.length} процедуры
                    </span>
                  )}
                </div>
                <span className="inline-flex items-center gap-1 font-manrope text-[9.5px] font-semibold text-[#476554] bg-[#c8ebd5] px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476554]" />
                  Подтверждено
                </span>
              </div>

              <div className="flex gap-2.5 items-center">
                <img
                  src={b.imageUrl}
                  alt={b.serviceTitle}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <h3 className="font-manrope text-[12px] font-semibold text-[#1c1c1b] group-hover:text-[#8d4933] transition-colors line-clamp-1">
                    {b.serviceTitle}
                  </h3>
                  <span className="font-manrope text-[10px] text-[#54433e]">
                    {b.masterName} · {b.durationMin} мин
                  </span>
                  <span className="font-manrope text-[9.5px] font-medium text-[#86736d] mt-0.5">
                    {b.dateString} • {b.timeRange.split('(')[0]}
                  </span>
                </div>
              </div>

              {/* Multiple services pills preview */}
              {hasMultipleServices && (
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-0.5">
                  {b.services!.map((s) => (
                    <span
                      key={s.id}
                      className="text-[9px] font-manrope text-[#54433e] bg-[#f6f3f1] px-1.5 py-0.5 rounded border border-[#eae8e5] whitespace-nowrap"
                    >
                      {s.shortTitle || s.title}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-1.5 border-t border-[#f0edeb] text-[10.5px] font-manrope">
                <span className="font-semibold text-[#1c1c1b]">{b.priceFormatted}</span>
                <span className="font-semibold text-[#8d4933] flex items-center gap-0.5 text-[10px]">
                  Смотреть квитанцию <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Book another ritual CTA */}
      <div className="bg-[#f6f3f1] rounded-xl p-3 border border-[#eae8e5] flex flex-col items-center text-center gap-1.5 mt-1">
        <div className="w-8 h-8 rounded-full bg-[#fcf9f7] border border-[#d9c1bb] p-0.5 flex items-center justify-center shadow-2xs">
          <BrandLogo variant="emblem" className="w-full h-full" strokeColor="#8d4933" />
        </div>
        <h3 className="font-epilogue text-[12.5px] font-semibold text-[#1c1c1b]">
          Хотите выбрать еще один ритуал?
        </h3>
        <p className="font-manrope text-[10px] text-[#54433e] max-w-xs">
          Ознакомьтесь с нашими фирменными техниками маникюра, японским восстановлением ногтей и спа-педикюром.
        </p>
        <button
          onClick={() => onNavigate('services')}
          className="mt-0.5 px-3 py-1.5 rounded-lg bg-[#8d4933] hover:bg-[#ab6049] text-white font-manrope text-[11px] font-semibold transition-all cursor-pointer"
        >
          Открыть меню ритуалов
        </button>
      </div>
    </div>
  );
};
