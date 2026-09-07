import React, { useState } from 'react';
import { Flame, Sparkles, ShoppingBag, Check, ArrowRight, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { MenuItem } from '../types';

export const PromotionsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToCart, setIsCartOpen } = useCart();

  // State for 2+1 promo selection
  const [promoMeat, setPromoMeat] = useState<'chicken' | 'beef'>('chicken');
  const [comboMeat, setComboMeat] = useState<'chicken' | 'beef'>('chicken');
  const [promoAdded, setPromoAdded] = useState(false);
  const [comboAdded, setComboAdded] = useState(false);

  // 2+1 promo item representation
  const promo2Plus1Item: MenuItem = {
    id: 'promo-2-plus-1',
    nameKz: 'АКЦИЯ 2+1: 3x Жарты метрлік донер (50 см)',
    nameRu: 'АКЦИЯ 2+1: 3x Полуметровых донера (50 см)',
    category: 'combos',
    descriptionKz: '3 бірдей 50 см жарты метрлік донер. 2-еуін төлеп, 3-шісін тегін алыңыз! (40% үнемдеу)',
    descriptionRu: '3 одинаковых полуметровых донера 50 см. Платите за 2, третий бесплатно! (Экономия 40%)',
    basePrice: 4380,
    priceOptions: [
      { labelKz: 'Тауық етімен (Куриный)', labelRu: 'С курицей (Куриный)', price: 4380, oldPrice: 8070 },
      { labelKz: 'Сиыр етімен (Говяжий)', labelRu: 'С говядиной (Говяжий)', price: 4780, oldPrice: 8670 },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=700&q=80',
    isHalal: true,
  };

  // Top Combo item representation
  const topComboItem: MenuItem = {
    id: 'top-combo-half-meter-cola',
    nameKz: 'ТОП КОМБО: Жарты метрлік донер + Coca-Cola 0.4L',
    nameRu: 'ТОП КОМБО: Полуметровый донер + Coca-Cola 0.4L',
    category: 'combos',
    descriptionKz: '50 см алып донер және салқын сергітетін Coca-Cola 0.4L.',
    descriptionRu: 'Огромный 50 см донер и прохладная освежающая Coca-Cola 0.4L.',
    basePrice: 2190,
    priceOptions: [
      { labelKz: 'Тауық етімен + 0.4L Cola', labelRu: 'С курицей + 0.4L Cola', price: 2190, oldPrice: 2600 },
      { labelKz: 'Сиыр етімен + 0.4L Cola', labelRu: 'С говядиной + 0.4L Cola', price: 2390, oldPrice: 2800 },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
    isHalal: true,
  };

  const handleAdd2Plus1 = () => {
    const opt = promoMeat === 'chicken' ? promo2Plus1Item.priceOptions[0] : promo2Plus1Item.priceOptions[1];
    addToCart(promo2Plus1Item, opt, 1);
    setPromoAdded(true);
    setTimeout(() => setPromoAdded(false), 1800);
  };

  const handleAddCombo = () => {
    const opt = comboMeat === 'chicken' ? topComboItem.priceOptions[0] : topComboItem.priceOptions[1];
    addToCart(topComboItem, opt, 1);
    setComboAdded(true);
    setTimeout(() => setComboAdded(false), 1800);
  };

  return (
    <section id="promos" className="py-12 sm:py-16 bg-[#F6F3F2]/70 border-y border-[#E5E2E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header from Flyer */}
        <div className="text-center sm:text-left mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D72626] mb-1 font-['Space_Grotesk']">
            <Flame className="w-4 h-4 fill-[#D72626]" />
            <span>{t('promos_eyebrow')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B1B1C] font-['Plus_Jakarta_Sans']">
            {t('promos_title')}
          </h2>
        </div>

        {/* 2 Big Promotional Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Card 1: АКЦИЯ 2 + 1 (Dominant Card) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#F0EDED] shadow-md hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between">
            {/* Background glowing gradient */}
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br from-[#D72626]/10 to-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#B20011] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-['Space_Grotesk'] shadow-xs">
                    АКЦИЯ 2 + 1
                  </span>
                  <span className="bg-amber-100 text-[#9D4300] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide font-['Space_Grotesk']">
                    ЖАРТЫ МЕТРЛІК ДОНЕР (50 СМ)
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#16A34A] flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> 40% үнемдеу
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-black text-[#1B1B1C] mb-2 leading-tight">
                {t('promo_2_plus_1_title')}
              </h3>
              <p className="text-sm text-[#716B65] mb-6 leading-relaxed">
                {t('promo_2_plus_1_desc')}
              </p>

              {/* Meat Selection Boxes with Price Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                
                {/* Chicken Option */}
                <div
                  onClick={() => setPromoMeat('chicken')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    promoMeat === 'chicken'
                      ? 'border-[#D72626] bg-red-50/60 shadow-xs'
                      : 'border-[#F0EDED] bg-[#FBF9F5] hover:border-zinc-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-[#1E1E1E]">
                      {t('promo_2_plus_1_chicken')}
                    </span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      promoMeat === 'chicken' ? 'border-[#D72626] bg-[#D72626]' : 'border-zinc-400'
                    }`}>
                      {promoMeat === 'chicken' && <Check className="w-3 h-3 text-white" />}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-black text-[#B20011] font-['Space_Grotesk']">
                      4 380 ₸
                    </span>
                    <span className="text-xs line-through text-[#716B65] font-['Space_Grotesk']">
                      8 070 ₸
                    </span>
                  </div>

                  <div className="mt-1 text-[11px] font-bold text-[#16A34A]">
                    3 690 ₸ {t('save_amount')}
                  </div>
                </div>

                {/* Beef Option */}
                <div
                  onClick={() => setPromoMeat('beef')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    promoMeat === 'beef'
                      ? 'border-[#D72626] bg-red-50/60 shadow-xs'
                      : 'border-[#F0EDED] bg-[#FBF9F5] hover:border-zinc-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-[#1E1E1E]">
                      {t('promo_2_plus_1_beef')}
                    </span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      promoMeat === 'beef' ? 'border-[#D72626] bg-[#D72626]' : 'border-zinc-400'
                    }`}>
                      {promoMeat === 'beef' && <Check className="w-3 h-3 text-white" />}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-black text-[#B20011] font-['Space_Grotesk']">
                      4 780 ₸
                    </span>
                    <span className="text-xs line-through text-[#716B65] font-['Space_Grotesk']">
                      8 670 ₸
                    </span>
                  </div>

                  <div className="mt-1 text-[11px] font-bold text-[#16A34A]">
                    3 890 ₸ {t('save_amount')}
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Actions & Terms */}
            <div className="pt-4 border-t border-[#F0EDED] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#716B65] italic">
                {t('promo_condition')}
              </span>

              <button
                onClick={handleAdd2Plus1}
                className={`w-full sm:w-auto px-6 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                  promoAdded
                    ? 'bg-[#006529] text-white'
                    : 'bg-[#FD761A] hover:bg-[#9D4300] text-white active:scale-95'
                }`}
              >
                {promoAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{language === 'kz' ? 'Себетке салынды!' : 'Добавлено в корзину!'}</span>
                  </>
                ) : (
                  <>
                    <span>{t('order_promo_btn')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2: ТОП КОМБО (50 CM + COLA 0.4L) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#F0EDED] shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              {/* Promo note on top from flyer */}
              <div className="text-xs text-[#716B65] mb-3 leading-tight">
                {language === 'kz' 
                  ? 'Достарыңмен немесе отбасыңмен келгенде керемет таңдау. Жарты метрлік донерге арнайы акция!'
                  : 'Отличный выбор при визите с друзьями или коллегами. Специальное комбо с напитком!'}
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#B20011] text-white text-xs font-black px-2.5 py-1 rounded-full uppercase font-['Space_Grotesk']">
                  {t('top_combo_badge')}
                </span>
                <span className="bg-zinc-100 text-zinc-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase font-['Space_Grotesk']">
                  50 CM + COLA
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl sm:text-2xl font-black text-[#1B1B1C] mb-2 leading-tight">
                {t('top_combo_title')}
              </h3>
              <p className="text-xs sm:text-sm text-[#716B65] mb-5 leading-relaxed">
                {t('top_combo_desc')}
              </p>

              {/* Meat Selection List */}
              <div className="space-y-2.5 mb-6">
                <div
                  onClick={() => setComboMeat('chicken')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    comboMeat === 'chicken'
                      ? 'border-[#D72626] bg-red-50/50'
                      : 'border-[#F0EDED] bg-[#FBF9F5] hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🍗</span>
                    <span className="text-xs font-bold text-[#1E1E1E]">
                      {language === 'kz' ? 'Тауық етімен + 0.4L Cola' : 'С курицей + 0.4L Cola'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-black text-[#D72626] font-['Space_Grotesk']">
                      2 190 ₸
                    </span>
                    <span className="text-xs line-through text-zinc-400 font-['Space_Grotesk']">
                      2 600 ₸
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setComboMeat('beef')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    comboMeat === 'beef'
                      ? 'border-[#D72626] bg-red-50/50'
                      : 'border-[#F0EDED] bg-[#FBF9F5] hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🥩</span>
                    <span className="text-xs font-bold text-[#1E1E1E]">
                      {language === 'kz' ? 'Сиыр етімен + 0.4L Cola' : 'С говядиной + 0.4L Cola'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-black text-[#D72626] font-['Space_Grotesk']">
                      2 390 ₸
                    </span>
                    <span className="text-xs line-through text-zinc-400 font-['Space_Grotesk']">
                      2 800 ₸
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddCombo}
              className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                comboAdded
                  ? 'bg-[#006529] text-white'
                  : 'bg-[#B20011] hover:bg-[#D72626] text-white active:scale-98'
              }`}
            >
              {comboAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{language === 'kz' ? 'Себетке қосылды!' : 'Добавлено в корзину!'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('add_to_cart')}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
