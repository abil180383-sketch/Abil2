import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Phone, 
  Menu as MenuIcon, 
  X,
  Flame,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { totalCount, totalPrice, setIsCartOpen, setIsHalalModalOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: t('nav_home') },
    { href: '#menu', label: t('nav_menu') },
    { href: '#promos', label: t('nav_promos'), badge: '2+1' },
    { href: '#hall', label: t('nav_hall') },
    { href: '#reviews', label: t('nav_reviews') },
    { href: '#contact', label: t('nav_contact') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#F0EDED] transition-all">
      {/* Top Announcement Bar from the flyer */}
      <div className="bg-[#1B1B1C] text-[#F3F0EF] text-xs font-medium py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left Info Badges */}
          <div className="flex items-center flex-wrap gap-3 sm:gap-6">
            <button 
              onClick={() => setIsHalalModalOpen(true)}
              className="flex items-center gap-1.5 text-[#62DF7D] hover:text-[#7FFC97] font-semibold transition-colors cursor-pointer"
              title="ҚМДБ Халал сертификаты туралы мәлімет"
            >
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>{t('halal_certified')}</span>
            </button>

            <div className="flex items-center gap-1.5 text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-[#F97316]" />
              <span>{t('open_24_7')}</span>
            </div>

            <a 
              href="#contact" 
              className="hidden md:flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D72626]" />
              <span>{t('near_enu')}</span>
            </a>
          </div>

          {/* Right Info Badges & Language Selector */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <a 
              href="#reviews" 
              className="flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-white">4.8</span>
              <span className="text-zinc-400 text-[11px]">(302)</span>
            </a>

            <div className="h-3 w-[1px] bg-zinc-700"></div>

            {/* Language switch KZ / RU */}
            <div className="flex items-center bg-zinc-800 rounded-full p-0.5 border border-zinc-700 text-[11px]">
              <button
                onClick={() => setLanguage('kz')}
                className={`px-2 py-0.5 rounded-full font-bold transition-all ${
                  language === 'kz' 
                    ? 'bg-[#D72626] text-white shadow-xs' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                KZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 py-0.5 rounded-full font-bold transition-all ${
                  language === 'ru' 
                    ? 'bg-[#D72626] text-white shadow-xs' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                RU
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand Logo matching the flyer */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="bg-[#B20011] group-hover:bg-[#D72626] transition-colors text-white px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-300 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight leading-none font-['Plus_Jakarta_Sans']">
                DON RIDO
              </span>
            </div>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-[#716B65] font-bold">
              DONER & FAST FOOD
            </span>
            <span className="text-xs font-semibold text-[#16A34A] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block animate-ping"></span>
              Ашық • 24/7 Астана
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3.5 py-2 text-sm font-semibold text-[#1E1E1E] hover:text-[#D72626] rounded-full hover:bg-[#F4EFEA] transition-all flex items-center gap-1.5"
            >
              {link.label}
              {link.badge && (
                <span className="bg-[#D72626] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Action Controls: Phone + Cart Drawer Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+77008650000"
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#1E1E1E] hover:text-[#D72626] px-3 py-2 rounded-full border border-[#E5E2E1] hover:border-[#D72626]/30 bg-white transition-all shadow-xs"
          >
            <Phone className="w-4 h-4 text-[#D72626]" />
            <span className="font-['Space_Grotesk']">+7 (700) 865-00-00</span>
          </a>

          {/* Cart Button with Count Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2.5 bg-[#D72626] hover:bg-[#B20011] active:scale-95 text-white px-4 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            id="cart-toggle-btn"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{t('order_btn')}</span>
            {totalCount > 0 && (
              <span className="bg-white text-[#D72626] text-xs font-black px-2 py-0.5 rounded-full font-['Space_Grotesk'] shadow-xs">
                {totalCount} • {totalPrice.toLocaleString('ru-RU')} ₸
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white border border-[#E5E2E1] text-[#1E1E1E] hover:text-[#D72626] focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5E2E1] px-5 py-4 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-zinc-100">
            <button 
              onClick={() => { setIsHalalModalOpen(true); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Halal ҚМДБ
            </button>
            <a 
              href="tel:+77008650000"
              className="flex items-center gap-2 p-2 rounded-lg bg-red-50 text-red-800 text-xs font-bold"
            >
              <Phone className="w-4 h-4 text-red-600" />
              +7 (700) 865-00-00
            </a>
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-[#1E1E1E] hover:bg-[#FBF9F5] hover:text-[#D72626]"
              >
                <span>{link.label}</span>
                {link.badge ? (
                  <span className="bg-[#D72626] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {link.badge}
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                )}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full bg-[#D72626] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t('cart')} ({totalCount}) — {totalPrice.toLocaleString('ru-RU')} ₸</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
