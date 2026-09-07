import React from 'react';
import { 
  MapPin, 
  Clock, 
  CreditCard, 
  Phone, 
  ExternalLink, 
  Navigation, 
  Car, 
  Footprints,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LocationSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="contact" className="py-14 sm:py-20 bg-[#F6F3F2]/70 border-t border-[#E5E2E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center sm:text-left mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D72626] mb-1 font-['Space_Grotesk']">
            {t('loc_eyebrow')}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B1B1C] font-['Plus_Jakarta_Sans'] mb-2">
            {t('loc_title')}
          </h2>
          <p className="text-sm sm:text-base text-[#716B65] max-w-2xl">
            {t('loc_sub')}
          </p>
        </div>

        {/* 2-Column Grid: Details on Left, 2GIS Map Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 3 Contact & Operational Info Cards */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Address Card */}
            <div className="bg-white p-6 rounded-3xl border border-[#F0EDED] shadow-xs hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-[#B20011] shrink-0 font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-black uppercase text-[#D72626] tracking-wider mb-1 font-['Space_Grotesk']">
                  {t('loc_address_title')}
                </div>
                <h3 className="text-base sm:text-lg font-black text-[#1B1B1C] mb-1">
                  {t('loc_address_text')}
                </h3>
                <p className="text-xs text-[#716B65] leading-relaxed">
                  {t('loc_address_detail')}
                </p>
              </div>
            </div>

            {/* Working Hours Card (24/7) */}
            <div className="bg-white p-6 rounded-3xl border border-[#F0EDED] shadow-xs hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-[#9D4300] shrink-0 font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-black uppercase text-[#9D4300] tracking-wider mb-1 font-['Space_Grotesk']">
                  {t('loc_hours_title')}
                </div>
                <h3 className="text-base sm:text-lg font-black text-[#1B1B1C] mb-1 flex items-center gap-2">
                  <span>{t('loc_hours_text')}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] inline-block animate-pulse"></span>
                </h3>
                <p className="text-xs text-[#716B65] leading-relaxed">
                  {t('loc_hours_detail')}
                </p>
              </div>
            </div>

            {/* Payment Methods Card */}
            <div className="bg-white p-6 rounded-3xl border border-[#F0EDED] shadow-xs hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#006529] shrink-0 font-bold">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-black uppercase text-[#006529] tracking-wider mb-1 font-['Space_Grotesk']">
                  {t('loc_payment_title')}
                </div>
                <h3 className="text-base sm:text-lg font-black text-[#1B1B1C] mb-1">
                  {t('loc_payment_text')}
                </h3>
                <p className="text-xs text-[#716B65] leading-relaxed">
                  {t('loc_payment_detail')}
                </p>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://wa.me/77008650000?text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC%D0%B5%D1%82%D1%81%D1%96%D0%B7%20%D0%B1%D0%B5%2C%20Don%20Rido!%20%D0%96%D0%B5%D1%82%D0%BA%D1%96%D0%B7%D1%83%20%D1%82%D0%B0%D0%BF%D1%81%D1%8B%D1%80%D1%8B%D1%81%D1%8B%D0%BD%20%D0%B1%D0%B5%D1%80%D0%B3%D1%96%D0%BC%20%D0%BA%D0%B5%D0%BB%D0%B5%D0%B4%D1%96"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#006529] hover:bg-[#008137] text-white py-3.5 px-5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
              >
                <span>💬 {t('loc_btn_whatsapp')}</span>
              </a>

              <a
                href="tel:+77008650000"
                className="flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-[#1E1E1E] border border-[#E5E2E1] py-3.5 px-5 rounded-full font-bold text-xs sm:text-sm shadow-xs transition-all"
              >
                <Phone className="w-4 h-4 text-[#D72626]" />
                <span className="font-['Space_Grotesk']">+7 (700) 865-00-00</span>
              </a>
            </div>

          </div>

          {/* Right Column: 2GIS Map Card matching flyer */}
          <div className="lg:col-span-6">
            <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#F0EDED] shadow-md relative overflow-hidden">
              
              {/* Top Navigation Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                    2GIS
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#1E1E1E]">
                      ЕНУ Бас ғимараты
                    </div>
                    <div className="text-[11px] text-[#716B65] flex items-center gap-1 font-medium">
                      <Footprints className="w-3 h-3 text-[#D72626]" />
                      <span>150 метр • 1–2 минуттық жаяу жол</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://2gis.kz/astana/search/%D0%9A%D0%B0%D0%B6%D1%8B%D0%BC%D1%83%D0%BA%D0%B0%D0%BD%D0%B0%2018%2F1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#006529] hover:underline flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200"
                >
                  <span>2GIS картасынан ашу</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Stylized Visual Map Illustration */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-zinc-200 bg-[#E8E6DF] select-none">
                
                {/* Map Grid / Streets */}
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Background green park area */}
                  <rect x="0" y="0" width="100%" height="100%" fill="#ECE9E2" />
                  <path d="M 20 20 L 140 20 L 120 180 L 10 160 Z" fill="#DCECD7" opacity="0.8" />
                  <path d="M 380 40 L 520 60 L 500 240 L 360 200 Z" fill="#DCECD7" opacity="0.8" />

                  {/* University Campus Blocks */}
                  <rect x="60" y="50" width="160" height="90" rx="8" fill="#D8D2C5" stroke="#BFB8A8" strokeWidth="2" />
                  <text x="75" y="90" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#47433B">ЕНУ Бас Ғимараты</text>
                  <text x="75" y="110" fontFamily="sans-serif" fontSize="10" fill="#716B65">Л.Н. Гумилев атындағы</text>

                  <rect x="250" y="30" width="110" height="70" rx="6" fill="#E2DCD1" stroke="#BFB8A8" strokeWidth="1.5" />
                  <text x="260" y="65" fontFamily="sans-serif" fontSize="10" fill="#5C403C">ЕНУ Студенттер Үйі</text>

                  {/* Street Roads */}
                  {/* Kazhymukan Street (horizontal/diagonal) */}
                  <line x1="0" y1="210" x2="600" y2="230" stroke="#FFFFFF" strokeWidth="36" />
                  <line x1="0" y1="210" x2="600" y2="230" stroke="#F5D884" strokeWidth="2" strokeDasharray="6 6" />

                  {/* Street Labels */}
                  <text x="30" y="215" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#786650" transform="rotate(2 30 215)">
                    ҚАЖЫМҰҚАН КӨШЕСІ (ул. Кажымукана)
                  </text>

                  {/* Cross street */}
                  <line x1="280" y1="0" x2="290" y2="400" stroke="#FFFFFF" strokeWidth="26" />
                  <text x="300" y="330" fontFamily="sans-serif" fontSize="10" fill="#8C7A68" transform="rotate(88 300 330)">
                    Қ. Мұңайтпасов көшесі
                  </text>

                  {/* Pedestrian dashed walking path */}
                  <path d="M 140 140 Q 180 180 230 200" fill="none" stroke="#D72626" strokeWidth="3" strokeDasharray="5 5" />

                  {/* Don Rido Restaurant Building at Kazhymukan 18/1 */}
                  <rect x="210" y="240" width="130" height="85" rx="10" fill="#D72626" stroke="#93000A" strokeWidth="2" />
                  <text x="230" y="275" fontFamily="sans-serif" fontSize="14" fontWeight="900" fill="#FFFFFF">DON RIDO</text>
                  <text x="230" y="295" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#FFE5E2">Қажымұқан к-сі, 18/1</text>
                  <text x="230" y="310" fontFamily="sans-serif" fontSize="9" fill="#FFC9C4">24/7 Тәулік бойы</text>
                </svg>

                {/* Animated Pin over Don Rido */}
                <div className="absolute top-[58%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-[#D72626] border-2 border-white shadow-xl flex items-center justify-center text-white text-xs font-black animate-bounce">
                      📍
                    </div>
                  </div>
                </div>

                {/* Floating Bottom Card over Map */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-zinc-200 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#006529]" />
                    <span className="text-xs font-bold text-[#1E1E1E]">
                      {language === 'kz' ? '20 автотұрақ орны қарастырылған' : 'Парковка на 20 мест у входа'}
                    </span>
                  </div>
                  <a
                    href="https://2gis.kz/astana/search/%D0%9A%D0%B0%D0%B6%D1%8B%D0%BC%D1%83%D0%BA%D0%B0%D0%BD%D0%B0%2018%2F1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#D72626] hover:underline"
                  >
                    2GIS →
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
