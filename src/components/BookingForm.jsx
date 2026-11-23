import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Crown
} from 'lucide-react';

// Static base minimum date
const TODAY_DATE_STR = '2026-10-31';

export default function BookingForm({ 
  preSelectedEvent, 
  availableEvents, 
  onBookingSuccess, 
  onExploreMore 
}) {
  // Form state initialized with preSelectedEvent if present
  const [formData, setFormData] = useState(() => ({
    userName: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: '',
    celebrationType: preSelectedEvent ? preSelectedEvent.category : '',
    selectedPackageId: preSelectedEvent ? preSelectedEvent.id : '',
    location: preSelectedEvent?.location ? preSelectedEvent.location.split('&')[0].trim() : 'Bengaluru',
    culturalPreferences: preSelectedEvent?.karnatakaHighlight || '',
    notes: '',
  }));

  // Validation errors state
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Field validator helper on blur
  const handleBlur = (field) => {
    validateField(field, formData[field]);
  };

  const validateField = (name, value) => {
    let errorMsg = '';

    switch (name) {
      case 'userName':
        if (!value || value.trim().length < 2) {
          errorMsg = 'Please enter your full name (minimum 2 characters)';
        }
        break;
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMsg = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value || value.trim().length < 10) {
          errorMsg = 'Please enter a valid 10-digit mobile number';
        }
        break;
      case 'eventDate':
        if (!value) {
          errorMsg = 'Celebration date is required';
        } else if (value < TODAY_DATE_STR) {
          errorMsg = 'Event date cannot be in the past. Please select an upcoming date.';
        }
        break;
      case 'guestCount':
        if (!value || isNaN(value) || Number(value) <= 0) {
          errorMsg = 'Please enter an estimated guest count (at least 1)';
        }
        break;
      case 'celebrationType':
        if (!value || value === '') {
          errorMsg = 'Please select a celebration type';
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg === '';
  };

  // Comprehensive Form Validation
  const validateForm = () => {
    const newErrors = {};

    // Required Field 1: User Name
    if (!formData.userName || formData.userName.trim().length < 2) {
      newErrors.userName = 'Full name is required (minimum 2 characters)';
    }

    // Required Field 2: Event Date
    if (!formData.eventDate) {
      newErrors.eventDate = 'Please select your celebration date';
    } else if (formData.eventDate < TODAY_DATE_STR) {
      newErrors.eventDate = 'Event date cannot be in the past';
    }

    // Required Field 3: Guest Count
    if (!formData.guestCount || isNaN(formData.guestCount) || Number(formData.guestCount) <= 0) {
      newErrors.guestCount = 'Guest count is required (minimum 1 guest)';
    }

    // Required Field 4: Celebration Type
    if (!formData.celebrationType) {
      newErrors.celebrationType = 'Please choose a celebration type';
    }

    // Contact requirement
    if (!formData.phone || formData.phone.trim().length < 10) {
      newErrors.phone = '10-digit phone number is required for event coordination';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const selectedPkg = availableEvents.find((ev) => ev.id === formData.selectedPackageId);
      const bookingRef = `CC-KAR-${Math.floor(10000 + Math.random() * 90000)}`;

      const bookingRecord = {
        bookingId: bookingRef,
        createdAt: new Date().toISOString(),
        ...formData,
        guestCount: Number(formData.guestCount),
        packageName: selectedPkg ? selectedPkg.name : 'Custom Bespoke Package',
        estimatedPrice: selectedPkg ? selectedPkg.basePrice : 50000,
        packageImage: selectedPkg ? selectedPkg.image : null,
      };

      setConfirmedBooking(bookingRecord);
      setIsSubmitted(true);
      if (onBookingSuccess) {
        onBookingSuccess(bookingRecord);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setFormData({
      userName: '',
      email: '',
      phone: '',
      eventDate: '',
      guestCount: '',
      celebrationType: '',
      selectedPackageId: '',
      location: 'Bengaluru',
      culturalPreferences: '',
      notes: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setConfirmedBooking(null);
  };

  // Get matching packages for currently selected celebration type
  const relevantPackages = availableEvents.filter((ev) => {
    if (!formData.celebrationType) return true;
    return ev.category.toLowerCase() === formData.celebrationType.toLowerCase() ||
           (formData.celebrationType === 'Karnataka Special' && ev.isKarnatakaSpecial);
  });

  // Render Success Confirmation View
  if (isSubmitted && confirmedBooking) {
    return (
      <div className="py-12 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xl text-center space-y-6 animate-fade-in relative overflow-hidden">
          {/* Top festive header bar */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600" />

          {/* Success Icon */}
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto shadow-md shadow-emerald-500/10">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
              <span>Booking Request Received Successfully!</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              ಧನ್ಯವಾದಗಳು! Your Celebration is Being Crafted
            </h2>
            <p className="text-stone-600 text-sm max-w-md mx-auto mt-2">
              We have reserved your milestone celebration request. Our Karnataka event specialist will connect with you within 2 hours.
            </p>
          </div>

          {/* Booking Summary Card */}
          <div className="bg-stone-50 rounded-2xl p-5 sm:p-6 text-left border border-stone-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-stone-200 pb-3 gap-2">
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  Booking Reference
                </span>
                <span className="text-lg font-mono font-bold text-amber-700">
                  {confirmedBooking.bookingId}
                </span>
              </div>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
                Status: Under Concierge Review
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-stone-500 block">Host / Client Name:</span>
                <strong className="text-stone-900">{confirmedBooking.userName}</strong>
              </div>
              <div>
                <span className="text-xs text-stone-500 block">Milestone Type:</span>
                <strong className="text-amber-800">{confirmedBooking.celebrationType}</strong>
              </div>
              <div>
                <span className="text-xs text-stone-500 block">Celebration Date:</span>
                <strong className="text-stone-900">
                  {confirmedBooking.eventDate}
                </strong>
              </div>
              <div>
                <span className="text-xs text-stone-500 block">Estimated Guest Count:</span>
                <strong className="text-stone-900">{confirmedBooking.guestCount} Guests</strong>
              </div>
              <div>
                <span className="text-xs text-stone-500 block">Venue / City:</span>
                <strong className="text-stone-900">{confirmedBooking.location}</strong>
              </div>
              <div>
                <span className="text-xs text-stone-500 block">Selected Package:</span>
                <strong className="text-stone-900">{confirmedBooking.packageName}</strong>
              </div>
            </div>

            {confirmedBooking.culturalPreferences && (
              <div className="pt-3 border-t border-stone-200 text-xs">
                <span className="text-stone-500 block">Karnataka Heritage & Ritual Preferences:</span>
                <p className="text-stone-700 italic mt-0.5">"{confirmedBooking.culturalPreferences}"</p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm transition-colors cursor-pointer"
            >
              Book Another Celebration
            </button>
            <button
              onClick={onExploreMore}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors shadow-md shadow-amber-600/20 cursor-pointer"
            >
              Back to Event Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Interactive Booking Form
  return (
    <div className="py-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2">
          <Calendar className="w-3.5 h-3.5 text-amber-600" />
          <span>Validated Booking Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          Reserve Your Milestone Celebration
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          Fill in your celebration specifications below. Our validated form ensures every milestone detail is captured accurately.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-md">
        
        {/* Preselected package banner if available */}
        {preSelectedEvent && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200/90 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={preSelectedEvent.image}
                alt={preSelectedEvent.name}
                className="w-14 h-14 rounded-xl object-cover border border-amber-300 shrink-0"
              />
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-200/60 px-2 py-0.5 rounded">
                  Selected Package
                </span>
                <h4 className="text-sm font-bold font-serif text-stone-900 mt-0.5">
                  {preSelectedEvent.name}
                </h4>
                <p className="text-xs text-stone-600">
                  Base Price: ₹{Number(preSelectedEvent.basePrice).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onExploreMore}
              className="text-xs text-amber-700 hover:text-amber-800 font-semibold underline shrink-0 cursor-pointer"
            >
              Change Package
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          
          {/* Section 1: User & Contact Information */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-600" />
              <span>1. Host Information (Required)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* User Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    onBlur={() => handleBlur('userName')}
                    placeholder="e.g. Ramesh Kulkarni / Sneha Rao"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border text-sm text-stone-900 outline-none transition-all ${
                      errors.userName
                        ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : 'border-stone-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                    }`}
                  />
                </div>
                {errors.userName && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.userName}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Mobile Number <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur('phone')}
                    placeholder="10-digit number (e.g. 9876543210)"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border text-sm text-stone-900 outline-none transition-all ${
                      errors.phone
                        ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : 'border-stone-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    placeholder="name@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border text-sm text-stone-900 outline-none transition-all ${
                      errors.email
                        ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : 'border-stone-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Milestone & Celebration Details */}
          <div className="pt-4 border-t border-stone-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>2. Milestone & Event Specifications (Required)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Selected Celebration Type */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Celebration Type <span className="text-rose-600">*</span>
                </label>
                <select
                  name="celebrationType"
                  value={formData.celebrationType}
                  onChange={handleChange}
                  onBlur={() => handleBlur('celebrationType')}
                  className={`w-full px-3 py-2.5 rounded-xl bg-stone-50 border text-sm text-stone-900 outline-none transition-all ${
                    errors.celebrationType
                      ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                      : 'border-stone-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                  }`}
                >
                  <option value="">-- Choose Celebration Type --</option>
                  <option value="Birthday">Birthday Milestone (1st, 18th, 25th, 50th, 60th)</option>
                  <option value="Haldi">Haldi Ceremony / Arishina Shastra</option>
                  <option value="Marriage">Marriage / Traditional Karnataka Kalyanam</option>
                  <option value="Baby Shower">Baby Shower / Seemantha & Thottilu Shastra</option>
                  <option value="Karnataka Special">Karnataka Festival / Dasara & Heritage Utsava</option>
                  <option value="Custom">Other Custom Celebration Theme</option>
                </select>
                {errors.celebrationType && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.celebrationType}</span>
                  </p>
                )}
              </div>

              {/* Event Date */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Event Date (Muhurtham) <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="eventDate"
                    min={TODAY_DATE_STR}
                    value={formData.eventDate}
                    onChange={handleChange}
                    onBlur={() => handleBlur('eventDate')}
                    className={`w-full px-3 py-2.5 rounded-xl bg-stone-50 border text-sm text-stone-900 outline-none transition-all ${
                      errors.eventDate
                        ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : 'border-stone-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                    }`}
                  />
                </div>
                {errors.eventDate && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.eventDate}</span>
                  </p>
                )}
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Estimated Guest Count <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    name="guestCount"
                    min="1"
                    max="10000"
                    value={formData.guestCount}
                    onChange={handleChange}
                    onBlur={() => handleBlur('guestCount')}
                    placeholder="e.g. 250"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border text-sm text-stone-900 outline-none transition-all ${
                      errors.guestCount
                        ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : 'border-stone-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                    }`}
                  />
                </div>
                {errors.guestCount && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.guestCount}</span>
                  </p>
                )}
              </div>

              {/* Venue City */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Destination / City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  >
                    <option value="Bengaluru">Bengaluru (Palace Grounds, Indiranagar, South BLR)</option>
                    <option value="Mysuru">Mysuru (Heritage Palaces & Resorts)</option>
                    <option value="Mangaluru / Udupi">Mangaluru / Udupi (Coastal Heritage)</option>
                    <option value="Hubballi / Dharwad">Hubballi / Dharwad (North Karnataka)</option>
                    <option value="Coorg / Chikmagalur">Coorg / Chikmagalur (Plantation Estate)</option>
                    <option value="Other Karnataka Location">Other Karnataka Location</option>
                  </select>
                </div>
              </div>

              {/* Specific Catalog Package Selector */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Link with a Specific Catalog Package (Optional)
                </label>
                <select
                  name="selectedPackageId"
                  value={formData.selectedPackageId}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 outline-none focus:bg-white focus:border-amber-500"
                >
                  <option value="">-- Choose from our {relevantPackages.length} Catalog Packages --</option>
                  {relevantPackages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} ({pkg.category}) - ₹{Number(pkg.basePrice).toLocaleString('en-IN')}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Section 3: Karnataka Cultural Touches & Notes */}
          <div className="pt-4 border-t border-stone-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-600" />
              <span>3. Karnataka Traditions & Custom Requests</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Auspicious Ritual & Cultural Customizations
                </label>
                <input
                  type="text"
                  name="culturalPreferences"
                  value={formData.culturalPreferences}
                  onChange={handleChange}
                  placeholder="e.g. Baale Kamba entry, Moggu Jade styling, Nadaswaram troupe, Mysore Mallige floral arch..."
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Additional Notes or Questions
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us about your timing preferences, dietary requirements, or any specific theme vision..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Submit Action Area */}
          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-500 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>We validate required fields with live React state and respond within 2 hours.</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-lg shadow-amber-600/30 hover:shadow-amber-600/40 transition-all cursor-pointer"
            >
              Submit Celebration Booking Request
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
