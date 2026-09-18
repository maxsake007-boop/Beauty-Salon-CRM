import { BookingRecord, ServiceItem, TimeSlotOption } from '../types';

export const SALON_LOGO_URL = '/assets/logo.svg';

export const SALON_HERO_IMG =
  'https://images.unsplash.com/photo-1629732047847-50219e9c5aef?auto=format&fit=crop&w=1200&q=85';

export const TOUCH_THUMBNAIL_IMG =
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80';

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'manicure-gel',
    title: 'Фирменный гель-маникюр',
    shortTitle: 'Фирменный маникюр',
    subtitle: 'Ногти и уход',
    description:
      'Полная обработка ногтей, аппаратный уход за кутикулой, укрепляющее базовое покрытие и стойкий премиальный гель-лак.',
    priceAmount: 80000,
    priceFormatted: '80 000 UZS',
    durationMin: 60,
    category: 'nails',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAaOT7th51JUrGxvnWp-PMbYtRf2qYSqgU5XIs3xNvPdqw_uI26CvooeZou1EsIAcfCP2PJSpXtjLqXsPylZ772XPDhVPMyTFcLucRq9n1GzsrjkRbLWur3CTh54g9XhqZ32_Q-EvjNItABmd0kg8FwE8MIW5flmY6TzgWsLaTY2DPbKkxf84hHWfa3llC_K8sigLm9Vrx6Q6x7WJCFjzQ0cK0nAkmPVWzXC0dMAoevTuVTo1VGwaKj2w',
    isPopular: true,
  },
  {
    id: 'spa-pedicure',
    title: 'Спа-ритуал педикюра',
    shortTitle: 'Спа-педикюр',
    subtitle: 'Комбинированные ритуалы',
    description:
      'Увлажняющая ванночка для ног, деликатный пилинг, моделирование формы ногтей, расслабляющий массаж и безупречное покрытие.',
    priceAmount: 100000,
    priceFormatted: '100 000 UZS',
    durationMin: 60,
    category: 'rituals',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJKea--87VxYwhahwMRydyngbI_6rhT_2rl3w-EYMDhjtXdbN9CdzekmBGsxr8AutNU7oBRLMQ-pko81V9DEQtsT7YF48pWWMfEqzFlit4GPjfbwL7hh0rk8wZ_OK1n2XPsv48mqjK8ycb8RfbUAuVs7-9jKYYxDKsKHOnsAWWQdU9nXppS9Qqtfj3jOJhE5U0idppTBpmgGHi0rS7y-K7fEfjj4ISZ7oFCiGMWcC_56QDDZE2IRWPQA',
    isPopular: true,
  },
  {
    id: 'haute-duo',
    title: 'Haute Дуэт: Маникюр + Педикюр',
    shortTitle: 'Haute Дуэт',
    subtitle: 'Комбинированные ритуалы',
    description:
      'Флагманский ритуал двойной заботы в 4 руки. Параллельный уход за ногтями, органический пилинг и синхронное расслабляющее покрытие.',
    priceAmount: 170000,
    priceFormatted: '170 000 UZS',
    durationMin: 120,
    category: 'rituals',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAzlRTNvU43VN9AOh92GssO6njW8jXrV5Ec2v4LMV3gV2d8VwVSFhg6ZsFwl0HY0-nV4W_HtJHxQgES1kDFAWd8sf4Wt2EYKtbGoPNFdlVx3Jc2HP1ljbzOsxw1vcHzViIlTi1E3vWwkb-6LKms5fI1zA5jWlvPwVZ8FeA9pLV8YAMCn9yp6NiumuCdd9237dgjfVTTswi8ePXKB3d7Vu6FSAsoDGoPHVG9gn1RiJyhYR3L8iiTgphihQ',
    specialNotice:
      'Непрерывный 2-часовой сеанс для максимального комфорта и заботы. Включен авторский травяной чай.',
    isPopular: true,
  },
  {
    id: 'express-gel',
    title: 'Экспресс-обновление гель-лака',
    shortTitle: 'Экспресс-покрытие',
    subtitle: 'Экспресс-уход',
    description:
      'Быстрая аккуратная коррекция кутикулы и свежее нанесение цветного гель-лака.',
    priceAmount: 50000,
    priceFormatted: '50 000 UZS',
    durationMin: 30,
    category: 'express',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDn69pzDC9BLt9SsgaxgFk3z3TXhv9sIWlkrqcdnLVXxxK9xZjmMgVgua_wh5usrmbNN3xufBL0F2mtHANfQB9xX0FkR_Dj6mxjSIDTqITp7A2HNtkYxE7r-7H0N4UTa_8p4NHpf6j9t8bbAKiM3-A3utjYUwiDtruySCCR7Bfk_c0ZQujQpB5KLe7kHPE025_l5U6r7A_Cap1DpLIh0Pl47OZ46pHOfU2rJJZ4v62KhTRKPzAeIl4MkA',
  },
  {
    id: 'japanese-repair',
    title: 'Восстановление ногтей и японский уход',
    shortTitle: 'Японский уход',
    subtitle: 'Ногти и уход',
    description:
      'Глубокое восстановление ногтевой пластины органическим пчелиным воском, минеральной жемчужной пудрой и витаминами.',
    priceAmount: 65000,
    priceFormatted: '65 000 UZS',
    durationMin: 45,
    category: 'nails',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuChOH2vAzZCYmjuRYea3fiv44mJX8k9FP90w6nFeq7K3N94v7ZR5wfGafxsMU-sOdphBTSvysj2eJ_wU65_IpiqUT_iziw5xD1QsUX1NfvmMirY-l-lfJ_rZdr4d4XMKjScVcw9xm81Ito8PMqNw_CR4mJ6OHSTDY8WsApklOuoH2jHQNQlTIkkpA_2JQGbIr9dVELoWWkBvBNjNJr1EJEGGQ7idrhSmfPwLhX8LALDZD3lwttuzGs9_g',
  },
];

export const INITIAL_TIME_SLOTS: TimeSlotOption[] = [
  // Утро
  {
    id: 'slot-0900',
    timeRange: '09:00',
    startHour: 9,
    startMinute: 0,
    durationMin: 120,
    masters: [],
    period: 'morning',
    status: 'booked',
    statusLabel: 'ЗАНЯТО',
  },
  {
    id: 'slot-1000',
    timeRange: '10:00 – 12:00',
    startHour: 10,
    startMinute: 0,
    durationMin: 120,
    masters: ['Мастера Нилюфар и Севара'],
    period: 'morning',
    status: 'available',
    statusLabel: 'Доступно',
  },
  {
    id: 'slot-1100',
    timeRange: '11:00',
    startHour: 11,
    startMinute: 0,
    durationMin: 60,
    masters: [],
    period: 'morning',
    status: 'insufficient',
    statusLabel: 'Недостаточное 2-ч окно',
  },
  // День
  {
    id: 'slot-1200',
    timeRange: '12:00',
    startHour: 12,
    startMinute: 0,
    durationMin: 60,
    masters: [],
    period: 'afternoon',
    status: 'break',
    statusLabel: 'Перерыв студии',
  },
  {
    id: 'slot-1300',
    timeRange: '13:00',
    startHour: 13,
    startMinute: 0,
    durationMin: 60,
    masters: [],
    period: 'afternoon',
    status: 'booked',
    statusLabel: 'Зарезервировано',
  },
  {
    id: 'slot-1400',
    timeRange: '14:00 – 16:00',
    startHour: 14,
    startMinute: 0,
    durationMin: 120,
    masters: ['Мастера Нилюфар и Камила'],
    period: 'afternoon',
    status: 'selected',
    statusLabel: 'Выбрано',
  },
  {
    id: 'slot-1600',
    timeRange: '16:00 – 18:00',
    startHour: 16,
    startMinute: 0,
    durationMin: 120,
    masters: ['Мастера Дильноза и Камила'],
    period: 'afternoon',
    status: 'available',
    statusLabel: 'Доступно',
  },
  {
    id: 'slot-1700',
    timeRange: '17:00',
    startHour: 17,
    startMinute: 0,
    durationMin: 60,
    masters: [],
    period: 'afternoon',
    status: 'overlap',
    statusLabel: 'Пересечение',
  },
  // Вечер
  {
    id: 'slot-1830',
    timeRange: '18:30 – 20:30',
    startHour: 18,
    startMinute: 30,
    durationMin: 120,
    masters: ['Мастера Нилюфар и Севара'],
    period: 'evening',
    status: 'available',
    statusLabel: 'Доступно',
  },
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'booking-1',
    bookingCode: '#LUM-8294',
    serviceId: 'haute-duo',
    serviceTitle: 'Haute Дуэт: Маникюр + Педикюр',
    serviceCategory: 'Сьют Haute Beauté',
    priceFormatted: '170 000 UZS',
    durationMin: 120,
    suiteName: 'Сьют Haute Beauté',
    masterName: 'Мастер Нилюфар Рахимова',
    dateString: 'Вторник, 15 сентября 2026',
    timeRange: '14:00 – 16:00 (Ташкентское время, UTC+5)',
    timeZoneNote: 'Ташкентское время, UTC+5',
    salonName: 'Салон Lumière',
    salonAddress: 'ул. Мирабад, 14, Мирабадский район, Ташкент',
    guestName: 'Анна Каримова',
    guestInitials: 'АК',
    guestPhone: '+998 90 123 45 67',
    clientPreferences: 'Предпочитаю тишину во время процедуры, чувствительная кутикула',
    telegramReminderEnabled: true,
    paymentStatus: 'Подтверждено · Оплата на месте',
    status: 'confirmed',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMB_w4GhBSNxjWCygYXFiTWUYtkz7AQzb3waIbXBzcM61gy1QnQ6GyEK7WFUK4z9r_Vjt_xMd0NN7yEjDQko8ZZ7GRY7ZQgDNwdnh5TWIdLNdSHkMDP8qdEPDNIFtVfYsTWjv6AvmUcNjeXGWsF0uGvCM_WOgv3F9bSMqeEG0bZjDaKyaE6GzeZ0mFup7j2hhEFJ-ckLoxfZMnFw0YhNvEsZGQA5Iivo706zlsZ6jUDEHO3kTZn6vEDQ',
  },
];
