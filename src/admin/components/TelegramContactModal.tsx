import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface TelegramContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  username?: string;
  clientName?: string;
}

export const TelegramContactModal: React.FC<TelegramContactModalProps> = ({
  isOpen,
  onClose,
  username,
  clientName,
}) => {
  const [message, setMessage] = useState(
    `Здравствуйте, ${clientName || 'гость'}! Ваша запись в салон Lumière Haute Beauté на 15 сентября подтверждена. Ждем вас по адресу: Мирабадский район. При возникновении вопросов ответьте на это сообщение.`
  );
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-[#E3DED7] bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#F0EDEB] pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2AABEE] text-white">
              <Send className="h-3.5 w-3.5" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-[#1F1F1E]">
                Связаться в Telegram
              </h3>
              <p className="text-[11px] text-[#686662]">
                {username || '@sabina_rakhimova'} ({clientName})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#86736D] hover:bg-[#F5F2EB]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {sent ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#5B7A68]/20 text-[#5B7A68]">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="mt-3 text-xs font-bold text-[#1F1F1E]">
              Сообщение успешно отправлено в бот клиента!
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-3 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
                Шаблоны быстрых ответов
              </label>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <button
                  onClick={() =>
                    setMessage(
                      `Здравствуйте, ${clientName}! Ваша запись подтверждена на 14:00. Ждем вас!`
                    )
                  }
                  className="rounded-lg border border-[#E3DED7] bg-[#FAF8F5] px-2.5 py-1 text-[11px] text-[#686662] hover:bg-[#F5F2EB]"
                >
                  ✓ Подтверждение
                </button>
                <button
                  onClick={() =>
                    setMessage(
                      `Здравствуйте, ${clientName}! Напоминаем о визите в салон Lumière через 1 час.`
                    )
                  }
                  className="rounded-lg border border-[#E3DED7] bg-[#FAF8F5] px-2.5 py-1 text-[11px] text-[#686662] hover:bg-[#F5F2EB]"
                >
                  ⏰ Напоминание
                </button>
                <button
                  onClick={() =>
                    setMessage(
                      `Здравствуйте, ${clientName}! К сожалению, выбранный мастер задерживается на 10 минут. Мы предложим вам чашечку кофе.`
                    )
                  }
                  className="rounded-lg border border-[#E3DED7] bg-[#FAF8F5] px-2.5 py-1 text-[11px] text-[#686662] hover:bg-[#F5F2EB]"
                >
                  ☕ Предупреждение
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
                Текст сообщения
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#E3DED7] p-2.5 text-xs text-[#1F1F1E] focus:border-[#8D4933] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-[#F0EDEB] pt-3">
              <button
                onClick={onClose}
                className="rounded-xl border border-[#E3DED7] px-4 py-2 text-xs font-medium text-[#686662] hover:bg-[#FAF8F5]"
              >
                Отмена
              </button>
              <button
                onClick={handleSend}
                className="flex items-center gap-1.5 rounded-xl bg-[#2AABEE] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2297D4]"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Отправить в Telegram</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
