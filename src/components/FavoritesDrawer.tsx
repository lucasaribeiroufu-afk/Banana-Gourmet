import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (product: Product, selectedWeight: string, unitPrice: number, quantity: number) => void;
  onOpenDetail: (product: Product) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onToggleFavorite,
  onAddToCart,
  onOpenDetail,
}) => {
  if (!isOpen) return null;

  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#D5CCBA] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E2D5] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#E54833] fill-current" />
            <h2 className="text-lg font-black text-[#133821] font-heading">
              Meus Favoritos ({favoriteProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#657569] hover:bg-[#EFEAE0] hover:text-[#1F2722] transition-colors cursor-pointer"
            aria-label="Fechar favoritos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {favoriteProducts.length > 0 ? (
            favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D5] group"
              >
                {/* Thumbnail */}
                <div
                  onClick={() => {
                    onOpenDetail(product);
                    onClose();
                  }}
                  className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-[#DDD5C5] shrink-0 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => {
                      onOpenDetail(product);
                      onClose();
                    }}
                    className="text-xs sm:text-sm font-bold text-[#1F2722] truncate cursor-pointer hover:text-[#1A472A]"
                  >
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-[#637267] font-mono">
                    R$ {product.price.toFixed(2).replace('.', ',')} · {product.weight}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onAddToCart(product, product.weight, product.price, 1)}
                      className="px-2.5 py-1 bg-[#1A472A] hover:bg-[#133821] text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3 text-[#F2B824]" />
                      <span>Comprar</span>
                    </button>
                    <button
                      onClick={() => onToggleFavorite(product.id)}
                      className="p-1 text-[#93A297] hover:text-[#E54833] transition-colors cursor-pointer"
                      title="Remover dos favoritos"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF7F2] border border-[#E8E2D5] flex items-center justify-center text-[#B0BDB3] mb-3">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm text-[#1F2722]">
                Sua lista de favoritos está vazia
              </h3>
              <p className="text-xs text-[#6B7B6E] mt-1 max-w-xs mx-auto">
                Clique no coração dos produtos para salvar suas banana chips preferidas para pedir mais tarde.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {favoriteProducts.length > 0 && (
          <div className="p-4 border-t border-[#E8E2D5] bg-[#FAF7F2]">
            <button
              onClick={() => {
                favoriteProducts.forEach((p) => {
                  onAddToCart(p, p.weight, p.price, 1);
                });
                onClose();
              }}
              className="w-full py-3 bg-[#1A472A] hover:bg-[#133821] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#F2B824]" />
              <span>Adicionar Todos os Favoritos ao Carrinho</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
