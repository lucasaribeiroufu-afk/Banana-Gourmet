import { CartItem, Order } from '../types';
import { PRODUCTS } from '../data/products';

const ORDERS_STORAGE_KEY = 'peniel_orders_history_v1';
const FAVORITES_STORAGE_KEY = 'peniel_favorites_v1';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'PEN-82914',
    date: '24/09/2026',
    status: 'Entregue',
    trackingCode: 'BR983419208MG',
    paymentMethod: 'pix',
    subtotal: 80.00,
    discount: 8.00,
    shipping: 0.00,
    total: 72.00,
    customer: {
      fullName: 'Lucas Ribeiro',
      email: 'lucas.aribeiro.ufu@gmail.com',
      phone: '(34) 99711-3486',
      cep: '38400-100',
      street: 'Av. Rondon Pacheco',
      number: '1500',
      complement: 'Apto 402',
      neighborhood: 'Tabajaras',
      city: 'Uberlândia',
      state: 'MG'
    },
    items: [
      {
        product: PRODUCTS[0], // Peniel Salgada 115g
        selectedWeight: '115g',
        unitPrice: 15.00,
        quantity: 2
      },
      {
        product: PRODUCTS[2], // Peniel Salgada 500g
        selectedWeight: '500g',
        unitPrice: 50.00,
        quantity: 1
      }
    ]
  }
];

export function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveNewOrder(order: Order): void {
  try {
    const current = getStoredOrders();
    const updated = [order, ...current];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save order to localStorage', e);
  }
}

export function getStoredFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return ['peniel-salgada-tradicional', 'peniel-lemon-pepper-115g'];
    return JSON.parse(raw);
  } catch {
    return ['peniel-salgada-tradicional'];
  }
}

export function saveStoredFavorites(favs: string[]): void {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favs));
  } catch (e) {
    console.error('Failed to save favorites to localStorage', e);
  }
}
