export type NavTab = 'dashboard' | 'appointments' | 'services';

export type AppointmentViewMode = 'today' | 'week' | 'month';

export type AppointmentStatus = 'new' | 'processed' | 'cancelled';

export interface Appointment {
  id: string; // e.g. "LUM-8294"
  time: string; // "14:00"
  endTime: string; // "16:00"
  duration: number; // in minutes, e.g. 120
  clientName: string;
  clientAvatar?: string;
  clientUsername?: string; // "@sabina_rakhimova"
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  serviceSubtitle?: string;
  price: number; // in UZS, e.g. 170000
  date: string; // "2026-09-15"
  dateLabel: string; // "15 сентября 2026"
  status: AppointmentStatus;
  isTelegramClient: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  duration: number; // minutes
  price: number; // UZS
  isActive: boolean;
  isHit?: boolean;
  badgeText?: string;
  note?: string; // e.g. "(синхронно в 4 руки, без доплат)"
  description: string;
  imageUrl: string;
  bufferMinutes: number;
}

export interface DaySchedule {
  date: string; // "2026-09-15"
  dayOfWeek: string; // "ПН", "ВТ", "СР", etc.
  dayNumber: number; // 15
  isWorking: boolean;
  bookingsCount: number;
  revenue: number;
  pendingCount: number;
  isCurrentMonth?: boolean;
}

export interface SalonSettings {
  name: string;
  location: string;
  workingHoursStart: string; // "09:00"
  workingHoursEnd: string; // "21:00"
  scheduleType: string; // "Без выходных"
  bufferMinutes: number; // 15
  botUsername: string; // "@lumiere_beauty_bot"
  isBotActive: boolean;
}
