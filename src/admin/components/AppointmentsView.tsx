import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Phone,
  User,
  Check,
  X,
  Send,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Search,
} from 'lucide-react';
import { Appointment, AppointmentStatus, AppointmentViewMode, DaySchedule } from '../types';
import { currentWeekDays, septDaysData } from '../data/mockData';

interface AppointmentsViewProps {
  appointments: Appointment[];
  calendarDays: DaySchedule[];
  onUpdateAppointmentStatus: (id: string, newStatus: AppointmentStatus) => void;
  onToggleWorkingDay: (date: string, forceStatus?: boolean) => void;
  onContactTelegram: (username?: string, clientName?: string) => void;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({
  appointments,
  calendarDays,
  onUpdateAppointmentStatus,
  onToggleWorkingDay,
  onContactTelegram,
}) => {
  const [viewMode, setViewMode] = useState<AppointmentViewMode>('today');
  const [monthDetailOpen, setMonthDetailOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-15');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>('LUM-8294');
  const [pendingStatus, setPendingStatus] = useState<AppointmentStatus>('new');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Daily appointments for selectedDate
  const dayAppointments = appointments.filter((a) => a.date === selectedDate);

  // Active day schedule data
  const daySchedule = calendarDays.find((d) => d.date === selectedDate) || {
    date: selectedDate,
    dayOfWeek: 'ВТ',
    dayNumber: parseInt(selectedDate.split('-')[2], 10) || 15,
    isWorking: true,
    bookingsCount: dayAppointments.length,
    revenue: dayAppointments.reduce((acc, cur) => acc + cur.price, 0),
    pendingCount: dayAppointments.filter((a) => a.status === 'new').length,
  };

  const dayOfWeekFullNames: Record<string, string> = {
    ПН: 'Понедельник',
    ВТ: 'Вторник',
    СР: 'Среда',
    ЧТ: 'Четверг',
    ПТ: 'Пятница',
    СБ: 'Суббота',
    ВС: 'Воскресенье',
  };

  const dayName = daySchedule?.dayOfWeek ? dayOfWeekFullNames[daySchedule.dayOfWeek] || daySchedule.dayOfWeek : 'Вторник';
  const dayNum = daySchedule?.dayNumber || parseInt(selectedDate.split('-')[2], 10);
  const dayHeading = `${dayName}, ${dayNum} сентября`;

  // Selected appointment
  const selectedAppointment =
    appointments.find((a) => a.id === selectedAppointmentId && a.date === selectedDate) ||
    dayAppointments[0] ||
    appointments.find((a) => a.id === selectedAppointmentId) ||
    appointments[0];

  const handleSelectAppointment = (app: Appointment) => {
    setSelectedAppointmentId(app.id);
    setPendingStatus(app.status);
  };

  const handleSaveStatus = () => {
    if (selectedAppointment) {
      onUpdateAppointmentStatus(selectedAppointment.id, pendingStatus);
      setSaveToast(`Статус заявки #${selectedAppointment.id} обновлен на «${
        pendingStatus === 'new' ? 'Новая' : pendingStatus === 'processed' ? 'Обработано' : 'Отменен'
      }»`);
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-[#1F1F1E] px-4 py-3 text-xs text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 text-[#5B7A68]" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#86736D]">
            ЖУРНАЛ УПРАВЛЕНИЯ ВИЗИТАМИ • Сезон Осень 2026
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#1F1F1E] sm:text-3xl">
            Заявки гостей
          </h2>
          <p className="text-xs text-[#686662]">
            Контроль входящих бронирований из Telegram Mini App и оперативное регулирование доступности календаря.
          </p>
        </div>

        {/* View mode toggle pills */}
        <div className="inline-flex rounded-xl border border-[#E3DED7] bg-[#F5F2EB]/90 p-1 text-xs">
          <button
            onClick={() => {
              setViewMode('today');
              setMonthDetailOpen(false);
              setSelectedDate('2026-09-15');
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-medium transition-all ${
              viewMode === 'today'
                ? 'bg-[#8D4933] text-white shadow-xs'
                : 'text-[#686662] hover:text-[#1F1F1E]'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Сегодня
          </button>
          <button
            onClick={() => {
              setViewMode('week');
              setMonthDetailOpen(false);
            }}
            className={`rounded-lg px-3.5 py-1.5 font-medium transition-all ${
              viewMode === 'week'
                ? 'bg-[#8D4933] text-white shadow-xs'
                : 'text-[#686662] hover:text-[#1F1F1E]'
            }`}
          >
            Неделя
          </button>
          <button
            onClick={() => {
              setViewMode('month');
              setMonthDetailOpen(false);
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-medium transition-all ${
              viewMode === 'month'
                ? 'bg-[#8D4933] text-white shadow-xs'
                : 'text-[#686662] hover:text-[#1F1F1E]'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Месяц
          </button>
        </div>
      </div>

      {/* CONTENT SWITCH: IF MONTH VIEW (CALENDAR MATRIX) */}
      {viewMode === 'month' && !monthDetailOpen ? (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Left Column: Full Month Grid (8 cols) */}
          <div className="rounded-2xl border border-[#E3DED7] bg-white p-6 shadow-xs xl:col-span-8">
            {/* Month Header Navigation */}
            <div className="flex items-center justify-between border-b border-[#F0EDEB] pb-4">
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 text-xs text-[#686662] hover:text-[#1F1F1E]">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Август</span>
                </button>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-[#8D4933]" />
                  <span className="font-display text-base font-bold text-[#1F1F1E]">
                    Сентябрь 2026
                  </span>
                </div>
                <button className="flex items-center gap-1 text-xs text-[#686662] hover:text-[#1F1F1E]">
                  <span>Октябрь</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Legend */}
              <div className="hidden sm:flex items-center gap-4 text-xs text-[#686662]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#5B7A68]" />
                  <span>Рабочий день</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#A9ABAD]" />
                  <span>Закрыта</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#B86B53]" />
                  <span>Записи видны</span>
                </div>
              </div>
            </div>

            {/* Days of week header */}
            <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-semibold text-[#86736D]">
              <div>ПН</div>
              <div>ВТ</div>
              <div>СР</div>
              <div>ЧТ</div>
              <div>ПТ</div>
              <div>СБ</div>
              <div>ВС</div>
            </div>

            {/* 30 Days Grid */}
            <div className="mt-2 grid grid-cols-7 gap-2">
              {/* Aug 31 filler */}
              <div className="rounded-xl border border-dashed border-[#E3DED7]/50 p-2 text-center opacity-40">
                <div className="text-xs text-[#86736D]">31 авг</div>
              </div>

              {calendarDays.map((d) => {
                const isSelected = selectedDate === d.date;
                const isCurrent = d.date === '2026-09-15';

                return (
                  <button
                    key={d.date}
                    onClick={() => {
                      setSelectedDate(d.date);
                    }}
                    className={`group relative flex min-h-[72px] flex-col justify-between rounded-xl border p-2 text-left transition-all ${
                      isSelected
                        ? 'border-[#8D4933] bg-[#8D4933] text-white shadow-sm ring-2 ring-[#8D4933]/20'
                        : d.isWorking
                        ? 'border-[#E3DED7] bg-white hover:border-[#8D4933]/50 hover:bg-[#FAF8F5]'
                        : 'border-[#E3DED7]/60 bg-[#F5F2EB]/50 opacity-70 hover:opacity-100 hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-xs font-bold ${
                            isSelected
                              ? 'text-white'
                              : isCurrent
                              ? 'text-[#8D4933]'
                              : d.isWorking
                              ? 'text-[#1F1F1E]'
                              : 'text-[#86736D]'
                          }`}
                        >
                          {d.dayNumber}
                        </span>
                        {isCurrent && (
                          <span
                            className={`rounded px-1 text-[9px] font-semibold uppercase ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-[#8D4933]/15 text-[#8D4933]'
                            }`}
                          >
                            Сегодня
                          </span>
                        )}
                      </div>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isSelected
                            ? 'bg-white'
                            : d.isWorking
                            ? 'bg-[#5B7A68]'
                            : 'bg-[#C0584D]'
                        }`}
                      />
                    </div>

                    <div className="mt-1">
                      {d.isWorking ? (
                        <>
                          <div
                            className={`text-[11px] font-medium tabular-nums ${
                              isSelected ? 'text-white/90' : 'text-[#686662]'
                            }`}
                          >
                            {d.bookingsCount} записей
                          </div>
                          <div
                            className={`text-[10px] ${
                              isSelected ? 'text-white/70' : 'text-[#86736D]'
                            }`}
                          >
                            {isSelected ? 'Выбрано' : 'Рабочий'}
                          </div>
                        </>
                      ) : (
                        <div>
                          <div
                            className={`text-[11px] font-semibold ${
                              isSelected ? 'text-white' : 'text-[#C0584D]'
                            }`}
                          >
                            Выходной
                          </div>
                          <div
                            className={`text-[9px] ${
                              isSelected ? 'text-white/70' : 'text-[#86736D]'
                            }`}
                          >
                            Запись закрыта
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between text-xs text-[#86736D] border-t border-[#F0EDEB] pt-3">
              <span>
                Всего в сентябре: {calendarDays.filter((d) => d.isWorking).length} рабочих дней,{' '}
                {calendarDays.filter((d) => !d.isWorking).length} выходных
              </span>
              <span className="flex items-center gap-1 text-[#5B7A68]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5B7A68]" />
                Telegram бот синхронизирован
              </span>
            </div>
          </div>

          {/* Right Column: Month View Selected Date Details (4 cols) */}
          <div className="space-y-4 xl:col-span-4">
            <div className="rounded-2xl border border-[#E3DED7] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86736D]">
                  ВЫБРАННАЯ ДАТА
                </span>
                {daySchedule.isWorking ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#5B7A68]/15 px-2 py-0.5 text-[11px] font-semibold text-[#5B7A68]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5B7A68]" />
                    Рабочий день
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#C0584D]/15 px-2 py-0.5 text-[11px] font-semibold text-[#C0584D]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C0584D]" />
                    Выходной
                  </span>
                )}
              </div>

              <h3 className="mt-2 font-display text-lg font-bold text-[#1F1F1E]">
                {selectedDate === '2026-09-15'
                  ? 'Вторник, 15 сентября 2026'
                  : `${daySchedule.dayOfWeek}, ${daySchedule.dayNumber} сентября 2026`}
              </h3>

              {/* 3 Quick stat boxes */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border border-[#E3DED7] bg-[#FAF8F5] p-2.5">
                  <div className="font-display text-xl font-bold text-[#1F1F1E] tabular-nums">
                    {daySchedule.bookingsCount}
                  </div>
                  <div className="text-[10px] text-[#686662]">Всего записей</div>
                </div>
                <div className="rounded-xl border border-[#E3DED7] bg-[#FAF8F5] p-2.5">
                  <div className="font-display text-xl font-bold text-[#8D4933] tabular-nums">
                    {daySchedule.pendingCount}
                  </div>
                  <div className="text-[10px] text-[#686662]">Ожидают</div>
                </div>
                <div className="rounded-xl border border-[#E3DED7] bg-[#FAF8F5] p-2.5">
                  <div className="font-display text-xl font-bold text-[#1F1F1E] tabular-nums">
                    {(daySchedule.revenue / 1000).toFixed(0)}k
                  </div>
                  <div className="text-[10px] text-[#686662]">Выручка (сум)</div>
                </div>
              </div>

              {/* Jump to day records button */}
              <button
                onClick={() => setMonthDetailOpen(true)}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#8D4933] py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#733420]"
              >
                <span>Перейти к записям дня</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>

              {/* Booking status toggle for date */}
              <div className="mt-5 border-t border-[#F0EDEB] pt-4">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1F1F1E]">
                  <span>Статус бронирования:</span>
                  <span
                    className={`text-[11px] font-semibold ${
                      daySchedule.isWorking ? 'text-[#5B7A68]' : 'text-[#C0584D]'
                    }`}
                  >
                    {daySchedule.isWorking ? 'Рабочий день' : 'Выходной (запись закрыта)'}
                  </span>
                </div>

                <div className="mt-2.5 flex gap-2">
                  <button
                    onClick={() => {
                      if (!daySchedule.isWorking) onToggleWorkingDay(selectedDate, true);
                    }}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition ${
                      daySchedule.isWorking
                        ? 'border-[#5B7A68] bg-[#5B7A68]/15 text-[#5B7A68] ring-2 ring-[#5B7A68]/20 shadow-xs cursor-default'
                        : 'border-[#E3DED7] bg-white text-[#686662] hover:border-[#5B7A68] hover:bg-[#FAF8F5] hover:text-[#5B7A68] cursor-pointer'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Рабочий день</span>
                  </button>
                  <button
                    onClick={() => {
                      if (daySchedule.isWorking) onToggleWorkingDay(selectedDate, false);
                    }}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition ${
                      !daySchedule.isWorking
                        ? 'border-[#C0584D] bg-[#C0584D]/15 text-[#C0584D] ring-2 ring-[#C0584D]/20 shadow-xs cursor-default'
                        : 'border-[#E3DED7] bg-white text-[#686662] hover:border-[#C0584D] hover:bg-[#FAF8F5] hover:text-[#C0584D] cursor-pointer'
                    }`}
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>{daySchedule.isWorking ? 'Сделать выходным' : 'Выходной день'}</span>
                  </button>
                </div>

                {/* Status indicator note */}
                <div
                  className={`mt-2.5 rounded-xl border p-2.5 text-[11px] transition ${
                    daySchedule.isWorking
                      ? 'border-[#5B7A68]/25 bg-[#5B7A68]/8 text-[#3A604A]'
                      : 'border-[#C0584D]/25 bg-[#C0584D]/8 text-[#98382F]'
                  }`}
                >
                  {daySchedule.isWorking ? (
                    <div className="flex items-start gap-1.5">
                      <Check className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#5B7A68]" />
                      <span>
                        Онлайн-запись активна в Telegram Mini App. Гости могут выбирать свободные слоты на эту дату.
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-1.5">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#C0584D]" />
                      <span>
                        Этот день объявлен выходным. Возможность бронирования на эту дату в боте полностью отключена.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Day's appointments */}
              <div className="mt-5 border-t border-[#F0EDEB] pt-4">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1F1F1E]">
                  <span>Записи на день ({dayAppointments.length})</span>
                  <span className="text-[11px] font-normal text-[#686662]">
                    {selectedDate.split('-')[2]} сен
                  </span>
                </div>

                <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
                  {dayAppointments.length > 0 ? (
                    dayAppointments.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => {
                          handleSelectAppointment(app);
                          setSelectedDate(app.date);
                          setMonthDetailOpen(true);
                        }}
                        className={`cursor-pointer rounded-xl border p-2.5 transition ${
                          selectedAppointmentId === app.id
                            ? 'border-[#8D4933] bg-[#8D4933]/5'
                            : 'border-[#E3DED7] bg-white hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#1F1F1E]">{app.time}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              app.status === 'processed'
                                ? 'bg-[#5B7A68]/15 text-[#5B7A68]'
                                : app.status === 'new'
                                ? 'bg-[#B86B53]/15 text-[#8D4933]'
                                : 'bg-[#C0584D]/15 text-[#C0584D]'
                            }`}
                          >
                            {app.status === 'processed'
                              ? 'Обработано'
                              : app.status === 'new'
                              ? 'Новая'
                              : 'Отменен'}
                          </span>
                        </div>
                        <div className="mt-1 text-xs font-medium text-[#1F1F1E]">
                          {app.clientName}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#686662]">
                          <span>{app.serviceName}</span>
                          <span className="font-semibold text-[#1F1F1E] tabular-nums">
                            {app.price.toLocaleString('ru-RU')} сум
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl bg-[#FAF8F5] p-4 text-center text-xs text-[#86736D]">
                      На этот день нет записей
                    </div>
                  )}
                </div>
              </div>

              {/* Bot sync footer */}
              <div className="mt-4 rounded-xl border border-[#E3DED7] bg-[#FAF8F5] p-3 text-[11px] text-[#686662]">
                ⚡ Telegram бот синхронизирован со всеми 30 днями сентября.
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* CONTENT SWITCH: TODAY & WEEK VIEW (IMAGE 3) */
        <div className="space-y-6">
          {/* Weekly Date Selector Strip - ONLY shown when viewMode is 'week' */}
          {viewMode === 'week' && (
            <div className="rounded-2xl border border-[#E3DED7] bg-white p-5 shadow-xs">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#1F1F1E]">Текущая неделя</span>
                  <span className="rounded-md bg-[#FAF8F5] px-2 py-0.5 text-xs text-[#686662] border border-[#E3DED7]">
                    14 — 20 сентября 2026
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#686662]">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8D4933]" />
                    24 бронирования
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A9ABAD]" />
                    1 выходной
                  </span>
                </div>
              </div>

              {/* 7 Days Row */}
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7">
                {currentWeekDays.map((item) => {
                  const isSelected = selectedDate === item.fullDate;
                  return (
                    <button
                      key={item.fullDate}
                      onClick={() => setSelectedDate(item.fullDate)}
                      className={`flex flex-col items-center justify-between rounded-xl border py-3 px-2 transition ${
                        isSelected
                          ? 'border-[#8D4933] bg-[#8D4933] text-white shadow-sm'
                          : item.isWeekend
                          ? 'border-[#E3DED7]/60 bg-[#F5F2EB]/50 text-[#86736D]'
                          : 'border-[#E3DED7] bg-white text-[#1F1F1E] hover:border-[#8D4933]/40'
                      }`}
                    >
                      <span
                        className={`text-[11px] font-semibold uppercase ${
                          isSelected ? 'text-white/80' : 'text-[#86736D]'
                        }`}
                      >
                        {item.day}
                      </span>
                      <span className="my-1 font-display text-xl font-bold tabular-nums">
                        {item.date}
                      </span>
                      <span
                        className={`text-[11px] ${
                          isSelected ? 'text-white/90' : 'text-[#686662]'
                        }`}
                      >
                        {item.isWeekend ? 'Выходной' : `${item.bookings} записей`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Two Columns: Left = Chronology of Day; Right = Visit Details */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            {/* Left Column (8 cols) */}
            <div className="space-y-6 xl:col-span-8">
              {/* Back to Month Calendar button if accessed from Month view */}
              {viewMode === 'month' && monthDetailOpen && (
                <div className="flex items-center">
                  <button
                    onClick={() => setMonthDetailOpen(false)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#E3DED7] bg-white px-3.5 py-2 text-xs font-semibold text-[#8D4933] shadow-xs hover:border-[#8D4933]/50 hover:bg-[#FAF8F5] transition"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Назад к календарю месяца</span>
                  </button>
                </div>
              )}

              {/* Day Chronology Card */}
              <div className="rounded-2xl border border-[#E3DED7] bg-white p-6 shadow-xs">
                <div className="flex flex-col justify-between gap-2 border-b border-[#F0EDEB] pb-4 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#1F1F1E]">
                      {dayHeading}
                    </h3>
                    <p className="text-xs text-[#686662]">Хронология записей дня</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#B86B53]/15 px-2.5 py-0.5 text-xs font-semibold text-[#8D4933]">
                      Новых: {dayAppointments.filter((a) => a.status === 'new').length}
                    </span>
                    <span className="rounded-full bg-[#5B7A68]/15 px-2.5 py-0.5 text-xs font-semibold text-[#5B7A68]">
                      Обработано: {dayAppointments.filter((a) => a.status === 'processed').length}
                    </span>
                  </div>
                </div>

                {/* Day status quick bar */}
                <div className="mt-3 flex flex-col gap-2 rounded-xl border border-[#F0EDEB] bg-[#FAF8F5] p-3 sm:flex-row sm:items-center sm:justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#686662]">Статус даты:</span>
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        daySchedule.isWorking ? 'text-[#5B7A68]' : 'text-[#C0584D]'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          daySchedule.isWorking ? 'bg-[#5B7A68]' : 'bg-[#C0584D]'
                        }`}
                      />
                      {daySchedule.isWorking
                        ? 'Рабочий день (онлайн-запись открыта)'
                        : 'Выходной день (запись в боте закрыта)'}
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleWorkingDay(selectedDate)}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 font-semibold transition ${
                      daySchedule.isWorking
                        ? 'border-[#C0584D]/30 bg-white text-[#C0584D] hover:bg-[#C0584D]/10'
                        : 'border-[#5B7A68]/30 bg-white text-[#5B7A68] hover:bg-[#5B7A68]/10'
                    }`}
                  >
                    {daySchedule.isWorking ? (
                      <>
                        <X className="h-3.5 w-3.5" />
                        <span>Сделать выходным</span>
                      </>
                    ) : (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Сделать рабочим днем</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Day off alert banner if day is not working */}
                {!daySchedule.isWorking && (
                  <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-[#C0584D]/30 bg-[#C0584D]/10 p-3 text-xs text-[#98382F]">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-[#C0584D]" />
                    <div>
                      <span className="font-bold">Внимание: этот день отмечен как выходной.</span>
                      <p className="mt-0.5 text-[11px] text-[#A9473D]">
                        Возможность бронирования в Telegram Mini App отключена. Клиенты видят эту дату как недоступную.
                      </p>
                    </div>
                  </div>
                )}

                {/* List of Time Slots / Bookings */}
                <div className="mt-4 space-y-3">
                  {dayAppointments.length > 0 ? (
                    dayAppointments.map((app) => {
                      const isSelected = selectedAppointmentId === app.id;
                      const isCancelled = app.status === 'cancelled';

                      return (
                        <div
                          key={app.id}
                          onClick={() => handleSelectAppointment(app)}
                          className={`group flex cursor-pointer flex-col justify-between rounded-xl border p-4 transition sm:flex-row sm:items-center ${
                            isSelected
                              ? 'border-[#8D4933] bg-[#8D4933]/5 ring-1 ring-[#8D4933]'
                              : isCancelled
                              ? 'border-[#E3DED7] bg-[#FAF8F5]/60 opacity-60'
                              : 'border-[#E3DED7] bg-white hover:border-[#8D4933]/40 hover:bg-[#FAF8F5]'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            {/* Time badge */}
                            <div className="flex flex-col items-center justify-center rounded-xl bg-[#F5F2EB] px-3 py-2 text-center min-w-[70px]">
                              <span
                                className={`font-display text-base font-bold text-[#1F1F1E] ${
                                  isCancelled ? 'line-through text-[#86736D]' : ''
                                }`}
                              >
                                {app.time}
                              </span>
                              <span className="text-[10px] text-[#686662]">
                                {app.duration} мин
                              </span>
                            </div>

                            {/* Client & Service */}
                            <div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-sm font-semibold text-[#1F1F1E] ${
                                    isCancelled ? 'line-through text-[#86736D]' : ''
                                  }`}
                                >
                                  {app.clientName}
                                </span>
                                <span className="text-[11px] text-[#86736D]">
                                  #{app.id}
                                </span>
                                {isSelected && (
                                  <span className="rounded bg-[#8D4933] px-1.5 py-0.2 text-[10px] font-semibold text-white">
                                    Выбрано
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-[#686662]">
                                {app.serviceName}
                              </div>
                              <div className="mt-0.5 flex items-center gap-2 text-[11px] text-[#86736D]">
                                <span>{app.clientPhone}</span>
                              </div>
                            </div>
                          </div>

                          {/* Status and Price */}
                          <div className="mt-3 flex items-center justify-between sm:mt-0 sm:flex-col sm:items-end sm:gap-1">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                app.status === 'processed'
                                  ? 'bg-[#5B7A68]/15 text-[#5B7A68]'
                                  : app.status === 'new'
                                  ? 'bg-[#B86B53]/15 text-[#8D4933]'
                                  : 'bg-[#86736D]/15 text-[#86736D] line-through'
                              }`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />
                              {app.status === 'processed'
                                ? 'Обработано'
                                : app.status === 'new'
                                ? 'Новая заявка'
                                : 'Отменен'}
                            </span>
                            <span
                              className={`text-xs font-bold text-[#1F1F1E] tabular-nums ${
                                isCancelled ? 'line-through text-[#86736D]' : ''
                              }`}
                            >
                              {app.price.toLocaleString('ru-RU')} сум
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="rounded-xl border border-dashed border-[#E3DED7] p-8 text-center text-xs text-[#86736D]">
                      На выбранную дату нет активных бронирований.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Visit Details Panel (4 cols) */}
            <div className="space-y-4 xl:col-span-4">
              <div className="rounded-2xl border border-[#E3DED7] bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#F0EDEB] pb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86736D]">
                    ДЕТАЛИ ВИЗИТА
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      selectedAppointment.status === 'processed'
                        ? 'bg-[#5B7A68]/15 text-[#5B7A68]'
                        : selectedAppointment.status === 'new'
                        ? 'bg-[#B86B53]/15 text-[#8D4933]'
                        : 'bg-[#C0584D]/15 text-[#C0584D]'
                    }`}
                  >
                    {selectedAppointment.status === 'processed'
                      ? 'Обработано'
                      : selectedAppointment.status === 'new'
                      ? 'Новая заявка'
                      : 'Отменен'}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-display text-lg font-bold text-[#1F1F1E]">
                    Детали заявки #{selectedAppointment.id}
                  </h3>
                </div>

                {/* Guest Profile Card */}
                <div className="mt-4 flex items-center justify-between rounded-xl border border-[#E3DED7] bg-[#FAF8F5] p-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8D4933] font-display text-sm font-bold text-white">
                      {selectedAppointment.clientName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1F1F1E]">
                        {selectedAppointment.clientName}
                      </div>
                      <div className="text-[11px] text-[#686662]">
                        {selectedAppointment.clientUsername || '@client_lumiere'}
                      </div>
                    </div>
                  </div>
                  <span className="rounded bg-[#2AABEE]/15 px-2 py-0.5 text-[10px] font-semibold text-[#2AABEE]">
                    Telegram Клиент
                  </span>
                </div>

                {/* Details Breakdown */}
                <div className="mt-4 space-y-3 text-xs border-y border-[#F0EDEB] py-4">
                  <div className="flex justify-between">
                    <span className="text-[#686662]">Услуга:</span>
                    <span className="font-semibold text-right text-[#1F1F1E] max-w-[200px]">
                      {selectedAppointment.serviceSubtitle || selectedAppointment.serviceName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#686662]">Дата:</span>
                    <span className="font-medium text-[#1F1F1E]">
                      {selectedAppointment.dateLabel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#686662]">Время визита:</span>
                    <span className="font-medium text-[#1F1F1E]">
                      {selectedAppointment.time} – {selectedAppointment.endTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#686662]">Длительность:</span>
                    <span className="font-medium text-[#1F1F1E]">
                      {selectedAppointment.duration} минут
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#686662]">Телефон:</span>
                    <span className="font-semibold text-[#1F1F1E]">
                      {selectedAppointment.clientPhone}
                    </span>
                  </div>
                </div>

                {/* Total Price */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#686662]">
                    Стоимость ритуала:
                  </span>
                  <span className="font-display text-xl font-bold text-[#1F1F1E] tabular-nums">
                    {selectedAppointment.price.toLocaleString('ru-RU')} сум
                  </span>
                </div>

                {/* Status Switcher */}
                <div className="mt-5 border-t border-[#F0EDEB] pt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#86736D]">
                    СМЕНА СТАТУСА ЗАЯВКИ:
                  </div>

                  <div className="mt-2 grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => setPendingStatus('new')}
                      className={`flex items-center justify-center gap-1 rounded-xl border py-2 text-xs font-medium transition ${
                        pendingStatus === 'new'
                          ? 'border-[#8D4933] bg-[#8D4933]/15 font-semibold text-[#8D4933] ring-1 ring-[#8D4933]'
                          : 'border-[#E3DED7] bg-white text-[#686662] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <AlertCircle className="h-3 w-3" />
                      <span>Новая</span>
                    </button>
                    <button
                      onClick={() => setPendingStatus('processed')}
                      className={`flex items-center justify-center gap-1 rounded-xl border py-2 text-xs font-medium transition ${
                        pendingStatus === 'processed'
                          ? 'border-[#5B7A68] bg-[#5B7A68]/15 font-semibold text-[#5B7A68] ring-1 ring-[#5B7A68]'
                          : 'border-[#E3DED7] bg-white text-[#686662] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Обработано</span>
                    </button>
                    <button
                      onClick={() => setPendingStatus('cancelled')}
                      className={`flex items-center justify-center gap-1 rounded-xl border py-2 text-xs font-medium transition ${
                        pendingStatus === 'cancelled'
                          ? 'border-[#C0584D] bg-[#C0584D]/15 font-semibold text-[#C0584D] ring-1 ring-[#C0584D]'
                          : 'border-[#E3DED7] bg-white text-[#686662] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <X className="h-3 w-3" />
                      <span>Отменен</span>
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={handleSaveStatus}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#8D4933] py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#733420]"
                    >
                      <Save className="h-3.5 w-3.5" />
                      <span>Сохранить статус</span>
                    </button>

                    <button
                      onClick={() =>
                        onContactTelegram(
                          selectedAppointment.clientUsername,
                          selectedAppointment.clientName
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#2AABEE]/30 bg-[#2AABEE]/5 py-2.5 text-xs font-semibold text-[#2AABEE] transition hover:bg-[#2AABEE]/10"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Связаться в Telegram</span>
                    </button>
                  </div>
                </div>

                {/* Footer note */}
                <div className="mt-5 rounded-xl bg-[#FAF8F5] p-3 text-[11px] text-[#686662] border border-[#E3DED7]">
                  <div className="font-semibold text-[#1F1F1E]">Прямая синхронизация Lumière Bot</div>
                  <div>Статусы мгновенно обновляются в Telegram-сообщении гостя.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
