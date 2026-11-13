import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, Phone, Send, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import restoData from '../data/restoData.json';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillOrder?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  prefillOrder = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:00');
  const [guests, setGuests] = useState('4 Guests');
  const [bookingType, setBookingType] = useState<'dine-in' | 'pickleball' | 'delivery'>('dine-in');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefillOrder) {
      setNotes((prev) =>
        prev.includes(prefillOrder)
          ? prev
          : prev
          ? `${prev}, ${prefillOrder}`
          : `Advance Order: ${prefillOrder}`
      );
    }
  }, [prefillOrder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="fixed inset-0 z-50 bg-espresso-950/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full rounded-3xl bg-espresso-900 border border-gold-500/40 shadow-2xl overflow-hidden my-8"
          >
            {/* Header Banner */}
            <div className="px-6 py-5 bg-gradient-to-r from-espresso-950 via-espresso-900 to-espresso-950 border-b border-gold-500/25 flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-gold-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Advance Order · Table · Pickleball Court</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-parchment-50">
                  Reserve or Pre-Order at El Farm
                </h3>
              </div>
              <button
                onClick={resetAndClose}
                className="p-2 rounded-full bg-espresso-800 text-parchment-100 hover:bg-gold-500 hover:text-espresso-950 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-sage-500/20 border border-sage-400 text-sage-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="font-serif text-3xl font-bold text-parchment-50">
                  Inquiry Ready for El Farm!
                </h4>
                <p className="text-sm text-parchment-200/85 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-gold-300 font-semibold">{name || 'Guest'}</span>! Because all meals at El Farm are freshly cooked to order, you can now send your details directly via SMS/Call to{' '}
                  <span className="text-gold-300 font-mono">0917 182 9876</span> or message our official Facebook page for immediate confirmation.
                </p>

                <div className="p-4 rounded-2xl bg-espresso-950 border border-gold-500/25 text-left text-xs font-mono text-parchment-200 space-y-1">
                  <div>TYPE: {bookingType.toUpperCase()}</div>
                  <div>GUESTS: {guests}</div>
                  <div>DATE/TIME: {date || 'Today'} at {time}</div>
                  {notes && <div>ORDER / NOTES: {notes}</div>}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`tel:${restoData.restaurant.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gold-500 text-espresso-950 font-bold text-xs uppercase tracking-wider"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call 0917 182 9876</span>
                  </a>
                  <a
                    href={restoData.restaurant.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-espresso-800 hover:bg-espresso-700 text-gold-300 border border-gold-500/35 font-bold text-xs uppercase tracking-wider"
                  >
                    <span>Message on Facebook</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
                {/* Booking Mode Tabs */}
                <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-espresso-950 border border-gold-500/20">
                  {[
                    { id: 'dine-in', label: 'Table & Pre-Order' },
                    { id: 'pickleball', label: 'Pickleball Court' },
                    { id: 'delivery', label: 'City Delivery (+₱100)' },
                  ].map((tab) => (
                    <button
                      type="button"
                      key={tab.id}
                      onClick={() => setBookingType(tab.id as any)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                        bookingType === tab.id
                          ? 'bg-gold-500 text-espresso-950 shadow-gold-glow'
                          : 'text-parchment-200/75 hover:text-parchment-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gold-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maria Santos"
                      className="w-full px-4 py-2.5 rounded-xl bg-espresso-950 border border-gold-500/30 text-sm text-parchment-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gold-300 mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0917 XXX XXXX"
                      className="w-full px-4 py-2.5 rounded-xl bg-espresso-950 border border-gold-500/30 text-sm text-parchment-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gold-300 mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-espresso-950 border border-gold-500/30 text-sm text-parchment-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gold-300 mb-1.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Time
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-espresso-950 border border-gold-500/30 text-sm text-parchment-50 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gold-300 mb-1.5 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> Party Size
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-espresso-950 border border-gold-500/30 text-sm text-parchment-50 focus:outline-none focus:border-gold-400"
                    >
                      <option>2 Guests</option>
                      <option>4 Guests</option>
                      <option>6–8 Guests (Bilao Feast)</option>
                      <option>10–15 Guests (Barkada/Family)</option>
                      <option>20+ Guests (Event / Faculty)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gold-300 mb-1.5">
                    Advance Food Order / Delivery Address / Court Notes
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="List dishes you'd like ready upon arrival (e.g. Seafood Feast Bilao, 2 Coconut Matcha Cloud, Crispy Pata)..."
                    className="w-full px-4 py-2.5 rounded-xl bg-espresso-950 border border-gold-500/30 text-sm text-parchment-50 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-parchment-200/75">
                    Direct Hotline: <strong className="text-gold-300">0917 182 9876</strong>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-espresso-950 font-bold text-sm shadow-gold-glow hover:brightness-110 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirm Reservation &amp; Order</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
