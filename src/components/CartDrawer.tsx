import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  QrCode, 
  CreditCard, 
  Banknote,
  Bike,
  Store,
  Utensils
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart, OrderType } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { language } = useLanguage();
  const {
    items,
    updateQuantity,
    removeFromCart,
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
  } = useCart();

  const [isKaspiModalOpen, setIsKaspiModalOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  if (!isCartOpen) return null;

  const isKz = language === 'kz';

  const handleWhatsAppCheckout = () => {
    const url = generateWhatsAppOrderUrl();
    window.open(url, '_blank');
  };

  const handleKaspiSimulate = () => {
    setIsKaspiModalOpen(true);
  };

  const handleConfirmKaspi = () => {
    setIsKaspiModalOpen(false);
    setIsOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setIsOrderPlaced(false);
      setIsCartOpen(false);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#F0EDED] flex items-center justify-between bg-[#FBF9F5]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-[#D72626]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#1B1B1C]">
                  {isKz ? 'Сіздің себетіңіз' : 'Ваша корзина'}
                </h3>
                <div className="text-xs text-[#716B65]">
                  {totalCount} {isKz ? 'тағам таңдалды' : 'блюд выбрано'}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-zinc-200/70 hover:bg-zinc-300 flex items-center justify-center text-zinc-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {isOrderPlaced ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#006529] mx-auto flex items-center justify-center mb-4">
                  <Check className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-black text-[#1B1B1C] mb-2">
                  {isKz ? 'Тапсырысыңыз қабылданды!' : 'Заказ успешно принят!'}
                </h4>
                <p className="text-xs text-[#716B65]">
                  {isKz 
                    ? 'Don Rido шеберлері тағамыңызды әзірлеуге кірісті. 5-7 минутта дайын болады!' 
                    : 'Повара Don Rido уже приступили к приготовлению. Заказ будет готов через 5-7 минут!'}
                </p>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-[#F6F3F2] text-zinc-400 mx-auto flex items-center justify-center mb-3 text-3xl">
                  🌯
                </div>
                <h4 className="text-base font-bold text-[#1B1B1C] mb-1">
                  {isKz ? 'Себет әзірге бос' : 'Корзина пока пуста'}
                </h4>
                <p className="text-xs text-[#716B65] max-w-xs mx-auto mb-6">
                  {isKz
                    ? 'Мәзірден жарты метрлік донер немесе комбо сеттерді таңдаңыз.'
                    : 'Выберите вкуснейший полуметровый донер или комбо сет из меню.'}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#D72626] hover:bg-[#B20011] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md"
                >
                  {isKz ? 'Мәзірге өту' : 'Перейти в меню'}
                </button>
              </div>
            ) : (
              <>
                {/* List of Cart Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="p-3 bg-[#FBF9F5] rounded-2xl border border-[#F0EDED] flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-[#1B1B1C] truncate">
                          {isKz ? item.menuItem.nameKz : item.menuItem.nameRu}
                        </h4>
                        <div className="text-[11px] text-[#9D4300] font-medium truncate">
                          {isKz ? item.selectedOption.labelKz : item.selectedOption.labelRu}
                        </div>
                        <div className="text-xs font-black text-[#D72626] font-['Space_Grotesk'] mt-0.5">
                          {(item.selectedOption.price * item.quantity).toLocaleString('ru-RU')} ₸
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-white border border-[#E5E2E1] rounded-full p-1 shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#1E1E1E] w-5 text-center font-['Space_Grotesk']">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-zinc-400 hover:text-red-600 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Order Type Tabs */}
                <div className="pt-2">
                  <div className="text-xs font-bold text-[#1E1E1E] mb-2">
                    {isKz ? 'Тапсырыс түрі:' : 'Тип получения заказа:'}
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 bg-zinc-100 p-1 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                        orderType === 'delivery'
                          ? 'bg-white text-[#D72626] shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <Bike className="w-3.5 h-3.5" />
                      <span>{isKz ? 'Жеткізу' : 'Доставка'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                        orderType === 'takeaway'
                          ? 'bg-white text-[#D72626] shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <Store className="w-3.5 h-3.5" />
                      <span>{isKz ? 'Алып кету' : 'С собой'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('dine_in')}
                      className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                        orderType === 'dine_in'
                          ? 'bg-white text-[#D72626] shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>{isKz ? 'Кафеде' : 'В зале'}</span>
                    </button>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-2 pt-1 text-xs">
                  <div>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={isKz ? 'Есіміңіз (Аты-жөні)' : 'Ваше имя'}
                      className="w-full px-3.5 py-2 bg-[#FBF9F5] border border-[#E5E2E1] rounded-xl outline-hidden focus:border-[#D72626]"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder={isKz ? 'Телефон: +7 (700) 000-00-00' : 'Телефон: +7 (700) 000-00-00'}
                      className="w-full px-3.5 py-2 bg-[#FBF9F5] border border-[#E5E2E1] rounded-xl outline-hidden focus:border-[#D72626]"
                    />
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <input
                        type="text"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder={isKz ? 'Жеткізу мекен-жайы (Көше, үй, пәтер)' : 'Адрес доставки (Улица, дом, кв.)'}
                        className="w-full px-3.5 py-2 bg-[#FBF9F5] border border-[#E5E2E1] rounded-xl outline-hidden focus:border-[#D72626]"
                      />
                    </div>
                  )}
                </div>

                {/* Payment Method Selector */}
                <div>
                  <div className="text-xs font-bold text-[#1E1E1E] mb-2">
                    {isKz ? 'Төлем әдісі:' : 'Способ оплаты:'}
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('kaspi')}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === 'kaspi'
                          ? 'border-[#D72626] bg-red-50 text-[#B20011]'
                          : 'border-[#E5E2E1] bg-white text-zinc-700'
                      }`}
                    >
                      <QrCode className="w-4 h-4 text-red-600" />
                      <span>Kaspi QR</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#D72626] bg-red-50 text-[#B20011]'
                          : 'border-[#E5E2E1] bg-white text-zinc-700'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span>{isKz ? 'Карта' : 'Карта'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === 'cash'
                          ? 'border-[#D72626] bg-red-50 text-[#B20011]'
                          : 'border-[#E5E2E1] bg-white text-zinc-700'
                      }`}
                    >
                      <Banknote className="w-4 h-4 text-emerald-600" />
                      <span>{isKz ? 'Қолма-қол' : 'Наличные'}</span>
                    </button>
                  </div>
                </div>

              </>
            )}
          </div>

          {/* Footer with Totals & Primary Actions */}
          {items.length > 0 && !isOrderPlaced && (
            <div className="p-4 sm:p-5 border-t border-[#F0EDED] bg-[#FBF9F5] space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[#716B65]">
                  <span>{isKz ? 'Тағамдар сомасы:' : 'Сумма блюд:'}</span>
                  <span className="font-['Space_Grotesk'] font-bold">{totalPrice.toLocaleString('ru-RU')} ₸</span>
                </div>
                <div className="flex justify-between text-[#716B65]">
                  <span>{isKz ? 'Жеткізу:' : 'Доставка:'}</span>
                  <span className="text-[#006529] font-bold">
                    {orderType === 'delivery' ? (isKz ? 'Тариф бойынша' : 'По тарифу') : (isKz ? 'Тегін (0 ₸)' : 'Бесплатно')}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[#1B1B1C] pt-2 border-t border-[#E5E2E1]">
                  <span>{isKz ? 'Барлығы:' : 'Итого к оплате:'}</span>
                  <span className="text-[#D72626] font-['Space_Grotesk'] text-xl">
                    {totalPrice.toLocaleString('ru-RU')} ₸
                  </span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-[#006529] hover:bg-[#008137] active:scale-98 text-white py-3 rounded-xl font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span className="text-base">💬</span>
                  <span>{isKz ? 'WhatsApp арқылы жіберу' : 'Отправить заказ в WhatsApp'}</span>
                </button>

                <button
                  onClick={handleKaspiSimulate}
                  className="w-full bg-[#B20011] hover:bg-[#D72626] active:scale-98 text-white py-3 rounded-xl font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>{isKz ? 'Kaspi QR арқылы төлеу' : 'Оплатить через Kaspi QR'}</span>
                </button>
              </div>

              <div className="text-[11px] text-center text-[#716B65]">
                {isKz 
                  ? 'Тапсырыс дереу Don Rido асханасына жетеді • 24/7' 
                  : 'Заказ моментально поступит на кухню Don Rido • 24/7'}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Kaspi QR Modal */}
      {isKaspiModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center">
                  K
                </div>
                <span className="font-extrabold text-sm text-zinc-900">Kaspi.kz QR</span>
              </div>
              <button 
                onClick={() => setIsKaspiModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-red-50 rounded-2xl border border-red-100 mb-4 flex flex-col items-center">
              <div className="w-44 h-44 bg-white p-3 rounded-xl border border-zinc-200 shadow-xs flex items-center justify-center mb-2">
                {/* Simulated QR Code SVG */}
                <svg className="w-full h-full text-zinc-900" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" />
                  <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" />
                  <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" />
                  <rect x="45" y="15" width="8" height="8" />
                  <rect x="45" y="30" width="8" height="15" />
                  <rect x="60" y="45" width="10" height="10" />
                  <rect x="75" y="45" width="15" height="8" />
                  <rect x="45" y="60" width="10" height="10" />
                  <rect x="60" y="60" width="25" height="10" />
                  <rect x="45" y="75" width="15" height="15" />
                  <rect x="65" y="75" width="10" height="15" />
                  <rect x="80" y="75" width="10" height="15" />
                </svg>
              </div>

              <div className="text-xl font-black text-[#D72626] font-['Space_Grotesk']">
                {totalPrice.toLocaleString('ru-RU')} ₸
              </div>
              <div className="text-[11px] text-zinc-600 font-semibold">
                Don Rido Fast Food (Қажымұқан 18/1)
              </div>
            </div>

            <p className="text-xs text-zinc-600 mb-4">
              {isKz 
                ? 'Kaspi қосымшасындағы QR сканерін ашып, төлемді растаңыз.' 
                : 'Откройте QR-сканер в приложении Kaspi и подтвердите оплату.'}
            </p>

            <button
              onClick={handleConfirmKaspi}
              className="w-full bg-[#006529] hover:bg-[#008137] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md"
            >
              {isKz ? 'Төлемді растау' : 'Подтвердить оплату'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
