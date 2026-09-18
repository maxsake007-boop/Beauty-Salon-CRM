import React from 'react';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const ToastNotification: React.FC<ToastProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[85%] px-3 py-1.5 bg-[#1c1c1b] text-white rounded-full shadow-lg flex items-center gap-1.5 text-[10.5px] font-manrope animate-fadeIn">
      <span className="material-symbols-outlined text-[13px] text-[#ffb59e]">info</span>
      <span className="truncate">{message}</span>
      <button
        onClick={onDismiss}
        className="ml-0.5 text-[#d9c1bb] hover:text-white"
      >
        <span className="material-symbols-outlined text-[12px]">close</span>
      </button>
    </div>
  );
};
