import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: Product, selectedWeight: string, unitPrice: number, quantity: number) => void;
  onOpenDetail: (product: Product) => void;
}

type FlavorFilter = 'todos' | 'salgado' | 'citrico' | 'picante_defumado' | 'doce' | 'combo' | 'banana_fresca';
type OccasionFilter = 'todas' | 'cerveja' | 'vinho' | 'lanche' | 'festa';

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  favorites,
  onToggleFavorite,
  onAddToCart,
  onOpenDetail,
}) => {
  const [flavorFilter, setFlavorFilter] = useState<FlavorFilter>('todos');
  const [occasionFilter, setOccasionFilter] = useState<OccasionFilter>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesPairing = p.pairingNotes.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesPairing) return false;
      }

      // Flavor profile filter
      if (flavorFilter !== 'todos') {
        if (flavorFilter === 'combo') {
          if (p.category !== 'combo') return false;
        } else if (flavorFilter === 'banana_fresca') {
          if (p.category !== 'banana_fresca') return false;
        } else {
          if (p.flavorProfile !== flavorFilter) return false;
        }
      }

      // Occasion filter
      if (occasionFilter !== 'todas') {
        if (p.occasion !== 'todas' && p.occasion !== occasionFilter) {
          return false;
        }
      }

      return true;
    });
  }, [products, flavorFilter, occasionFilter, searchQuery]);

  return (
    <section id="catalogo" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Kicker */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-[#1A472A] uppercase tracking-wider block mb-1">
            🌿 Linha Completa Artesanal
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#133821] tracking-tight font-heading">
            Catálogo & Sabores Peniel
          </h2>
          <p className="text-sm text-[#4E5E52] mt-1 max-w-xl">
            Descubra as diferentes intensidades da nossa banana chips e bananas selecionadas in natura para sua mesa.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#8C9C90] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por sabor, ocasião, chopp..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#DDD5C5] rounded-xl text-xs sm:text-sm text-[#1F2722] placeholder:text-[#9AA89D] focus:outline-none focus:ring-2 focus:ring-[#1A472A]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C9C90] hover:text-[#1F2722] p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Intelligent Taste Profile Filter Bar */}
      <div className="space-y-3 mb-8 bg-white p-4 sm:p-5 rounded-2xl border border-[#E5DECF] shadow-xs">
        
        {/* Flavor Profile Tabs */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#56655A] uppercase tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#1A472A]" />
            <span>Perfil de Sabor:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'todos', label: 'Todos os Sabores' },
              { id: 'salgado', label: '🧂 Salgada Tradicional' },
              { id: 'citrico', label: '🍋 Lemon Pepper' },
              { id: 'picante_defumado', label: '🌶️ Páprica Defumada' },
              { id: 'doce', label: '🍂 Canela & Demerara' },
              { id: 'combo', label: '🎁 Kits & Combos' },
              { id: 'banana_fresca', label: '🍌 Bananas in Natura' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFlavorFilter(tab.id as FlavorFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  flavorFilter === tab.id
                    ? 'bg-[#1A472A] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#48564D] hover:bg-[#EFEAE0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Occasion Quick Filter */}
        <div className="pt-3 border-t border-[#F0EAE0] flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#66756A] mr-1">
            Momento ideal:
          </span>
          {[
            { id: 'todas', label: 'Todas as Ocasiões' },
            { id: 'cerveja', label: '🍺 Cervejas & Happy Hour' },
            { id: 'vinho', label: '🍷 Vinhos & Queijos' },
            { id: 'lanche', label: '🎒 Lanches Saudáveis' },
            { id: 'festa', label: '🎉 Festas & Eventos' },
          ].map((occ) => (
            <button
              key={occ.id}
              onClick={() => setOccasionFilter(occ.id as OccasionFilter)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                occasionFilter === occ.id
                  ? 'bg-[#F2B824] text-[#1A472A] font-bold'
                  : 'bg-[#F5F1E8] text-[#556358] hover:text-[#1A472A]'
              }`}
            >
              {occ.label}
            </button>
          ))}
        </div>

      </div>

      {/* Products Counter & Clear Filter Helper */}
      <div className="flex items-center justify-between text-xs text-[#6B796F] mb-6">
        <span>
          Exibindo <strong className="text-[#133821] font-mono tabular-nums">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'item' : 'itens'}
        </span>
        {(flavorFilter !== 'todos' || occasionFilter !== 'todas' || searchQuery) && (
          <button
            onClick={() => {
              setFlavorFilter('todos');
              setOccasionFilter('todas');
              setSearchQuery('');
            }}
            className="text-[#1A472A] hover:underline font-semibold cursor-pointer"
          >
            Limpar filtros ativos
          </button>
        )}
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#DDD5C5] p-8">
          <p className="text-3xl mb-2">🍌🔍</p>
          <h3 className="text-lg font-bold text-[#1F2722]">Nenhum item encontrado</h3>
          <p className="text-xs text-[#606E64] mt-1 max-w-sm mx-auto">
            Não encontramos produtos com os filtros selecionados. Tente mudar o perfil de sabor ou termo de busca.
          </p>
          <button
            onClick={() => {
              setFlavorFilter('todos');
              setOccasionFilter('todas');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-[#1A472A] text-white rounded-xl text-xs font-bold hover:bg-[#133821] cursor-pointer"
          >
            Ver Todos os Produtos
          </button>
        </div>
      )}
    </section>
  );
};
