import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldAlert, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '../../client/components/BrandLogo';

interface AdminLoginScreenProps {
  onSuccess: (username: string, remember: boolean) => void;
  onBackToClient?: () => void;
}

export const AdminLoginScreen: React.FC<AdminLoginScreenProps> = ({
  onSuccess,
  onBackToClient,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedUser = username.trim();

    if (!trimmedUser) {
      setErrorMessage('Пожалуйста, укажите логин');
      return;
    }

    if (password !== '2841') {
      setErrorMessage('Неверный пароль. Доступ ограничен.');
      return;
    }

    // Success animation
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess(trimmedUser, rememberMe);
      }, 500);
    }, 400);
  };

  const handleNavigateToClient = () => {
    if (onBackToClient) {
      onBackToClient();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden selection:bg-[#ffdbd0] selection:text-[#3a0b00]">
      {/* Decorative ambient background accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#B86B53]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#8D4933]/10 blur-3xl pointer-events-none" />

      {/* Top back button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={handleNavigateToClient}
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-[#54433E] bg-white/80 hover:bg-white hover:text-[#1F1F1E] border border-[#E3DED7] shadow-xs backdrop-blur-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#8D4933]" />
          <span>В салон (для гостей)</span>
        </button>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Main Card */}
        <div className="bg-white/95 rounded-3xl border border-[#E3DED7] shadow-[0_12px_40px_rgba(40,25,20,0.06)] p-7 sm:p-9 backdrop-blur-md transition-all">
          {/* Brand Header */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#FAF8F5] border border-[#E3DED7] shadow-xs mb-3.5">
              <BrandLogo variant="emblem" className="w-10 h-12" strokeColor="#8D4933" />
            </div>
            
            <h1 className="font-display text-2xl font-normal tracking-tight text-[#1F1F1E]">
              Lumière
            </h1>
            <p className="font-display text-[10px] uppercase tracking-[0.25em] text-[#86736D] mt-0.5">
              HAUTE BEAUTÉ
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-[#F5F2EB] text-[#8D4933] text-[11px] font-semibold tracking-wide">
              <Lock className="w-3 h-3" />
              <span>Панель управления CRM</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50/90 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 animate-shake">
                <ShieldAlert className="w-4 h-4 flex-shrink-0 text-red-600" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Login field */}
            <div>
              <label className="block text-xs font-semibold text-[#54433E] mb-1.5">
                Логин администратора
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86736D]">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="admin"
                  autoFocus
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] hover:bg-white focus:bg-white text-sm text-[#1F1F1E] placeholder:text-[#A89C97] border border-[#E3DED7] focus:border-[#8D4933] rounded-xl outline-none transition-all shadow-2xs focus:ring-2 focus:ring-[#8D4933]/15 font-manrope"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#54433E]">
                  Пароль доступа
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86736D]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="••••"
                  required
                  className="w-full pl-10 pr-11 py-2.5 bg-[#FAF8F5] hover:bg-white focus:bg-white text-sm text-[#1F1F1E] placeholder:text-[#A89C97] border border-[#E3DED7] focus:border-[#8D4933] rounded-xl outline-none transition-all shadow-2xs focus:ring-2 focus:ring-[#8D4933]/15 font-manrope tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#86736D] hover:text-[#1F1F1E] transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#D9C1BB] text-[#8D4933] focus:ring-[#8D4933]/30 accent-[#8D4933] cursor-pointer"
                />
                <span className="text-xs text-[#686662]">Запомнить меня на этом устройстве</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className={`w-full py-3 px-4 rounded-xl text-sm font-semibold text-white shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isSuccess
                  ? 'bg-[#5B7A68] hover:bg-[#5B7A68]'
                  : 'bg-[#8D4933] hover:bg-[#733723] active:scale-[0.99]'
              }`}
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 animate-bounce" />
                  <span>Доступ разрешён...</span>
                </>
              ) : isLoading ? (
                <span>Проверка...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Войти в систему</span>
                </>
              )}
            </button>
          </form>

          {/* Salon security note */}
          <div className="mt-6 pt-5 border-t border-[#F0EDEB] text-center">
            <p className="text-[11px] text-[#86736D]">
              Вход защищён служебным паролем салона. При утере обратитесь к старшему администратору.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
