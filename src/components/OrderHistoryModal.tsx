import React from 'react';
import { X, History, RotateCcw, PackageCheck, Truck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Order, CartItem } from '../types';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onRepeatOrder: (items: CartItem[]) => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onRepeatOrder,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#D5CCBA] p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#DDD5C5] flex items-center justify-center text-[#1A472A]">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#133821] font-heading">
                Histórico de Pedidos
              </h2>
              <p className="text-xs text-[#637367]">
                Acompanhe o status e repita seus pedidos favoritos com 1 clique
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#657569] hover:bg-[#EFEAE0] hover:text-[#1F2722] transition-colors cursor-pointer"
            aria-label="Fechar histórico"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders List */}
        <div className="mt-6 space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#E5DECF] space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#EBE4D6]">
                  <div>
                    <span className="font-mono font-bold text-sm text-[#1A472A]">
                      Pedido #{order.id}
                    </span>
                    <span className="text-xs text-[#7B8B7F] block">
                      Realizado em {order.date}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E6F4EA] text-[#137333] border border-[#C6ECCB]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{order.status}</span>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs text-[#2A372E]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1A472A] font-mono">
                          {item.quantity}x
                        </span>
                        <span>{item.product.name} ({item.selectedWeight})</span>
                      </div>
                      <span className="font-mono tabular-nums text-[#67776B]">
                        R$ {(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tracking & Pricing breakdown */}
                <div className="pt-3 border-t border-[#EBE4D6] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-[#5F6E62]">
                    <Truck className="w-3.5 h-3.5 text-[#1A472A]" />
                    <span>Rastreio: <strong className="font-mono text-[#1F2722]">{order.trackingCode}</strong></span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-[#697A6D] block leading-none">Total pago</span>
                    <span className="text-base font-black text-[#133821] font-mono tabular-nums">
                      R$ {order.total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Reorder Button (Compras Recorrentes) */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onRepeatOrder(order.items);
                      onClose();
                    }}
                    className="w-full py-2.5 px-4 bg-[#1A472A] hover:bg-[#133821] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-xs cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#F2B824]" />
                    <span>Repetir Este Pedido Agora (Recarregar Carrinho)</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-xs text-[#6B7B6E]">Nenhum pedido anterior registrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
