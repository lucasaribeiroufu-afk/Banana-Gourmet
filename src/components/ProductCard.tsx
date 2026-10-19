import React, { useState } from 'react';
import { Heart, ShoppingBag, Check, Star, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (product: Product, selectedWeight: string, unitPrice: number, quantity: number) => void;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onOpenDetail,
}) => {
  const [selectedWeight, setSelectedWeight] = useState<string>(product.weight);
  const [currentPrice, setCurrentPrice] = useState<number>(product.price);
  const [justAdded, setJustAdded] = useState(false);

  const handleWeightSelect = (weight: string, price: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedWeight(weight);
    setCurrentPrice(price);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedWeight, currentPrice, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group bg-white rounded-2xl border border-[#E5DECF] hover:border-[#C7BEAD] hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Visual Header / Image Container (65-70% visual prominence) */}
      <div className="relative aspect-[4/3] w-full bg-[#FAF7F2] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 cursor-pointer ${
            isFavorite
              ? 'bg-[#E54833] text-white'
              : 'bg-white/80 hover:bg-white text-[#4D5A50] hover:text-[#E54833]'
          }`}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Stock / Best Seller Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isBestSeller && (
            <span className="text-[10px] font-black uppercase tracking-wider bg-[#1A472A] text-[#F2B824] px-2 py-0.5 rounded-md shadow-xs">
              Mais Vendido
            </span>
          )}
          {product.category === 'banana_fresca' && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#D99A14] text-white px-2 py-0.5 rounded-md shadow-xs">
              in Natura
            </span>
          )}
        </div>

        {/* Weight pill overlay */}
        <div className="absolute bottom-2.5 left-3">
          <span className="text-xs font-semibold bg-[#1C241E]/80 text-[#FAF7F2] backdrop-blur-xs px-2 py-0.5 rounded font-mono">
            {selectedWeight}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line (Unboxed text with dots) */}
          <div className="flex items-center gap-1.5 text-xs text-[#707E73] mb-1.5 flex-wrap">
            <span className="font-semibold text-[#1A472A]">
              {product.dietary[0] || 'Artesanal'}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 text-[#B87D17]">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-bold tabular-nums">{product.rating}</span>
              <span className="text-[#869589]">({product.reviewCount})</span>
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-base text-[#1C241E] leading-snug line-clamp-2 group-hover:text-[#1A472A] transition-colors">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-[#526055] mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Weight options picker if available */}
          {product.weightOptions && product.weightOptions.length > 1 && (
            <div className="mt-3 pt-2 border-t border-[#F0EAE0]">
              <p className="text-[11px] font-semibold text-[#66756A] mb-1.5">
                Escolha o tamanho:
              </p>
              <div className="flex flex-wrap gap-1">
                {product.weightOptions.map((opt) => (
                  <button
                    key={opt.weight}
                    onClick={(e) => handleWeightSelect(opt.weight, opt.price, e)}
                    className={`px-2 py-1 text-xs rounded-md font-mono font-medium transition-colors cursor-pointer ${
                      selectedWeight === opt.weight
                        ? 'bg-[#1A472A] text-white font-bold'
                        : 'bg-[#F2ECE1] text-[#3E4D42] hover:bg-[#E7DFC0]'
                    }`}
                  >
                    {opt.weight}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 mt-3 border-t border-[#F0EAE0] flex items-center justify-between gap-2">
          <div>
            {product.originalPrice && (
              <span className="block text-[11px] line-through text-[#909E94] font-mono tabular-nums leading-none">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-[#5C6B5F] font-bold">R$</span>
              <span className="text-xl font-black text-[#133821] font-mono tabular-nums">
                {currentPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 ${
              justAdded
                ? 'bg-[#15803D] text-white'
                : 'bg-[#1A472A] hover:bg-[#133821] text-[#FAF7F2]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#F2B824]" />
                <span>Adicionado</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#F2B824]" />
                <span>Adicionar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
