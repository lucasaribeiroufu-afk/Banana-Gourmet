import { Testimonial } from '../types';

export interface PairingGuideItem {
  id: string;
  category: 'Cervejas' | 'Vinhos & Espumantes' | 'Drinks & Coquetéis' | 'Sucos & Não Alcoólicos';
  drink: string;
  recommendedChips: string;
  chipsId: string;
  sommelierQuote: string;
  flavorBalance: string;
  temperature: string;
}

export const PAIRING_GUIDES: PairingGuideItem[] = [
  {
    id: 'beer-ipa',
    category: 'Cervejas',
    drink: 'Cerveja IPA & American Pale Ale',
    recommendedChips: 'Peniel Banana Chips Páprica Defumada & Especiarias',
    chipsId: 'peniel-paprica-defumada-115g',
    sommelierQuote: 'O amargor cítrico dos lúpulos da IPA corta maravilhosamente o toque defumado da páprica, enquanto a banana traz a doçura natural que equilibra a boca.',
    flavorBalance: 'Amargor Lupulado + Notas Defumadas Amadeiradas',
    temperature: 'Servir a 4°C - 6°C'
  },
  {
    id: 'wine-sauvignon',
    category: 'Vinhos & Espumantes',
    drink: 'Vinho Sauvignon Blanc & Vinho Verde',
    recommendedChips: 'Peniel Banana Chips Lemon Pepper & Ervas',
    chipsId: 'peniel-lemon-pepper-115g',
    sommelierQuote: 'A vibrante mineralidade e a acidez fresca do Sauvignon Blanc abraçam as raspas de limão e a pimenta, criando uma experiência elegante e refrescante.',
    flavorBalance: 'Acidez Cítrica + Zeste Refrescante',
    temperature: 'Servir bem gelado a 7°C - 9°C'
  },
  {
    id: 'cocktail-gin',
    category: 'Drinks & Coquetéis',
    drink: 'Gin & Tônica com Alecrim & Zimbro',
    recommendedChips: 'Peniel Banana Chips Salgada na Medida Certa',
    chipsId: 'peniel-salgada-tradicional',
    sommelierQuote: 'O clássico não falha: o sal marinho na medida certa limpa as papilas gustativas entre cada gole botânico do drink. É impossível parar na primeira mordida.',
    flavorBalance: 'Salinidade Pura + Botânicos Aromáticos',
    temperature: 'Copo com gelo em cubos grandes'
  },
  {
    id: 'juice-passionfruit',
    category: 'Sucos & Não Alcoólicos',
    drink: 'Suco de Maracujá Fresco com Hortelã',
    recommendedChips: 'Peniel Banana Chips Salgada Tradicional (50g ou 115g)',
    chipsId: 'peniel-salgada-tradicional',
    sommelierQuote: 'Para um lanche revigorante sem álcool: a acidez natural da fruta tropical encontra a crocância salgada do chips artesanal, criando contraste viciante.',
    flavorBalance: 'Fruta Tropical Ácida + Crocância Salgadinha',
    temperature: 'Com bastante gelo e hortelã fresca'
  },
  {
    id: 'wine-sparkling-brut',
    category: 'Vinhos & Espumantes',
    drink: 'Espumante Brut Método Tradicional',
    recommendedChips: 'Peniel Banana Chips Salgada Tradicional',
    chipsId: 'peniel-salgada-tradicional',
    sommelierQuote: 'O perlage fino e a acidez efervescente do espumante dissolvem suavemente a gordura boa da banana frita na medida, deixando o final limpo e estaladiço.',
    flavorBalance: 'Efervescência Nobre + Salinidade Equilibrada',
    temperature: 'Servir a 6°C - 8°C'
  },
  {
    id: 'coffee-espresso',
    category: 'Sucos & Não Alcoólicos',
    drink: 'Café Especial Coado ou Espresso Duplo',
    recommendedChips: 'Peniel Banana Chips Canela & Demerara',
    chipsId: 'peniel-canela-demerara-115g',
    sommelierQuote: 'O par ideal para o meio da tarde: as notas de chocolate e caramelo do café casam com a canela quente do Ceilão e o crocante delicado.',
    flavorBalance: 'Notas Tostadas de Grão + Canela e Caramelo',
    temperature: 'Servir quente a 85°C'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Renata Albuquerque',
    role: 'Sommelier & Consultora de Vinhos',
    location: 'Uberlândia, MG',
    stars: 5,
    text: 'Fiz uma degustação com espumante Brut e o pacote de 115g da Peniel Salgada na medida certa. Os clientes ficaram boquiabertos! A crocância é surreal e não deixa aquela sensação pesada de óleo. É um produto artesanal de primeiríssima qualidade.',
    drinkPairing: 'Espumante Brut & Vinho Branco',
    chipsVariant: 'Peniel Salgada 115g',
    date: 'Setembro de 2026'
  },
  {
    id: 'test-2',
    author: 'Marcos Vinícius Prado',
    role: 'Bartender & Mixologista no Speakeasy Bar',
    location: 'Belo Horizonte, MG',
    stars: 5,
    text: 'Adotamos o pacote de 1kg da Peniel como snack de boas-vindas do nosso bar. Combina demais com Gin Tônica e Moscow Mule. O pessoal elogia tanto que muitos clientes pedem o contato do fornecedor para comprar pra casa.',
    drinkPairing: 'Gin Tônica & Drinks Cítricos',
    chipsVariant: 'Peniel Salgada Pacote 1kg',
    date: 'Agosto de 2026'
  },
  {
    id: 'test-3',
    author: 'Dra. Carolina Freitas',
    role: 'Nutricionista e Praticante de Beach Tennis',
    location: 'Campinas, SP',
    stars: 5,
    text: 'Compro sempre o pacote de 50g para levar nos treinos e o de 500g para os lanches dos meus filhos em casa. É sem glúten, vegano e feito com banana de verdade sem químicas artificiais. Crocante, saboroso e nutritivo.',
    drinkPairing: 'Água de Coco Gelada',
    chipsVariant: 'Peniel Salgada 50g & 500g',
    date: 'Setembro de 2026'
  },
  {
    id: 'test-4',
    author: 'Guilherme Sampaio',
    role: 'Mestre Cervejeiro & Sommelier de Cervejas',
    location: 'Ribeirão Preto, SP',
    stars: 5,
    text: 'O Peniel Chips Lemon Pepper com uma Witbier belga ou Session IPA é simplesmente imbatível. A picância suave da pimenta com o frescor do limão realça o malte. Virei cliente fiel da marca.',
    drinkPairing: 'Cervejas Artesanais (Witbier / Session IPA)',
    chipsVariant: 'Peniel Lemon Pepper & Ervas',
    date: 'Julho de 2026'
  }
];
