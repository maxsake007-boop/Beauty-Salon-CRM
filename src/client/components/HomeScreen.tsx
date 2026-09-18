import React from 'react';
import { AppScreen, ServiceItem } from '../types';
import { SALON_HERO_IMG, TOUCH_THUMBNAIL_IMG } from '../data/salonData';
import { BrandLogo } from './BrandLogo';

interface HomeScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onSelectService: (service: ServiceItem) => void;
  services: ServiceItem[];
  onOpenMap: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectService,
  services,
  onOpenMap,
}) => {
  const popularServices = services.filter((s) => s.isPopular);

  return (
    <div className="flex flex-col w-full pb-20 pt-[86px] px-3 gap-y-2.5 animate-fadeIn">
      {/* 1. Hero Sanctuary Card */}
      <div className="relative overflow-hidden rounded-xl bg-white shadow-2xs border border-[#eae8e5]">
        {/* Salon Photo with Gradient Overlay */}
        <div className="relative h-44 w-full overflow-hidden bg-[#eae8e5]">
          <img
            src={SALON_HERO_IMG}
            alt="Интерьер Lumière Haute Beauté с изогнутой мраморной стойкой, дубовыми рейками и пампасной травой"
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/15" />

          {/* Top Emblem Badge */}
          <div className="absolute top-2.5 right-2.5 flex items-center justify-end">
            <div className="w-9 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-2xs flex items-center justify-center p-1 border border-white/60">
              <BrandLogo variant="emblem" className="w-full h-full" strokeColor="#8d4933" />
            </div>
          </div>

          {/* Overlay Text Content */}
          <div className="absolute bottom-2.5 left-3 right-3 text-white">
            <span className="font-manrope text-[8px] font-bold tracking-[0.2em] uppercase text-[#ffb59e] block mb-0.5">
              ПРОСТРАНСТВО ЗАБОТЫ О СЕБЕ
            </span>
            <h2 className="font-epilogue text-[17px] font-semibold leading-tight text-white mb-0.5">
              Lumière Haute Beauté
            </h2>
            <p className="font-manrope text-[10.5px] text-white/90 leading-snug max-w-xs">
              Осознанные ритуалы красоты, авторский ногтевой сервис и атмосфера безмятежного отдыха в Мирабаде.
            </p>
          </div>
        </div>

        {/* Hero Card Bottom Row: Badges and Action */}
        <div className="p-2.5 bg-white flex flex-col gap-2">
          <div className="flex items-center text-[#54433e] font-manrope text-[10px] px-0.5">
            <span className="flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[13px] text-[#476554]">
                check_circle
              </span>
              Сертифицированные мастера ателье
            </span>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="w-full h-9.5 rounded-lg bg-[#8d4933] hover:bg-[#ab6049] text-white font-manrope text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.99] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">calendar_month</span>
            Записаться на процедуру
          </button>
        </div>
      </div>

      {/* 2. Popular Rituals Section */}
      <div className="flex flex-col gap-1.5 mt-0.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-epilogue text-[14px] font-semibold text-[#1c1c1b]">
              Популярные ритуалы
            </h3>
            <p className="font-manrope text-[10px] text-[#86736d]">
              Авторские процедуры для гармоничного восстановления
            </p>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="font-manrope text-[9.5px] font-bold text-[#86736d] hover:text-[#8d4933] uppercase tracking-wider transition-colors cursor-pointer"
          >
            СМОТРЕТЬ ВСЕ
          </button>
        </div>

        {/* Horizontal Scroll / Grid of Popular Rituals */}
        <div className="grid grid-cols-2 gap-2">
          {popularServices.slice(0, 2).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg p-2.5 shadow-2xs border border-[#eae8e5] flex flex-col justify-between hover:border-[#ffb59e] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-5.5 h-5.5 rounded-full bg-[#f6f3f1] flex items-center justify-center text-[#8d4933]">
                    <span className="material-symbols-outlined text-[13px]">
                      {service.category === 'nails' ? 'spa' : 'water_drop'}
                    </span>
                  </div>
                  <span className="font-manrope text-[9px] font-semibold text-[#476554] bg-[#c8ebd5]/60 px-1.5 py-0.5 rounded-full">
                    {service.durationMin} мин
                  </span>
                </div>

                <h4 className="font-epilogue text-[11.5px] font-semibold text-[#1c1c1b] line-clamp-1 mb-0.5">
                  {service.shortTitle || service.title}
                </h4>
                <p className="font-manrope text-[9.5px] text-[#6e6e73] line-clamp-2 leading-snug mb-2">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1.5 border-t border-[#f0edeb]">
                <div>
                  <span className="font-manrope text-[7.5px] uppercase tracking-wider text-[#86736d] block font-semibold">
                    СТОИМОСТЬ
                  </span>
                  <span className="font-manrope text-[11px] font-bold text-[#1c1c1b]">
                    {service.priceFormatted}
                  </span>
                </div>
                <button
                  onClick={() => {
                    onSelectService(service);
                    onNavigate('services');
                  }}
                  title="Выбрать ритуал"
                  className="w-6 h-6 rounded-md bg-[#f0edeb] hover:bg-[#8d4933] hover:text-white text-[#1c1c1b] flex items-center justify-center transition-colors shadow-2xs active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. The Lumière Touch Card */}
      <div className="bg-white rounded-lg p-2.5 shadow-2xs border border-[#eae8e5] flex items-center gap-2.5">
        <div className="w-10 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#fcf9f7] border border-[#d9c1bb] p-1 flex items-center justify-center">
          <BrandLogo variant="emblem" className="w-full h-full" strokeColor="#8d4933" />
        </div>
        <div className="flex flex-col">
          <span className="font-manrope text-[8.5px] font-bold uppercase tracking-wider text-[#8d4933]">
            СТАНДАРТЫ LUMIÈRE
          </span>
          <p className="font-manrope text-[10.5px] text-[#54433e] leading-snug mt-0.5">
            Безопасные формулы, стерилизация по медицинским стандартам автоклавирования, тихая лаундж-атмосфера.
          </p>
        </div>
      </div>

      {/* 4. Boutique & Atelier Card */}
      <div className="bg-white rounded-xl p-3 shadow-2xs border border-[#eae8e5] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-9 rounded-lg bg-[#f6f3f1] p-1 flex items-center justify-center text-[#8d4933] border border-[#e5e2e0]">
              <BrandLogo variant="emblem" className="w-full h-full" strokeColor="#8d4933" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-epilogue text-[13px] font-semibold text-[#1c1c1b]">
                Бутик и Ателье Lumière
              </h3>
            </div>
          </div>
          <span className="font-manrope text-[9.5px] font-semibold text-[#2f4d3d] bg-[#c8ebd5] px-2 py-0.5 rounded-full">
            Принимаем гостей
          </span>
        </div>

        {/* Working Hours & Location */}
        <div className="grid grid-cols-1 gap-2 pt-0.5 text-[11px] font-manrope">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[14px] text-[#86736d] mt-0.5">
              schedule
            </span>
            <div className="flex flex-col">
              <span className="text-[8.5px] font-bold uppercase text-[#86736d] tracking-wider">
                ЧАСЫ РАБОТЫ
              </span>
              <span className="font-medium text-[#1c1c1b]">Ежедневно 09:00 – 21:00</span>
              <span className="text-[9.5px] text-[#86736d]">Последняя запись на 20:00</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[14px] text-[#86736d] mt-0.5">
              location_on
            </span>
            <div className="flex flex-col">
              <span className="text-[8.5px] font-bold uppercase text-[#86736d] tracking-wider">
                АДРЕС
              </span>
              <span className="font-medium text-[#1c1c1b]">ул. Мирабад, 14, Ташкент</span>
              <span className="text-[9.5px] text-[#86736d]">
                Напротив отеля Grand Mir • Валет-паркинг
              </span>
            </div>
          </div>
        </div>

        {/* Map Button */}
        <button
          onClick={onOpenMap}
          className="w-full h-8.5 rounded-lg bg-[#f0edeb] hover:bg-[#eae8e5] text-[#1c1c1b] font-manrope text-[11.5px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span className="font-serif font-bold text-[#8d4933] text-[13px]">▲</span>
          Открыть в Яндекс Картах
        </button>
      </div>
    </div>
  );
};
