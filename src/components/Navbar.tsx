import React from 'react';
import { ShoppingBag, Heart, History, Bell, Search } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenOrderHistory: () => void;
  onOpenNotifications: () => void;
  onScrollTo: (id: string) => void;
  unreadNotifications: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  favoritesCount,
  onOpenCart,
  onOpenFavorites,
  onOpenOrderHistory,
  onOpenNotifications,
  onScrollTo,
  unreadNotifications,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onScrollTo('hero')}
            className="flex items-center gap-2 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#1A472A] flex items-center justify-center text-[#F2B824] shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-xl select-none" role="img" aria-label="Peniel Banana">🍌</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1A472A] font-heading flex items-center gap-1">
                Peniel <span className="text-[#D99A14] font-medium text-lg font-sans">CHIPS</span>
              </span>
              <p className="text-[10px] text-[#606E64] font-medium tracking-wide -mt-1 hidden sm:block">
                Salgada na medida certa
              </p>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#404D43]">
          <button
            onClick={() => onScrollTo('valores')}
            className="hover:text-[#1A472A] transition-colors cursor-pointer"
          >
            Tabela de Valores
          </button>
          <button
            onClick={() => onScrollTo('catalogo')}
            className="hover:text-[#1A472A] transition-colors cursor-pointer"
          >
            Catálogo & Sabores
          </button>
          <button
            onClick={() => onScrollTo('harmonizacoes')}
            className="hover:text-[#1A472A] transition-colors cursor-pointer"
          >
            Harmonizações & Drinks
          </button>
          <button
            onClick={() => onScrollTo('receitas')}
            className="hover:text-[#1A472A] transition-colors cursor-pointer"
          >
            Receitas Rápidas
          </button>
          <button
            onClick={() => onScrollTo('sobre')}
            className="hover:text-[#1A472A] transition-colors cursor-pointer"
          >
            Sobre a Peniel
          </button>
        </nav>

        {/* Zone 3: Actions (Notifications, Favorites, History, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-[#404D43] hover:text-[#1A472A] hover:bg-[#EFEAE0] rounded-full transition-colors cursor-pointer"
            title="Avisos e Ofertas"
            aria-label="Ver avisos e notificações"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E54833] rounded-full ring-2 ring-[#FAF7F2]" />
            )}
          </button>

          {/* Favorites */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 text-[#404D43] hover:text-[#1A472A] hover:bg-[#EFEAE0] rounded-full transition-colors cursor-pointer"
            title="Meus Favoritos"
            aria-label="Ver itens favoritos"
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1A472A] text-[#FAF7F2] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Order History */}
          <button
            onClick={onOpenOrderHistory}
            className="p-2 text-[#404D43] hover:text-[#1A472A] hover:bg-[#EFEAE0] rounded-full transition-colors cursor-pointer"
            title="Meus Pedidos & Compras Recorrentes"
            aria-label="Ver histórico de compras"
          >
            <History className="w-5 h-5" />
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 bg-[#1A472A] hover:bg-[#133821] text-[#FAF7F2] px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer ml-1"
            aria-label="Abrir carrinho de compras"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-[#F2B824]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E54833] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-mono tabular-nums">
              R$ {cartTotal.toFixed(2).replace('.', ',')}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
