# 🍌 Peniel Chips — E-Commerce & Loja Oficial de Banana Chips Artesanal

> **"Salgada na medida certa. O crocante que conquista!"**  
> Loja virtual completa e moderna para venda de banana chips artesanal brasileira e bananas in natura selecionadas direto do produtor.

---

## 🌟 Visão Geral do Projeto

Este projeto foi construído para proporcionar uma experiência de e-commerce gastronômico rica, visualmente atraente e fluida para a marca **Peniel Chips**. 

O catálogo destaca a versatilidade culinária do produto (como petisco para happy hour com cervejas artesanais e vinhos, lanche escolar ou pós-treino saudável, e ingrediente nobre em receitas como guacamole, ceviche e farofas).

---

## 🚀 Funcionalidades Principais

- **📊 Tabela Oficial de Valores:**  
  Réplica digital interativa da tabela de valores com compra direta e seletor de quantidade:
  - **50g:** R$ 7,00 (*Leve e crocante — individual*)
  - **115g:** R$ 15,00 (*Mais sabor, mais alegria — o mais vendido*)
  - **500g:** R$ 50,00 (*Ideal para a família*)
  - **1kg:** R$ 90,00 (*Perfeita para compartilhar, bares e eventos*)

- **🎯 Filtro Inteligente de Sabores & Ocasiões:**
  - Perfis de sabor: Salgada Tradicional, Lemon Pepper Cítrico, Páprica Defumada, Canela & Demerara, Combos e Bananas in Natura.
  - Ocasiões: Cervejas & Happy Hour, Vinhos & Queijos, Lanches Saudáveis, Festas & Eventos.
  - Busca instantânea por texto em tempo real.

- **🍷 Guia Gastronômico do Sommelier & Depoimentos:**
  - Harmonizações com IPAs, Witbiers, Sauvignon Blanc, Espumante Brut, Gin & Tônica e Suco de Maracujá com hortelã.
  - Avaliações reais de clientes com notas de degustação.

- **👨‍🍳 Seção de Receitas Rápidas:**
  - Receitas exclusivas com tempo de preparo, rendimento e botão de 1 clique para adicionar os chips necessários diretamente ao carrinho.

- **❤️ Área de Favoritos:**
  - Salva produtos favoritados via `localStorage` com gaveta lateral e adição em lote ao carrinho.

- **📦 Histórico de Pedidos & Compras Recorrentes:**
  - Registro de pedidos anteriores com código de rastreio fictício, status em tempo real e o botão **"Repetir Este Pedido Agora"** para recompra imediata em 1 clique.

- **🔔 Notificações Push & Alertas de Fornada:**
  - Simulador e disparador de notificações nativas de browser (`Notification API`) com avisos de novas fornadas e cupons de desconto (`PRIMEIRACOMPRA`, `PENIEL10`).

- **💳 Checkout Completo & Sem Atritos:**
  - **Busca automática de CEP** com integração à API gratuita do *ViaCEP* (preenchimento automático de rua, bairro, cidade e estado).
  - Cálculo de frete dinâmico com barra de progresso para **Frete Grátis** acima de R$ 99,00.
  - **Pagamento via PIX Instantâneo:** QR Code dinâmico em SVG, chave Pix Copia e Cola, desconto automático de 5% no PIX, cronômetro regressivo e simulação instantânea de aprovação.
  - **Pagamento via Cartão de Crédito:** validação de campos, parcelamento em até 3x sem juros e selo SSL de segurança.
  - Tela de sucesso com chuva de confetes (`canvas-confetti`) e botão direto para envio de comprovante no WhatsApp oficial da Peniel Chips: **(34) 9 9711-3486**.

---

## 🛠️ Tecnologias Utilizadas

- **React 19**
- **Vite 8**
- **TypeScript**
- **Tailwind CSS v4** (com `@tailwindcss/vite`)
- **Lucide React** (Ícones modernos e consistentes)
- **Canvas Confetti** (Efeitos visuais para checkout e celebração)
- **ViaCEP API** (Preenchimento instantâneo de endereço por CEP)

---

## 💻 Como Rodar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU-USUARIO/peniel-chips-ecommerce.git
   cd peniel-chips-ecommerce
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse no navegador: `http://localhost:3000` (ou a porta informada pelo Vite).

4. **Gerar build de produção:**
   ```bash
   npm run build
   ```

5. **Visualizar o build localmente:**
   ```bash
   npm run preview
   ```

---

## 🚀 Como Hospedar no Vercel (1-Click Deploy)

O projeto já inclui o arquivo `vercel.json` configurado com as regras de rewrite de SPA (Single Page Application) e cache de imagens.

### Passo a passo no Vercel:

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.
2. Clique em **"Add New..."** → **"Project"**.
3. Selecione o repositório do projeto importado no GitHub.
4. O Vercel detectará automaticamente as configurações:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **"Deploy"**.
6. Em menos de 1 minuto seu site estará online com domínio HTTPS gratuito (ex: `peniel-chips.vercel.app`)!

---

## 📁 Estrutura de Pastas

```
├── public/                     # Arquivos estáticos servidos na raiz
│   └── images/                 # Todas as imagens em alta resolução preservadas
│       ├── hero_peniel_banana_chips.jpg
│       ├── product_chips_salgada.jpg
│       ├── pairing_beer_wine_chips.jpg
│       ├── recipe_guacamole_chips.jpg
│       └── peniel_chips_layout_preview.jpg
├── src/
│   ├── assets/                 # Imagens e ativos adicionais
│   ├── components/             # Componentes modulares
│   │   ├── Navbar.tsx          # Top bar com carrinho, favoritos e histórico
│   │   ├── PromoBanner.tsx     # Barra promocional superior
│   │   ├── Hero.tsx            # Seção hero com proposta de valor e fotos
│   │   ├── FlyerPriceTable.tsx # Tabela oficial de valores (50g, 115g, 500g, 1kg)
│   │   ├── ProductCatalog.tsx  # Catálogo com filtros de perfil de sabor
│   │   ├── ProductCard.tsx     # Card de produto com seleção de peso
│   │   ├── ProductDetailModal.tsx # Modal de detalhes e nutrição
│   │   ├── PairingSection.tsx  # Harmonizações com bebidas & depoimentos
│   │   ├── RecipesSection.tsx  # Receitas culinárias rápidas
│   │   ├── WhyPeniel.tsx       # Origem, propósito artesanal e WhatsApp
│   │   ├── CartDrawer.tsx      # Gaveta lateral de carrinho e cupom
│   │   ├── CheckoutModal.tsx   # Checkout com CEP, PIX (-5%) e Cartão
│   │   ├── FavoritesDrawer.tsx # Gaveta de itens favoritos
│   │   ├── OrderHistoryModal.tsx # Histórico de compras recorrentes
│   │   ├── NotificationModal.tsx # Central de notificações push
│   │   └── Footer.tsx          # Rodapé com dados de contato e garantias
│   ├── data/                   # Dados estruturados de produtos, receitas e sommelier
│   ├── types/                  # Tipagens TypeScript
│   ├── utils/                  # Utilitários de storage e máscaras
│   ├── App.tsx                 # Aplicação raiz
│   ├── index.css               # Estilos globais Tailwind v4
│   └── main.tsx                # Ponto de entrada React
├── index.html                  # HTML com fontes Google e metadados SEO
├── vercel.json                 # Configuração de deploy no Vercel
├── package.json                # Dependências e scripts
├── tsconfig.json               # Configuração TypeScript
└── vite.config.ts              # Configuração Vite & Tailwind
```

---

## 📞 Contato & Atendimento Oficial

- **WhatsApp:** [(34) 9 9711-3486](https://wa.me/5534997113486)
- **Instagram:** [@penielchips](https://instagram.com/penielchips)
- **Slogan:** *Salgada na medida certa. Obrigado por apoiar o que é artesanal e natural! 💛*
