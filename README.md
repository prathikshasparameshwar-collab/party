# CelebrationCraft ✨
**Responsive Single-Page React Application for Milestone Events & Karnataka Heritage Celebrations**

---

## 🌟 Overview
**CelebrationCraft** is an elegant, responsive single-page React web application designed for users to browse personal milestones (**Birthdays, Haldi Ceremonies, Marriages, and Baby Showers**), view detailed package inclusions, submit validated booking requests, and dynamically create custom celebration themes that update the live application state in real time.

Deeply inspired by the vibrant culture of **Karnataka**, the application features rich celebration imagery including Mysore Palace royal durbar lighting, traditional Kalyana Mandapams with Baale Kamba, Arishina Shastra with brass urlis, and Seemantha Thottilu Shastra (cradle ceremony).

---

## 🚀 Core Webpages & Features

### 1. Home Page (`/` or Home Tab)
- **Hero Section**: Welcoming message with an introduction to personal milestone celebrations in Karnataka, trust metrics (1,200+ events, 4.9★ rating), and primary CTAs.
- **Category Preview Cards**: 4 static interactive cards for **Birthday, Haldi, Marriage, and Baby Shower** that deep-link directly into the catalog with category pre-selection.
- **Karnataka Cultural Showcase**: Highlights authentic regional customs including *Arishina Shastra*, *Baale Kamba & Thorana*, *Moggu Jade & Mysore Silk*, and *Thottilu Shastra*.

### 2. Event Catalog Page (`/events`)
- **Search Bar**: Simple, responsive text input to filter events dynamically by name, category, or location.
- **Category Pills**: Quick filter tabs for *All*, *Birthday*, *Haldi*, *Marriage*, *Baby Shower*, and *Karnataka Special*.
- **Sort Options**: Sort by Featured, Price (Low to High), Price (High to Low), or Rating.
- **Event Cards Component (`EventCard`)**: Reusable props-driven cards displaying celebration type, base price (₹ INR), location, guest capacity, rating, Karnataka heritage touch, and a prominent **"Book Now"** button.
- **Package Details Modal**: Interactive popup showing all inclusions, high-res photography, and instant booking action.

### 3. Booking Form Page (`/book`)
- **Interactive Form**: Captures Host Full Name, Mobile Number, Email, Event Date, Guest Count, Selected Celebration Type, Destination City, Package, and Cultural Ritual notes.
- **React State Validation (`useState`)**:
  - Name validation (minimum 2 characters).
  - Event date validation (ensuring date is not in the past).
  - Guest count validation (minimum 1 guest).
  - Celebration type selection check.
  - 10-digit mobile number format check.
  - Real-time error messages and inline warnings.
- **Success Screen**: Confirms reservation with a unique Booking Reference ID (`CC-KAR-XXXXX`), investment estimate, host summary, and saves the request into the live bookings list.
- **Pre-filling**: Clicking "Book Now" on any catalog card automatically populates that event into the booking form.

### 4. Add Custom Event Page (`/create`)
- **Live State Management**: Allows users to craft a brand-new milestone celebration package and append it directly to the application's React state.
- **Karnataka Celebration Image Presets**: One-click preset buttons to load authentic Karnataka celebration themes (Mysore Palace Durbar, Baale Kamba Mandapam, Arishina Urli, Seemantha Thottilu, Gombe Habba).
- **Live Interactive Card Preview**: Renders an identical `EventCard` on the screen that updates in real time as the user types.
- **Instant UI Update**: Upon submission, the new package is immediately added to the live catalog at the top with a "New Theme" badge, triggers a celebratory toast, and redirects to `/events`.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State Management**: React `useState`, `useEffect`, `useMemo` with LocalStorage persistence

---

## 💻 Running the Application Locally

1. Clone or navigate to the project directory:
   ```bash
   cd fullstack
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Run linter:
   ```bash
   npm run lint
   ```
