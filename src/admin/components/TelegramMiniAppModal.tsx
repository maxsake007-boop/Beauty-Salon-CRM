import React, { useState } from 'react';
import {
  X,
  Send,
  Sparkles,
  Calendar,
  Clock,
  Check,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  AlertCircle,
} from 'lucide-react';
import { ServiceItem, SalonSettings, DaySchedule } from '../types';

interface TelegramMiniAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  settings: SalonSettings;
  calendarDays?: DaySchedule[];
  onClientBookAppointment: (service: ServiceItem, time: string, clientName: string, phone: string) => void;
}

export const TelegramMiniAppModal: React.FC<TelegramMiniAppModalProps> = ({
  isOpen,
  onClose,
  services,
  settings,
  calendarDays = [],
  onClientBookAppointment,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-15');
  const [selectedSlot, setSelectedSlot] = useState<string>('14:00');
  const [clientName, setClientName] = useState<string>('Сабина Рахимова');
  const [clientPhone, setPhone] = useState<string>('+998 90 910 22 33');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeServices = services.filter((s) => s.isActive);
  const currentDaySchedule = calendarDays.find((d) => d.date === selectedDate);
  const isSelectedDateWorking = currentDaySchedule ? currentDaySchedule.isWorking : true;

  // Generate slots dynamically based on workingHoursStart and workingHoursEnd
  const generateSlots = () => {
    const startHour = parseInt(settings.workingHoursStart?.split(':')[0] || '9', 10);
    const endHour = parseInt(settings.workingHoursEnd?.split(':')[0] || '21', 10);
    const slots: string[] = [];
    for (let h = startHour; h < endHour; h += 2) {
      slots.push(`${h < 10 ? '0' + h : h}:00`);
    }
    return slots.length > 0 ? slots : ['10:00', '12:00', '14:00', '16:00', '18:00'];
  };

  const dynamicSlots = generateSlots();

  const handleConfirmBooking = () => {
    if (!selectedService || !isSelectedDateWorking) return;
    onClientBookAppointment(selectedService, selectedSlot, clientName, clientPhone);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      {/* Phone container */}
      <div className="relative flex h-[820px] max-h-[90vh] w-full max-w-[380px] flex-col overflow-hidden rounded-[36px] border-4 border-[#2A2A2A] bg-[#FAF8F5] shadow-2xl">
        {/* Phone Notch & Status bar */}
        <div className="flex items-center justify-between bg-[#1D1D1F] px-6 py-2.5 text-white">
          <span className="text-[11px] font-semibold">09:41</span>
          <div className="h-4 w-20 rounded-full bg-black" />
          <div className="flex items-center gap-1 text-[10px]">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Telegram Top Bar */}
        <div className="flex items-center justify-between border-b border-[#E3DED7] bg-[#FAF8F5] px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2AABEE] text-white">
              <Send className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#1F1F1E]">
                Lumière Haute Beauté
              </div>
              <div className="text-[10px] text-[#686662]">
                Mini App • bot v2.4
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-[#F5F2EB] p-1.5 text-[#686662] hover:text-[#1F1F1E]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Telegram Mini App Body */}
        <div className="flex-1 overflow-y-auto p-4 text-[#1F1F1E]">
          {bookingSuccess ? (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#5B7A68]/20 text-[#5B7A68]">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-[#1F1F1E]">
                Запись подтверждена!
              </h3>
              <p className="mt-2 text-xs text-[#686662]">
                Уведомление и подтверждение отправлены в ваш Telegram. Администратор Lumière уже подготовил слот.
              </p>
            </div>
          ) : !selectedService ? (
            <div>
              {/* Salon Banner */}
              <div className="rounded-2xl border border-[#E3DED7] bg-white p-4 shadow-xs">
                <div className="font-display text-base font-bold text-[#1F1F1E]">
                  Онлайн-запись Lumière
                </div>
                <div className="text-[11px] text-[#686662]">
                  {settings.location}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#5B7A68]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5B7A68]" />
                  <span>
                    {settings.workingHoursStart} – {settings.workingHoursEnd} • {settings.scheduleType}
                  </span>
                </div>
              </div>

              {/* Service Selection */}
              <div className="mt-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#86736D]">
                  ВЫБЕРИТЕ ПРОЦЕДУРУ ({activeServices.length})
                </div>

                <div className="mt-2 space-y-2.5">
                  {activeServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className="cursor-pointer rounded-xl border border-[#E3DED7] bg-white p-3 shadow-xs transition hover:border-[#8D4933]"
                    >
                      <div className="flex gap-3">
                        <img
                          src={service.imageUrl}
                          alt={service.name}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="text-xs font-bold text-[#1F1F1E]">
                            {service.name}
                          </div>
                          <div className="mt-0.5 text-[11px] text-[#686662] line-clamp-2">
                            {service.description}
                          </div>
                          <div className="mt-1.5 flex items-center justify-between text-xs">
                            <span className="text-[11px] text-[#86736D]">
                              {service.duration} мин
                            </span>
                            <span className="font-bold text-[#8D4933] tabular-nums">
                              {service.price.toLocaleString('ru-RU')} сум
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Booking Step */
            <div className="space-y-4">
              <button
                onClick={() => setSelectedService(null)}
                className="text-xs font-medium text-[#8D4933] hover:underline"
              >
                ← Выбрать другую услугу
              </button>

              <div className="rounded-xl border border-[#E3DED7] bg-white p-3">
                <div className="text-xs font-bold text-[#1F1F1E]">
                  {selectedService.name}
                </div>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-[#686662]">{selectedService.duration} минут</span>
                  <span className="font-bold text-[#8D4933] tabular-nums">
                    {selectedService.price.toLocaleString('ru-RU')} сум
                  </span>
                </div>
              </div>

              {/* Date Selector */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#86736D]">
                  <span>ВЫБЕРИТЕ ДАТУ</span>
                  <span className="text-[10px] lowercase text-[#8D4933]">сентябрь 2026</span>
                </div>
                <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
                  {calendarDays.slice(13, 20).map((d) => {
                    const isSelected = selectedDate === d.date;
                    return (
                      <button
                        key={d.date}
                        onClick={() => setSelectedDate(d.date)}
                        className={`flex min-w-[46px] flex-col items-center rounded-xl border p-2 text-center transition cursor-pointer ${
                          isSelected
                            ? 'border-[#8D4933] bg-[#8D4933] text-white'
                            : d.isWorking
                            ? 'border-[#E3DED7] bg-white text-[#1F1F1E] hover:bg-[#FAF8F5]'
                            : 'border-[#E3DED7] bg-[#F5F2EB]/70 text-[#86736D]'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-semibold">{d.dayOfWeek}</span>
                        <span className="my-0.5 text-sm font-bold">{d.dayNumber}</span>
                        <span
                          className={`h-1 w-1 rounded-full ${
                            isSelected
                              ? 'bg-white'
                              : d.isWorking
                              ? 'bg-[#5B7A68]'
                              : 'bg-[#C0584D]'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots or Day Off Notice */}
              {isSelectedDateWorking ? (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#86736D]">
                    <span>ВЫБЕРИТЕ ВРЕМЯ</span>
                    <span className="text-[10px] text-[#5B7A68] font-normal">
                      {settings.workingHoursStart} – {settings.workingHoursEnd}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {dynamicSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`rounded-xl border py-2 text-xs font-semibold transition cursor-pointer ${
                          selectedSlot === slot
                            ? 'border-[#8D4933] bg-[#8D4933] text-white'
                            : 'border-[#E3DED7] bg-white text-[#1F1F1E] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-[#C0584D]/30 bg-[#C0584D]/10 p-3.5 text-center text-xs text-[#98382F]">
                  <AlertCircle className="mx-auto h-5 w-5 text-[#C0584D]" />
                  <div className="mt-1.5 font-bold">Выходной день</div>
                  <p className="mt-1 text-[11px] text-[#A9473D]">
                    В эту дату салон не работает. Выберите другой день для записи.
                  </p>
                </div>
              )}

              {/* Contact info */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#86736D]">
                  ВАШИ ДАННЫЕ
                </div>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full rounded-xl border border-[#E3DED7] bg-white p-2.5 text-xs text-[#1F1F1E]"
                />
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 000 00 00"
                  className="w-full rounded-xl border border-[#E3DED7] bg-white p-2.5 text-xs text-[#1F1F1E]"
                />
              </div>

              {/* Confirm */}
              <button
                disabled={!isSelectedDateWorking}
                onClick={handleConfirmBooking}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold shadow-md transition ${
                  isSelectedDateWorking
                    ? 'bg-[#8D4933] text-white hover:bg-[#733420] cursor-pointer'
                    : 'bg-[#C4C6C8] text-white cursor-not-allowed opacity-60'
                }`}
              >
                {isSelectedDateWorking ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Забронировать визит ({selectedSlot})</span>
                  </>
                ) : (
                  <span>Запись на этот день закрыта</span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Telegram Footer */}
        <div className="border-t border-[#E3DED7] bg-white px-4 py-2.5 text-center text-[10px] text-[#86736D]">
          Синхронизировано с админ-панелью Lumière в реальном времени
        </div>
      </div>
    </div>
  );
};
