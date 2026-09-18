import React, { useState, useMemo } from 'react';
import { AppScreen, ServiceItem, TimeSlotOption } from '../types';
import { INITIAL_TIME_SLOTS } from '../data/salonData';

interface TimeSlotScreenProps {
  selectedServices: ServiceItem[];
  onNavigate: (screen: AppScreen) => void;
  onConfirmBooking: (slot: TimeSlotOption, selectedDay: number) => void;
}

export const TimeSlotScreen: React.FC<TimeSlotScreenProps> = ({
  selectedServices,
  onNavigate,
  onConfirmBooking,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [slots] = useState<TimeSlotOption[]>(INITIAL_TIME_SLOTS);
  const [selectedSlotId, setSelectedSlotId] = useState<string>('slot-1400');

  const selectedSlot = slots.find((s) => s.id === selectedSlotId) || slots[5];

  const totalDuration = useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.durationMin, 0),
    [selectedServices]
  );

  const totalPrice = useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.priceAmount, 0),
    [selectedServices]
  );

  const totalPriceFormatted = useMemo(
    () => `${new Intl.NumberFormat('ru-RU').format(totalPrice)} UZS`,
    [totalPrice]
  );

  const handleSelectSlot = (slot: TimeSlotOption) => {
    if (
      slot.status === 'booked' ||
      slot.status === 'break' ||
      slot.status === 'insufficient' ||
      slot.status === 'overlap'
    ) {
      return;
    }
    setSelectedSlotId(slot.id);
  };

  const handleProceed = () => {
    if (selectedSlot && selectedServices.length > 0) {
      onConfirmBooking(selectedSlot, selectedDay);
    }
  };

  if (selectedServices.length === 0) {
    return (
      <div className="flex flex-col w-full pb-24 pt-[86px] px-4 gap-y-3 animate-fadeIn items-center text-center">
        <div className="w-12 h-12 rounded-full bg-[#f6f3f1] text-[#8d4933] flex items-center justify-center mt-12 shadow-2xs border border-[#eae8e5]">
          <span className="material-symbols-outlined text-[24px]">spa</span>
        </div>
        <h3 className="font-epilogue text-[15px] font-semibold text-[#1c1c1b]">
          Ритуалы не выбраны
        </h3>
        <p className="font-manrope text-[11px] text-[#686662] max-w-xs leading-relaxed">
          Пожалуйста, выберите хотя бы одну процедуру из меню ритуалов перед тем, как выбрать мастера и время записи.
        </p>
        <button
          onClick={() => onNavigate('services')}
          className="mt-2 px-4 py-2 rounded-lg bg-[#8d4933] hover:bg-[#ab6049] text-white font-manrope text-[11.5px] font-semibold transition-colors cursor-pointer shadow-2xs"
        >
          Открыть меню ритуалов
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-24 pt-[86px] px-3 gap-y-2.5 animate-fadeIn">
      {/* 1. Selected Services Summary Card */}
      <div className="bg-white rounded-xl p-2.5 shadow-2xs border border-[#eae8e5] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-md bg-[#c8ebd5]/60 flex items-center justify-center text-[#476554] flex-shrink-0">
              <span className="material-symbols-outlined text-[15px]">spa</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-manrope text-[11.5px] font-semibold text-[#1c1c1b]">
                Выбранные услуги ({selectedServices.length})
              </span>
              <span className="font-manrope text-[8.5px] font-bold text-[#476554] bg-[#c8ebd5] px-1.5 py-0.2 rounded-full">
                {totalDuration} мин
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="font-manrope text-[9.5px] font-semibold text-[#8d4933] bg-[#ffdbd0]/50 hover:bg-[#ffdbd0] px-2 py-0.5 rounded-md transition-colors cursor-pointer"
          >
            Изменить
          </button>
        </div>

        {/* List of selected services items */}
        <div className="flex flex-col gap-1 pt-1 border-t border-[#f0edeb]">
          {selectedServices.map((srv) => (
            <div key={srv.id} className="flex items-center justify-between text-[10.5px] font-manrope">
              <span className="text-[#1c1c1b] truncate max-w-[210px] font-medium">
                • {srv.shortTitle || srv.title}
              </span>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-[#86736d] text-[9.5px]">{srv.durationMin} мин</span>
                <span className="text-[#8d4933] font-semibold">{srv.priceFormatted}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Calendar Picker Section */}
      <div className="bg-white rounded-xl p-3 shadow-2xs border border-[#eae8e5] flex flex-col gap-2">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="font-epilogue text-[14px] font-semibold text-[#1c1c1b]">
              Сентябрь 2026
            </h3>
            <span className="font-manrope text-[8px] font-bold tracking-wider text-[#86736d] uppercase">
              ВРЕМЯ СТУДИИ В ТАШКЕНТЕ (UTC+5)
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              title="Предыдущий месяц"
              className="w-6 h-6 rounded-md bg-[#f6f3f1] hover:bg-[#eae8e5] flex items-center justify-center text-[#54433e] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">chevron_left</span>
            </button>
            <button
              title="Следующий месяц"
              className="w-6 h-6 rounded-md bg-[#f6f3f1] hover:bg-[#eae8e5] flex items-center justify-center text-[#54433e] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2.5 text-[9.5px] font-manrope pt-0.5 pb-0.5 border-b border-[#f0edeb]">
          <span className="flex items-center gap-1 text-[#54433e]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#476554]" />
            Доступно
          </span>
          <span className="flex items-center gap-1 text-[#54433e]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8d4933]" />
            Мало мест
          </span>
          <span className="flex items-center gap-1 text-[#86736d]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d9c1bb]" />
            Занято
          </span>
        </div>

        {/* Weekday Names */}
        <div className="grid grid-cols-7 text-center font-manrope text-[9.5px] font-semibold text-[#86736d]">
          <span>Пн</span>
          <span>Вт</span>
          <span>Ср</span>
          <span>Чт</span>
          <span>Пт</span>
          <span>Сб</span>
          <span>Вс</span>
        </div>

        {/* Calendar Day Grid */}
        <div className="grid grid-cols-7 gap-1 text-center font-manrope text-[11.5px]">
          {/* Previous month trailing 31 */}
          <div className="py-1.5 text-[#d9c1bb] text-[10px]">31</div>

          {/* Day 1 - 30 */}
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const isSelected = day === selectedDay;
            const isPastOrFull = [5, 6, 7, 8, 9, 10, 12, 13, 19, 20, 26, 27].includes(day);
            const hasFewSlots = [3, 17, 24].includes(day);

            return (
              <button
                key={day}
                onClick={() => !isPastOrFull && setSelectedDay(day)}
                disabled={isPastOrFull}
                className={`relative py-1.5 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#8d4933] text-white font-bold shadow-2xs scale-105'
                    : isPastOrFull
                    ? 'text-[#d9c1bb] line-through cursor-not-allowed'
                    : 'text-[#1c1c1b] hover:bg-[#f6f3f1] active:scale-95'
                }`}
              >
                <span>{day}</span>
                {/* Dot indicator */}
                {!isPastOrFull && (
                  <span
                    className={`w-1 h-1 rounded-full mt-0.5 ${
                      isSelected
                        ? 'bg-white'
                        : hasFewSlots
                        ? 'bg-[#8d4933]'
                        : 'bg-[#476554]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Available Windows Header */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-1.5">
          <span className="font-epilogue text-[13px] font-semibold text-[#1c1c1b]">
            Доступные окна
          </span>
          <span className="font-manrope text-[10px] text-[#86736d]">
            Вт, {selectedDay} сен
          </span>
        </div>
        <span className="font-manrope text-[9.5px] font-semibold text-[#476554] bg-[#c8ebd5] px-2 py-0.5 rounded-full">
          4 окна свободно
        </span>
      </div>

      {/* 4. Notice Banner: Continuous Window */}
      <div className="rounded-lg p-2 bg-[#ffdbd0]/50 border border-[#ffb59e]/50 flex items-start gap-2 text-[10.5px] font-manrope">
        <span className="material-symbols-outlined text-[15px] text-[#8d4933] mt-0.5">
          schedule
        </span>
        <p className="text-[#3a0b00] leading-snug">
          Показаны непрерывные окна для вашего визита суммарной длительностью{' '}
          <span className="font-bold text-[#8d4933]">{totalDuration} мин</span> ({selectedServices.length} {selectedServices.length === 1 ? 'процедура' : 'процедуры'}).
        </p>
      </div>

      {/* 5. Time Slots Categorized by Period */}
      <div className="flex flex-col gap-2.5">
        {/* Утро */}
        <div className="flex flex-col gap-1.5">
          <span className="font-manrope text-[8.5px] font-bold text-[#86736d] uppercase tracking-wider px-1">
            УТРО
          </span>
          <div className="flex flex-col gap-1.5">
            {slots
              .filter((s) => s.period === 'morning')
              .map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                const isClickable = slot.status === 'available' || isSelected;

                if (slot.status === 'booked') {
                  return (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#f6f3f1] text-[#86736d] opacity-60 text-[11px] font-manrope"
                    >
                      <span className="flex items-center gap-1.5 line-through">
                        <span className="material-symbols-outlined text-[13px]">block</span>
                        {slot.timeRange}
                      </span>
                      <span className="text-[8.5px] font-bold tracking-wider uppercase">
                        {slot.statusLabel}
                      </span>
                    </div>
                  );
                }

                if (slot.status === 'insufficient') {
                  return (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#eae8e5] text-[#86736d] opacity-70 text-[11px] font-manrope"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[13px]">hourglass_empty</span>
                        {slot.timeRange}
                      </span>
                      <span className="text-[9.5px] italic">{slot.statusLabel}</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={slot.id}
                    onClick={() => isClickable && handleSelectSlot(slot)}
                    className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#8d4933] text-white shadow-xs border-[#8d4933]'
                        : 'bg-white border-[#eae8e5] hover:border-[#ffb59e] shadow-2xs text-[#1c1c1b]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          isSelected ? 'text-white' : 'text-[#476554]'
                        }`}
                      >
                        check_circle
                      </span>
                      <div className="flex flex-col">
                        <span className="font-manrope text-[12px] font-semibold">
                          {slot.timeRange}
                        </span>
                        <span
                          className={`font-manrope text-[9.5px] ${
                            isSelected ? 'text-white/80' : 'text-[#686662]'
                          }`}
                        >
                          {slot.masters.join(', ')}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`font-manrope text-[9.5px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white text-[#8d4933]'
                          : 'bg-[#c8ebd5] text-[#2f4d3d]'
                      }`}
                    >
                      {isSelected ? 'Выбрано' : 'Доступно'}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* День */}
        <div className="flex flex-col gap-1.5">
          <span className="font-manrope text-[8.5px] font-bold text-[#86736d] uppercase tracking-wider px-1">
            ДЕНЬ
          </span>
          <div className="flex flex-col gap-1.5">
            {slots
              .filter((s) => s.period === 'afternoon')
              .map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                const isClickable = slot.status === 'available' || isSelected;

                if (slot.status === 'break') {
                  return (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#f6f3f1] text-[#86736d] opacity-75 text-[10.5px] font-manrope"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[13px]">coffee</span>
                        {slot.timeRange}
                      </span>
                      <span className="text-[9.5px]">{slot.statusLabel}</span>
                    </div>
                  );
                }

                if (slot.status === 'booked') {
                  return (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#f6f3f1] text-[#86736d] opacity-60 text-[10.5px] font-manrope"
                    >
                      <span className="flex items-center gap-1.5 line-through">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        {slot.timeRange}
                      </span>
                      <span className="text-[8.5px] font-bold tracking-wider uppercase">
                        {slot.statusLabel}
                      </span>
                    </div>
                  );
                }

                if (slot.status === 'overlap') {
                  return (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#eae8e5] text-[#86736d] opacity-60 text-[10.5px] font-manrope"
                    >
                      <span className="flex items-center gap-1.5 line-through">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        {slot.timeRange}
                      </span>
                      <span className="text-[9.5px]">{slot.statusLabel}</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={slot.id}
                    onClick={() => isClickable && handleSelectSlot(slot)}
                    className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#8d4933] text-white shadow-xs border-[#8d4933]'
                        : 'bg-white border-[#eae8e5] hover:border-[#ffb59e] shadow-2xs text-[#1c1c1b]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          isSelected ? 'text-white' : 'text-[#476554]'
                        }`}
                      >
                        check_circle
                      </span>
                      <div className="flex flex-col">
                        <span className="font-manrope text-[12px] font-semibold">
                          {slot.timeRange}
                        </span>
                        <span
                          className={`font-manrope text-[9.5px] ${
                            isSelected ? 'text-white/80' : 'text-[#686662]'
                          }`}
                        >
                          {slot.masters.join(', ')}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`font-manrope text-[9.5px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white text-[#8d4933]'
                          : 'bg-[#c8ebd5] text-[#2f4d3d]'
                      }`}
                    >
                      {isSelected ? 'Выбрано' : 'Доступно'}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Вечер */}
        <div className="flex flex-col gap-1.5">
          <span className="font-manrope text-[8.5px] font-bold text-[#86736d] uppercase tracking-wider px-1">
            ВЕЧЕР
          </span>
          <div className="flex flex-col gap-1.5">
            {slots
              .filter((s) => s.period === 'evening')
              .map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                const isClickable = slot.status === 'available' || isSelected;

                return (
                  <div
                    key={slot.id}
                    onClick={() => isClickable && handleSelectSlot(slot)}
                    className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#8d4933] text-white shadow-xs border-[#8d4933]'
                        : 'bg-white border-[#eae8e5] hover:border-[#ffb59e] shadow-2xs text-[#1c1c1b]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          isSelected ? 'text-white' : 'text-[#476554]'
                        }`}
                      >
                        check_circle
                      </span>
                      <div className="flex flex-col">
                        <span className="font-manrope text-[12px] font-semibold">
                          {slot.timeRange}
                        </span>
                        <span
                          className={`font-manrope text-[9.5px] ${
                            isSelected ? 'text-white/80' : 'text-[#686662]'
                          }`}
                        >
                          {slot.masters.join(', ')}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`font-manrope text-[9.5px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white text-[#8d4933]'
                          : 'bg-[#c8ebd5] text-[#2f4d3d]'
                      }`}
                    >
                      {isSelected ? 'Выбрано' : 'Доступно'}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* 6. Complimentary Tea & Tonic Perk */}
      <div className="rounded-lg p-2.5 bg-white border border-[#eae8e5] shadow-2xs flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-md bg-[#f6f3f1] flex items-center justify-center text-[#8d4933] flex-shrink-0">
          <span className="material-symbols-outlined text-[16px]">local_cafe</span>
        </div>
        <p className="font-manrope text-[10.5px] text-[#54433e] leading-snug">
          Авторский чай и травяной тоник подаются во время совмещенного ритуала заботы.
        </p>
      </div>

      {/* 7. Sticky Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto px-3 py-2 z-30 bg-[#fcf9f7]/95 backdrop-blur-md border-t border-[#eae8e5] shadow-lg">
        <div className="flex items-center justify-between mb-1.5 px-0.5 text-xs font-manrope">
          <div>
            <span className="text-[8px] uppercase font-bold text-[#86736d] tracking-wider block">
              ЗАПИСЬ · {selectedServices.length} {selectedServices.length === 1 ? 'ПРОЦЕДУРА' : 'ПРОЦЕДУРЫ'}
            </span>
            <span className="font-semibold text-[#1c1c1b] text-[11.5px]">
              {selectedDay} сен в {selectedSlot.timeRange.split('–')[0]?.trim() || '14:00'} ({totalDuration} мин)
            </span>
          </div>
          <div className="text-right">
            <span className="text-[8px] uppercase font-bold text-[#86736d] tracking-wider block">
              ИТОГО
            </span>
            <span className="font-epilogue text-[13px] font-bold text-[#1c1c1b]">
              {totalPriceFormatted}
            </span>
          </div>
        </div>

        <button
          onClick={handleProceed}
          className="w-full h-9.5 rounded-lg bg-[#8d4933] hover:bg-[#ab6049] text-white font-manrope text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.99] transition-all cursor-pointer"
        >
          <span>Перейти к деталям</span>
          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
