import React, { useState } from 'react';
import { AppScreen, BookingRecord } from '../types';
import { BrandLogo } from './BrandLogo';

interface BookingConfirmationScreenProps {
  booking: BookingRecord;
  onNavigate: (screen: AppScreen) => void;
  onShowToast: (message: string) => void;
  onOpenMap: () => void;
}

export const BookingConfirmationScreen: React.FC<BookingConfirmationScreenProps> = ({
  booking,
  onNavigate,
  onShowToast,
  onOpenMap,
}) => {
  const [calendarSaved, setCalendarSaved] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const servicesCount = booking.services?.length || 1;
  const servicesDescription =
    booking.services && booking.services.length > 0
      ? booking.services.map((s) => `${s.title} (${s.durationMin} мин, ${s.priceFormatted})`).join('\\n')
      : `${booking.serviceTitle} (${booking.durationMin} мин, ${booking.priceFormatted})`;

  const handleCopyId = () => {
    navigator.clipboard.writeText(booking.bookingCode);
    setCopySuccess(true);
    onShowToast(`Номер записи ${booking.bookingCode} скопирован в буфер обмена`);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Lumière Haute Beauté//Appointment Booking//RU',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:lum-booking-${Date.now()}@lumiere.uz`,
      'DTSTAMP:20260910T090000Z',
      'DTSTART:20260915T090000Z',
      'DTEND:20260915T110000Z',
      `SUMMARY:${booking.serviceTitle} - Lumière Haute Beauté`,
      `DESCRIPTION:Процедуры:\\n${servicesDescription}\\nМастер: ${booking.masterName}\\nНомер записи: ${booking.bookingCode}\\nИтого: ${booking.priceFormatted}`,
      `LOCATION:${booking.salonAddress}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Lumiere_${booking.bookingCode.replace('#', '')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCalendarSaved(true);
    onShowToast('Событие календаря скачано (.ics)');
    setTimeout(() => setCalendarSaved(false), 3000);
  };

  const handleShare = async () => {
    const text = `✨ Моя запись в Lumière Haute Beauté:\n🗓 ${booking.dateString}, ${booking.timeRange}\n💆‍♀️ Процедуры (${servicesCount}): ${booking.serviceTitle}\n⏱ Длительность: ${booking.durationMin} мин\n💰 Итого: ${booking.priceFormatted}\n📍 ${booking.salonAddress}\n🏷 Код: ${booking.bookingCode}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Запись в Lumière - ${booking.bookingCode}`,
          text,
        });
      } catch {
        navigator.clipboard.writeText(text);
        onShowToast('Детали записи скопированы в буфер обмена');
      }
    } else {
      navigator.clipboard.writeText(text);
      onShowToast('Детали записи скопированы в буфер обмена');
    }
  };

  return (
    <div className="flex flex-col w-full pb-16 pt-[86px] px-3 gap-y-2.5 animate-fadeIn">
      {/* 1. Confirmed Status Card */}
      <div className="relative overflow-hidden rounded-xl bg-[#f6f3f1] shadow-2xs border border-[#eae8e5] p-4 flex flex-col items-center text-center">
        {/* Decorative soft glows */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[#ffdbd0]/40 pointer-events-none blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[#c8ebd5]/40 pointer-events-none blur-2xl" />

        {/* Checkmark Anchor */}
        <div className="relative w-12 h-12 rounded-full bg-[#8d4933] flex items-center justify-center shadow-xs mb-2.5 transition-transform duration-300 active:scale-95">
          <div className="absolute inset-0 rounded-full bg-[#ffb59e]/30 animate-ping opacity-35" />
          <span className="material-symbols-outlined text-white text-[24px]">check_circle</span>
        </div>

        {/* Pill Badge */}
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#c8ebd5] text-[#2f4d3d] font-manrope text-[9px] font-semibold uppercase tracking-wider mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#476554] animate-pulse" />
          ПОДТВЕРЖДЕНО · БЕЗ ПРЕДОПЛАТЫ
        </div>

        <h2 className="font-epilogue text-[17px] font-semibold text-[#1c1c1b] mb-0.5">
          Запись подтверждена
        </h2>

        <p className="font-manrope text-[10.5px] text-[#54433e] max-w-xs leading-snug">
          С нетерпением ждем вас в Lumière Haute Beauté на ваш персональный ритуал заботы.
        </p>

        {/* Booking ID with Copy */}
        <div className="mt-2.5 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md shadow-2xs border border-[#eae8e5]">
          <span className="font-manrope text-[8px] font-bold text-[#86736d] uppercase tracking-wider">
            НОМЕР ЗАПИСИ
          </span>
          <span className="font-manrope text-[10.5px] text-[#8d4933] font-bold tracking-wide">
            {booking.bookingCode}
          </span>
          <button
            onClick={handleCopyId}
            title="Скопировать код"
            className="text-[#54433e] hover:text-[#8d4933] transition-colors flex items-center ml-0.5 cursor-pointer"
          >
            <span
              className={`material-symbols-outlined text-[13px] ${
                copySuccess ? 'text-[#476554]' : ''
              }`}
            >
              {copySuccess ? 'done' : 'content_copy'}
            </span>
          </button>
        </div>
      </div>

      {/* 2. Ritual Details Card (Supports multiple services) */}
      <div className="rounded-xl bg-white shadow-2xs border border-[#eae8e5] p-3 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#8d4933] text-[16px]">spa</span>
            <span className="font-manrope text-[12px] font-semibold text-[#1c1c1b]">
              Детали визита ({servicesCount} {servicesCount === 1 ? 'процедура' : servicesCount < 5 ? 'процедуры' : 'процедур'})
            </span>
          </div>
          <span className="font-manrope text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-[#f0edeb] text-[#54433e]">
            {booking.suiteName}
          </span>
        </div>

        {/* Services List Box */}
        <div className="flex flex-col gap-2">
          {booking.services && booking.services.length > 0 ? (
            booking.services.map((service, index) => (
              <div
                key={service.id}
                className="flex gap-2.5 items-center bg-[#f6f3f1] p-2 rounded-lg border border-[#f0edeb]"
              >
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-11 h-11 rounded-md object-cover flex-shrink-0"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-manrope text-[11.5px] font-semibold text-[#1c1c1b] truncate">
                      {index + 1}. {service.title}
                    </h3>
                    <span className="font-manrope text-[10.5px] font-bold text-[#8d4933] whitespace-nowrap">
                      {service.priceFormatted}
                    </span>
                  </div>
                  <span className="font-manrope text-[10px] text-[#54433e] truncate">
                    {service.subtitle}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-manrope text-[9.5px] font-semibold text-[#8d4933] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[11px]">schedule</span>{' '}
                      {service.durationMin} мин
                    </span>
                    <span className="text-[#86736d] text-[9px]">•</span>
                    <span className="font-manrope text-[9.5px] font-semibold text-[#476554] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[11px]">eco</span> Органик
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Fallback for single service record */
            <div className="flex gap-2.5 items-center bg-[#f6f3f1] p-2 rounded-lg border border-[#f0edeb]">
              <img
                src={booking.imageUrl}
                alt={booking.serviceTitle}
                className="w-11 h-11 rounded-md object-cover flex-shrink-0"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <h3 className="font-manrope text-[11.5px] font-semibold text-[#1c1c1b] truncate">
                  {booking.serviceTitle}
                </h3>
                <span className="font-manrope text-[10px] text-[#54433e]">
                  {booking.masterName}
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="font-manrope text-[9.5px] font-semibold text-[#8d4933] flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[11px]">schedule</span>{' '}
                    {booking.durationMin} мин
                  </span>
                  <span className="text-[#86736d] text-[9px]">•</span>
                  <span className="font-manrope text-[9.5px] font-semibold text-[#476554] flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[11px]">eco</span> Органик
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Date, Location, and Total Investment */}
        <div className="grid grid-cols-1 gap-1.5 pt-0.5">
          {/* Date & Window */}
          <div className="flex items-start gap-2 p-2 rounded-lg bg-[#f6f3f1]/70 border border-[#f0edeb]">
            <div className="w-6 h-6 rounded-full bg-[#ffdbd0] flex items-center justify-center flex-shrink-0 text-[#3a0b00]">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            </div>
            <div className="flex flex-col">
              <span className="font-manrope text-[8px] font-bold text-[#86736d] uppercase tracking-wider">
                ДАТА, ВРЕМЯ И МАСТЕР
              </span>
              <span className="font-manrope text-[11px] font-semibold text-[#1c1c1b]">
                {booking.dateString}
              </span>
              <span className="font-manrope text-[10px] text-[#54433e]">
                {booking.timeRange} · {booking.masterName} ({booking.durationMin} мин сеанс)
              </span>
            </div>
          </div>

          {/* Salon Atelier */}
          <div className="flex items-start gap-2 p-2 rounded-lg bg-[#f6f3f1]/70 border border-[#f0edeb]">
            <div className="w-6 h-6 rounded-full bg-[#fcf9f7] border border-[#d9c1bb] p-0.5 flex items-center justify-center flex-shrink-0">
              <BrandLogo variant="emblem" className="w-full h-full" strokeColor="#8d4933" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-manrope text-[8px] font-bold text-[#86736d] uppercase tracking-wider">
                  АТЕЛЬЕ САЛОНА
                </span>
                <button
                  onClick={onOpenMap}
                  className="font-manrope text-[9.5px] font-bold text-[#8d4933] flex items-center gap-0.5 hover:underline cursor-pointer"
                >
                  Маршрут{' '}
                  <span className="material-symbols-outlined text-[10px]">arrow_outward</span>
                </button>
              </div>
              <span className="font-manrope text-[11px] font-semibold text-[#1c1c1b]">
                {booking.salonName}
              </span>
              <span className="font-manrope text-[10px] text-[#54433e] truncate">
                {booking.salonAddress}
              </span>
            </div>
          </div>

          {/* Total Investment */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f0edeb] border border-[#eae8e5]">
            <div className="flex flex-col">
              <span className="font-manrope text-[8px] font-bold text-[#86736d] uppercase tracking-wider">
                ИТОГОВАЯ СТОИМОСТЬ ({servicesCount} {servicesCount === 1 ? 'услуга' : 'услуги'})
              </span>
              <span className="font-manrope text-[9.5px] text-[#54433e]">
                Оплата на месте в день визита
              </span>
            </div>
            <div className="text-right">
              <span className="font-epilogue text-[16px] font-bold text-[#1c1c1b] tracking-tight">
                {booking.priceFormatted.replace(' UZS', '')}
              </span>
              <span className="font-manrope text-[10px] font-bold text-[#54433e] ml-1">UZS</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Guest Profile Verified Card */}
      <div className="rounded-xl bg-white shadow-2xs border border-[#eae8e5] p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#8d4933] text-[16px]">badge</span>
            <span className="font-manrope text-[12px] font-semibold text-[#1c1c1b]">
              Профиль гостя подтвержден
            </span>
          </div>
          <span className="flex items-center gap-1 font-manrope text-[9.5px] font-semibold text-[#476554] bg-[#c8ebd5] px-2 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[11px]">verified</span> Привязан к Telegram
          </span>
        </div>

        <div className="flex items-center justify-between py-0.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffdbd0] flex items-center justify-center text-[#3a0b00] font-manrope text-[11px] font-bold">
              {booking.guestInitials}
            </div>
            <div className="flex flex-col">
              <span className="font-manrope text-[11.5px] font-semibold text-[#1c1c1b]">
                {booking.guestName}
              </span>
              <span className="font-manrope text-[10px] text-[#54433e]">
                {booking.guestPhone}
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#476554] text-[16px]">check_circle</span>
        </div>
      </div>

      {/* 4. Primary Actions */}
      <div className="flex flex-col gap-2 w-full pt-0.5">
        {/* Add to Calendar */}
        <button
          onClick={handleDownloadIcs}
          type="button"
          className={`w-full h-9.5 rounded-lg text-white font-manrope text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.99] transition-all cursor-pointer ${
            calendarSaved ? 'bg-[#476554]' : 'bg-[#8d4933] hover:bg-[#ab6049]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {calendarSaved ? 'done' : 'calendar_add_on'}
          </span>
          {calendarSaved ? 'Сохранено в календарь' : 'Добавить в календарь (.ics)'}
        </button>

        {/* Share Details & Modify Booking */}
        <div className="grid grid-cols-2 gap-2 w-full">
          <button
            onClick={handleShare}
            type="button"
            className="h-8.5 rounded-lg bg-[#f0edeb] text-[#1c1c1b] hover:bg-[#eae8e5] font-manrope text-[10.5px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">share</span>
            Поделиться деталями
          </button>

          <button
            onClick={() => onNavigate('timeslot')}
            type="button"
            className="h-8.5 rounded-lg bg-[#f0edeb] text-[#1c1c1b] hover:bg-[#eae8e5] font-manrope text-[10.5px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">edit_calendar</span>
            Изменить запись
          </button>
        </div>

        {/* Return to Salon Menu */}
        <button
          onClick={() => onNavigate('home')}
          type="button"
          className="w-full py-2 text-center text-[#86736d] hover:text-[#1c1c1b] font-manrope text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
        >
          Вернуться в меню салона
        </button>
      </div>
    </div>
  );
};
