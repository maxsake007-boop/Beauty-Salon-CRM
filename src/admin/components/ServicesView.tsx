import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CreditCard,
  Clock,
  Edit2,
  Trash2,
  Check,
  Plus,
  Image as ImageIcon,
  Save,
  CheckCircle2,
  RotateCw,
  Sun,
  Moon,
  AlertCircle,
  Smartphone,
  CheckCircle,
  Calendar,
} from 'lucide-react';
import { SalonSettings, ServiceItem } from '../types';

interface ServicesViewProps {
  services: ServiceItem[];
  settings: SalonSettings;
  onUpdateService: (updated: ServiceItem) => void;
  onToggleServiceActive: (id: string) => void;
  onDeleteService: (id: string) => void;
  onAddNewServiceClick: () => void;
  onUpdateSlotGrid: () => void;
  onUpdateSettings: (updated: Partial<SalonSettings>) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  services,
  settings,
  onUpdateService,
  onToggleServiceActive,
  onDeleteService,
  onAddNewServiceClick,
  onUpdateSlotGrid,
  onUpdateSettings,
}) => {
  // Selected service for right-hand editor (defaulting to first service srv-1)
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    services[0]?.id || 'srv-1'
  );

  const selectedService =
    services.find((s) => s.id === selectedServiceId) || services[0];

  // Local form state for editor
  const [formData, setFormData] = useState<ServiceItem>(selectedService);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Salon schedule local edit state
  const [startTime, setStartTime] = useState<string>(settings.workingHoursStart || '09:00');
  const [endTime, setEndTime] = useState<string>(settings.workingHoursEnd || '21:00');
  const [scheduleType, setScheduleType] = useState<string>(settings.scheduleType || 'Без выходных');
  const [bufferMinutes, setBufferMinutes] = useState<number>(settings.bufferMinutes || 15);
  const [scheduleSaved, setScheduleSaved] = useState<boolean>(false);

  useEffect(() => {
    setStartTime(settings.workingHoursStart);
    setEndTime(settings.workingHoursEnd);
    setScheduleType(settings.scheduleType);
    setBufferMinutes(settings.bufferMinutes);
  }, [settings]);

  // Sync formData when selectedServiceId changes
  const handleSelectServiceForEdit = (service: ServiceItem) => {
    setSelectedServiceId(service.id);
    setFormData(service);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateService(formData);
    setToastMessage(`Услуга «${formData.name}» успешно обновлена и синхронизирована с ботом!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCancelForm = () => {
    if (selectedService) {
      setFormData(selectedService);
    }
  };

  const activeServicesCount = services.filter((s) => s.isActive).length;
  const avgPrice = Math.round(
    services.reduce((acc, s) => acc + s.price, 0) / (services.length || 1)
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-[#1F1F1E] px-4 py-3 text-xs text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 text-[#5B7A68]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#86736D]">
            КОНФИГУРАТОР КАТАЛОГА • Синхронизация с Telegram Bot
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#1F1F1E] sm:text-3xl">
            Управление услугами и графиком работы
          </h2>
          <p className="text-xs text-[#686662]">
            Настройка каталога процедур, длительности сеансов и базовых часов работы салона для онлайн-записи в Telegram Mini App.
          </p>
        </div>

        <button
          onClick={onAddNewServiceClick}
          className="flex items-center gap-2 rounded-xl bg-[#8D4933] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#733420] self-start lg:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить новую услугу</span>
        </button>
      </div>

      {/* 3 Summary Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Card 1: Total Services */}
        <div className="rounded-2xl border border-[#E3DED7] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#686662]">
              ВСЕГО УСЛУГ
            </span>
            <Sparkles className="h-4 w-4 text-[#8D4933]" />
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-[#1F1F1E] tabular-nums">
            {services.length} позиций
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-[#5B7A68]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5B7A68]" />
            <span>• {activeServicesCount} активны в боте</span>
          </div>
        </div>

        {/* Card 2: Average Check */}
        <div className="rounded-2xl border border-[#E3DED7] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#686662]">
              СРЕДНИЙ ЧЕК
            </span>
            <CreditCard className="h-4 w-4 text-[#8D4933]" />
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-[#1F1F1E] tabular-nums">
            {avgPrice.toLocaleString('ru-RU')} сум
          </div>
          <div className="mt-1 text-xs text-[#686662]">
            Тарифный диапазон 50k – 170k
          </div>
        </div>

        {/* Card 3: Slot Depths */}
        <div className="rounded-2xl border border-[#E3DED7] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#686662]">
              ГЛУБИНА СЛОТОВ
            </span>
            <Clock className="h-4 w-4 text-[#8D4933]" />
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-[#1F1F1E] tabular-nums">
            30 – 120 мин
          </div>
          <div className="mt-1 text-xs text-[#686662]">
            +{settings.bufferMinutes} мин санитарный буфер
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Left Column: Procedures Catalog (7 cols) */}
        <div className="space-y-4 xl:col-span-7">
          <div className="rounded-2xl border border-[#E3DED7] bg-white p-6 shadow-xs">
            <div className="flex flex-col justify-between gap-2 border-b border-[#F0EDEB] pb-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-lg font-bold text-[#1F1F1E]">
                  Каталог процедур
                </h3>
                <p className="text-xs text-[#686662]">
                  Ногтевой сервис и комплексный эстетический уход
                </p>
              </div>
              <span className="rounded-full bg-[#5B7A68]/15 px-2.5 py-0.5 text-xs font-semibold text-[#5B7A68]">
                Telegram API v2.4 Live
              </span>
            </div>

            {/* List of Services */}
            <div className="mt-4 space-y-3">
              {services.map((service) => {
                const isSelected = selectedServiceId === service.id;

                return (
                  <div
                    key={service.id}
                    onClick={() => handleSelectServiceForEdit(service)}
                    className={`group relative flex cursor-pointer flex-col justify-between gap-4 rounded-xl border p-4 transition sm:flex-row sm:items-center ${
                      isSelected
                        ? 'border-[#8D4933] bg-[#8D4933]/5 ring-1 ring-[#8D4933]'
                        : !service.isActive
                        ? 'border-[#E3DED7] bg-[#FAF8F5]/70 opacity-70'
                        : 'border-[#E3DED7] bg-white hover:border-[#8D4933]/40 hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Image Thumbnail */}
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="h-16 w-16 flex-shrink-0 rounded-xl object-cover border border-[#E3DED7]"
                      />

                      <div>
                        {/* Name and Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-[#1F1F1E]">
                            {service.name}
                          </h4>
                          {service.isActive ? (
                            <span className="rounded-full bg-[#5B7A68]/15 px-2 py-0.2 text-[10px] font-semibold text-[#5B7A68]">
                              Активна
                            </span>
                          ) : (
                            <span className="rounded-full bg-[#A9ABAD]/25 px-2 py-0.2 text-[10px] font-semibold text-[#686662]">
                              Отключена
                            </span>
                          )}
                          {service.isHit && (
                            <span className="rounded-full bg-[#B86B53]/20 px-2 py-0.2 text-[10px] font-semibold text-[#8D4933]">
                              Хит
                            </span>
                          )}
                        </div>

                        {/* Duration and Price */}
                        <div className="mt-1 flex items-center gap-3 text-xs text-[#686662]">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-[#86736D]" />
                            <span>{service.duration} мин</span>
                          </span>
                          <span className="font-bold text-[#1F1F1E] tabular-nums">
                            {service.price.toLocaleString('ru-RU')} сум
                          </span>
                        </div>

                        {/* Note / Subtext */}
                        {service.note && (
                          <div className="mt-0.5 text-[11px] text-[#86736D]">
                            {service.note}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions & Live Toggle */}
                    <div
                      className="flex items-center justify-between sm:justify-end gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Toggle Switch */}
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={service.isActive}
                          onChange={() => onToggleServiceActive(service.id)}
                          className="peer sr-only"
                        />
                        <div className="peer h-5 w-9 rounded-full bg-[#A9ABAD] transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#8D4933] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                      </label>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleSelectServiceForEdit(service)}
                        className={`rounded-lg p-1.5 transition ${
                          isSelected
                            ? 'bg-[#8D4933] text-white'
                            : 'text-[#686662] hover:bg-[#F5F2EB] hover:text-[#1F1F1E]'
                        }`}
                        title="Редактировать услугу"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => onDeleteService(service.id)}
                        className="rounded-lg p-1.5 text-[#686662] transition hover:bg-[#C0584D]/10 hover:text-[#C0584D]"
                        title="Удалить услугу"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Live Telegram Info Card */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-[#E3DED7] bg-[#FAF8F5] p-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#8D4933] text-white">
                <Smartphone className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-[#1F1F1E]">
                  Отображение в мобильном интерфейсе
                </div>
                <div className="text-[11px] text-[#686662]">
                  Цены и активные слоты обновляются у клиентов в Telegram за 1-2 секунды без перезапуска бота.
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5B7A68]/15 px-3 py-1 text-xs font-semibold text-[#5B7A68]">
                <span className="h-2 w-2 rounded-full bg-[#5B7A68] animate-pulse" />
                Бот активен: {settings.botUsername}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Service Editor & Salon Schedule (5 cols) */}
        <div className="space-y-4 xl:col-span-5">
          {/* Card 1: Service Editor Form */}
          <div className="rounded-2xl border border-[#E3DED7] bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#F0EDEB] pb-3">
              <div>
                <h3 className="font-display text-base font-bold text-[#1F1F1E]">
                  Редактировать услугу
                </h3>
                <p className="text-xs text-[#686662]">
                  Настройка для Telegram Mini App
                </p>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-[#5B7A68]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#5B7A68]">
                <CheckCircle2 className="h-3 w-3" />
                Синхронизировано
              </span>
            </div>

            <form onSubmit={handleSaveForm} className="mt-4 space-y-4 text-xs">
              {/* Image Preview & Upload */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
                  ИЗОБРАЖЕНИЕ УСЛУГИ
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#E3DED7] bg-[#FAF8F5] p-3">
                  <img
                    src={formData.imageUrl}
                    alt={formData.name}
                    className="h-16 w-16 rounded-xl object-cover border border-[#E3DED7]"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-[#1F1F1E]">
                      Фото в каталоге бота
                    </div>
                    <div className="text-[11px] text-[#686662]">
                      Отображается в карточке выбора процедуры
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newUrl = prompt(
                          'Введите новый URL изображения (Unsplash или прямой линк):',
                          formData.imageUrl
                        );
                        if (newUrl) setFormData({ ...formData, imageUrl: newUrl });
                      }}
                      className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-[#8D4933] hover:underline"
                    >
                      <ImageIcon className="h-3 w-3" />
                      Заменить фото
                    </button>
                  </div>
                </div>
              </div>

              {/* Service Name */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
                  НАЗВАНИЕ УСЛУГИ
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[#E3DED7] bg-white p-2.5 text-xs text-[#1F1F1E] focus:border-[#8D4933] focus:outline-none"
                  required
                />
              </div>

              {/* Category & Status in Mini App */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
                    КАТЕГОРИЯ
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-[#E3DED7] bg-white p-2.5 text-xs text-[#1F1F1E] focus:border-[#8D4933] focus:outline-none"
                  >
                    <option value="Фирменные">Фирменные</option>
                    <option value="Ногтевой сервис">Ногтевой сервис</option>
                    <option value="Подология и спа">Подология и спа</option>
                    <option value="Премиум уход">Премиум уход</option>
                    <option value="Экспресс">Экспресс</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
                    СТАТУС В MINI APP
                  </label>
                  <div className="mt-1.5 flex items-center justify-between rounded-xl border border-[#E3DED7] bg-white px-3 py-2">
                    <span className="text-xs font-medium text-[#1F1F1E]">
                      {formData.isActive ? 'Активна' : 'Отключена'}
                    </span>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData({ ...formData, isActive: e.target.checked })
                        }
                        className="peer sr-only"
                      />
                      <div className="peer h-4 w-7 rounded-full bg-[#A9ABAD] transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#8D4933] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Duration Pills */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
                  ДЛИТЕЛЬНОСТЬ СЕАНСА
                </label>
                <div className="mt-1.5 grid grid-cols-5 gap-1.5">
                  {[30, 45, 60, 90, 120].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setFormData({ ...formData, duration: m })}
                      className={`rounded-xl border py-2 text-center text-xs font-medium transition ${
                        formData.duration === m
                          ? 'border-[#8D4933] bg-[#8D4933] text-white'
                          : 'border-[#E3DED7] bg-white text-[#1F1F1E] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {m}м
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Technical Break */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
                    БАЗОВАЯ ЦЕНА (UZS)
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full rounded-xl border border-[#E3DED7] bg-white p-2.5 pr-12 text-xs font-bold text-[#1F1F1E] focus:border-[#8D4933] focus:outline-none tabular-nums"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#86736D]">
                      сум
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
                    ТЕХПЕРЕРЫВ
                  </label>
                  <div className="mt-1.5 flex items-center justify-between rounded-xl border border-[#E3DED7] bg-[#FAF8F5] px-3 py-2.5 text-xs text-[#686662]">
                    <span>15 мин</span>
                    <span className="text-[10px] text-[#86736D]">буфер</span>
                  </div>
                </div>
              </div>

              {/* Description for Mini App */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
                  ОПИСАНИЕ ДЛЯ TELEGRAM MINI APP
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-xl border border-[#E3DED7] bg-white p-2.5 text-xs text-[#1F1F1E] focus:border-[#8D4933] focus:outline-none leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#F0EDEB]">
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="rounded-xl border border-[#E3DED7] bg-white px-4 py-2 text-xs font-medium text-[#686662] hover:bg-[#FAF8F5]"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-[#8D4933] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#733420]"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Сохранить услугу</span>
                </button>
              </div>
            </form>
          </div>

          {/* Card 2: Salon Schedule (Fully interactive) */}
          <div className="rounded-2xl border border-[#E3DED7] bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#F0EDEB] pb-3">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-[#8D4933]" />
                <h4 className="font-display text-sm font-bold text-[#1F1F1E]">
                  График работы салона
                </h4>
              </div>
              <span className="rounded-full bg-[#5B7A68]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#5B7A68]">
                Активен
              </span>
            </div>

            {/* Schedule Type Selector */}
            <div className="mt-3.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#86736D]">
                Режим работы дней
              </label>
              <select
                value={scheduleType}
                onChange={(e) => {
                  const val = e.target.value;
                  setScheduleType(val);
                  onUpdateSettings({ scheduleType: val });
                }}
                className="mt-1.5 w-full rounded-xl border border-[#E3DED7] bg-[#FAF8F5] px-3 py-2 text-xs font-semibold text-[#1F1F1E] transition hover:bg-white focus:border-[#8D4933] focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="Без выходных">Без выходных (каждый день)</option>
                <option value="Пн - Сб (Вс выходной)">Пн - Сб (Воскресенье — выходной)</option>
                <option value="Пн - Пт (Сб-Вс выходной)">Пн - Пт (Суббота и Воскресенье — выходные)</option>
              </select>
            </div>

            {/* Time inputs */}
            <div className="mt-3">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#86736D]">
                Рабочие часы
              </label>
              <div className="mt-1.5 flex items-center justify-between rounded-xl bg-[#FAF8F5] p-2.5 text-xs border border-[#E3DED7]">
                <div className="flex items-center gap-1.5">
                  <Sun className="h-3.5 w-3.5 text-[#8D4933]" />
                  <span className="text-[11px] text-[#686662]">С:</span>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="font-bold text-[#1F1F1E] tabular-nums bg-white border border-[#E3DED7] rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#8D4933] cursor-pointer"
                    title="Время открытия"
                  />
                </div>
                <span className="text-[#86736D] font-bold">—</span>
                <div className="flex items-center gap-1.5">
                  <Moon className="h-3.5 w-3.5 text-[#8D4933]" />
                  <span className="text-[11px] text-[#686662]">До:</span>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="font-bold text-[#1F1F1E] tabular-nums bg-white border border-[#E3DED7] rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#8D4933] cursor-pointer"
                    title="Время закрытия"
                  />
                </div>
              </div>

              {/* Quick time presets */}
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-[#86736D]">Быстрый выбор:</span>
                {[
                  { label: '09:00 — 21:00', start: '09:00', end: '21:00' },
                  { label: '10:00 — 20:00', start: '10:00', end: '20:00' },
                  { label: '08:00 — 22:00', start: '08:00', end: '22:00' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setStartTime(preset.start);
                      setEndTime(preset.end);
                      onUpdateSettings({
                        workingHoursStart: preset.start,
                        workingHoursEnd: preset.end,
                      });
                    }}
                    className={`rounded-lg border px-2 py-0.5 text-[10px] font-medium transition ${
                      startTime === preset.start && endTime === preset.end
                        ? 'border-[#8D4933] bg-[#8D4933]/10 text-[#8D4933] font-bold'
                        : 'border-[#E3DED7] bg-white text-[#686662] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Buffer time */}
            <div className="mt-3 flex items-center justify-between rounded-xl border border-[#F0EDEB] bg-[#FAF8F5] p-2.5 text-[11px]">
              <div className="flex items-center gap-1.5 text-[#686662]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8D4933]" />
                <span>Санитарный перерыв между слотами:</span>
              </div>
              <select
                value={bufferMinutes}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setBufferMinutes(val);
                  onUpdateSettings({ bufferMinutes: val });
                }}
                className="rounded-lg border border-[#E3DED7] bg-white px-2 py-1 text-xs font-semibold text-[#1F1F1E] focus:border-[#8D4933] focus:outline-none cursor-pointer"
              >
                <option value={10}>10 мин</option>
                <option value={15}>15 мин</option>
                <option value={20}>20 мин</option>
                <option value={30}>30 мин</option>
              </select>
            </div>

            {/* Save & Update Slot Grid Button */}
            <button
              type="button"
              onClick={() => {
                onUpdateSettings({
                  workingHoursStart: startTime,
                  workingHoursEnd: endTime,
                  scheduleType: scheduleType,
                  bufferMinutes: bufferMinutes,
                });
                onUpdateSlotGrid();
                setScheduleSaved(true);
                setTimeout(() => setScheduleSaved(false), 2500);
              }}
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-semibold shadow-xs transition cursor-pointer ${
                scheduleSaved
                  ? 'border-[#5B7A68] bg-[#5B7A68]/15 text-[#5B7A68]'
                  : 'border-[#8D4933] bg-[#8D4933] text-white hover:bg-[#733420]'
              }`}
            >
              {scheduleSaved ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-[#5B7A68]" />
                  <span>График сохранен и синхронизирован!</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Сохранить график и обновить сетку</span>
                </>
              )}
            </button>
            <p className="mt-2 text-center text-[10px] text-[#86736D]">
              Изменения сразу применяются к слотам бронирования в Telegram Mini App
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
