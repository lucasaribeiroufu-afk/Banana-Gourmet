import React, { useState } from 'react';
import { Wine, Beer, GlassWater, Coffee, Star, Quote, ArrowRight, ShoppingBag } from 'lucide-react';
import { PAIRING_GUIDES, TESTIMONIALS } from '../data/pairings';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface PairingSectionProps {
  onAddToCart: (product: Product, selectedWeight: string, unitPrice: number, quantity: number) => void;
}

export const PairingSection: React.FC<PairingSectionProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Cervejas', 'Vinhos & Espumantes', 'Drinks & Coquetéis', 'Sucos & Não Alcoólicos'];

  const filteredGuides = selectedCategory === 'Todas'
    ? PAIRING_GUIDES
    : PAIRING_GUIDES.filter(g => g.category === selectedCategory);

  const handleAddRecommended = (chipsId: string) => {
    const product = PRODUCTS.find(p => p.id === chipsId) || PRODUCTS[0];
    onAddToCart(product, product.weight, product.price, 1);
  };

  return (
    <section id="harmonizacoes" className="py-20 bg-[#F4EFE6] border-y border-[#E2DBD0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1A472A] uppercase tracking-wider mb-2">
            <Wine className="w-4 h-4 text-[#B87D17]" />
            <span>Guia Gastronômico do Sommelier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#133821] tracking-tight font-heading">
            A Crocância Perfeita Para Cada Brinde
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#46544A] leading-relaxed">
            Mais do que um lanche rápido: a banana chips Peniel é um elemento coringa na alta gastronomia de boteco e bistrôs. Veja como harmonizar com vinhos finos, chopes artesanais, drinks autorais e sucos naturais.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1A472A] text-white shadow-sm'
                    : 'bg-white text-[#4A574E] hover:bg-[#EAE4D7] border border-[#DDD5C5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pairing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-2xl p-6 border border-[#DDD5C5] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#7B8B80] mb-3">
                  <span className="font-semibold text-[#8C6D1F] uppercase tracking-wider">
                    {guide.category}
                  </span>
                  <span>{guide.temperature}</span>
                </div>

                <h3 className="text-lg font-black text-[#1F2722] font-heading mb-2">
                  {guide.drink}
                </h3>

                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EBE4D6] mb-3">
                  <span className="text-[11px] text-[#69786E] block font-medium">
                    Chips Recomendado:
                  </span>
                  <strong className="text-xs text-[#1A472A] font-bold block">
                    {guide.recommendedChips}
                  </strong>
                </div>

                <p className="text-xs text-[#4C5B50] italic leading-relaxed mb-4">
                  "{guide.sommelierQuote}"
                </p>

                <div className="text-[11px] text-[#2C3830] font-medium bg-[#F5F1E8] px-2.5 py-1.5 rounded-lg">
                  ⚖️ <strong>Equilíbrio:</strong> {guide.flavorBalance}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#EFEAE0]">
                <button
                  onClick={() => handleAddRecommended(guide.chipsId)}
                  className="w-full py-2.5 px-3 bg-[#FAF7F2] hover:bg-[#1A472A] hover:text-white text-[#1A472A] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-[#DDD5C5] hover:border-[#1A472A] cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Comprar Chips da Combinação</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Banner & Customer Quotes */}
        <div className="mt-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#8C6D1F] uppercase tracking-wider block mb-1">
              Avaliações Reais de Degustação
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#133821] font-heading">
              O Que Dizem Quem Já Harmonizou
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl p-5 border border-[#E5DECF] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#F2B824] mb-3">
                    {[...Array(test.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs text-[#3E4C41] leading-relaxed mb-4">
                    "{test.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EAE0]">
                  <p className="text-xs font-bold text-[#1F2722]">{test.author}</p>
                  <p className="text-[11px] text-[#69786E]">{test.role}</p>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-[#8C6D1F] font-medium">
                    <span>{test.drinkPairing}</span>
                    <span className="text-[#96A69B]">{test.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
