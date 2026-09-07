import React from 'react';
import { ShieldCheck, CheckCircle, Award, FileText, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export const HalalModal: React.FC = () => {
  const { language } = useLanguage();
  const { isHalalModalOpen, setIsHalalModalOpen } = useCart();

  if (!isHalalModalOpen) return null;

  const isKz = language === 'kz';

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-emerald-100 animate-in zoom-in-95 duration-200 relative">
        
        {/* Close button */}
        <button
          onClick={() => setIsHalalModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 font-bold transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Emerald Badge */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#006529] font-black shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-[#006529] font-['Space_Grotesk']">
              ҚМДБ ХАЛАЛ ДАМУ
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#1B1B1C] leading-tight">
              {isKz ? '100% Халал Кепілдігі' : '100% Гарантия Халал'}
            </h3>
          </div>
        </div>

        {/* Description & Standards */}
        <div className="space-y-4 text-xs sm:text-sm text-[#5C403C] mb-6">
          <p className="leading-relaxed">
            {isKz
              ? 'DON RIDO мейрамханасында барлық тағамдар Қазақстан мұсылмандары діни басқармасының (ҚМДБ) "Халал Даму" стандартының қатаң талаптарына толықтай сәйкес дайындалады.'
              : 'Вся продукция сети DON RIDO строго соответствует исламским канонам и стандартам «Халал Даму» Духовного управления мусульман Казахстана (ДУМК).'}
          </p>

          <div className="bg-[#EBF7EE] p-4 rounded-2xl border border-[#7FFC97]/50 space-y-2.5 text-xs text-[#002109]">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span>
                <strong>{isKz ? '100% таза ет:' : '100% натуральное мясо:'}</strong>{' '}
                {isKz ? 'Тек сертификатталған отандық шаруашылықтардың табиғи сиыр және тауық еті.' : 'Только свежее проверенное мясо от сертифицированных отечественных поставщиков.'}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span>
                <strong>{isKz ? 'Қолдан жасалған табиғи соустар:' : 'Натуральные соусы:'}</strong>{' '}
                {isKz ? 'Ешқандай күмәнді қоспалар, алкоголь немесе зиянды консерванттар жоқ.' : 'Без сомнительных добавок, алкоголя и запрещенных консервантов.'}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span>
                <strong>{isKz ? 'Күнделікті балғындық пен тазалық:' : 'Ежедневная чистота кухни:'}</strong>{' '}
                {isKz ? 'Ас үй тазалығы халықаралық санитарлық нормаларға сай.' : 'Строгий санитарный контроль всех этапов приготовления блюд.'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <button
          onClick={() => setIsHalalModalOpen(false)}
          className="w-full bg-[#006529] hover:bg-[#008137] text-white py-3.5 rounded-xl font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
        >
          {isKz ? 'Түсінікті, рахмет!' : 'Понятно, спасибо!'}
        </button>

      </div>
    </div>
  );
};
