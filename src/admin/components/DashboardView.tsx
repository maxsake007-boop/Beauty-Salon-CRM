import React, { useState } from 'react';
import {
  Download,
  TrendingUp,
  Users,
  CreditCard,
  CheckCircle,
  Clock,
  Sparkles,
  Calendar,
  ChevronRight,
  PieChart as PieIcon,
  BarChart3,
  Check,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  dashboardAnalyticsByPeriod,
  DashboardTimeFilter,
  ChartDataPoint,
} from '../data/dashboardAnalyticsData';
import {
  topServicesBreakdown,
  timeSlotsDensity,
} from '../data/mockData';

interface DashboardViewProps {
  onExportPDF: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onExportPDF }) => {
  const [timeFilter, setTimeFilter] = useState<DashboardTimeFilter>('month');
  const [showExportToast, setShowExportToast] = useState(false);

  const activeAnalytics = dashboardAnalyticsByPeriod[timeFilter];
  const { kpi, data, chartType } = activeAnalytics;

  const handleExportClick = () => {
    setShowExportToast(true);
    onExportPDF();
    setTimeout(() => {
      setShowExportToast(false);
    }, 3000);
  };

  // Calculate synchronized scale bounds for both revenue and guests
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);
  const maxClients = Math.max(...data.map((d) => d.clients), 1);

  const getNiceRevenueLimit = (val: number) => {
    if (val <= 2_000_000) return 2_000_000;
    if (val <= 3_000_000) return 3_000_000;
    if (val <= 12_000_000) return 12_000_000;
    if (val <= 20_000_000) return 20_000_000;
    if (val <= 70_000_000) return 70_000_000;
    if (val <= 180_000_000) return 180_000_000;
    return Math.ceil(val * 1.15);
  };

  const maxRevLimit = getNiceRevenueLimit(maxRevenue);
  const maxClientsLimit = Math.max(1, Math.round(maxClients * (maxRevLimit / maxRevenue)));

  const formatRevenueShort = (val: number) => {
    if (val === 0) return '0';
    if (val >= 1_000_000) {
      const m = val / 1_000_000;
      return m % 1 === 0 ? `${m}M` : `${m.toFixed(1)}M`;
    }
    if (val >= 1_000) {
      return `${Math.round(val / 1_000)}k`;
    }
    return `${val}`;
  };

  // Format combined right Y-axis tick: "0 Су | 0 Г"
  const formatRightCombinedAxis = (revVal: number) => {
    const revStr = formatRevenueShort(revVal);
    const ratio = maxRevLimit > 0 ? maxClientsLimit / maxRevLimit : 0;
    const guestVal = Math.round(revVal * ratio);
    return `${revStr} Су | ${guestVal} Г`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast notification on PDF export */}
      {showExportToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 rounded-2xl border border-[#5B7A68]/30 bg-white p-4 shadow-xl text-xs text-[#1F1F1E] animate-in fade-in slide-in-from-top-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#5B7A68]/15 text-[#5B7A68]">
            <Check className="h-4 w-4" />
          </div>
          <div>
            <div className="font-bold">Экспорт аналитики запущен</div>
            <div className="text-[#686662]">
              Отчёт ({activeAnalytics.periodLabel}: {activeAnalytics.dateRangeText}) формируется в PDF.
            </div>
          </div>
        </div>
      )}

      {/* Top Section Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#86736D]">
            ОПЕРАЦИОННЫЙ ОТЧЕТ • Lumière Haute Beauté • Мирабад
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#1F1F1E] sm:text-3xl">
            Бизнес-аналитика и пульс салона
          </h2>
          <p className="text-xs text-[#686662] mt-0.5">
            Период: <span className="font-semibold text-[#1F1F1E]">{activeAnalytics.dateRangeText}</span> • Синхронизировано с кассой и Telegram CRM
          </p>
        </div>

        {/* Filters & Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex rounded-xl border border-[#E3DED7] bg-[#F5F2EB]/90 p-1 text-xs shadow-xs">
            {(
              [
                { id: 'day', label: 'День' },
                { id: 'week', label: 'Неделя' },
                { id: 'month', label: 'Месяц' },
                { id: 'quarter', label: 'Квартал' },
                { id: 'year', label: 'Год' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.id}
                onClick={() => setTimeFilter(filter.id)}
                className={`cursor-pointer rounded-lg px-3.5 py-1.5 font-medium transition-all ${
                  timeFilter === filter.id
                    ? 'bg-[#8D4933] text-white shadow-xs font-semibold'
                    : 'text-[#686662] hover:text-[#1F1F1E] hover:bg-white/60'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportClick}
            className="flex items-center gap-2 rounded-xl bg-[#8D4933] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#733420] cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Экспорт в PDF</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards (Dynamic based on selected period) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Card 1: Revenue */}
        <div className="rounded-2xl border border-[#E3DED7] bg-white p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#686662]">
              {kpi.revenueTitle}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#5B7A68]/15 px-2 py-0.5 text-[11px] font-semibold text-[#5B7A68]">
              <TrendingUp className="h-3 w-3" />
              {kpi.revenueChange}
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold tracking-tight text-[#1F1F1E] sm:text-3xl tabular-nums">
              {kpi.revenueValue}
            </span>
            <span className="text-xs font-semibold text-[#686662]">UZS</span>
          </div>
          <div className="mt-1 text-[11px] text-[#686662]">
            {kpi.prevRevenue}
          </div>

          <div className="mt-4 border-t border-[#F0EDEB] pt-3">
            <div className="flex justify-between text-[11px] text-[#686662]">
              <span>{kpi.planText}</span>
              <span className="font-semibold text-[#1F1F1E]">{kpi.planPercent}</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#F5F2EB]">
              <div
                className="h-full rounded-full bg-[#8D4933] transition-all duration-500"
                style={{ width: `${Math.min(parseFloat(kpi.planPercent), 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Clients */}
        <div className="rounded-2xl border border-[#E3DED7] bg-white p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#686662]">
              {kpi.clientsTitle}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#5B7A68]/15 px-2 py-0.5 text-[11px] font-semibold text-[#5B7A68]">
              <Users className="h-3 w-3" />
              {kpi.clientsChange}
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold tracking-tight text-[#1F1F1E] sm:text-3xl tabular-nums">
              {kpi.clientsValue}
            </span>
            <span className="text-xs text-[#686662]">гостей</span>
          </div>
          <div className="mt-1 text-[11px] text-[#686662]">
            {kpi.clientsNote}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[#F0EDEB] pt-3 text-[11px]">
            <span className="text-[#686662]">Постоянные клиенты:</span>
            <span className="font-semibold text-[#1F1F1E]">64%</span>
          </div>
        </div>

        {/* Card 3: Avg Check */}
        <div className="rounded-2xl border border-[#E3DED7] bg-white p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#686662]">
              СРЕДНИЙ ЧЕК
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#5B7A68]/15 px-2 py-0.5 text-[11px] font-semibold text-[#5B7A68]">
              <CreditCard className="h-3 w-3" />
              {kpi.avgCheckChange}
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold tracking-tight text-[#1F1F1E] sm:text-3xl tabular-nums">
              {kpi.avgCheckValue}
            </span>
            <span className="text-xs font-semibold text-[#686662]">UZS</span>
          </div>
          <div className="mt-1 text-[11px] text-[#686662]">
            {kpi.avgCheckNote}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[#F0EDEB] pt-3 text-[11px]">
            <span className="text-[#686662]">Топ-категория:</span>
            <span className="font-semibold text-[#8D4933]">Фирменные дуэты</span>
          </div>
        </div>

        {/* Card 4: Completion */}
        <div className="rounded-2xl border border-[#E3DED7] bg-white p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#686662]">
              ВЫПОЛНЕНИЕ ВИЗИТОВ
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#5B7A68]/15 px-2 py-0.5 text-[11px] font-semibold text-[#5B7A68]">
              <CheckCircle className="h-3 w-3" />
              {kpi.completionRate}
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold tracking-tight text-[#1F1F1E] sm:text-3xl tabular-nums">
              {kpi.completedCount}
            </span>
            <span className="text-xs text-[#686662]">выполнено / {kpi.cancelledCount} отмен</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#F5F2EB] flex">
            <div
              className="h-full bg-[#5B7A68]"
              style={{ width: `${parseFloat(kpi.completionRate)}%` }}
            />
            <div
              className="h-full bg-[#C0584D]"
              style={{ width: `${100 - parseFloat(kpi.completionRate)}%` }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[#F0EDEB] pt-3 text-[11px]">
            <span className="text-[#686662]">Отмены за &lt; 2 часа</span>
            <span className="font-semibold text-[#C0584D]">{kpi.lateCancellations}</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* HERO CHART SECTION (MAIN FOCUS OF THE DASHBOARD) */}
      {/* ========================================================= */}
      <div className="rounded-2xl border border-[#E3DED7] bg-white p-6 shadow-sm ring-1 ring-black/5">
        {/* Chart Header */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#86736D]">
                {activeAnalytics.periodLabel.toUpperCase()} • {activeAnalytics.chartTypeLabel.toUpperCase()}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-[#8D4933]/10 px-2 py-0.5 text-[10px] font-semibold text-[#8D4933]">
                {chartType === 'line' ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <BarChart3 className="h-3 w-3" />
                )}
                {activeAnalytics.chartTypeLabel}
              </span>
            </div>
            <h3 className="mt-1 font-display text-xl font-bold text-[#1F1F1E] sm:text-2xl">
              {activeAnalytics.title}
            </h3>
            <p className="mt-0.5 text-xs text-[#686662]">
              {activeAnalytics.subtitle}
            </p>
          </div>

          {/* Badges & Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Legend */}
            <div className="flex items-center gap-2.5 rounded-xl border border-[#E3DED7] bg-[#FAF8F5] px-3.5 py-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-medium text-[#1F1F1E]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#8D4933]" />
                <span>Выручка (Су)</span>
              </div>
              <span className="text-[#86736D]/60 font-bold">|</span>
              <div className="flex items-center gap-1.5 font-medium text-[#1F1F1E]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#5B7A68]" />
                <span>Гости (Г)</span>
              </div>
            </div>

            {/* Peak badge */}
            <div className="rounded-xl border border-[#8D4933]/25 bg-[#8D4933]/10 px-3.5 py-1.5 text-xs font-semibold text-[#8D4933]">
              {activeAnalytics.peakText}
            </div>
          </div>
        </div>

        {/* Dynamic Chart Container */}
        <div className="mt-6 h-80 sm:h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              /* LINE / AREA CHART (День, Месяц, Год) */
              <AreaChart
                data={data}
                margin={{ top: 15, right: 15, left: 10, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8D4933" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8D4933" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F0EDEB"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={{ stroke: '#E3DED7' }}
                  tick={{ fill: '#686662', fontSize: 11 }}
                />
                <YAxis
                  yAxisId="rev"
                  orientation="right"
                  width={110}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, maxRevLimit]}
                  tick={{ fill: '#686662', fontSize: 11 }}
                  tickFormatter={formatRightCombinedAxis}
                />
                <YAxis
                  yAxisId="guests"
                  hide
                  domain={[0, maxClientsLimit]}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as ChartDataPoint;
                      const avg = item.clients > 0 ? Math.round(item.revenue / item.clients) : 0;
                      return (
                        <div className="rounded-xl border border-[#E3DED7] bg-white p-3.5 shadow-lg text-xs space-y-1.5 min-w-[200px]">
                          <div className="flex items-center justify-between border-b border-[#F0EDEB] pb-1 font-bold text-[#1F1F1E]">
                            <span>{label}</span>
                            {item.isPeak && (
                              <span className="rounded-md bg-[#8D4933]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#8D4933]">
                                ★ ПИК
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-[#8D4933]">
                            <span className="font-medium">Выручка (Су):</span>
                            <span className="font-bold tabular-nums">
                              {item.revenue.toLocaleString('ru-RU')} UZS
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[#5B7A68]">
                            <span className="font-medium">Гости (Г):</span>
                            <span className="font-bold tabular-nums">
                              {item.clients} {item.clients === 1 ? 'гость' : item.clients < 5 ? 'гостя' : 'гостей'}
                            </span>
                          </div>
                          {avg > 0 && (
                            <div className="flex items-center justify-between text-[11px] text-[#86736D] border-t border-[#F0EDEB] pt-1">
                              <span>Ср. чек:</span>
                              <span className="font-semibold tabular-nums">
                                {avg.toLocaleString('ru-RU')} UZS
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  yAxisId="rev"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8D4933"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
                <Line
                  yAxisId="guests"
                  type="monotone"
                  dataKey="clients"
                  stroke="#5B7A68"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#5B7A68', strokeWidth: 1, stroke: '#FFFFFF' }}
                  activeDot={{ r: 7, fill: '#5B7A68', strokeWidth: 2, stroke: '#FFFFFF' }}
                />
              </AreaChart>
            ) : (
              /* BAR CHART (Неделя, Квартал) */
              <BarChart
                data={data}
                margin={{ top: 15, right: 15, left: 10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F0EDEB"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={{ stroke: '#E3DED7' }}
                  tick={{ fill: '#686662', fontSize: 11 }}
                />
                <YAxis
                  yAxisId="rev"
                  orientation="right"
                  width={110}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, maxRevLimit]}
                  tick={{ fill: '#686662', fontSize: 11 }}
                  tickFormatter={formatRightCombinedAxis}
                />
                <YAxis
                  yAxisId="guests"
                  hide
                  domain={[0, maxClientsLimit]}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as ChartDataPoint;
                      const avg = item.clients > 0 ? Math.round(item.revenue / item.clients) : 0;
                      return (
                        <div className="rounded-xl border border-[#E3DED7] bg-white p-3.5 shadow-lg text-xs space-y-1.5 min-w-[200px]">
                          <div className="flex items-center justify-between border-b border-[#F0EDEB] pb-1 font-bold text-[#1F1F1E]">
                            <span>{label}</span>
                            {item.isPeak && (
                              <span className="rounded-md bg-[#8D4933]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#8D4933]">
                                ★ ПИК
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-[#8D4933]">
                            <span className="font-medium">Выручка (Су):</span>
                            <span className="font-bold tabular-nums">
                              {item.revenue.toLocaleString('ru-RU')} UZS
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[#5B7A68]">
                            <span className="font-medium">Гости (Г):</span>
                            <span className="font-bold tabular-nums">
                              {item.clients} {item.clients === 1 ? 'гость' : item.clients < 5 ? 'гостя' : 'гостей'}
                            </span>
                          </div>
                          {avg > 0 && (
                            <div className="flex items-center justify-between text-[11px] text-[#86736D] border-t border-[#F0EDEB] pt-1">
                              <span>Ср. чек:</span>
                              <span className="font-semibold tabular-nums">
                                {avg.toLocaleString('ru-RU')} UZS
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  yAxisId="rev"
                  dataKey="revenue"
                  name="Выручка"
                  fill="#8D4933"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={timeFilter === 'quarter' ? 52 : 36}
                />
                <Bar
                  yAxisId="guests"
                  dataKey="clients"
                  name="Клиенты"
                  fill="#5B7A68"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={timeFilter === 'quarter' ? 52 : 36}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Chart Footer with analytical insights */}
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between border-t border-[#F0EDEB] pt-3.5 text-xs text-[#686662]">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#5B7A68]" />
            <span className="font-medium text-[#1F1F1E]">{activeAnalytics.summaryNote}</span>
          </div>
          <div className="text-[11px] text-[#86736D] sm:text-right">
            Обновлено: только что • Автоматический пересчет
          </div>
        </div>
      </div>

      {/* Two Bottom Analytical Columns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column: Services Drivers */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#E3DED7] bg-white p-6 shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86736D]">
                УСЛУГИ-ДРАЙВЕРЫ
              </span>
              <PieIcon className="h-4 w-4 text-[#86736D]" />
            </div>
            <h3 className="mt-1 font-display text-lg font-bold text-[#1F1F1E]">
              Популярность услуг и доля выручки
            </h3>
            <p className="text-xs text-[#686662]">
              Распределение структуры доходов и записей по топ-3 направлениям ухода.
            </p>

            {/* Donut and breakdown */}
            <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row">
              {/* Circular Graphic */}
              <div className="relative flex h-36 w-36 flex-shrink-0 items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topServicesBreakdown}
                      innerRadius={44}
                      outerRadius={62}
                      paddingAngle={3}
                      dataKey="share"
                    >
                      {topServicesBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center text-center pointer-events-none">
                  <span className="font-display text-xl font-bold text-[#1F1F1E] tabular-nums">
                    414
                  </span>
                  <span className="text-[10px] text-[#686662]">Всего сессий</span>
                </div>
              </div>

              {/* Breakdown Rows */}
              <div className="flex-1 space-y-3.5 w-full">
                {topServicesBreakdown.map((item, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-start justify-between text-xs">
                      <div className="flex items-start gap-2">
                        <span
                          className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <div className="font-medium text-[#1F1F1E]">{item.name}</div>
                          <div className="text-[11px] text-[#86736D]">{item.sub}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#1F1F1E] tabular-nums">{item.share}% выручки</div>
                        <div className="text-[11px] text-[#686662] tabular-nums">{item.count} записей</div>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#F5F2EB]">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${item.share}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Time Slots Density */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#E3DED7] bg-white p-6 shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86736D]">
                ПАТТЕРНЫ ЗАПИСИ
              </span>
              <Clock className="h-4 w-4 text-[#86736D]" />
            </div>
            <h3 className="mt-1 font-display text-lg font-bold text-[#1F1F1E]">
              Загрузка по времени суток
            </h3>
            <p className="text-xs text-[#686662]">
              Распределение плотности клиентских визитов в течение рабочего дня салона.
            </p>

            {/* Time slot bars */}
            <div className="mt-6 space-y-4">
              {timeSlotsDensity.map((slot, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#1F1F1E]">
                      {slot.name}
                    </span>
                    <span className="font-semibold text-[#1F1F1E] tabular-nums">
                      {slot.percent}% ({slot.visits} визита)
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#F5F2EB]">
                    <div
                      className={`h-full rounded-full transition-all ${
                        slot.isPrime ? 'bg-[#8D4933]' : 'bg-[#A9ABAD]'
                      }`}
                      style={{ width: `${slot.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
