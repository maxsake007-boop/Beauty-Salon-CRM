import React, { useState } from 'react';
import { X, Plus, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ServiceItem } from '../types';

interface NewServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddService: (newService: ServiceItem) => void;
}

export const NewServiceModal: React.FC<NewServiceModalProps> = ({
  isOpen,
  onClose,
  onAddService,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Фирменные');
  const [duration, setDuration] = useState(60);
  const [price, setPrice] = useState(90000);
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=600&q=80'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const service: ServiceItem = {
      id: `srv-${Date.now()}`,
      name,
      category,
      duration,
      price,
      isActive: true,
      isHit: false,
      note,
      description,
      imageUrl,
      bufferMinutes: 15,
    };
    onAddService(service);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-[#E3DED7] bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#F0EDEB] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#8D4933]" />
            <h3 className="font-display text-lg font-bold text-[#1F1F1E]">
              Добавить новую услугу
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#86736D] hover:bg-[#F5F2EB] hover:text-[#1F1F1E]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
              Название услуги
            </label>
            <input
              type="text"
              required
              placeholder="например, Спа-уход для рук с маслом розы"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E3DED7] p-2.5 text-xs text-[#1F1F1E] focus:border-[#8D4933] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
                Категория
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#E3DED7] p-2.5 text-xs text-[#1F1F1E]"
              >
                <option value="Фирменные">Фирменные</option>
                <option value="Ногтевой сервис">Ногтевой сервис</option>
                <option value="Подология и спа">Подология и спа</option>
                <option value="Премиум уход">Премиум уход</option>
                <option value="Экспресс">Экспресс</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
                Цена (сум)
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-[#E3DED7] p-2.5 text-xs font-bold text-[#1F1F1E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
                Длительность (мин)
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-[#E3DED7] p-2.5 text-xs text-[#1F1F1E]"
              >
                <option value={30}>30 минут</option>
                <option value={45}>45 минут</option>
                <option value={60}>60 минут</option>
                <option value={90}>90 минут</option>
                <option value={120}>120 минут</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
                Особенность / Пометка
              </label>
              <input
                type="text"
                placeholder="(в 4 руки, спа-уход)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#E3DED7] p-2.5 text-xs text-[#1F1F1E]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
              URL Изображения
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E3DED7] p-2.5 text-xs text-[#1F1F1E]"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#86736D] text-[11px]">
              Описание для Telegram Mini App
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Опишите протокол процедуры и используемую косметику..."
              className="mt-1 w-full rounded-xl border border-[#E3DED7] p-2.5 text-xs text-[#1F1F1E]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-[#F0EDEB] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#E3DED7] px-4 py-2 text-xs font-medium text-[#686662] hover:bg-[#FAF8F5]"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-[#8D4933] px-5 py-2 text-xs font-semibold text-white hover:bg-[#733420]"
            >
              <Plus className="h-4 w-4" />
              <span>Создать услугу</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
