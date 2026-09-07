/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PromotionsSection } from './components/PromotionsSection';
import { MenuSection } from './components/MenuSection';
import { AtmosphereSection } from './components/AtmosphereSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HalalModal } from './components/HalalModal';

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1E1E1E] font-['Plus_Jakarta_Sans'] antialiased">
          {/* Top Sticky Header */}
          <Navbar />

          {/* Main Landmark Page Content */}
          <main className="flex-1">
            <HeroSection />
            <PromotionsSection />
            <MenuSection />
            <AtmosphereSection />
            <ReviewsSection />
            <LocationSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Overlays & Drawers */}
          <CartDrawer />
          <HalalModal />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}
