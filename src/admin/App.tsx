import React, { useState } from 'react';
import { NavTab, Appointment, ServiceItem, SalonSettings, AppointmentStatus, DaySchedule } from './types';
import {
  initialAppointments,
  initialServices,
  initialSalonSettings,
  septDaysData,
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { AppointmentsView } from './components/AppointmentsView';
import { ServicesView } from './components/ServicesView';
import { TelegramMiniAppModal } from './components/TelegramMiniAppModal';
import { NewServiceModal } from './components/NewServiceModal';
import { TelegramContactModal } from './components/TelegramContactModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('services');
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [settings, setSettings] = useState<SalonSettings>(initialSalonSettings);
  const [calendarDays, setCalendarDays] = useState<DaySchedule[]>(septDaysData);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);
  const [telegramContactTarget, setTelegramContactTarget] = useState<{
    username?: string;
    clientName?: string;
  } | null>(null);

  // Global toast/alert message
  const [appNotification, setAppNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setAppNotification(msg);
    setTimeout(() => setAppNotification(null), 3500);
  };

  // Service operations
  const handleUpdateService = (updated: ServiceItem) => {
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    showNotification(`Услуга «${updated.name}» успешно синхронизирована с ботом`);
  };

  const handleToggleServiceActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newState = !s.isActive;
          showNotification(
            `Услуга «${s.name}» ${newState ? 'активирована' : 'отключена'} в Telegram Mini App`
          );
          return { ...s, isActive: newState };
        }
        return s;
      })
    );
  };

  const handleDeleteService = (id: string) => {
    const s = services.find((srv) => srv.id === id);
    if (window.confirm(`Вы уверены, что хотите удалить услугу «${s?.name || ''}»?`)) {
      setServices((prev) => prev.filter((item) => item.id !== id));
      showNotification(`Услуга удалена из каталога и бота`);
    }
  };

  const handleAddService = (newService: ServiceItem) => {
    setServices((prev) => [newService, ...prev]);
    showNotification(`Новая услуга «${newService.name}» добавлена и доступна для записи`);
  };

  // Appointment operations
  const handleUpdateAppointmentStatus = (id: string, newStatus: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const handleToggleWorkingDay = (date: string, forceStatus?: boolean) => {
    setCalendarDays((prev) =>
      prev.map((d) => {
        if (d.date === date) {
          const newStatus = forceStatus !== undefined ? forceStatus : !d.isWorking;
          showNotification(
            newStatus
              ? `Дата ${d.dayNumber} сентября объявлена рабочей. Онлайн-запись открыта!`
              : `Дата ${d.dayNumber} сентября объявлена выходным. Онлайн-запись закрыта!`
          );
          return { ...d, isWorking: newStatus };
        }
        return d;
      })
    );
  };

  const handleUpdateSettings = (updated: Partial<SalonSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updated };
      // If scheduleType changed to non-daily, we can optionally sync weekends
      if (updated.scheduleType && updated.scheduleType !== prev.scheduleType) {
        if (updated.scheduleType.includes('Пн - Сб')) {
          // Sunday off
          setCalendarDays((days) =>
            days.map((d) => (d.dayOfWeek === 'ВС' ? { ...d, isWorking: false } : d))
          );
        } else if (updated.scheduleType.includes('Пн - Пт')) {
          // Saturday and Sunday off
          setCalendarDays((days) =>
            days.map((d) => (d.dayOfWeek === 'СБ' || d.dayOfWeek === 'ВС' ? { ...d, isWorking: false } : d))
          );
        }
      }
      return next;
    });
    showNotification(
      `График работы салона успешно сохранен и синхронизирован с Telegram Mini App`
    );
  };

  const handleUpdateSlotGrid = () => {
    showNotification(
      `Сетка слотов (${settings.workingHoursStart} — ${settings.workingHoursEnd}, буфер ${settings.bufferMinutes} мин) пересчитана и синхронизирована с календарем`
    );
  };

  // Client booking from simulated Telegram Mini App
  const handleClientBookAppointment = (
    service: ServiceItem,
    time: string,
    clientName: string,
    phone: string
  ) => {
    const newApp: Appointment = {
      id: `LUM-${Math.floor(1000 + Math.random() * 9000)}`,
      time: time,
      endTime: `${parseInt(time.split(':')[0]) + Math.floor(service.duration / 60)}:${
        time.split(':')[1]
      }`,
      duration: service.duration,
      clientName: clientName || 'Гость Telegram',
      clientUsername: `@${clientName.toLowerCase().replace(/\s+/g, '_')}`,
      clientPhone: phone || '+998 90 000 00 00',
      serviceId: service.id,
      serviceName: service.name,
      price: service.price,
      date: '2026-09-15',
      dateLabel: '15 сентября 2026',
      status: 'new',
      isTelegramClient: true,
    };

    setAppointments((prev) => [newApp, ...prev]);
    showNotification(`Новая заявка #${newApp.id} от ${clientName} поступила из Telegram!`);
  };

  const handleExportPDF = () => {
    window.print();
  };

  // Count pending bookings for badge
  const newBookingsCount = appointments.filter((a) => a.status === 'new').length;

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF8F5] text-[#1F1F1E]">
      {/* Fixed Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        settings={settings}
        newBookingsCount={newBookingsCount}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sticky Top Header */}
        <Header settings={settings} currentTab={currentTab} />

        {/* Dynamic Screen View */}
        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
          {currentTab === 'dashboard' && (
            <DashboardView onExportPDF={handleExportPDF} />
          )}

          {currentTab === 'appointments' && (
            <AppointmentsView
              appointments={appointments}
              calendarDays={calendarDays}
              onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
              onToggleWorkingDay={handleToggleWorkingDay}
              onContactTelegram={(username, clientName) =>
                setTelegramContactTarget({ username, clientName })
              }
            />
          )}

          {currentTab === 'services' && (
            <ServicesView
              services={services}
              settings={settings}
              onUpdateService={handleUpdateService}
              onToggleServiceActive={handleToggleServiceActive}
              onDeleteService={handleDeleteService}
              onAddNewServiceClick={() => setIsNewServiceModalOpen(true)}
              onUpdateSlotGrid={handleUpdateSlotGrid}
              onUpdateSettings={handleUpdateSettings}
            />
          )}
        </main>
      </div>

      {/* Telegram Mini App Live Preview Modal */}
      <TelegramMiniAppModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
        services={services}
        settings={settings}
        calendarDays={calendarDays}
        onClientBookAppointment={handleClientBookAppointment}
      />

      {/* New Service Modal */}
      <NewServiceModal
        isOpen={isNewServiceModalOpen}
        onClose={() => setIsNewServiceModalOpen(false)}
        onAddService={handleAddService}
      />

      {/* Telegram Contact Modal */}
      <TelegramContactModal
        isOpen={!!telegramContactTarget}
        onClose={() => setTelegramContactTarget(null)}
        username={telegramContactTarget?.username}
        clientName={telegramContactTarget?.clientName}
      />

      {/* Global Notification Toast */}
      {appNotification && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-xl bg-[#1F1F1E] px-4 py-3 text-xs text-white shadow-2xl animate-fade-in border border-[#86736D]/30">
          <span className="h-2 w-2 rounded-full bg-[#5B7A68]" />
          <span>{appNotification}</span>
        </div>
      )}
    </div>
  );
}
