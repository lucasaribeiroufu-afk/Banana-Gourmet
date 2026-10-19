export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  weight: string;
  weightOptions?: { weight: string; price: number; label: string }[];
  price: number;
  originalPrice?: number;
  category: 'chips_salgada' | 'chips_especial' | 'combo' | 'banana_fresca';
  flavorProfile: 'salgado' | 'doce' | 'citrico' | 'picante_defumado' | 'natural_fresco';
  occasion: 'cerveja' | 'vinho' | 'lanche' | 'festa' | 'todas';
  dietary: string[];
  pairingNotes: string;
  bestFor: string;
  rating: number;
  reviewCount: number;
  image: string;
  isBestSeller?: boolean;
  stockStatus: 'Em estoque' | 'Fornada Fresca' | 'Últimas unidades';
  nutritionalSummary?: {
    calorias: string;
    carboidratos: string;
    gorduras: string;
    fibras: string;
    sodio: string;
  };
}

export interface CartItem {
  product: Product;
  selectedWeight: string;
  unitPrice: number;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'pix' | 'credit_card';
  status: 'Recebido' | 'Em preparação' | 'Fornada Pronta' | 'Enviado' | 'Entregue';
  trackingCode: string;
  customer: CustomerInfo;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  prepTime: string;
  difficulty: 'Fácil' | 'Médio';
  servings: string;
  chipsUsed: string;
  chipsProductId: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  pairingTip: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  stars: number;
  text: string;
  drinkPairing: string;
  chipsVariant: string;
  date: string;
}

export interface PushNotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'promo' | 'news' | 'recipe';
  badge?: string;
}
