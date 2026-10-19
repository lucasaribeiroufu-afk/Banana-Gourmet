import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Flame, Award, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onExplorePairings: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onExplorePairings }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#FAF7F2]">
      {/* Decorative leaf motifs background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1A472A]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F2B824]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Story, Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1A472A] tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#1A472A] animate-pulse" />
              <span>Artesanal · Direto do Produtor · Fornada Fresca</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#133821] tracking-tight leading-[1.08] font-heading text-balance">
              Salgada na medida certa.{' '}
              <span className="text-[#B9770E] underline decoration-[#F2B824]/60 decoration-wavy decoration-2">
                O crocante
              </span>{' '}
              que conquista!
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#3C4A3F] max-w-xl leading-relaxed">
              Fatias finíssimas de banana selecionada, tostadas com paciência artesanal para uma crocância estaladiça inconfundível. O petisco consagrado para sua cerveja gelada, vinho branco, suco natural ou o lanche da tarde mais gostoso da sua rotina.
            </p>

            {/* Values Quick Pills Banner from Flyer */}
            <div className="p-3.5 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#E5DECF] shadow-xs max-w-xl">
              <div className="text-[11px] font-bold text-[#6D5A2E] uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Tabela Oficial Peniel Chips</span>
                <span className="text-[#1A472A]">Embalagens para todos os momentos</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#EBE5D8]">
                  <span className="block font-bold text-[#1A472A]">50g</span>
                  <span className="text-[#B9770E] font-mono font-bold">R$ 7,00</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#EBE5D8] ring-1 ring-[#F2B824]">
                  <span className="block font-bold text-[#1A472A]">115g ⭐</span>
                  <span className="text-[#B9770E] font-mono font-bold">R$ 15,00</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#EBE5D8]">
                  <span className="block font-bold text-[#1A472A]">500g</span>
                  <span className="text-[#B9770E] font-mono font-bold">R$ 50,00</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#FAF7F2] border border-[#EBE5D8]">
                  <span className="block font-bold text-[#1A472A]">1kg</span>
                  <span className="text-[#B9770E] font-mono font-bold">R$ 90,00</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="bg-[#1A472A] hover:bg-[#133821] text-[#FAF7F2] px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>Fazer Pedido Agora</span>
                <ArrowRight className="w-4 h-4 text-[#F2B824]" />
              </button>

              <button
                onClick={onExplorePairings}
                className="bg-white hover:bg-[#F5F0E6] text-[#1A472A] border border-[#D5CCBA] px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all hover:border-[#1A472A] cursor-pointer"
              >
                Harmonizações & Drinks
              </button>
            </div>

            {/* Trust Badges directly matching flyer footer */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E5DECF] max-w-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1A472A] shrink-0" />
                <span className="text-xs font-semibold text-[#2D3930]">Simples & Natural</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#D97706] shrink-0" />
                <span className="text-xs font-semibold text-[#2D3930]">Crocante & Irresistível</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#1A472A] shrink-0" />
                <span className="text-xs font-semibold text-[#2D3930]">Banana de Verdade</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card with High-Res Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="/src/assets/images/hero_peniel_banana_chips_1790886537868.jpg"
                  alt="Banana Chips Peniel crocante em tigela rústica"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Mascot Badge on Top Right */}
                <div className="absolute top-4 right-4 bg-[#FAF7F2] rounded-2xl p-2.5 shadow-lg border border-[#E5DECF] flex items-center gap-2">
                  <div className="text-2xl select-none" role="img" aria-label="Mascote Banana de Óculos">
                    😎🍌
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#1A472A] tracking-wider block">Peniel Chips</span>
                    <span className="text-[9px] text-[#695D47] font-medium">100% Vegano & Sem Glúten</span>
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-medium text-[#F2B824] uppercase tracking-wider mb-0.5">
                    Feita com banana de verdade
                  </p>
                  <p className="text-sm sm:text-base font-bold text-white leading-tight">
                    "Simples, natural, delicioso. O crocante que conquista!"
                  </p>
                </div>
              </div>

              {/* Floated Guarantee Stamp */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#1A472A] text-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-[#2D6A42] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F2B824] text-[#1A472A] flex items-center justify-center font-black text-lg">
                  ✓
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold leading-tight">Salgada na Medida</p>
                  <p className="text-[10px] text-[#A7D1B4]">Sem excesso de sódio ou gordura</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
