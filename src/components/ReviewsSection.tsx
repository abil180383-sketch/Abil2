import React, { useState } from 'react';
import { Star, ThumbsUp, ShieldCheck, MessageSquare, Plus, Check, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { REVIEWS_DATA } from '../data/reviewsData';
import { ReviewItem } from '../types';

export const ReviewsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_DATA);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New review form states
  const [formAuthor, setFormAuthor] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLike = (id: string) => {
    setLikesMap(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor.trim() || !formText.trim()) return;

    const newRev: ReviewItem = {
      id: `custom-${Date.now()}`,
      author: formAuthor,
      avatarColor: 'bg-[#B20011]',
      source: '2GIS • Жаңа пікір',
      tagKz: 'Тексерілген қонақ',
      tagRu: 'Проверенный отзыв',
      rating: formRating,
      dateKz: 'Жаңа ғана',
      dateRu: 'Только что',
      textKz: formText,
      textRu: formText,
      likes: 1,
      verified: true,
      highlightKz: 'Жаңа бағалау',
      highlightRu: 'Новая оценка',
    };

    setReviews([newRev, ...reviews]);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setFormAuthor('');
      setFormText('');
      setFormRating(5);
    }, 1500);
  };

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#D72626] mb-1 font-['Space_Grotesk']">
              {t('reviews_eyebrow')}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B1B1C] font-['Plus_Jakarta_Sans']">
              {t('reviews_title')}
            </h2>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white text-[#1E1E1E] hover:text-[#D72626] border border-[#E5E2E1] hover:border-[#D72626]/40 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-xs transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#D72626]" />
            <span>{t('write_review_btn')}</span>
          </button>
        </div>

        {/* 4 Stats Cards matching flyer */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          
          <div className="bg-white p-5 rounded-3xl border border-[#F0EDED] shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl sm:text-4xl font-black text-[#1B1B1C] font-['Space_Grotesk']">
                4.8
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-xs text-[#716B65] font-medium">
              302-ден астам бағалау (2GIS)
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#F0EDED] shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-[#D72626] font-['Space_Grotesk'] mb-1">
              5 мин
            </div>
            <div className="text-xs text-[#716B65] font-medium">
              {language === 'kz' ? 'Орташа дайындау' : 'Среднее время готовки'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#F0EDED] shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-[#006529] font-['Space_Grotesk'] mb-1">
              100%
            </div>
            <div className="text-xs text-[#716B65] font-medium">
              {language === 'kz' ? 'ҚМДБ Халал еті' : 'Мясо ДУМК Халал'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#F0EDED] shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-[#9D4300] font-['Space_Grotesk'] mb-1">
              24 Сағат
            </div>
            <div className="text-xs text-[#716B65] font-medium">
              {language === 'kz' ? 'Түнгі үзіліссіз жұмыс' : 'Круглосуточно без пауз'}
            </div>
          </div>

        </div>

        {/* Highlight Recommendation Banner from Flyer */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-3.5 mb-8 flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-[#D72626] text-white flex items-center justify-center font-bold text-sm shrink-0">
            ✓
          </span>
          <p className="text-xs sm:text-sm font-semibold text-[#B20011]">
            {t('reviews_stat_rec')}
          </p>
        </div>

        {/* 6 Reviews Grid from Flyer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map(rev => {
            const extraLikes = likesMap[rev.id] || 0;
            const totalLikes = rev.likes + extraLikes;

            return (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-5 border border-[#F0EDED] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Author Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-full ${rev.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0`}>
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-[#1B1B1C] leading-tight">
                          {rev.author}
                        </h4>
                        <div className="text-[10px] text-[#716B65]">
                          {rev.source}
                        </div>
                      </div>
                    </div>

                    {rev.verified && (
                      <span className="bg-emerald-50 text-[#006529] text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{language === 'kz' ? rev.tagKz : rev.tagRu}</span>
                      </span>
                    )}
                  </div>

                  {/* Stars Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[10px] text-zinc-400 ml-1">
                      {language === 'kz' ? rev.dateKz : rev.dateRu}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs text-[#1E1E1E] leading-relaxed mb-3">
                    «{language === 'kz' ? rev.textKz : rev.textRu}»
                  </p>

                  {/* Official reply if present */}
                  {rev.replyKz && (
                    <div className="bg-amber-50/70 rounded-xl p-2.5 border border-amber-200/60 mb-3 text-[11px] text-[#9D4300]">
                      <div className="font-bold flex items-center gap-1 mb-0.5">
                        <MessageSquare className="w-3 h-3" />
                        <span>Don Rido</span>
                      </div>
                      <div>{language === 'kz' ? rev.replyKz : rev.replyRu}</div>
                    </div>
                  )}
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-3 border-t border-[#F0EDED] flex items-center justify-between text-xs text-[#716B65]">
                  <span className="text-[11px] font-medium text-emerald-700">
                    {rev.highlightKz ? (language === 'kz' ? rev.highlightKz : rev.highlightRu) : '2GIS расталған'}
                  </span>

                  <button
                    onClick={() => handleLike(rev.id)}
                    className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-[#D72626] transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{totalLikes}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal: Write a Review */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-[#1B1B1C]">
                  {language === 'kz' ? 'Пікір қалдыру' : 'Оставить отзыв'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 font-bold"
                >
                  ✕
                </button>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#006529] mx-auto flex items-center justify-center mb-3">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-zinc-900 mb-1">
                    {language === 'kz' ? 'Рахмет! Пікіріңіз қабылданды.' : 'Спасибо! Ваш отзыв принят.'}
                  </h4>
                  <p className="text-xs text-zinc-500">
                    {language === 'kz' ? 'Don Rido қонақтарына көмегіңіз үшін алғыс айтамыз.' : 'Благодарим за обратную связь о Don Rido.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1E1E] mb-1">
                      {language === 'kz' ? 'Сіздің атыңыз:' : 'Ваше имя:'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formAuthor}
                      onChange={(e) => setFormAuthor(e.target.value)}
                      placeholder={language === 'kz' ? 'Мысалы: Айгүл, Арман' : 'Например: Айгуль, Арман'}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E5E2E1] rounded-xl outline-hidden focus:border-[#D72626]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E1E1E] mb-1">
                      {language === 'kz' ? 'Бағаңыз:' : 'Ваша оценка:'}
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setFormRating(star)}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              formRating >= star
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-zinc-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-zinc-700 ml-2">
                        {formRating} / 5
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E1E1E] mb-1">
                      {language === 'kz' ? 'Пікіріңіз:' : 'Ваш отзыв:'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formText}
                      onChange={(e) => setFormText(e.target.value)}
                      placeholder={language === 'kz' ? 'Дәмі, қызмет көрсетуі, тазалығы туралы жазыңыз...' : 'Опишите вкус, скорость, чистоту и обслуживание...'}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#E5E2E1] rounded-xl outline-hidden focus:border-[#D72626]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D72626] hover:bg-[#B20011] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    {language === 'kz' ? 'Пікірді жіберу' : 'Отправить отзыв'}
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
