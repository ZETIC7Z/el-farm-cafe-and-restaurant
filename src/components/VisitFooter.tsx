import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Calendar,
  Navigation,
  Sparkles,
} from 'lucide-react';
import restoData from '../data/restoData.json';

interface VisitFooterProps {
  onOpenReserve: () => void;
  onOpenMenuBoards: () => void;
}

export const VisitFooter: React.FC<VisitFooterProps> = ({
  onOpenReserve,
  onOpenMenuBoards,
}) => {
  const { restaurant } = restoData;

  const openDeveloperPortfolio = () => {
    window.open('https://www.zeticuz.xyz/', '_blank', 'noopener,noreferrer');
  };

  return (
    <footer
      id="visit"
      className="relative bg-espresso-950 border-t border-gold-500/20 pt-24 pb-10 overflow-hidden"
    >
      {/* Top Location & Interactive Google Map Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
          {/* Contact & Hours Card */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-espresso-900 to-espresso-950 border border-gold-500/30 p-7 sm:p-9 shadow-parchment flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-mono uppercase tracking-widest mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <span>05 / Visit Our Sanctuary</span>
              </div>

              <p className="font-script text-3xl text-gold-400 -mb-1">
                See You at Sitio Nipa
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-parchment-50">
                Find Us in <span className="italic font-normal text-gold-300">Lamitan City</span>
              </h2>

              <div className="mt-7 space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-gold-500/15 text-gold-400 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-gold-400">
                      Exact Address
                    </div>
                    <p className="text-base font-medium text-parchment-50 mt-0.5">
                      {restaurant.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-gold-500/15 text-gold-400 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-gold-400">
                      Operating Hours &amp; Weekly Highlights
                    </div>
                    <p className="text-base font-medium text-parchment-50 mt-0.5">
                      {restaurant.hours.schedule}
                    </p>
                    <p className="text-xs text-sage-400 mt-1">
                      {restaurant.hours.specialEvents}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-gold-500/15 text-gold-400 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-gold-400">
                      Advance Orders &amp; Delivery Hotline
                    </div>
                    <a
                      href={`tel:${restaurant.phone.replace(/\s+/g, '')}`}
                      className="text-lg font-serif font-bold text-parchment-50 hover:text-gold-300 transition-colors"
                    >
                      {restaurant.phone}
                    </a>
                    <p className="text-xs text-parchment-200/75 mt-0.5">
                      Citywide Delivery across Lamitan City (+₱100 delivery fee)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-gold-500/15 text-gold-400 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-gold-400">
                      Email Address
                    </div>
                    <a
                      href={`mailto:${restaurant.email}`}
                      className="text-sm font-mono text-parchment-100 hover:text-gold-300 transition-colors"
                    >
                      {restaurant.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gold-500/20 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenReserve}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-espresso-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Table / Pre-Order</span>
              </button>

              <a
                href={restaurant.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-espresso-800 hover:bg-espresso-700 text-gold-300 border border-gold-500/35 font-semibold text-xs uppercase tracking-wider transition-all"
              >
                <span>Official Facebook</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Google Maps Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-gold-500/30 bg-espresso-900 shadow-parchment flex flex-col min-h-[420px]">
            <div className="px-6 py-4 bg-espresso-950/90 border-b border-gold-500/20 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-gold-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-parchment-100">
                  Interactive Map · Sitio Nipa, Brgy. Maloong Canal, Lamitan City, Basilan
                </span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Maloong+Canal+Lamitan+City+Basilan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-gold-300 hover:underline flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="relative flex-1 w-full min-h-[370px]">
              <iframe
                title="El Farm Cafe and Restaurant Location Map - Maloong Canal, Lamitan City, Basilan"
                src="https://www.google.com/maps?q=Maloong+Canal,+Lamitan+City,+Basilan,+Philippines&output=embed"
                className="w-full h-full border-0 filter contrast-105"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Lower Brand Footer Navigation */}
        <div className="pt-12 pb-10 border-t border-gold-500/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={restaurant.branding.logo}
              alt={restaurant.name}
              className="w-12 h-12 rounded-full border border-gold-500/50 object-cover"
            />
            <div>
              <div className="font-serif text-xl font-bold text-parchment-50">
                {restaurant.name}
              </div>
              <p className="text-xs text-parchment-200/70">
                {restaurant.address} · {restaurant.phone}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono uppercase tracking-wider text-parchment-200/80">
            <a href="#about" className="hover:text-gold-300 transition-colors">
              About
            </a>
            <a href="#resto-view" className="hover:text-gold-300 transition-colors">
              Resto View
            </a>
            <a href="#menu" className="hover:text-gold-300 transition-colors">
              Full Menu
            </a>
            <button
              onClick={onOpenMenuBoards}
              className="hover:text-gold-300 transition-colors uppercase"
            >
              7 Menu Boards
            </button>
            <a href="#guests" className="hover:text-gold-300 transition-colors">
              Our Guests
            </a>
            <a
              href={restaurant.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 inline-flex items-center gap-1"
            >
              <span>Facebook Page</span>
              <Sparkles className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Mandatory ZETICUZ Developer Attribution Standard */}
        <div className="pt-8 border-t border-gold-500/10 flex flex-col items-center justify-center text-center">
          <button
            type="button"
            onClick={openDeveloperPortfolio}
            aria-label="Site Developed By Sam Pangilinan"
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-espresso-900/90 hover:bg-espresso-800 border border-gold-500/25 hover:border-gold-400/60 shadow-glass transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <img
              src="/assets/zeticuz-logo.svg"
              alt="ZETICUZ Logo"
              className="w-5 h-5 object-contain filter brightness-110 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-xs font-mono tracking-wider text-parchment-100/90 group-hover:text-gold-300 transition-colors">
              SITE DEVELOPED BY: <strong className="font-semibold text-parchment-50">Sam Pangilinan</strong> · © 2026
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
