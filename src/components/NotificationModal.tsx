import React, { useState } from 'react';
import { X, Bell, BellRing, Sparkles, Check, Flame, Truck, Wine } from 'lucide-react';
import { PushNotificationItem } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (code: string) => void;
  onScrollTo: (id: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onApplyCoupon,
  onScrollTo,
}) => {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [permissionState, setPermissionState] = useState<'idle' | 'granted' | 'simulated'>('idle');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [notifications, setNotifications] = useState<PushNotificationItem[]>([
    {
      id: 'notif-1',
      title: '🎟️ Cupom Exclusivo: 10% OFF',
      message: 'Aproveite seu desconto de boas-vindas com o cupom PRIMEIRACOMPRA ou BEMVINDO10.',
      time: 'Agora mesmo',
      read: false,
      type: 'promo',
      badge: 'CUPOM'
    },
    {
      id: 'notif-2',
      title: '🔥 Nova Fornada Fresca Disponível!',
      message: 'Lote recém fatiado e embalado de Banana Chips Salgada (50g, 115g, 500g e 1kg).',
      time: 'Há 25 minutos',
      read: false,
      type: 'news',
      badge: 'FORNADA'
    },
    {
      id: 'notif-3',
      title: '📦 Frete Grátis Ativo!',
      message: 'Em compras a partir de R$ 99,00 o frete é por nossa conta para todo o Brasil.',
      time: 'Hoje cedo',
      read: true,
      type: 'promo'
    },
    {
      id: 'notif-4',
      title: '🍷 Dica Gastronômica do Sommelier',
      message: 'Descubra a combinação perfeita de Sauvignon Blanc com o chips de Lemon Pepper.',
      time: 'Ontem',
      read: true,
      type: 'recipe'
    }
  ]);

  if (!isOpen) return null;

  const handleEnablePush = async () => {
    if ('Notification' in window) {
      try {
        const result = await Notification.requestPermission();
        if (result === 'granted') {
          setPermissionState('granted');
          setPushEnabled(true);
          new Notification('Peniel Chips Ativada!', {
            body: 'Você receberá alertas de fornadas quentinhas e cupons em primeira mão.',
            icon: '/src/assets/images/product_chips_salgada_1790886547629.jpg'
          });
          showToast('Notificações nativas do navegador ativadas com sucesso!');
          return;
        }
      } catch (e) {
        console.warn('Native notification failed, using simulated push', e);
      }
    }
    
    // Fallback simulated push
    setPermissionState('simulated');
    setPushEnabled(true);
    showToast('Notificações de ofertas exclusivas ativadas no seu dispositivo!');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAction = (notif: PushNotificationItem) => {
    if (notif.type === 'promo') {
      onApplyCoupon('PRIMEIRACOMPRA');
      showToast('Cupom PRIMEIRACOMPRA aplicado ao seu carrinho!');
    } else if (notif.type === 'news') {
      onScrollTo('valores');
      onClose();
    } else if (notif.type === 'recipe') {
      onScrollTo('harmonizacoes');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#D5CCBA] p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast alert */}
        {toastMessage && (
          <div className="absolute top-3 left-4 right-4 bg-[#1A472A] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top duration-200 z-30">
            <Check className="w-4 h-4 text-[#F2B824]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#DDD5C5] flex items-center justify-center text-[#1A472A]">
              <BellRing className="w-5 h-5 text-[#B87D17]" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#133821] font-heading">
                Central de Notificações
              </h2>
              <p className="text-xs text-[#637367]">
                Ofertas exclusivas e avisos de novas fornadas Peniel
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#657569] hover:bg-[#EFEAE0] hover:text-[#1F2722] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Push Notification Opt-In Card */}
        <div className="mt-5 p-4 rounded-2xl bg-[#F4EFE6] border border-[#E5DECF] space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#1A472A] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B87D17]" />
                Notificações Push no Navegador
              </span>
              <p className="text-xs text-[#526055] mt-1 leading-relaxed">
                Seja o primeiro a saber quando sair uma nova fornada artesanal e receba cupons relâmpago de até 20% OFF.
              </p>
            </div>

            <button
              onClick={handleEnablePush}
              disabled={pushEnabled}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                pushEnabled
                  ? 'bg-[#15803D] text-white cursor-default'
                  : 'bg-[#1A472A] hover:bg-[#133821] text-white shadow-xs'
              }`}
            >
              {pushEnabled ? 'Ativadas ✓' : 'Ativar Push'}
            </button>
          </div>
        </div>

        {/* Notifications Feed */}
        <div className="mt-5 space-y-3">
          <span className="text-[11px] font-bold text-[#728376] uppercase tracking-wider block">
            Avisos Recentes
          </span>

          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleAction(notif)}
              className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D5] hover:border-[#1A472A] transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-xs sm:text-sm font-bold text-[#1F2722] group-hover:text-[#1A472A] transition-colors">
                  {notif.title}
                </h4>
                <span className="text-[10px] text-[#86978A] shrink-0">
                  {notif.time}
                </span>
              </div>

              <p className="text-xs text-[#526055] leading-relaxed">
                {notif.message}
              </p>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#1A472A] group-hover:underline">
                  {notif.type === 'promo' ? 'Aplicar cupom no carrinho →' : 'Ver novidade →'}
                </span>
                {notif.badge && (
                  <span className="text-[9px] font-black uppercase bg-[#F2B824] text-[#1A472A] px-1.5 py-0.5 rounded">
                    {notif.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#E8E2D5] text-center">
          <p className="text-[11px] text-[#78897C]">
            Você pode desativar as notificações a qualquer momento no seu navegador.
          </p>
        </div>
      </div>
    </div>
  );
};
