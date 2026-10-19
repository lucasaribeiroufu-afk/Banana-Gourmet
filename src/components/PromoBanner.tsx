import React, { useState } from 'react';
import { Sparkles, Truck, Bell, X, ShieldCheck } from 'lucide-react';

interface PromoBannerProps {
  onOpenNotifications: () => void;
  onApplyCoupon: (code: string) => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onOpenNotifications, onApplyCoupon }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#1A472A] text-[#FAF7F2] text-xs font-medium py-2 px-4 border-b border-[#235D38] relative z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left message */}
        <div className="flex items-center gap-2 overflow-hidden">
          <Truck className="w-4 h-4 text-[#F2B824] shrink-0" />
          <span className="truncate">
            <strong className="text-[#F2B824]">Frete Grátis</strong> para pedidos a partir de R$ 99 · Enviamos para todo o Brasil
          </span>
        </div>

        {/* Center coupon prompt */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-[#F2B824]" />
          <span>Use o cupom</span>
          <button
            onClick={() => onApplyCoupon('PRIMEIRACOMPRA')}
            className="bg-[#245D39] hover:bg-[#2D7347] text-[#F2B824] px-2 py-0.5 rounded font-mono font-bold tracking-wider transition-colors cursor-pointer"
            title="Clique para aplicar 10% OFF"
          >
            PRIMEIRACOMPRA
          </button>
          <span>para 10% OFF</span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenNotifications}
            className="flex items-center gap-1.5 text-xs text-[#E1DCD3] hover:text-[#F2B824] transition-colors cursor-pointer"
            title="Alertas de novas fornadas e promoções"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Alertas de Fornada</span>
          </button>
          
          <button
            onClick={() => setDismissed(true)}
            className="text-[#9EBAA4] hover:text-white transition-colors p-0.5 cursor-pointer"
            aria-label="Fechar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
