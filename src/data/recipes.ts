import { Recipe } from '../types';

export const RECIPES: Recipe[] = [
  {
    id: 'guacamole-peniel',
    title: 'Guacamole Tropical com Peniel Chips',
    subtitle: 'Substitua os nachos processados pela crocância natural da banana chips salgada',
    prepTime: '10 min',
    difficulty: 'Fácil',
    servings: '4 pessoas',
    chipsUsed: 'Peniel Banana Chips Salgada 115g ou Lemon Pepper',
    chipsProductId: 'peniel-salgada-tradicional',
    image: '/images/recipe_guacamole_chips.jpg',
    ingredients: [
      '2 avocados ou 1 abacate maduro amassado rústico',
      '1 tomate italiano sem sementes picado em cubinhos',
      '1/2 cebola roxa bem picada',
      'Suco de 1 limão tahiti espremido',
      '1 colher (sopa) de azeite extravirgem',
      'Coentro ou salsa fresca picadinha a gosto',
      '1 pitada de sal marinho',
      '1 pacote de Peniel Banana Chips Salgada (115g)'
    ],
    instructions: [
      'Em uma tigela ou molcajete de pedra, amasse o abacate com um garfo deixando alguns pedaços para dar textura.',
      'Incorpore o tomate, a cebola roxa picadinha, o suco de limão e o azeite de oliva.',
      'Ajuste o sal com moderação, lembrando que a Peniel Chips já vem salgada no ponto ideal.',
      'Finalize com o coentro fresco e sirva imediatamente acompanhado de um generoso bowl de Peniel Banana Chips.'
    ],
    pairingTip: 'Combina perfeitamente com cerveja artesanal clara (Pilsen/Lager) ou uma margarita bem gelada.'
  },
  {
    id: 'ceviche-com-chips',
    title: 'Ceviche Clássico com Crosta de Banana Chips',
    subtitle: 'A combinação andina tradicional entre a acidez cítrica do peixe e a crocância salgada',
    prepTime: '15 min',
    difficulty: 'Fácil',
    servings: '2 pessoas',
    chipsUsed: 'Peniel Banana Chips Lemon Pepper 115g',
    chipsProductId: 'peniel-lemon-pepper-115g',
    image: '/images/recipe_ceviche_tilapia.jpg',
    ingredients: [
      '300g de filé de tilápia fresca ou robalo cortado em cubos de 1,5cm',
      'Suco de 3 limões tahiti frescos',
      '1/2 pimenta dedo-de-moça fatiada fina sem sementes',
      '1/2 cebola roxa em tiras finíssimas (julienne)',
      'Folhas de coentro fresco',
      '1 pitada de flor de sal',
      'Peniel Banana Chips Lemon Pepper para guarnecer'
    ],
    instructions: [
      'Em um bowl frio de vidro ou inox, misture os cubos de peixe com uma pitada de flor de sal.',
      'Adicione a cebola roxa e a pimenta dedo-de-moça.',
      'Despeje o suco de limão e deixe marinar por apenas 4 a 5 minutos até a carne ficar levemente opaca.',
      'Monte no prato com folhas de coentro e espete fatias crocantes de Peniel Chips Lemon Pepper para comer como colherzinhas crocantes.'
    ],
    pairingTip: 'Harmoniza com um vinho branco chileno Sauvignon Blanc jovem ou espumante brut geladíssimo.'
  },
  {
    id: 'tabua-queijo-brie',
    title: 'Tábua Gourmet: Queijo Brie, Mel Silvestre & Chips',
    subtitle: 'A harmonia impecável entre o queijo cremoso e a crocância salgadinha artesanal',
    prepTime: '5 min',
    difficulty: 'Fácil',
    servings: '4 a 6 pessoas',
    chipsUsed: 'Peniel Banana Chips Salgada 500g ou 115g',
    chipsProductId: 'peniel-salgada-tradicional',
    image: '/images/recipe_tabua_queijo_brie.jpg',
    ingredients: [
      '1 peça de queijo Brie ou Camembert (200g)',
      '3 colheres (sopa) de mel silvestre puro ou mel trufado',
      'Castanhas de caju e nozes tostadas',
      'Uvas verdes sem caroço cortadas ao meio',
      'Ramos de alecrim fresco para decorar',
      'Peniel Banana Chips Salgada servida à vontade'
    ],
    instructions: [
      'Aqueça o queijo Brie por 2 minutos no forno ou use um maçarico culinário até o centro amolecer.',
      'Regue o queijo com o mel silvestre e adicione nozes trituradas por cima.',
      'Disponha na tábua de madeira com ramos de alecrim e preencha toda a lateral com Peniel Banana Chips.',
      'Use a banana chips como base crocante para mergulhar diretamente no queijo derretido com mel.'
    ],
    pairingTip: 'Excelente com vinhos Chardonnay amadeirados, espumante Prosecco ou cervejas Belgian Blond Ale.'
  },
  {
    id: 'farofa-crocante-peniel',
    title: 'Farofa Crocante de Banana Chips Peniel',
    subtitle: 'O toque de chef para feijoadas, churrascos e grelhados de fim de semana',
    prepTime: '12 min',
    difficulty: 'Médio',
    servings: '6 porções',
    chipsUsed: 'Peniel Banana Chips Salgada 115g',
    chipsProductId: 'peniel-salgada-tradicional',
    image: '/images/recipe_farofa_crocante.jpg',
    ingredients: [
      '1 pacote de Peniel Banana Chips Salgada (115g) levemente quebrada',
      '2 xícaras de farinha de mandioca biju flocada amarela',
      '3 colheres (sopa) de manteiga de garrafa ou manteiga pura',
      '1 cebola média bem picada',
      '2 dentes de alho amassados',
      'Cheiro-verde picadinho a gosto'
    ],
    instructions: [
      'Em uma frigideira grande, derreta a manteiga em fogo médio e doure a cebola e o alho até perfumar.',
      'Junte a farinha de mandioca biju e mexa continuamente em fogo brando por 5 minutos até tostar e ficar dourada.',
      'Desligue o fogo e adicione o cheiro-verde fresco.',
      'Por último, com o fogo desligado, incorpore a Peniel Banana Chips quebradinha para manter 100% da crocância!'
    ],
    pairingTip: 'Indispensável com carnes grelhadas na brasa, feijoada completa e cerveja gelada.'
  }
];
