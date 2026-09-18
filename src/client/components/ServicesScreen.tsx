import React, { useState, useMemo } from 'react';
import { AppScreen, ServiceItem } from '../types';

interface ServicesScreenProps {
  services: ServiceItem[];
  selectedServices: ServiceItem[];
  onToggleService: (service: ServiceItem) => void;
  onClearServices: () => void;
  onNavigate: (screen: AppScreen) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({
  services,
  selectedServices,
  onToggleService,
  onClearServices,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'nails' | 'rituals' | 'express'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedIds = useMemo(
    () => new Set(selectedServices.map((s) => s.id)),
    [selectedServices]
  );

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

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        activeCategory === 'all' || service.category === activeCategory;
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [services, activeCategory, searchQuery]);

  return (
    <div className="flex flex-col w-full pb-28 pt-[86px] px-3 gap-y-2.5 animate-fadeIn">
      {/* 1. Header Intro */}
      <div className="flex flex-col gap-y-0.5">
        <div className="flex items-center justify-between">
          <h2 className="font-epilogue text-[16px] font-semibold text-[#1c1c1b]">
            Выберите ритуалы
          </h2>
          <span className="font-manrope text-[8.5px] font-bold text-[#8d4933] uppercase tracking-wider bg-[#ffdbd0]/60 px-2 py-0.5 rounded-full">
            Мультивыбор
          </span>
        </div>
        <p className="font-manrope text-[11px] text-[#686662] leading-snug">
          Вы можете выбрать несколько процедур сразу. Длительность и стоимость суммируются автоматически.
        </p>
      </div>

      {/* 2. Search Filter Bar */}
      <div className="relative w-full">
        <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[15px] text-[#86736d]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск ритуала, маникюра, педикюра..."
          className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-[#f6f3f1] text-[#1c1c1b] font-manrope text-[11.5px] placeholder:text-[#86736d] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#8d4933] shadow-2xs transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#86736d] hover:text-[#1c1c1b]"
          >
            <span className="material-symbols-outlined text-[14px]">cancel</span>
          </button>
        )}
      </div>

      {/* 3. Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 -mx-3 px-3 no-scrollbar">
        {[
          { id: 'all', label: 'Все услуги' },
          { id: 'nails', label: 'Ногти и уход' },
          { id: 'rituals', label: 'Комбинированные ритуалы' },
          { id: 'express', label: 'Экспресс-уход' },
        ].map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-full font-manrope text-[10.5px] font-semibold transition-transform active:scale-95 cursor-pointer ${
                isActive
                  ? 'bg-[#31302f] text-[#f3f0ee] shadow-2xs'
                  : 'bg-[#eae8e5] text-[#54433e] hover:text-[#1c1c1b]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 4. Active Selection Banner */}
      {selectedServices.length > 0 ? (
        <div className="bg-[#ffdbd0]/60 rounded-xl p-2.5 flex flex-col gap-1.5 shadow-2xs border border-[#ffb59e]/60 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[#8d4933] flex items-center justify-center text-white flex-shrink-0 shadow-2xs text-[11px] font-bold">
                {selectedServices.length}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-manrope text-[8.5px] font-bold text-[#3a0b00] uppercase tracking-wider">
                  Выбрано процедур: {selectedServices.length}
                </span>
                <span className="font-manrope text-[11px] text-[#54433e]">
                  Общая длительность: <strong className="text-[#3a0b00]">{totalDuration} мин</strong>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-2 flex-shrink-0">
              <span className="font-manrope text-[12px] text-[#8d4933] font-bold whitespace-nowrap">
                {totalPriceFormatted}
              </span>
              <button
                type="button"
                onClick={onClearServices}
                title="Очистить выбор всех услуг"
                className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-white hover:bg-[#8d4933] hover:text-white text-[#8d4933] font-manrope text-[9.5px] font-semibold transition-colors shadow-2xs cursor-pointer border border-[#ffb59e]"
              >
                <span className="material-symbols-outlined text-[12px]">close</span>
                Сбросить
              </button>
            </div>
          </div>

          {/* Selected chips row */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-[#ffb59e]/50">
            {selectedServices.map((srv) => (
              <span
                key={srv.id}
                className="inline-flex items-center gap-1 bg-white/90 text-[#3a0b00] text-[10px] font-manrope font-semibold px-2 py-0.5 rounded-md border border-[#ffb59e] shadow-2xs whitespace-nowrap"
              >
                <span>{srv.shortTitle || srv.title}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleService(srv);
                  }}
                  className="text-[#8d4933] hover:text-black"
                >
                  <span className="material-symbols-outlined text-[12px]">close</span>
                </button>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-[#f6f3f1] rounded-lg p-2.5 flex items-center justify-between shadow-2xs border border-[#eae8e5]">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-[#eae8e5] flex items-center justify-center text-[#86736d] flex-shrink-0">
              <span className="material-symbols-outlined text-[13px]">checklist</span>
            </div>
            <span className="font-manrope text-[10.5px] text-[#54433e]">
              Выберите одну или несколько процедур для записи
            </span>
          </div>
          <span className="font-manrope text-[8.5px] font-bold text-[#86736d] uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-[#eae8e5]">
            Шаг 1 из 3
          </span>
        </div>
      )}

      {/* 5. Services List */}
      <div className="flex flex-col gap-y-2">
        {filteredServices.length === 0 ? (
          <div className="py-8 text-center text-[#86736d] font-manrope text-[11.5px]">
            Ритуалы по запросу «{searchQuery}» не найдены.
          </div>
        ) : (
          filteredServices.map((service) => {
            const isSelected = selectedIds.has(service.id);
            return (
              <div
                key={service.id}
                onClick={() => onToggleService(service)}
                className={`group relative rounded-xl p-2.5 transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#fffaf8] shadow-xs border-[#8d4933] ring-1 ring-[#ffb59e]'
                    : 'bg-white shadow-2xs border-[#eae8e5] hover:border-[#d9c1bb]'
                }`}
              >
                <div className="flex gap-2.5">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#f0edeb] border border-[#f0edeb]">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0.5 right-0.5 bg-white/90 backdrop-blur-2xs text-[#1c1c1b] font-manrope text-[8.5px] font-semibold px-1 rounded shadow-2xs">
                      {service.durationMin} мин
                    </span>
                  </div>

                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h3
                          className={`font-manrope text-[12.5px] font-semibold transition-colors truncate ${
                            isSelected ? 'text-[#8d4933]' : 'text-[#1c1c1b]'
                          }`}
                        >
                          {service.title}
                        </h3>
                        <span className="font-manrope text-[11.5px] font-bold text-[#8d4933] whitespace-nowrap">
                          {service.priceFormatted}
                        </span>
                      </div>
                      <p className="font-manrope text-[10.5px] text-[#54433e] line-clamp-2 mt-0.5 leading-snug">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-1 pt-0.5">
                      <span className="inline-flex items-center gap-0.5 font-manrope text-[9.5px] font-medium text-[#476554]">
                        <span className="material-symbols-outlined text-[12px]">schedule</span>
                        {service.durationMin} мин
                      </span>

                      {/* Toggle Button / Checkbox Pill */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleService(service);
                        }}
                        className={`px-2.5 py-0.5 rounded-md font-manrope text-[10px] font-semibold transition-all shadow-2xs flex items-center gap-1 cursor-pointer ${
                          isSelected
                            ? 'bg-[#8d4933] text-white hover:bg-[#ab6049] border border-[#8d4933]'
                            : 'bg-[#eae8e5] text-[#1c1c1b] hover:bg-[#8d4933] hover:text-white'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <span className="material-symbols-outlined text-[12px]">check</span>
                            Выбрано
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-[12px]">add</span>
                            Добавить
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Special Delight Notice */}
                {service.specialNotice && isSelected && (
                  <div className="mt-2 pt-1.5 flex items-start gap-1.5 bg-white/80 rounded-md p-1.5 border border-[#ffdbd0]">
                    <span className="material-symbols-outlined text-[14px] text-[#ab604b] flex-shrink-0 mt-0.5">
                      info
                    </span>
                    <p className="font-manrope text-[10px] text-[#1c1c1b] leading-snug">
                      Длительность{' '}
                      <span className="font-semibold text-[#8d4933]">
                        {service.durationMin} минут непрерывного сеанса
                      </span>{' '}
                      для непревзойденного премиального ухода. Включен авторский травяной чай.
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 6. Sticky Booking Action Drawer */}
      <div className="fixed bottom-13 left-0 right-0 max-w-[390px] mx-auto px-3 z-30 pointer-events-none">
        {selectedServices.length > 0 ? (
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-lg border border-[#eae8e5] pointer-events-auto flex flex-col gap-1.5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-manrope text-[8.5px] text-[#86736d] uppercase tracking-wider font-semibold">
                  Шаг 1 из 3 · Корзина услуг
                </span>
                <span className="font-manrope text-[11.5px] font-semibold text-[#1c1c1b]">
                  Выбрано: {selectedServices.length} {selectedServices.length === 1 ? 'процедура' : selectedServices.length < 5 ? 'процедуры' : 'процедур'} ({totalDuration} мин)
                </span>
              </div>
              <button
                onClick={onClearServices}
                className="font-manrope text-[9.5px] font-medium text-[#8d4933] hover:underline cursor-pointer"
              >
                Очистить
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => onNavigate('timeslot')}
              className="w-full py-2 px-3 rounded-lg bg-[#8d4933] hover:bg-[#ab6049] text-white font-manrope flex items-center justify-between shadow-xs active:scale-[0.99] transition-all cursor-pointer"
            >
              <div className="flex flex-col text-left">
                <span className="font-manrope text-[8px] text-[#ffdbd0] uppercase tracking-wider font-bold">
                  Готово к бронированию
                </span>
                <span className="font-epilogue text-[12px] font-semibold">
                  Выбрать дату и время
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-manrope text-[12px] font-bold">
                  {totalPriceFormatted}
                </span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </div>
            </button>
          </div>
        ) : (
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-2 shadow-md border border-[#eae8e5] pointer-events-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#f6f3f1] flex items-center justify-center text-[#86736d]">
                <span className="material-symbols-outlined text-[14px]">checklist</span>
              </div>
              <span className="font-manrope text-[10.5px] text-[#54433e]">
                Выберите хотя бы одну процедуру для записи
              </span>
            </div>
            <span className="font-manrope text-[8.5px] font-semibold text-[#86736d] bg-[#f0edeb] px-2 py-0.5 rounded-full">
              Шаг 1 из 3
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
