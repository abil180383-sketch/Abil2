import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Phone, 
  ExternalLink, 
  Flame, 
  Instagram, 
  MessageCircle, 
  Heart 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const { setIsHalalModalOpen } = useCart();
  const isKz = language === 'kz';

  return (
    <footer className="bg-[#1B1B1C] text-[#F3F0EF] pt-14 pb-10 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-zinc-800">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#B20011] text-white px-3.5 py-1.5 rounded-xl flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-300" />
                <span className="text-xl font-black tracking-tight font-['Plus_Jakarta_Sans']">
                  DON RIDO
                </span>
              </div>
              <button
                onClick={() => setIsHalalModalOpen(true)}
                className="flex items-center gap-1 text-[11px] bg-emerald-950/80 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded-full font-bold hover:bg-emerald-900 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>HALAL 100%</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              {isKz
                ? 'Дәмді, тойымды, халал донерлер мен фастфуд. Астана қаласы, Қажымұқан 18/1 (ЕНУ бас ғимараты маңында).'
                : 'Вкусные, сытные халал донеры и фастфуд в Астане. Ул. Кажымукана, 18/1 (возле главного корпуса ЕНУ).'}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://wa.me/77008650000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-rose-950/60 hover:bg-rose-900 text-rose-300 flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://2gis.kz/astana/search/%D0%9A%D0%B0%D0%B6%D1%8B%D0%BC%D1%83%D0%BA%D0%B0%D0%BD%D0%B0%2018%2F1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 text-amber-400 flex items-center justify-center text-xs font-black transition-colors"
                title="2GIS"
              >
                2G
              </a>
            </div>
          </div>

          {/* Working Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider font-['Space_Grotesk']">
              {isKz ? 'Жұмыс кестесі' : 'Режим работы'}
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-300">
              <div className="flex items-center gap-2 font-bold text-white">
                <Clock className="w-3.5 h-3.5 text-[#F97316]" />
                <span>{isKz ? 'Круглосуточно / 24/7' : 'Круглосуточно / 24/7'}</span>
              </div>
              <p className="text-zinc-400">
                {isKz ? 'Дүйсенбі — Жексенбі: Үзіліссіз' : 'Понедельник — Воскресенье: Без перерыва'}
              </p>
              <div className="inline-block mt-2 bg-zinc-800 text-emerald-400 text-[11px] font-bold px-2.5 py-1 rounded-full border border-zinc-700">
                {isKz ? 'Түнгі жеткізу қолжетімді' : 'Ночная доставка активна'}
              </div>
            </div>
          </div>

          {/* Navigation Sections (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider font-['Space_Grotesk']">
              {isKz ? 'Бөлімдер' : 'Разделы'}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  {isKz ? 'Тағам мәзірі (Донер, Сеттер)' : 'Меню блюд (Донеры, Сеты)'}
                </a>
              </li>
              <li>
                <a href="#promos" className="hover:text-white transition-colors">
                  {isKz ? 'Жеңілдіктер мен Акциялар' : 'Акции и Скидки (2+1)'}
                </a>
              </li>
              <li>
                <a href="#hall" className="hover:text-white transition-colors">
                  {isKz ? '50 орындық жайлы зал' : 'Уютный зал на 50 мест'}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  {isKz ? 'Қонақтардың пікірлері' : 'Отзывы гостей (2GIS)'}
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsHalalModalOpen(true)}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  {isKz ? 'ҚМДБ Халал стандарты' : 'Стандарт ДУМК Халал'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts & Delivery (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider font-['Space_Grotesk']">
              {isKz ? 'Байланыс & Жеткізу' : 'Контакты & Доставка'}
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="tel:+77008650000"
                className="flex items-center gap-2 font-black text-white text-base hover:text-red-400 transition-colors font-['Space_Grotesk']"
              >
                <Phone className="w-4 h-4 text-[#D72626]" />
                <span>+7 (700) 865-00-00</span>
              </a>

              <p className="text-zinc-400 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>Астана қ., Қажымұқан к-сі, 18/1</span>
              </p>

              <div className="text-zinc-400 text-[11px]">
                {isKz ? 'ЕНУ Бас ғимараты — 150 метр (1-2 мин)' : 'Главный корпус ЕНУ — 150 метров (1-2 мин)'}
              </div>

              <a
                href="https://2gis.kz/astana/search/%D0%9A%D0%B0%D0%B6%D1%8B%D0%BC%D1%83%D0%BA%D0%B0%D0%BD%D0%B0%2018%2F1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#62DF7D] hover:underline font-bold text-[11px]"
              >
                <span>2GIS картасынан ашу</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>
            © 2024 DON RIDO Fast Food. {isKz ? 'Барлық құқықтар қорғалған.' : 'Все права защищены.'}
          </div>
          <div>
            {isKz ? 'Астана қаласы бойынша 24/7 донер жеткізу' : 'Доставка донеров 24/7 по г. Астана'}
          </div>
        </div>

      </div>
    </footer>
  );
};
