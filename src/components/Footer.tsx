import React from 'react';
import { MessageCircle, Instagram, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  return (
    <footer className="bg-[#133821] text-[#E4EDE6] border-t border-[#1F4D30] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#214F33]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl" role="img" aria-label="Peniel Banana">🍌</span>
              <span className="text-2xl font-black tracking-tight text-white font-heading">
                Peniel <span className="text-[#F2B824] font-medium font-sans">CHIPS</span>
              </span>
            </div>

            <p className="text-xs text-[#ADC4B4] leading-relaxed max-w-sm">
              Salgada na medida certa. Banana chips artesanal, crocante de verdade, sem glúten e vegana. Feita com amor para valorizar a agricultura natural e surpreender em momentos de confraternização.
            </p>

            <div className="p-3 bg-[#1A472A] rounded-xl border border-[#2B5E3C] inline-block">
              <p className="text-xs text-[#F2B824] font-bold">
                "Obrigado por apoiar o que é artesanal e natural! 💛"
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-[#ADC4B4]">
              <li>
                <button
                  onClick={() => onScrollTo('valores')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tabela Oficial de Valores
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('catalogo')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Catálogo Completo de Sabores
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('harmonizacoes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Harmonizações com Bebidas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('receitas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Receitas Rápidas Gourmet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('sobre')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nossa História & Propósito
                </button>
              </li>
            </ul>
          </div>

          {/* Contact and Direct Orders */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contato Direto
            </h4>
            <ul className="space-y-2 text-xs text-[#ADC4B4]">
              <li>
                <a
                  href="https://wa.me/5534997113486"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>(34) 9 9711-3486</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/penielchips"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#F2B824] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#F2B824]" />
                  <span>@penielchips</span>
                </a>
              </li>
              <li>
                <span className="text-[#8BA393] block">
                  Envio seguro para todo o território nacional
                </span>
              </li>
            </ul>
          </div>

          {/* Certifications and Badges */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Garantias Peniel
            </h4>
            <div className="space-y-2 text-xs text-[#ADC4B4]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F2B824] shrink-0" />
                <span>100% Livre de Glúten</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#F2B824] shrink-0" />
                <span>Produto Vegano & Natural</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#F2B824] shrink-0" />
                <span>Frete Grátis acima de R$ 99</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8BA393]">
          <p>
            © {new Date().getFullYear()} Peniel Chips. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] bg-[#1A472A] px-2 py-1 rounded text-[#F2B824]">
              PIX Instantâneo (-5% OFF)
            </span>
            <span className="font-mono text-[11px] bg-[#1A472A] px-2 py-1 rounded text-white">
              Cartões até 3x sem juros
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
