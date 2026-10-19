import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Heart, Wine, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedWeight: string, unitPrice: number, quantity: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!product) return null;

  const [selectedWeight, setSelectedWeight] = useState<string>(product.weight);
  const [currentPrice, setCurrentPrice] = useState<number>(product.price);
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const handleWeightChange = (weight: string, price: number) => {
    setSelectedWeight(weight);
    setCurrentPrice(price);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedWeight, currentPrice, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D5CCBA] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-[#4A574E] p-2 rounded-full shadow-sm hover:scale-105 transition-all cursor-pointer"
          aria-label="Fechar detalhes"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image & Badges */}
          <div className="p-6 bg-[#FAF7F2] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EFEAE0]">
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-white border border-[#E8E2D5] shadow-xs">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => onToggleFavorite(product.id)}
                className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                  isFavorite ? 'bg-[#E54833] text-white' : 'bg-white/80 text-[#3C4A3F] hover:bg-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Quick Badges */}
            <div className="mt-4 pt-4 border-t border-[#E8E2D5] flex flex-wrap gap-1.5">
              {product.dietary.map((d) => (
                <span
                  key={d}
                  className="text-[11px] font-semibold bg-white text-[#1A472A] border border-[#DDD5C5] px-2.5 py-1 rounded-lg"
                >
                  ✓ {d}
                </span>
              ))}
            </div>

            {/* Nutritional facts if available */}
            {product.nutritionalSummary && (
              <div className="mt-4 p-3 bg-white rounded-xl border border-[#E8E2D5] text-[11px]">
                <span className="font-bold text-[#1A472A] uppercase tracking-wider block mb-1">
                  Informação Nutricional:
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-[#556458]">
                  <div>
                    <span className="block text-[#92A095]">Calorias</span>
                    <strong className="text-[#1F2722]">{product.nutritionalSummary.calorias}</strong>
                  </div>
                  <div>
                    <span className="block text-[#92A095]">Carbos</span>
                    <strong className="text-[#1F2722]">{product.nutritionalSummary.carboidratos}</strong>
                  </div>
                  <div>
                    <span className="block text-[#92A095]">Sódio</span>
                    <strong className="text-[#1F2722]">{product.nutritionalSummary.sodio}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-[#B87D17]">
                  {product.stockStatus}
                </span>
                <div className="flex items-center gap-1 text-[#B87D17]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold font-mono">{product.rating}</span>
                  <span className="text-[#88978B]">({product.reviewCount} avaliações)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-black text-[#133821] font-heading leading-tight">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#46544A] leading-relaxed">
                {product.description}
              </p>

              {/* Pairing Tip Box */}
              <div className="p-3 bg-[#F4EFE6] rounded-xl border border-[#E5DECF] text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#1A472A]">
                  <Wine className="w-3.5 h-3.5 text-[#F2B824]" />
                  <span>Dica de Harmonização do Sommelier:</span>
                </div>
                <p className="text-[#4E5C51] leading-relaxed">
                  {product.pairingNotes}
                </p>
              </div>

              {/* Weight Selector */}
              {product.weightOptions && product.weightOptions.length > 1 && (
                <div className="pt-2">
                  <label className="block text-xs font-bold text-[#3B483F] mb-1.5">
                    Selecione a embalagem desejada:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.weightOptions.map((opt) => (
                      <button
                        key={opt.weight}
                        onClick={() => handleWeightChange(opt.weight, opt.price)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedWeight === opt.weight
                            ? 'bg-[#1A472A] text-white border-[#1A472A] shadow-xs'
                            : 'bg-white text-[#2B362F] border-[#DCD3C3] hover:border-[#1A472A]'
                        }`}
                      >
                        <span className="block text-xs font-bold">{opt.weight}</span>
                        <span className="text-[11px] font-mono tabular-nums opacity-90">
                          R$ {opt.price.toFixed(2).replace('.', ',')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price & Purchase Bar */}
            <div className="pt-4 border-t border-[#EFEAE0] space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#738276] block">Total do item</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-[#1A472A]">R$</span>
                    <span className="text-3xl font-black text-[#133821] font-mono tabular-nums">
                      {(currentPrice * quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center bg-[#FAF7F2] border border-[#DDD5C5] rounded-xl p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center font-bold text-[#3E4C41] hover:bg-white rounded-lg cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-bold font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center font-bold text-[#3E4C41] hover:bg-white rounded-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 ${
                  justAdded
                    ? 'bg-[#15803D] text-white'
                    : 'bg-[#1A472A] hover:bg-[#133821] text-[#FAF7F2]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-5 h-5 text-[#F2B824]" />
                    <span>Adicionado ao Carrinho!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-[#F2B824]" />
                    <span>Adicionar ao Carrinho</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
