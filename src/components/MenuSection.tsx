import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Search, 
  ShoppingBag, 
  Check, 
  Plus, 
  Minus, 
  Flame, 
  Sparkles,
  Clock,
  Filter
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS } from '../data/menuData';
import { CategoryId, MenuItem, PriceOption } from '../types';

export const MenuSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToCart, setIsHalalModalOpen } = useCart();

  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Track selected price option index per item id
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});

  const categories: { id: CategoryId; label: string }[] = [
    { id: 'all', label: t('tab_all') },
    { id: 'combos', label: t('tab_combos') },
    { id: 'doners', label: t('tab_doners') },
    { id: 'snacks', label: t('tab_snacks') },
    { id: 'drinks', label: t('tab_drinks') },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const nameMatch = 
        item.nameKz.toLowerCase().includes(query) ||
        item.nameRu.toLowerCase().includes(query) ||
        item.descriptionKz.toLowerCase().includes(query) ||
        item.descriptionRu.toLowerCase().includes(query);

      return matchesCategory && nameMatch;
    });
  }, [activeCategory, searchQuery]);

  const handleSelectOption = (itemId: string, index: number) => {
    setSelectedOptions(prev => ({ ...prev, [itemId]: index }));
  };

  const handleAddItem = (item: MenuItem) => {
    const selectedIdx = selectedOptions[item.id] || 0;
    const option = item.priceOptions[selectedIdx] || item.priceOptions[0];
    addToCart(item, option, 1);

    // Trigger visual checkmark
    setAddedAnimation(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedAnimation(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section id="menu" className="py-12 sm:py-20 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Halal Quality Assurance Seal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#D72626] mb-1 font-['Space_Grotesk']">
              {t('menu_eyebrow')}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B1B1C] font-['Plus_Jakarta_Sans']">
              {t('menu_title')}
            </h2>
          </div>

          {/* Halal Stamp on the right matching flyer */}
          <div 
            onClick={() => setIsHalalModalOpen(true)}
            className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-emerald-200 shadow-xs hover:border-emerald-300 transition-colors cursor-pointer self-start md:self-auto"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-[#16A34A] shrink-0 font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-[#006529] uppercase font-['Space_Grotesk']">
                {t('halal_seal_title')}
              </div>
              <div className="text-[11px] text-[#716B65] font-medium">
                {t('halal_seal_sub')}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills & Search Input */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          
          {/* Scrollable Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#D72626] text-white shadow-md'
                    : 'bg-white text-[#716B65] hover:text-[#1E1E1E] border border-[#E5E2E1] hover:border-zinc-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-[#716B65] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#E5E2E1] focus:border-[#D72626] rounded-full outline-hidden transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Menu Items Grid matching flyer layout */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#F0EDED]">
            <p className="text-base font-semibold text-[#716B65]">
              {language === 'kz' ? 'Тағам табылмады. Басқа сөз жазып көріңіз.' : 'Блюда не найдены. Попробуйте изменить запрос.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const selectedIdx = selectedOptions[item.id] || 0;
              const currentOption = item.priceOptions[selectedIdx] || item.priceOptions[0];
              const isAdded = !!addedAnimation[item.id];

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-5 border border-[#F0EDED] hover:border-[#D72626]/30 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header Row: Tag & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#9D4300] font-['Space_Grotesk']">
                        {language === 'kz' ? item.tagKz : item.tagRu}
                      </span>

                      {item.badgeKz && (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase font-['Space_Grotesk'] ${
                          item.badgeColor === 'red'
                            ? 'bg-red-100 text-[#B20011]'
                            : item.badgeColor === 'green'
                            ? 'bg-emerald-100 text-[#006529]'
                            : 'bg-amber-100 text-[#9D4300]'
                        }`}>
                          {language === 'kz' ? item.badgeKz : item.badgeRu}
                        </span>
                      )}
                    </div>

                    {/* Image / Thumbnail */}
                    <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-stone-100 mb-4">
                      <img
                        src={item.imageUrl}
                        alt={item.nameKz}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      {item.preparationMinutes && (
                        <div className="absolute bottom-2 right-2 bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>{item.preparationMinutes} мин</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black text-[#1B1B1C] mb-1.5 leading-snug group-hover:text-[#D72626] transition-colors">
                      {language === 'kz' ? item.nameKz : item.nameRu}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#716B65] mb-4 leading-relaxed line-clamp-3">
                      {language === 'kz' ? item.descriptionKz : item.descriptionRu}
                    </p>

                    {/* Price Options / Meat Selection (Radio Pills) */}
                    {item.priceOptions.length > 1 && (
                      <div className="space-y-1.5 mb-4">
                        <div className="text-[11px] font-bold text-[#1E1E1E]">
                          {language === 'kz' ? 'Нұсқаны таңдаңыз:' : 'Выберите вариант:'}
                        </div>
                        <div className="grid grid-cols-1 gap-1.5">
                          {item.priceOptions.map((opt, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSelectOption(item.id, idx)}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                                selectedIdx === idx
                                  ? 'border-[#D72626] bg-red-50/60 text-[#B20011] font-bold'
                                  : 'border-[#F0EDED] bg-[#FBF9F5] text-[#1E1E1E] hover:border-zinc-300'
                              }`}
                            >
                              <span>{language === 'kz' ? opt.labelKz : opt.labelRu}</span>
                              <div className="flex items-center gap-1.5">
                                <span className="font-['Space_Grotesk'] font-bold">
                                  {opt.price.toLocaleString('ru-RU')} ₸
                                </span>
                                {opt.oldPrice && (
                                  <span className="text-[10px] line-through text-zinc-400">
                                    {opt.oldPrice.toLocaleString('ru-RU')} ₸
                                  </span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Price & Add to Cart Button */}
                  <div className="pt-3 border-t border-[#F0EDED] flex items-center justify-between gap-3 mt-2">
                    <div>
                      <div className="text-lg sm:text-xl font-black text-[#D72626] font-['Space_Grotesk']">
                        {currentOption.price.toLocaleString('ru-RU')} ₸
                      </div>
                      {currentOption.oldPrice && (
                        <div className="text-xs line-through text-[#716B65] font-['Space_Grotesk']">
                          {currentOption.oldPrice.toLocaleString('ru-RU')} ₸
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddItem(item)}
                      className={`px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                        isAdded
                          ? 'bg-[#006529] text-white'
                          : 'bg-[#D72626] hover:bg-[#B20011] text-white active:scale-95'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{language === 'kz' ? 'Себетте' : 'В корзине'}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{t('order_btn')}</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
