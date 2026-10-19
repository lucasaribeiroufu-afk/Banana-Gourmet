import React, { useState } from 'react';
import { ShoppingBag, Check, Sparkles, Plus, Minus, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface FlyerPriceTableProps {
  onAddToCart: (product: Product, selectedWeight: string, unitPrice: number, quantity: number) => void;
  salgadaProduct: Product;
  onOpenProductDetail: (product: Product) => void;
}

interface PriceRow {
  weight: string;
  badge: string;
  phrase: string;
  price: number;
  highlight?: boolean;
  bestFor: string;
}

export const FlyerPriceTable: React.FC<FlyerPriceTableProps> = ({
  onAddToCart,
  salgadaProduct,
  onOpenProductDetail,
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    '50g': 1,
    '115g': 1,
    '500g': 1,
    '1kg': 1,
  });

  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  const rows: PriceRow[] = [
    {
      weight: '50g',
      badge: 'Snack Individual',
      phrase: 'Leve e crocante',
      price: 7.00,
      bestFor: 'Bolsa, lancheira e academia',
    },
    {
      weight: '115g',
      badge: 'Mais Vendido ⭐',
      phrase: 'Mais sabor, mais alegria',
      price: 15.00,
      highlight: true,
      bestFor: 'Petisco a dois, filmes e happy hour',
    },
    {
      weight: '500g',
      badge: 'Econômico',
      phrase: 'Ideal para a família',
      price: 50.00,
      bestFor: 'A semana inteira e reuniões em casa',
    },
    {
      weight: '1kg',
      badge: 'Grandes Eventos',
      phrase: 'Perfeita para compartilhar',
      price: 90.00,
      bestFor: 'Bares, churrascos, festas e empórios',
    },
  ];

  const handleQtyChange = (weight: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [weight]: Math.max(1, (prev[weight] || 1) + delta),
    }));
  };

  const handleAdd = (row: PriceRow) => {
    const qty = quantities[row.weight] || 1;
    onAddToCart(salgadaProduct, row.weight, row.price, qty);
    
    setAddedMap(prev => ({ ...prev, [row.weight]: true }));
    setTimeout(() => {
      setAddedMap(prev => ({ ...prev, [row.weight]: false }));
    }, 1800);
  };

  return (
    <section id="valores" className="py-16 bg-[#F3EFE6] border-y border-[#E2DBD0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A472A] uppercase tracking-wider mb-2">
            <span>🌿 Direto da Nossa Fábrica Artesanal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#133821] tracking-tight font-heading">
            Tabela de Valores Oficial
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4C5B50]">
            Escolha a quantidade ideal para o seu momento. Todos os pacotes são selados com atmosfera protetora para preservar a máxima crocância.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Flyer Layout Table */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-[#DDD5C5] overflow-hidden space-y-3 sm:space-y-4">
              
              {rows.map((row) => {
                const qty = quantities[row.weight] || 1;
                const isAdded = addedMap[row.weight];

                return (
                  <div
                    key={row.weight}
                    className={`rounded-2xl transition-all p-3.5 sm:p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      row.highlight
                        ? 'bg-[#FFFDF7] border-[#E8C438] ring-2 ring-[#F2B824]/40 shadow-xs'
                        : 'bg-[#FAF8F5] border-[#E8E2D5] hover:border-[#D5CCBA]'
                    }`}
                  >
                    {/* Weight & Phrase */}
                    <div className="flex items-center gap-4">
                      {/* Weight pill badge */}
                      <div className="w-18 sm:w-20 py-2 rounded-xl bg-[#1A472A] text-white text-center shrink-0">
                        <span className="block text-xl sm:text-2xl font-black font-heading leading-none">
                          {row.weight}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-[#A7D1B4]">
                          {row.weight === '1kg' ? 'Kilo' : 'Gramas'}
                        </span>
                      </div>

                      {/* Phrase & Description */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#8C6D1F]">
                            {row.badge}
                          </span>
                          <span className="text-xs text-[#828F85]">· {row.bestFor}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#1F2722]">
                          {row.phrase}
                        </h3>
                        <p className="text-xs text-[#526055]">
                          Banana chips salgada na medida certa
                        </p>
                      </div>
                    </div>

                    {/* Price & Add to Cart Controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8E2D5]">
                      <div className="text-right">
                        <span className="text-xs text-[#6B796F] block leading-none">Preço unitário</span>
                        <span className="text-xl sm:text-2xl font-black text-[#1A472A] font-mono tabular-nums">
                          R$ {row.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-white border border-[#D5CCBA] rounded-lg p-0.5">
                        <button
                          onClick={() => handleQtyChange(row.weight, -1)}
                          className="w-7 h-7 flex items-center justify-center text-[#4C5B50] hover:bg-[#F3EFE6] rounded cursor-pointer"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold font-mono tabular-nums">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(row.weight, 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#4C5B50] hover:bg-[#F3EFE6] rounded cursor-pointer"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={() => handleAdd(row)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-xs ${
                          isAdded
                            ? 'bg-[#15803D] text-white'
                            : 'bg-[#1A472A] hover:bg-[#133821] text-white active:scale-95'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 text-[#F2B824]" />
                            <span>Adicionado!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4 text-[#F2B824]" />
                            <span>Comprar</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}

            </div>
          </div>

          {/* Right Column: Original Packaging Spotlight */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 border border-[#DDD5C5] shadow-sm text-center relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-[#F2B824] text-[#1A472A] text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                Original Peniel
              </div>

              <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden mb-4 border border-[#E5DECF] bg-[#FAF8F5]">
                <img
                  src="/src/assets/images/product_chips_salgada_1790886547629.jpg"
                  alt="Embalagem Peniel Banana Chips"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h4 className="text-lg font-black text-[#133821] font-heading">
                Embalagem 115g Clássica
              </h4>
              <p className="text-xs text-[#526055] mt-1 mb-4 leading-relaxed">
                A queridinha dos pontos de venda! Pacote transparente com fechamento reforçado e o selo Peniel que você já conhece e confia.
              </p>

              <div className="p-3 bg-[#F4EFE6] rounded-xl text-left space-y-1 text-xs text-[#3E4C41] mb-4">
                <p>✓ <strong>100% Artesanal:</strong> Fritura sequinha</p>
                <p>✓ <strong>Sem Conservantes:</strong> Apenas banana e sal</p>
                <p>✓ <strong>Glúten Free & Vegano:</strong> Para todos</p>
              </div>

              <button
                onClick={() => onOpenProductDetail(salgadaProduct)}
                className="w-full py-2.5 px-4 text-xs font-bold text-[#1A472A] hover:bg-[#FAF7F2] rounded-xl border border-[#D5CCBA] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Ver tabela nutricional & detalhes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Banner from Flyer */}
        <div className="mt-10 p-4 rounded-2xl bg-[#1A472A] text-white text-center flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto shadow-sm">
          <div className="text-left">
            <span className="text-xs text-[#F2B824] uppercase font-bold tracking-wider block">
              Compre direto de quem faz
            </span>
            <p className="text-sm font-medium text-[#E1EADF]">
              "Obrigado por apoiar o que é artesanal e natural! 💛"
            </p>
          </div>
          <a
            href="https://wa.me/5534997113486?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Peniel%20Chips%20e%20gostaria%20de%20fazer%20um%20pedido%20ou%20tirar%20d%C3%BAvidas."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20BE5C] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-transform active:scale-95"
          >
            <span>Falar no WhatsApp Oficial: (34) 9 9711-3486</span>
          </a>
        </div>

      </div>
    </section>
  );
};
