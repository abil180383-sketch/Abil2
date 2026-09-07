import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, PriceOption } from '../types';
import { useLanguage } from './LanguageContext';

export type OrderType = 'dine_in' | 'takeaway' | 'delivery';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem, option: PriceOption, quantity?: number, notes?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  customerAddress: string;
  setCustomerAddress: (address: string) => void;
  paymentMethod: 'kaspi' | 'cash' | 'card';
  setPaymentMethod: (method: 'kaspi' | 'cash' | 'card') => void;
  generateWhatsAppOrderUrl: () => string;
  isHalalModalOpen: boolean;
  setIsHalalModalOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('don_rido_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHalalModalOpen, setIsHalalModalOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'kaspi' | 'cash' | 'card'>('kaspi');

  useEffect(() => {
    try {
      localStorage.setItem('don_rido_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (item: MenuItem, option: PriceOption, quantity = 1, notes?: string) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        i => i.menuItem.id === item.id && i.selectedOption.labelKz === option.labelKz && (i.notes || '') === (notes || '')
      );

      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      const cartItemId = `${item.id}-${option.labelKz}-${Date.now()}`;
      return [...prevItems, { cartItemId, menuItem: item, selectedOption: option, quantity, notes }];
    });

    // Optionally open cart or show toast
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = items.reduce((acc, curr) => acc + curr.selectedOption.price * curr.quantity, 0);

  const generateWhatsAppOrderUrl = (): string => {
    const isKz = language === 'kz';
    const orderTypeLabel = 
      orderType === 'delivery' 
        ? (isKz ? 'Жеткізу (Доставка)' : 'Доставка')
        : orderType === 'takeaway'
        ? (isKz ? 'Өзім алып кету (Самовывоз)' : 'Самовывоз')
        : (isKz ? 'Кафеде жеу (В зале)' : 'В зале');

    const paymentLabel = 
      paymentMethod === 'kaspi' 
        ? 'Kaspi QR' 
        : paymentMethod === 'card' 
        ? (isKz ? 'Банк картасы' : 'Банковская карта') 
        : (isKz ? 'Қолма-қол' : 'Наличные');

    let msg = isKz 
      ? `Сәлеметсіз бе, Don Rido! Мен сайттан тапсырыс бергім келеді:\n\n`
      : `Здравствуйте, Don Rido! Хочу оформить заказ с сайта:\n\n`;

    items.forEach((item, index) => {
      const name = isKz ? item.menuItem.nameKz : item.menuItem.nameRu;
      const opt = isKz ? item.selectedOption.labelKz : item.selectedOption.labelRu;
      const cost = (item.selectedOption.price * item.quantity).toLocaleString('ru-RU');
      msg += `${index + 1}. ${name} (${opt}) x ${item.quantity} дана — ${cost} ₸\n`;
      if (item.notes) {
        msg += `   * Ескерту: ${item.notes}\n`;
      }
    });

    msg += `\n------------------------\n`;
    msg += isKz ? `Жалпы сомасы: ${totalPrice.toLocaleString('ru-RU')} ₸\n` : `Общая сумма: ${totalPrice.toLocaleString('ru-RU')} ₸\n`;
    msg += isKz ? `Тапсырыс түрі: ${orderTypeLabel}\n` : `Тип заказа: ${orderTypeLabel}\n`;
    msg += isKz ? `Төлем түрі: ${paymentLabel}\n` : `Способ оплаты: ${paymentLabel}\n`;

    if (customerName.trim()) {
      msg += isKz ? `Аты-жөні: ${customerName}\n` : `Имя: ${customerName}\n`;
    }
    if (customerPhone.trim()) {
      msg += isKz ? `Телефон: ${customerPhone}\n` : `Телефон: ${customerPhone}\n`;
    }
    if (orderType === 'delivery' && customerAddress.trim()) {
      msg += isKz ? `Мекен-жай: ${customerAddress}\n` : `Адрес: ${customerAddress}\n`;
    }

    msg += isKz 
      ? `\nРахмет! Тапсырысты қабылдауыңызды сұраймын.` 
      : `\nСпасибо! Прошу подтвердить заказ.`;

    const encoded = encodeURIComponent(msg);
    // Real phone number from flyer: +7 (700) 865-00-00 -> 77008650000
    return `https://wa.me/77008650000?text=${encoded}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        orderType,
        setOrderType,
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        customerAddress,
        setCustomerAddress,
        paymentMethod,
        setPaymentMethod,
        generateWhatsAppOrderUrl,
        isHalalModalOpen,
        setIsHalalModalOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
