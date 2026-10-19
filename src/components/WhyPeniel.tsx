import React from 'react';
import { Leaf, Award, Heart, MessageCircle, Instagram, ShieldCheck, Sun } from 'lucide-react';

export const WhyPeniel: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-white border-t border-[#E5DECF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#1A472A] uppercase tracking-wider block">
              Origem & Propósito Peniel
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#133821] tracking-tight font-heading leading-tight">
              Feita para quem ama o sabor verdadeiro da fruta.
            </h2>
            <p className="text-sm sm:text-base text-[#46544A] leading-relaxed">
              Nascemos com um compromisso simples: transformar a banana selecionada em um snack artesanal crocante de verdade. Sem aromas artificiais, sem misturas estranhas e sem excesso de gordura.
            </p>
            <p className="text-sm sm:text-base text-[#46544A] leading-relaxed">
              Cada fornada é inspecionada manualmente para garantir fatias douradas, sequinhas e salgadas na medida exata para realçar a doçura natural da banana brasileira.
            </p>

            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DECF] flex items-center gap-3">
              <span className="text-2xl">💛</span>
              <div>
                <p className="text-xs font-bold text-[#1A472A]">Apoie o Produtor Local</p>
                <p className="text-xs text-[#58685C]">
                  "Obrigado por apoiar o que é artesanal e natural!"
                </p>
              </div>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D5]">
              <div className="w-10 h-10 rounded-xl bg-[#1A472A] text-[#F2B824] flex items-center justify-center mb-3">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#1F2722] mb-1">Simples & Natural</h3>
              <p className="text-xs text-[#526055] leading-relaxed">
                Ingredientes limpos. Apenas bananas frescas e flor de sal na medida exata. Zero químicos.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D5]">
              <div className="w-10 h-10 rounded-xl bg-[#B87D17] text-white flex items-center justify-center mb-3">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#1F2722] mb-1">Crocante & Irresistível</h3>
              <p className="text-xs text-[#526055] leading-relaxed">
                Ponto de corte milimétrico e temperatura precisa que garantem uma crocância que estala na boca.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D5]">
              <div className="w-10 h-10 rounded-xl bg-[#133821] text-[#F2B824] flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#1F2722] mb-1">Banana de Verdade</h3>
              <p className="text-xs text-[#526055] leading-relaxed">
                Sem farinhas, sem aglutinantes. É a fruta fatiada in natura, mantendo fibras e potássio.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D5]">
              <div className="w-10 h-10 rounded-xl bg-[#4A6741] text-white flex items-center justify-center mb-3">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#1F2722] mb-1">Glúten Free & Vegano</h3>
              <p className="text-xs text-[#526055] leading-relaxed">
                Livre de derivados animais ou glúten. Perfeito para restrições alimentares e rotinas saudáveis.
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Social Bar directly matching flyer */}
        <div className="p-6 sm:p-8 bg-[#1A472A] rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold text-[#F2B824] uppercase tracking-wider block mb-1">
              Atendimento Direto com a Produção
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-heading">
              Quer encomendar para o seu bar, restaurante ou evento?
            </h3>
            <p className="text-xs text-[#A8C7B2] mt-1 max-w-lg">
              Fale conosco diretamente pelo WhatsApp para orçamentos de atacado ou dúvidas sobre entregas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-center">
            <a
              href="https://wa.me/5534997113486?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20da%20Peniel%20Chips"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20BE5C] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>(34) 9 9711-3486</span>
            </a>

            <a
              href="https://instagram.com/penielchips"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#F2B824]" />
              <span>@penielchips</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
