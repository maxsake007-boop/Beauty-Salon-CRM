import React from 'react';
import { LayoutDashboard, CalendarCheck, Sparkles, Store, LogOut } from 'lucide-react';
import { NavTab, SalonSettings } from '../types';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  settings: SalonSettings;
  newBookingsCount: number;
  adminUsername?: string;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  settings,
  newBookingsCount,
  adminUsername = 'Администратор',
  onLogout,
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Дашборд',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'appointments' as NavTab,
      label: 'Заявки',
      icon: CalendarCheck,
      badge: newBookingsCount > 0 ? `${newBookingsCount}` : null,
    },
    {
      id: 'services' as NavTab,
      label: 'Услуги',
      icon: Sparkles,
      badge: null,
    },
  ];

  const initials = adminUsername.trim().slice(0, 2).toUpperCase() || 'АД';

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col border-r border-[#E3DED7] bg-[#FAF8F5] p-4 text-[#1F1F1E]">
      {/* Brand Header */}
      <div className="mb-6 px-2 pt-2">
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-2xl font-normal tracking-tight text-[#1F1F1E]">
            Lumière
          </span>
        </div>
        <div className="font-display text-[10px] uppercase tracking-[0.25em] text-[#686662]">
          HAUTE BEAUTÉ
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#8D4933] text-white shadow-sm'
                  : 'text-[#54433E] hover:bg-[#F5F2EB] hover:text-[#1F1F1E]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    isActive ? 'text-white' : 'text-[#86736D] group-hover:text-[#8D4933]'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#B86B53] text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Mini info card */}
      <div className="mb-4 rounded-xl border border-[#E3DED7] bg-[#F5F2EB]/80 p-3 text-xs">
        <div className="flex items-center justify-between text-[#686662]">
          <span className="font-semibold text-[#1F1F1E]">Telegram Bot</span>
          <span className="inline-flex items-center gap-1 text-[11px] text-[#5B7A68]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5B7A68]" />
            Активен
          </span>
        </div>
        <div className="mt-1 text-[11px] text-[#686662]">
          {settings.botUsername}
        </div>
        <div className="mt-2 text-[10px] text-[#86736D]">
          Синхронизация слотов каждые 30 сек.
        </div>
      </div>

      {/* Footer / User profile */}
      <div className="flex items-center justify-between rounded-xl border border-[#E3DED7] bg-white p-2.5 shadow-2xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#8D4933] font-semibold text-white text-xs">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-[#1F1F1E] truncate">
              {adminUsername}
            </div>
            <div className="text-[11px] text-[#686662]">Администратор</div>
          </div>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            title="Выйти из аккаунта"
            className="rounded-lg p-1.5 text-[#86736D] hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
