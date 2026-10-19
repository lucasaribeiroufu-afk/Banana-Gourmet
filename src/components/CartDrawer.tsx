import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus, Tag, Check, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, selectedWeight: string, newQty: number) => void;
  onRemoveItem: (productId: string, selectedWeight: string) => void;
  onClearCart: () => void;
  couponCode: string;
  onApplyCoupon: (code: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  couponCode,
  onApplyCoupon,
  onProceedToCheckout,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  
  // Discount
  let discountPercent = 0;
  if (couponCode.toUpperCase() === 'PRIMEIRACOMPRA' || couponCode.toUpperCase() === 'PENIEL10') {
    discountPercent = 0.10;
  } else if (couponCode.toUpperCase() === 'CROCANTE15') {
    discountPercent = 0.15;
  }
  const discountAmount = subtotal * discountPercent;

  // Free shipping over R$ 99
  const freeShippingThreshold = 99.0;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const isFreeShipping = subtotal >= freeShippingThreshold;

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'PRIMEIRACOMPRA' || code === 'PENIEL10' || code === 'CROCANTE15') {
      onApplyCoupon(code);
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Cupom inválido. Experimente PRIMEIRACOMPRA');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#D5CCBA] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E2D5] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1A472A]" />
            <h2 className="text-lg font-black text-[#133821] font-heading">
              Seu Carrinho ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#657569] hover:bg-[#EFEAE0] hover:text-[#1F2722] transition-colors cursor-pointer"
            aria-label="Fechar carrinho"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#F5F1E8] px-5 py-3 border-b border-[#E5DECF]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1.5 font-bold text-[#1A472A]">
              <Truck className="w-4 h-4 text-[#F2B824]" />
              {isFreeShipping ? '🎉 Parabéns! Você ganhou Frete Grátis!' : 'Frete Grátis acima de R$ 99'}
            </span>
            {!isFreeShipping && (
              <span className="font-mono text-[#8C6D1F] font-bold">
                Falta R$ {remainingForFreeShipping.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
          <div className="w-full bg-[#E5DECF] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#1A472A] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedWeight}-${idx}`}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D5]"
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-[#DDD5C5] shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1F2722] truncate">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-[#637267]">
                    <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#E5DECF]">
                      {item.selectedWeight}
                    </span>
                    <span className="font-mono tabular-nums font-bold text-[#1A472A]">
                      R$ {item.unitPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#EBE4D6]">
                    <div className="flex items-center bg-white border border-[#D5CCBA] rounded-lg p-0.5">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.selectedWeight, item.quantity - 1)
                        }
                        className="w-6 h-6 flex items-center justify-center text-[#4C5B50] hover:bg-[#F3EFE6] rounded cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.selectedWeight, item.quantity + 1)
                        }
                        className="w-6 h-6 flex items-center justify-center text-[#4C5B50] hover:bg-[#F3EFE6] rounded cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#133821]">
                        R$ {(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedWeight)}
                        className="p-1 text-[#93A297] hover:text-[#E54833] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF7F2] border border-[#E8E2D5] flex items-center justify-center text-[#B0BDB3] mb-3">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm text-[#1F2722]">
                Seu carrinho está vazio
              </h3>
              <p className="text-xs text-[#6B7B6E] mt-1 max-w-xs mx-auto">
                Adicione banana chips artesanais da nossa tabela de valores oficial ou catálogo para saborear!
              </p>
            </div>
          )}
        </div>

        {/* Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E8E2D5] bg-[#FAF7F2] space-y-4">
            {/* Coupon input */}
            <form onSubmit={handleApplyCouponSubmit} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#86978B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cupom (ex: PRIMEIRACOMPRA)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-white border border-[#DDD5C5] rounded-xl text-xs uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-[#1A472A]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#FAF7F2] hover:bg-[#1A472A] hover:text-white text-[#1A472A] border border-[#DDD5C5] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </div>

              {couponError && (
                <p className="text-[11px] text-[#C93B2B]">{couponError}</p>
              )}

              {couponCode && (
                <div className="flex items-center justify-between text-xs text-[#15803D] font-bold bg-[#EBF7EE] p-1.5 rounded-lg">
                  <span>✓ Cupom {couponCode} ativado ({discountPercent * 100}% OFF)</span>
                  <button
                    type="button"
                    onClick={() => onApplyCoupon('')}
                    className="text-[#88978A] hover:text-[#C93B2B]"
                  >
                    ×
                  </button>
                </div>
              )}
            </form>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-[#526256]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">
                  R$ {subtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#15803D] font-semibold">
                  <span>Desconto ({couponCode})</span>
                  <span className="font-mono tabular-nums">
                    - R$ {discountAmount.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Frete</span>
                <span className="font-mono font-semibold text-[#1A472A]">
                  {isFreeShipping ? 'GRÁTIS' : 'Calculado no checkout'}
                </span>
              </div>

              <div className="pt-2 border-t border-[#E5DECF] flex justify-between items-baseline text-sm font-bold text-[#133821]">
                <span>Total Estimado</span>
                <span className="text-xl font-black font-mono tabular-nums text-[#1A472A]">
                  R$ {(subtotal - discountAmount).toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#1A472A] hover:bg-[#133821] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>Ir Para o Pagamento Seguro</span>
              <ArrowRight className="w-4 h-4 text-[#F2B824]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
