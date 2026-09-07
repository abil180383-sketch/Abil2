import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Star, 
  Utensils, 
  Check, 
  ShoppingBag,
  Sparkles,
  Award,
  Zap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS } from '../data/menuData';

export const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToCart, setIsCartOpen, setIsHalalModalOpen } = useCart();
  
  // Featured item: 50cm doner (id: doner-half-meter-top)
  const featuredDoner = MENU_ITEMS.find(item => item.id === 'doner-half-meter-top') || MENU_ITEMS[0];
  const [selectedMeatIndex, setSelectedMeatIndex] = useState(0);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleQuickAdd = () => {
    const opt = featuredDoner.priceOptions[selectedMeatIndex];
    addToCart(featuredDoner, opt, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1800);
  };

  return (
    <section id="home" className="relative pt-6 pb-12 sm:pt-10 sm:pb-20 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#D72626]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Subtitles, Badges & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5">
            
            {/* 3 Pill Badges from the flyer */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsHalalModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EBF7EE] text-[#006529] border border-[#7FFC97]/40 hover:bg-[#D4FFD4] transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>{t('hero_tag_halal')}</span>
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                <Clock className="w-3.5 h-3.5 text-[#F97316]" />
                <span>{t('hero_tag_open')}</span>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-[#B20011] border border-rose-200 hover:bg-rose-100 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D72626]" />
                <span>{t('hero_tag_enu')}</span>
              </a>
            </div>

            {/* City & Street Reference */}
            <div className="text-xs font-bold tracking-wider text-[#9D4300] uppercase font-['Space_Grotesk']">
              {t('hero_location')}
            </div>

            {/* Main Headline from the flyer */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1B1B1C] leading-[1.08] font-['Plus_Jakarta_Sans']">
              <span>{t('hero_headline_1')} </span>
              <span className="text-[#D72626] relative inline-block">
                {t('hero_headline_2')}
                <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-[#D72626]/20 rounded-full"></span>
              </span>
            </h1>

            {/* Subtitle in Russian / Kazakh as in original flyer */}
            <p className="text-base sm:text-lg font-semibold text-[#5C403C]">
              {t('hero_subtitle')}
            </p>

            {/* Rich appetizing description */}
            <p className="text-sm sm:text-base text-[#716B65] leading-relaxed max-w-2xl">
              {t('hero_desc')}
            </p>

            {/* Key stats row from flyer */}
            <div className="w-full grid grid-cols-3 gap-2 sm:gap-4 py-2 border-y border-[#E5E2E1] my-2 bg-white/60 p-3 sm:p-4 rounded-2xl">
              <div>
                <div className="text-[11px] sm:text-xs text-[#716B65] font-medium">{t('stat_avg_check')}</div>
                <div className="text-base sm:text-xl font-bold text-[#D72626] font-['Space_Grotesk']">~2 800 ₸</div>
              </div>
              <div>
                <div className="text-[11px] sm:text-xs text-[#716B65] font-medium">{t('stat_prep_time')}</div>
                <div className="text-base sm:text-xl font-bold text-[#1B1B1C] font-['Space_Grotesk'] flex items-center gap-1">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500 hidden sm:inline" />
                  {t('stat_prep_val')}
                </div>
              </div>
              <div>
                <div className="text-[11px] sm:text-xs text-[#716B65] font-medium">{t('stat_guest_rating')}</div>
                <div className="text-base sm:text-xl font-bold text-[#1B1B1C] font-['Space_Grotesk'] flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.8</span>
                  <span className="text-xs text-[#716B65] font-normal">(302)</span>
                </div>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full pt-1">
              <a
                href="#menu"
                className="flex items-center justify-center gap-2.5 bg-[#D72626] hover:bg-[#B20011] text-white px-6 py-3.5 rounded-full font-bold text-base shadow-lg shadow-[#D72626]/25 hover:shadow-xl hover:shadow-[#D72626]/30 transition-all active:scale-98"
              >
                <Utensils className="w-4 h-4" />
                <span>{t('view_menu_btn')}</span>
              </a>

              <a
                href="https://wa.me/77008650000?text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC%D0%B5%D1%82%D1%81%D1%96%D0%B7%20%D0%B1%D0%B5%2C%20Don%20Rido!%20%D0%A2%D0%B0%D0%BF%D1%81%D1%8B%D1%80%D1%8B%D1%81%20%D0%B1%D0%B5%D1%80%D0%B3%D1%96%D0%BC%20%D0%BA%D0%B5%D0%BB%D0%B5%D0%B4%D1%96"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-[#006529] hover:bg-[#008137] text-white px-6 py-3.5 rounded-full font-bold text-base shadow-md hover:shadow-lg transition-all active:scale-98"
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">💬</span>
                <span>{t('whatsapp_order_btn')}</span>
              </a>
            </div>

            {/* Small discount notice from flyer */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#9D4300] bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
              <span>{t('discount_badge_text')}</span>
            </div>

          </div>

          {/* Right Column: Signature 50cm Doner Photo Card from Flyer */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-[#F0EDED] overflow-hidden group">
              
              {/* Top Corner Badge: "50 ЖАЙЛЫ ОРЫН" */}
              <div className="absolute top-6 right-6 z-10 bg-[#B20011] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md tracking-wide uppercase font-['Space_Grotesk']">
                {t('hero_card_badge')}
              </div>

              {/* High Quality Food Photo Container */}
              <div className="relative h-72 sm:h-84 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=85"
                  alt="Don Rido 50 cm жарты метрлік донер"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient overlay on bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Floating Bottom Card matching the flyer: "Жарты метрлік хит" */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-white/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-xl shrink-0">
                      🌯
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#1E1E1E] leading-tight">
                        {t('hero_card_title')}
                      </h4>
                      <p className="text-[11px] font-medium text-[#716B65]">
                        {t('hero_card_sub')}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-lg font-black text-[#D72626] font-['Space_Grotesk']">
                      2 190 ₸~
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Quick Add Controls for the Hero Card */}
              <div className="mt-4 pt-3 border-t border-[#F0EDED] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1E1E1E]">
                    {language === 'kz' ? 'Ет түрін таңдаңыз:' : 'Выберите мясо:'}
                  </span>
                  <span className="text-[#16A34A] font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 100% Halal
                  </span>
                </div>

                {/* Meat Selection Pills */}
                <div className="grid grid-cols-2 gap-2">
                  {featuredDoner.priceOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedMeatIndex(idx)}
                      className={`p-2 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                        selectedMeatIndex === idx
                          ? 'border-[#D72626] bg-red-50/70 text-[#B20011] shadow-xs'
                          : 'border-[#E5E2E1] bg-white text-[#1E1E1E] hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{language === 'kz' ? opt.labelKz : opt.labelRu}</span>
                      </div>
                      <div className="text-[#D72626] font-['Space_Grotesk'] mt-0.5">
                        {opt.price.toLocaleString('ru-RU')} ₸
                      </div>
                    </button>
                  ))}
                </div>

                {/* Instant Add to Cart Button */}
                <button
                  onClick={handleQuickAdd}
                  className={`w-full py-3 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    isAddedRecently 
                      ? 'bg-[#006529] text-white' 
                      : 'bg-[#D72626] hover:bg-[#B20011] text-white active:scale-98'
                  }`}
                >
                  {isAddedRecently ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{language === 'kz' ? 'Себетке қосылды!' : 'Добавлено в корзину!'}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{language === 'kz' ? 'Дәл қазір тапсырыс беру' : 'Заказать прямо сейчас'}</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
