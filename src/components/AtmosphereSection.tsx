import React from 'react';
import { Clock, ShieldCheck, Wifi, Users, Sparkles, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export const AtmosphereSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { setIsHalalModalOpen } = useCart();

  return (
    <section id="hall" className="py-14 sm:py-20 bg-[#F6F3F2]/60 border-t border-[#E5E2E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D72626] mb-1 font-['Space_Grotesk']">
            <Sparkles className="w-4 h-4 text-[#D72626]" />
            <span>{t('hall_eyebrow')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B1B1C] font-['Plus_Jakarta_Sans'] mb-3">
            {t('hall_title')}
          </h2>
          <p className="text-sm sm:text-base text-[#716B65] leading-relaxed">
            {t('hall_desc')}
          </p>
        </div>

        {/* Atmosphere Layout: Photo on Left, 3 Feature Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Photo of the 50-seat Hall */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-stone-900 group">
              
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85"
                alt="Don Rido 50 орындық жайлы залы"
                className="w-full h-80 sm:h-96 md:h-110 object-cover opacity-90 group-hover:scale-103 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

              {/* Top Badge: 50 орынға дейін */}
              <div className="absolute top-4 right-4 bg-[#D72626] text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg font-['Space_Grotesk'] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>50 орынға дейін</span>
              </div>

              {/* Brand Hallmark overlay on photo matching flyer */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans']">
                    DON RIDO
                  </span>
                  <span className="text-xs bg-amber-400 text-black font-extrabold px-2 py-0.5 rounded-sm">
                    Залы
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  Астана қ., Қажымұқан 18/1 (ЕНУ 150м)
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: 3 Feature Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Card 1: Fast service (5 min) */}
            <div className="bg-white p-5 rounded-2xl border border-[#F0EDED] shadow-xs hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-[#B20011] shrink-0 font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#1B1B1C] mb-1">
                  {t('hall_f1_title')}
                </h3>
                <p className="text-xs text-[#716B65] leading-relaxed">
                  {t('hall_f1_desc')}
                </p>
              </div>
            </div>

            {/* Card 2: 100% Halal guarantee */}
            <div 
              onClick={() => setIsHalalModalOpen(true)}
              className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs hover:shadow-md transition-all flex items-start gap-4 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-[#006529] shrink-0 font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-[#006529] mb-1">
                    {t('hall_f2_title')}
                  </h3>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    ҚМДБ
                  </span>
                </div>
                <p className="text-xs text-[#716B65] leading-relaxed">
                  {t('hall_f2_desc')}
                </p>
              </div>
            </div>

            {/* Card 3: Free Wi-Fi & Charging */}
            <div className="bg-white p-5 rounded-2xl border border-[#F0EDED] shadow-xs hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-[#9D4300] shrink-0 font-bold">
                <Wifi className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#1B1B1C] mb-1">
                  {t('hall_f3_title')}
                </h3>
                <p className="text-xs text-[#716B65] leading-relaxed">
                  {t('hall_f3_desc')}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
