export type AppScreen = 'home' | 'services' | 'timeslot' | 'confirmation' | 'bookings';

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  priceAmount: number;
  priceFormatted: string;
  durationMin: number;
  category: 'all' | 'nails' | 'rituals' | 'express';
  imageUrl: string;
  badge?: string;
  specialNotice?: string;
  isPopular?: boolean;
  shortTitle?: string;
  rating?: number;
}

export interface TimeSlotOption {
  id: string;
  timeRange: string;
  startHour: number;
  startMinute: number;
  durationMin: number;
  masters: string[];
  period: 'morning' | 'afternoon' | 'evening';
  status: 'available' | 'booked' | 'break' | 'insufficient' | 'overlap' | 'selected';
  statusLabel?: string;
  reason?: string;
}

export interface BookingRecord {
  id: string;
  bookingCode: string;
  serviceId: string;
  serviceTitle: string;
  serviceCategory: string;
  priceFormatted: string;
  durationMin: number;
  suiteName: string;
  masterName: string;
  dateString: string;
  timeRange: string;
  timeZoneNote: string;
  salonName: string;
  salonAddress: string;
  guestName: string;
  guestInitials: string;
  guestPhone: string;
  clientPreferences: string;
  telegramReminderEnabled: boolean;
  paymentStatus: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  imageUrl: string;
  services?: ServiceItem[];
}
