export type Language = 'kz' | 'ru';

export type CategoryId = 'all' | 'combos' | 'doners' | 'snacks' | 'drinks';

export interface PriceOption {
  labelKz: string;
  labelRu: string;
  price: number;
  oldPrice?: number;
}

export interface MenuItem {
  id: string;
  nameKz: string;
  nameRu: string;
  category: CategoryId;
  descriptionKz: string;
  descriptionRu: string;
  badgeKz?: string;
  badgeRu?: string;
  badgeColor?: 'red' | 'amber' | 'green';
  tagKz?: string;
  tagRu?: string;
  priceOptions: PriceOption[];
  basePrice: number;
  imageUrl: string;
  isPopular?: boolean;
  isHalal: boolean;
  preparationMinutes?: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  selectedOption: PriceOption;
  quantity: number;
  notes?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatarColor: string;
  source: string;
  tagKz: string;
  tagRu: string;
  rating: number;
  dateKz: string;
  dateRu: string;
  textKz: string;
  textRu: string;
  likes: number;
  verified: boolean;
  replyKz?: string;
  replyRu?: string;
  highlightKz?: string;
  highlightRu?: string;
}
