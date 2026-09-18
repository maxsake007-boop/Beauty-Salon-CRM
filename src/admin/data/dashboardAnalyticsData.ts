export type DashboardTimeFilter = 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface ChartDataPoint {
  label: string;
  revenue: number;
  clients: number;
  isPeak?: boolean;
}

export interface PeriodAnalytics {
  id: DashboardTimeFilter;
  title: string;
  subtitle: string;
  chartType: 'line' | 'bar';
  chartTypeLabel: string;
  periodLabel: string;
  dateRangeText: string;
  peakText: string;
  summaryNote: string;
  kpi: {
    revenueTitle: string;
    revenueValue: string;
    revenueChange: string;
    prevRevenue: string;
    planText: string;
    planPercent: string;
    clientsTitle: string;
    clientsValue: string;
    clientsChange: string;
    clientsNote: string;
    avgCheckValue: string;
    avgCheckChange: string;
    avgCheckNote: string;
    completionRate: string;
    completedCount: string;
    cancelledCount: string;
    lateCancellations: string;
  };
  data: ChartDataPoint[];
}

export const dashboardAnalyticsByPeriod: Record<DashboardTimeFilter, PeriodAnalytics> = {
  // 1. ДЕНЬ — Линейный график по часам (09:00 - 21:00)
  day: {
    id: 'day',
    title: 'Почасовая динамика выручки и визитов',
    subtitle: 'Вторник, 15 сентября 2026 • С 09:00 (открытие) до 21:00 (закрытие)',
    chartType: 'line',
    chartTypeLabel: 'Линейный график',
    periodLabel: 'День',
    dateRangeText: '15 сентября 2026 • 09:00 – 21:00',
    peakText: 'Пиковый час: 18:00 (1 650 000 UZS / 6 гостей)',
    summaryNote: 'Вечерний прайм-тайм с 17:00 до 20:00 сгенерировал 46% дневной выручки салона.',
    kpi: {
      revenueTitle: 'ВЫРУЧКА ЗА СЕГОДНЯ',
      revenueValue: '11 720 000',
      revenueChange: '+14.2%',
      prevRevenue: 'Вчера: 10 260 000 UZS',
      planText: 'Дневной план: 12M UZS',
      planPercent: '97.6%',
      clientsTitle: 'ГОСТИ ЗА СЕГОДНЯ',
      clientsValue: '42',
      clientsChange: '+5',
      clientsNote: '38 записались через Telegram Mini App',
      avgCheckValue: '279 000',
      avgCheckChange: '+6.4%',
      avgCheckNote: 'Лидер среднего чека — дуэт в 4 руки',
      completionRate: '95.2%',
      completedCount: '40',
      cancelledCount: '2',
      lateCancellations: '1 случай',
    },
    data: [
      { label: '09:00', revenue: 250000, clients: 1 },
      { label: '10:00', revenue: 480000, clients: 2 },
      { label: '11:00', revenue: 720000, clients: 3 },
      { label: '12:00', revenue: 950000, clients: 4 },
      { label: '13:00', revenue: 600000, clients: 2 },
      { label: '14:00', revenue: 1100000, clients: 4 },
      { label: '15:00', revenue: 850000, clients: 3 },
      { label: '16:00', revenue: 920000, clients: 3 },
      { label: '17:00', revenue: 1350000, clients: 5 },
      { label: '18:00', revenue: 1650000, clients: 6, isPeak: true },
      { label: '19:00', revenue: 1450000, clients: 5 },
      { label: '20:00', revenue: 980000, clients: 3 },
      { label: '21:00', revenue: 420000, clients: 1 },
    ],
  },

  // 2. НЕДЕЛЯ — Столбчатый график по дням недели (Пн - Вс)
  week: {
    id: 'week',
    title: 'Выручка и количество клиентов по дням недели',
    subtitle: 'Текущая неделя (8 – 14 сентября 2026) • Сравнение рабочих и выходных дней',
    chartType: 'bar',
    chartTypeLabel: 'Столбчатый график',
    periodLabel: 'Неделя',
    dateRangeText: '8 – 14 сентября 2026',
    peakText: 'Пиковый день: Суббота (10 400 000 UZS / 38 гостей)',
    summaryNote: 'Выходные дни (Сб и Вс) обеспечили 38.5% совокупной недельной выручки.',
    kpi: {
      revenueTitle: 'ВЫРУЧКА ЗА НЕДЕЛЮ',
      revenueValue: '51 200 000',
      revenueChange: '+15.8%',
      prevRevenue: 'Прошлая неделя: 44 210 000 UZS',
      planText: 'Недельный план: 50M UZS',
      planPercent: '102.4%',
      clientsTitle: 'ГОСТИ ЗА НЕДЕЛЮ',
      clientsValue: '184',
      clientsChange: '+24',
      clientsNote: '152 записались через Telegram Mini App',
      avgCheckValue: '278 260',
      avgCheckChange: '+7.8%',
      avgCheckNote: 'В пятницу и субботу средний чек превысил 310k UZS',
      completionRate: '93.4%',
      completedCount: '172',
      cancelledCount: '12',
      lateCancellations: '4 случая',
    },
    data: [
      { label: 'Пн (8 сен)', revenue: 4200000, clients: 15 },
      { label: 'Вт (9 сен)', revenue: 5450000, clients: 19 },
      { label: 'Ср (10 сен)', revenue: 6100000, clients: 22 },
      { label: 'Чт (11 сен)', revenue: 6800000, clients: 24 },
      { label: 'Пт (12 сен)', revenue: 8950000, clients: 32 },
      { label: 'Сб (13 сен)', revenue: 10400000, clients: 38, isPeak: true },
      { label: 'Вс (14 сен)', revenue: 9300000, clients: 34 },
    ],
  },

  // 3. МЕСЯЦ — Линейный график по дням месяца
  month: {
    id: 'month',
    title: 'Месячная динамика выручки и потока гостей',
    subtitle: 'Сентябрь 2026 • 30 календарных дней • Чистая динамика',
    chartType: 'line',
    chartTypeLabel: 'Линейный график',
    periodLabel: 'Месяц',
    dateRangeText: '1 – 30 сентября 2026',
    peakText: 'Пиковый день: 19 Сен: 2 450 000 UZS / 21 гость',
    summaryNote: 'Прирост выручки к августу составил +18.4% благодаря росту повторных записей через Telegram.',
    kpi: {
      revenueTitle: 'ВЫРУЧКА ЗА МЕСЯЦ',
      revenueValue: '48 250 000',
      revenueChange: '+18.4%',
      prevRevenue: 'Прошлый месяц: 40 890 000 UZS',
      planText: 'План на месяц: 50M UZS',
      planPercent: '96.5%',
      clientsTitle: 'ГОСТИ ЗА МЕСЯЦ',
      clientsValue: '384',
      clientsChange: '+42',
      clientsNote: '312 через Telegram Mini App (81.2%)',
      avgCheckValue: '125 650',
      avgCheckChange: '+4.1%',
      avgCheckNote: 'Рост доли комплексных спа-процедур',
      completionRate: '91.6%',
      completedCount: '352',
      cancelledCount: '32',
      lateCancellations: '9 случаев',
    },
    data: [
      { label: '1 сен', revenue: 1200000, clients: 10 },
      { label: '3 сен', revenue: 1500000, clients: 12 },
      { label: '5 сен', revenue: 1350000, clients: 11 },
      { label: '7 сен', revenue: 1650000, clients: 14 },
      { label: '9 сен', revenue: 1400000, clients: 12 },
      { label: '11 сен', revenue: 1800000, clients: 15 },
      { label: '13 сен', revenue: 2100000, clients: 18 },
      { label: '15 сен', revenue: 1750000, clients: 15 },
      { label: '17 сен', revenue: 1950000, clients: 16 },
      { label: '19 сен', revenue: 2450000, clients: 21, isPeak: true },
      { label: '21 сен', revenue: 1850000, clients: 15 },
      { label: '23 сен', revenue: 2050000, clients: 17 },
      { label: '25 сен', revenue: 2300000, clients: 19 },
      { label: '27 сен', revenue: 2200000, clients: 18 },
      { label: '30 сен', revenue: 2150000, clients: 17 },
    ],
  },

  // 4. КВАРТАЛ — Столбчатый график по кварталам (Q1, Q2, Q3, Q4)
  quarter: {
    id: 'quarter',
    title: 'Квартальная динамика выручки и клиентов (Q1 – Q4)',
    subtitle: 'Сравнение 4 кварталов 2026 года • Q1 (Янв–Мар), Q2 (Апр–Июн), Q3 (Июл–Сен), Q4 (Окт–Дек)',
    chartType: 'bar',
    chartTypeLabel: 'Столбчатый график',
    periodLabel: 'Квартал',
    dateRangeText: 'Q1 – Q4 2026 года',
    peakText: 'Пиковый квартал: Q4 (154.9M UZS / 1 260 гостей)',
    summaryNote: 'Квартальный тренд демонстрирует устойчивый поквартальный прирост выручки на 12–15%.',
    kpi: {
      revenueTitle: 'ВЫРУЧКА ЗА ТЕКУЩИЙ КВАРТАЛ (Q3)',
      revenueValue: '140 950 000',
      revenueChange: '+13.1%',
      prevRevenue: 'Q2 (II Квартал): 124 600 000 UZS',
      planText: 'План на Q3: 135M UZS',
      planPercent: '104.4%',
      clientsTitle: 'ГОСТИ ЗА КВАРТАЛ (Q3)',
      clientsValue: '1 124',
      clientsChange: '+119',
      clientsNote: '912 через Telegram Mini App (81.1%)',
      avgCheckValue: '125 400',
      avgCheckChange: '+8.6%',
      avgCheckNote: 'Лидерство спа-программ в чеке',
      completionRate: '93.2%',
      completedCount: '1 048',
      cancelledCount: '76',
      lateCancellations: '18 случаев',
    },
    data: [
      { label: 'Q1 (Янв–Мар)', revenue: 108400000, clients: 875 },
      { label: 'Q2 (Апр–Июн)', revenue: 124600000, clients: 1005 },
      { label: 'Q3 (Июл–Сен)', revenue: 140950000, clients: 1124 },
      { label: 'Q4 (Окт–Дек)', revenue: 154900000, clients: 1260, isPeak: true },
    ],
  },

  // 5. ГОД — Линейный график по месяцам
  year: {
    id: 'year',
    title: 'Годовая динамика выручки и клиентского потока',
    subtitle: '2026 год (Январь – Декабрь) • Помесячная динамика развития салона',
    chartType: 'line',
    chartTypeLabel: 'Линейный график',
    periodLabel: 'Год',
    dateRangeText: '1 января – 31 декабря 2026',
    peakText: 'Пиковый месяц: Декабрь (58.4M UZS / 460 гостей)',
    summaryNote: 'Общая годовая выручка показала уверенный рост +26.8% к предыдущему 2025 году.',
    kpi: {
      revenueTitle: 'ГОДОВАЯ ВЫРУЧКА',
      revenueValue: '528 850 000',
      revenueChange: '+26.8%',
      prevRevenue: '2025 год: 417 000 000 UZS',
      planText: 'Годовой план: 500M UZS',
      planPercent: '105.8%',
      clientsTitle: 'ГОСТИ ЗА ГОД',
      clientsValue: '4 264',
      clientsChange: '+640',
      clientsNote: '3 410 через Telegram Mini App (80%)',
      avgCheckValue: '124 020',
      avgCheckChange: '+9.2%',
      avgCheckNote: 'LTV постоянного клиента вырос на 18%',
      completionRate: '93.1%',
      completedCount: '3 970',
      cancelledCount: '294',
      lateCancellations: '58 случаев',
    },
    data: [
      { label: 'Янв', revenue: 32400000, clients: 260 },
      { label: 'Фев', revenue: 34800000, clients: 280 },
      { label: 'Мар', revenue: 41200000, clients: 335 },
      { label: 'Апр', revenue: 39500000, clients: 315 },
      { label: 'Май', revenue: 43100000, clients: 350 },
      { label: 'Июн', revenue: 42000000, clients: 340 },
      { label: 'Июл', revenue: 45600000, clients: 365 },
      { label: 'Авг', revenue: 47100000, clients: 375 },
      { label: 'Сен', revenue: 48250000, clients: 384 },
      { label: 'Окт', revenue: 49500000, clients: 390 },
      { label: 'Ноя', revenue: 52000000, clients: 410 },
      { label: 'Дек (Пик)', revenue: 58400000, clients: 460, isPeak: true },
    ],
  },
};
