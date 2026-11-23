import React from 'react';
import { Crown, ArrowRight } from 'lucide-react';

export default function KarnatakaShowcase({ onExploreCategory }) {
  const heritagePillars = [
    {
      title: 'Arishina Shastra (ಅರಿಶಿನ ಶಾಸ್ತ್ರ)',
      category: 'Haldi',
      tag: 'Sacred Turmeric Ritual',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      description: 'The auspicious prelude to Karnataka weddings. Relatives apply pure Kasturi turmeric in ornate brass Gangaala urlis adorned with yellow and orange marigold flowers.',
      culturalTouch: 'Symbolizes purity, radiance, and divine blessings before the muhurtham.'
    },
    {
      title: 'Kalyana & Baale Kamba (ಕಲ್ಯಾಣ ಮತ್ತು ಬಾಳೆ ಕಂಬ)',
      category: 'Marriage',
      tag: 'Mysore Heritage Mandapam',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      description: 'Grand mandapams framed with fresh banana stems (Baale Kamba) and mango leaf thorana. Brides adorned with Moggu Jade (jasmine hair ornament) and Mysore silk.',
      culturalTouch: 'The banana plant represents eternal fertility and auspicious abundance.'
    },
    {
      title: 'Seemantha & Thottilu (ಸೀಮಂತ ಮತ್ತು ತೊಟ್ಟಿಲು)',
      category: 'Baby Shower',
      tag: 'Cradle & Blessing Ceremony',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
      description: 'Welcoming mother and child with traditional Bale Todisuvudu (glass bangles) and placing the newborn in a rosewood or teak carved cradle draped in fresh Mysore Mallige.',
      culturalTouch: 'Soulful lullabies (Jogula) and 5-variety sweet rice offerings.'
    },
    {
      title: 'Dasara Utsava & Gombe Habba (ದಸರಾ ಮತ್ತು ಗೊಂಬೆ ಹಬ್ಬ)',
      category: 'Karnataka Special',
      tag: 'Royal Festivities',
      image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=600&q=80',
      description: 'Celebrating the majesty of Karnataka with royal illumination inspired by Amba Vilas Palace, 7-tiered traditional dolls displays, and traditional music troupes.',
      culturalTouch: 'Live Nadaswaram, Dollu Kunitha folk drums, and royal Mysore hospitality.'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-stone-50 via-amber-50/40 to-stone-50 border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-200/60 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Crown className="w-4 h-4 text-amber-700" />
            <span>ಕರ್ನಾಟಕದ ಸಂಭ್ರಮ • The Soul of Karnataka Celebrations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Sacred Rituals, Royal Heritage & Timeless Elegance
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            At CelebrationCraft, every milestone is deeply rooted in Karnataka’s cherished customs. Discover how we honor traditions with authentic materials, artisan florals, and royal finesse.
          </p>
        </div>

        {/* 4 Cultural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {heritagePillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-stone-900">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                    {pillar.tag}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-[11px] text-amber-900">
                    <span className="font-semibold block text-amber-800 mb-0.5">Heritage Significance:</span>
                    <p className="italic">{pillar.culturalTouch}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => onExploreCategory(pillar.category)}
                  className="w-full py-2 px-3 rounded-xl bg-stone-100 group-hover:bg-amber-100 text-stone-800 group-hover:text-amber-900 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore {pillar.category} Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Heritage Trust Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-amber-200/90 shadow-xs flex flex-wrap items-center justify-around gap-6 text-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏵️</span>
            <div className="text-left">
              <p className="text-xs font-bold text-stone-900">Fresh Mysore Mallige</p>
              <p className="text-[11px] text-stone-500">Sourced daily from Mysore flower markets</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">🪔</span>
            <div className="text-left">
              <p className="text-xs font-bold text-stone-900">Pure Brass Kuthuvilakku</p>
              <p className="text-[11px] text-stone-500">Auspicious heritage oil lamp lighting</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">🎺</span>
            <div className="text-left">
              <p className="text-xs font-bold text-stone-900">Live Nadaswaram Troupe</p>
              <p className="text-[11px] text-stone-500">Acclaimed Karnataka classical vidwans</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">🎁</span>
            <div className="text-left">
              <p className="text-xs font-bold text-stone-900">Channapatna Wooden Favors</p>
              <p className="text-[11px] text-stone-500">Eco-friendly traditional return gifts</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
