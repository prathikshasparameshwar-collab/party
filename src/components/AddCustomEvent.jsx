import React, { useState } from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Crown, 
  MapPin, 
  Users, 
  AlertCircle 
} from 'lucide-react';
import EventCard from './EventCard';
import { KARNATAKA_PRESETS } from '../data/initialEvents';

export default function AddCustomEvent({ onAddEvent, onNavigateCatalog }) {
  // Form State
  const [formData, setFormData] = useState({
    name: 'Mysore Jasmine & Silk Royal Reception',
    category: 'Marriage',
    basePrice: 175000,
    guestCapacity: '300 - 800 Guests',
    location: 'Mysuru & Palace Grounds Bengaluru',
    image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1000&q=80',
    description: 'An enchanting Karnataka celebration package featuring authentic Mysore palace-inspired golden arches, Moggu Jade floral styling, and sandalwood fragrance.',
    karnatakaHighlight: 'Pure Mysore Silk draping, traditional Baale Kamba, and royal Nadaswaram musicians.',
    badge: 'Karnataka Special',
    isKarnatakaSpecial: true,
  });

  const [inclusions, setInclusions] = useState([
    'Golden arched reception stage with fresh Mallige jasmine garlands',
    'Traditional Baale Kamba and Maavina Ele Thorana welcome portal',
    'Mysore Sandalwood attar and rosewater reception kiosk for guests',
    'Traditional brass Kuthuvilakku lighting setup'
  ]);
  const [newInclusion, setNewInclusion] = useState('');

  const [errors, setErrors] = useState({});
  const [successToast, setSuccessToast] = useState(false);

  // Handle standard input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Add an inclusion bullet
  const handleAddInclusion = (e) => {
    e.preventDefault();
    if (newInclusion.trim()) {
      setInclusions([...inclusions, newInclusion.trim()]);
      setNewInclusion('');
    }
  };

  // Remove an inclusion bullet
  const handleRemoveInclusion = (index) => {
    setInclusions(inclusions.filter((_, idx) => idx !== index));
  };

  // Apply one-click Karnataka celebration preset
  const handleApplyPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      name: preset.title,
      category: preset.category,
      basePrice: preset.price,
      image: preset.image,
      description: preset.description,
      location: preset.location,
      karnatakaHighlight: preset.highlight,
      isKarnatakaSpecial: true,
      badge: 'Karnataka Special',
    }));
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Package name is required';
    if (!formData.category) newErrors.category = 'Celebration category is required';
    if (!formData.basePrice || Number(formData.basePrice) <= 0) {
      newErrors.basePrice = 'Please enter a valid base price (greater than 0)';
    }
    if (!formData.image.trim()) {
      newErrors.image = 'An image URL is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a short description';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newEvent = {
      id: `cc-custom-${Date.now()}`,
      name: formData.name.trim(),
      category: formData.category,
      basePrice: Number(formData.basePrice),
      guestCapacity: formData.guestCapacity.trim() || 'Custom Group Size',
      location: formData.location.trim() || 'Karnataka Venues',
      image: formData.image.trim(),
      description: formData.description.trim(),
      karnatakaHighlight: formData.karnatakaHighlight.trim() || null,
      badge: formData.badge || 'New Theme',
      isKarnatakaSpecial: formData.isKarnatakaSpecial,
      rating: 5.0,
      reviewsCount: 1,
      inclusions: inclusions.length > 0 ? inclusions : ['Custom decor and catering setup'],
      isCustomUserTheme: true,
    };

    // Update live state in parent App component
    onAddEvent(newEvent);

    // Trigger success toast
    setSuccessToast(true);

    // After brief moment, navigate to catalog to show the new card
    setTimeout(() => {
      onNavigateCatalog();
    }, 1200);
  };

  // Construct a preview object for live preview
  const previewEvent = {
    ...formData,
    id: 'preview',
    rating: 5.0,
    reviewsCount: 1,
    inclusions: inclusions,
  };

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-24 right-4 z-50 bg-emerald-700 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border-2 border-emerald-400">
          <CheckCircle className="w-6 h-6 text-emerald-200" />
          <div>
            <p className="font-bold text-sm">Celebration Added to Live State!</p>
            <p className="text-xs text-emerald-100">Redirecting to Event Catalog now...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Dynamic State Management</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          Create a Custom Celebration Theme
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          Add a brand-new milestone celebration package directly into the application's live React state. Watch your package render in real time on the card preview!
        </p>
      </div>

      {/* One-Click Karnataka Celebration Presets */}
      <div className="mb-10 bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Crown className="w-5 h-5 text-amber-700" />
          <h2 className="text-base font-bold font-serif text-stone-900">
            One-Click Karnataka Celebration Presets
          </h2>
          <span className="text-[11px] bg-amber-200/60 text-amber-900 font-semibold px-2 py-0.5 rounded-full">
            Quick Fill with Karnataka Images
          </span>
        </div>
        <p className="text-xs text-stone-600 mb-4">
          Click any preset below to instantly load authentic Karnataka celebration imagery, traditional descriptions, and ritual highlights:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {KARNATAKA_PRESETS.map((preset, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="text-left p-3 rounded-xl bg-white hover:bg-amber-100/60 border border-amber-200/70 hover:border-amber-400 shadow-xs hover:shadow-md transition-all flex items-start gap-3 group cursor-pointer"
            >
              <img
                src={preset.image}
                alt={preset.title}
                className="w-12 h-12 rounded-lg object-cover border border-amber-300 shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider block">
                  {preset.category}
                </span>
                <p className="text-xs font-bold text-stone-900 truncate">
                  {preset.title}
                </p>
                <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                  ₹{preset.price.toLocaleString('en-IN')} • {preset.location.split('&')[0]}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Form on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: 7 cols */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Package Name */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Celebration Theme / Package Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Royal Mysore Kalyana Mandapam, Sunshine Haldi Fiesta..."
                className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border text-sm text-stone-900 outline-none transition-all ${
                  errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300 focus:bg-white focus:border-amber-500'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Category & Base Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Milestone Category <span className="text-rose-600">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 outline-none focus:bg-white focus:border-amber-500"
                >
                  <option value="Birthday">Birthday</option>
                  <option value="Haldi">Haldi Ceremony</option>
                  <option value="Marriage">Marriage</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Karnataka Special">Karnataka Special</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Base Package Price (₹ INR) <span className="text-rose-600">*</span>
                </label>
                <input
                  type="number"
                  name="basePrice"
                  min="5000"
                  step="1000"
                  value={formData.basePrice}
                  onChange={handleChange}
                  placeholder="e.g. 75000"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border text-sm text-stone-900 outline-none transition-all ${
                    errors.basePrice ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300 focus:bg-white focus:border-amber-500'
                  }`}
                />
                {errors.basePrice && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.basePrice}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Guest Capacity & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Guest Capacity
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="guestCapacity"
                    value={formData.guestCapacity}
                    onChange={handleChange}
                    placeholder="e.g. 200 - 500 Guests"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 outline-none focus:bg-white focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Location / City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Mysuru & Bengaluru"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 outline-none focus:bg-white focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Celebration Image URL */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Celebration Image URL <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 border text-sm text-stone-900 outline-none transition-all ${
                    errors.image ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300 focus:bg-white focus:border-amber-500'
                  }`}
                />
              </div>
              <p className="mt-1 text-[11px] text-stone-500">
                Tip: You can use any high-res image link, or click one of the Karnataka Celebration Presets above!
              </p>
              {errors.image && (
                <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.image}</span>
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Package Description <span className="text-rose-600">*</span>
              </label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the celebration ambiance, lighting, flower themes, and music..."
                className={`w-full px-3 py-2.5 rounded-xl bg-stone-50 border text-sm text-stone-900 outline-none transition-all ${
                  errors.description ? 'border-rose-400 bg-rose-50/30' : 'border-stone-300 focus:bg-white focus:border-amber-500'
                }`}
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.description}</span>
                </p>
              )}
            </div>

            {/* Karnataka Cultural Highlight Note */}
            <div>
              <label className="block text-xs font-semibold text-amber-900 mb-1.5 flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-600" />
                <span>Karnataka Heritage Highlight (Special Cultural Feature)</span>
              </label>
              <input
                type="text"
                name="karnatakaHighlight"
                value={formData.karnatakaHighlight}
                onChange={handleChange}
                placeholder="e.g. Authentic Moggu Jade floral braid, Baale Kamba, Channapatna return favors..."
                className="w-full px-3 py-2 rounded-xl bg-amber-50/50 border border-amber-300 text-sm text-stone-900 outline-none focus:bg-white focus:border-amber-500"
              />
            </div>

            {/* Inclusions Management */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Package Inclusions (Live list)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newInclusion}
                  onChange={(e) => setNewInclusion(e.target.value)}
                  placeholder="Add item (e.g. Royal Welcome Urli with Marigolds)"
                  className="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 outline-none focus:bg-white focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={handleAddInclusion}
                  className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Item</span>
                </button>
              </div>

              {/* List of inclusions */}
              <ul className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-800">
                    <span className="truncate">• {item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInclusion(idx)}
                      className="text-stone-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Checkbox: Mark as Karnataka Special */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isKarnatakaSpecial"
                name="isKarnatakaSpecial"
                checked={formData.isKarnatakaSpecial}
                onChange={handleChange}
                className="w-4 h-4 text-amber-600 rounded border-stone-300 focus:ring-amber-500"
              />
              <label htmlFor="isKarnatakaSpecial" className="text-xs font-semibold text-stone-700 cursor-pointer">
                Mark as Karnataka Special (Features authentic Karnataka cultural traditions & decor)
              </label>
            </div>

            {/* Submit button */}
            <div className="pt-4 border-t border-stone-200">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-lg shadow-amber-600/30 hover:shadow-amber-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Package to Live Application State</span>
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Live Card Preview (5 cols) */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Real-Time Live State Preview</span>
            </span>
            <span className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
              Live React State
            </span>
          </div>

          <p className="text-xs text-stone-500">
            This preview updates synchronously with your keystrokes and image selections.
          </p>

          {/* Real EventCard component rendered with live state */}
          <EventCard
            event={previewEvent}
            onBookNow={() => {
              alert(`This is a live preview of "${formData.name}". Submit the form to add it to the active catalog!`);
            }}
            onViewDetails={() => {}}
          />
        </div>

      </div>

    </div>
  );
}
