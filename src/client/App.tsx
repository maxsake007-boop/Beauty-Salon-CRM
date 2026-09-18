import React, { useState, useEffect } from 'react';
import { AppScreen, BookingRecord, ServiceItem, TimeSlotOption } from './types';
import {
  INITIAL_BOOKINGS,
  SERVICES_LIST,
} from './data/salonData';
import { TelegramHeader } from './components/TelegramHeader';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { ServicesScreen } from './components/ServicesScreen';
import { TimeSlotScreen } from './components/TimeSlotScreen';
import { BookingConfirmationScreen } from './components/BookingConfirmationScreen';
import { BookingsListScreen } from './components/BookingsListScreen';
import { GuestProfileModal } from './components/GuestProfileModal';
import { YandexMapsModal } from './components/YandexMapsModal';
import { ToastNotification } from './components/ToastNotification';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [services] = useState<ServiceItem[]>(SERVICES_LIST);
  // Multi-selection state for services
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);
  const [activeBooking, setActiveBooking] = useState<BookingRecord>(INITIAL_BOOKINGS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleToggleService = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        const next = prev.filter((s) => s.id !== service.id);
        showToast(`Удалено: ${service.shortTitle || service.title}`);
        return next;
      } else {
        const next = [...prev, service];
        showToast(`Добавлено: ${service.shortTitle || service.title} (выбрано: ${next.length})`);
        return next;
      }
    });
  };

  const handleClearServices = () => {
    setSelectedServices([]);
    showToast('Выбор процедур очищен');
  };

  const handleSelectServiceFromHome = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      if (!prev.some((s) => s.id === service.id)) {
        return [...prev, service];
      }
      return prev;
    });
    setCurrentScreen('services');
  };

  const handleConfirmBooking = (slot: TimeSlotOption, selectedDay: number) => {
    if (selectedServices.length === 0) {
      showToast('Пожалуйста, выберите хотя бы одну процедуру');
      return;
    }

    const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMin, 0);
    const totalPrice = selectedServices.reduce((sum, s) => sum + s.priceAmount, 0);
    const totalPriceFormatted = `${new Intl.NumberFormat('ru-RU').format(totalPrice)} UZS`;
    const servicesTitle = selectedServices.map((s) => s.shortTitle || s.title).join(' + ');

    const bookingCode = `#LUM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: BookingRecord = {
      id: `booking-${Date.now()}`,
      bookingCode: currentScreen === 'timeslot' && selectedDay === 15 && slot.id === 'slot-1400' ? '#LUM-8294' : bookingCode,
      serviceId: selectedServices.map((s) => s.id).join(','),
      serviceTitle: servicesTitle,
      serviceCategory: selectedServices.length > 1 ? 'Комплексный ритуал' : 'Люкс Haute Beauté',
      priceFormatted: totalPriceFormatted,
      durationMin: totalDuration,
      suiteName: 'Люкс Haute Beauté',
      masterName: slot.masters.length > 0 ? slot.masters[0] : 'Мастер Нилюфар Рахимова',
      dateString: `Вторник, ${selectedDay} сентября 2026`,
      timeRange: `${slot.timeRange} (Ташкент, UTC+5)`,
      timeZoneNote: 'Время в Ташкенте, UTC+5',
      salonName: 'Салон Lumière',
      salonAddress: 'ул. Мирабад, 14, Мирабадский район, Ташкент',
      guestName: 'Анна Каримова',
      guestInitials: 'АК',
      guestPhone: '+998 90 123 45 67',
      clientPreferences: 'Предпочитаю тишину во время процедуры, чувствительная кутикула',
      telegramReminderEnabled: true,
      paymentStatus: 'Подтверждено · Без предоплаты',
      status: 'confirmed',
      imageUrl: selectedServices[0]?.imageUrl || '',
      services: selectedServices,
    };

    setBookings((prev) => [newBooking, ...prev]);
    setActiveBooking(newBooking);
    setCurrentScreen('confirmation');
    showToast(`Запись подтверждена: ${newBooking.bookingCode}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f1ee] flex justify-center selection:bg-[#ffdbd0] selection:text-[#3a0b00]">
      {/* Telegram Mini App Container sized for mobile viewport (390px) */}
      <div className="w-full max-w-[390px] bg-[#fcf9f7] min-h-screen relative flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.06)]">
        {/* Top Header */}
        <TelegramHeader
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col w-full relative">
          {currentScreen === 'home' && (
            <HomeScreen
              services={services}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onSelectService={handleSelectServiceFromHome}
              onOpenMap={() => setIsMapOpen(true)}
            />
          )}

          {currentScreen === 'services' && (
            <ServicesScreen
              services={services}
              selectedServices={selectedServices}
              onToggleService={handleToggleService}
              onClearServices={handleClearServices}
              onNavigate={(screen) => setCurrentScreen(screen)}
            />
          )}

          {currentScreen === 'timeslot' && (
            <TimeSlotScreen
              selectedServices={selectedServices}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onConfirmBooking={handleConfirmBooking}
            />
          )}

          {currentScreen === 'confirmation' && (
            <BookingConfirmationScreen
              booking={activeBooking}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onShowToast={showToast}
              onOpenMap={() => setIsMapOpen(true)}
            />
          )}

          {currentScreen === 'bookings' && (
            <BookingsListScreen
              bookings={bookings}
              onSelectBooking={(b) => {
                setActiveBooking(b);
                setCurrentScreen('confirmation');
              }}
              onNavigate={(screen) => setCurrentScreen(screen)}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          bookingCount={bookings.length}
        />

        {/* Global Toast */}
        <ToastNotification
          message={toastMessage}
          onDismiss={() => setToastMessage(null)}
        />

        {/* Modals */}
        <GuestProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />

        <YandexMapsModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
        />
      </div>
    </div>
  );
}
