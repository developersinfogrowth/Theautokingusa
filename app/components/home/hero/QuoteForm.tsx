'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { X, ChevronDown, Loader2, CheckCircle2, Phone } from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────

const PHONE     = '+1 (866) 486-5915';
const PHONE_RAW = '+18664865915';

const YEARS: string[] = Array.from(
  { length: 2026 - 1950 + 1 },
  (_, i) => String(2026 - i),
);

const PARTS = ['Engine', 'Transmission'] as const;

const SUCCESS_STEPS = [
  'Our agent reviews your request',
  'We will call you soon',
  'Get your best price instantly',
] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

interface Make  { id: number; name: string }
interface Model { id: number; name: string }

type FormStep = 'vehicle' | 'contact' | 'success';

interface VehicleInfo {
  year: string;
  make: string;
  makeId: number | null;
  model: string;
  part: string;
}

interface ContactInfo {
  fullName: string;
  phone: string;
  email: string;
  zip: string;
}

const INITIAL_VEHICLE: VehicleInfo = {
  year: '', make: '', makeId: null, model: '', part: '',
};

const INITIAL_CONTACT: ContactInfo = {
  fullName: '', phone: '', email: '', zip: '',
};

export interface QuoteFormProps {
    data?: any;
  onClose: () => void;
}

// ─── Shared style tokens ──────────────────────────────────────────────────────

const darkSelect =
  'w-full px-4 py-3 rounded-lg appearance-none cursor-pointer ' +
  'bg-white/8 border border-white/12 text-white text-[14px] ' +
  'focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/30 ' +
  'transition-all duration-150 hover:border-white/25 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed ' +
  '[&>option]:bg-[#1a1a1a] [&>option]:text-white';

const darkInput =
  'w-full px-4 py-3 rounded-lg ' +
  'bg-white/8 border border-white/12 text-white text-[14px] ' +
  'placeholder-white/30 ' +
  'focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/30 ' +
  'transition-all duration-150 hover:border-white/25';

const lbl =
  'block text-[11px] font-semibold text-white/50 uppercase tracking-[0.13em] mb-1.5';

const primaryBtn =
  'w-full py-3.5 rounded-lg bg-red-600 hover:bg-red-700 active:scale-[0.98] ' +
  'text-white font-bold text-[13px] tracking-widest uppercase ' +
  'shadow-lg shadow-red-900/40 transition-all duration-150 ' +
  'flex items-center justify-center gap-2.5 ' +
  'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none';

// ─── QuoteForm ────────────────────────────────────────────────────────────────

export default function QuoteForm({ onClose }: QuoteFormProps) {
  const [step,       setStep]       = useState<FormStep>('vehicle');
  const [submitting, setSubmitting] = useState(false);
  const [agreed,     setAgreed]     = useState(false);

  const [vehicle, setVehicle] = useState<VehicleInfo>(INITIAL_VEHICLE);
  const [contact, setContact] = useState<ContactInfo>(INITIAL_CONTACT);

  const [makes,         setMakes]         = useState<Make[]>([]);
  const [models,        setModels]        = useState<Model[]>([]);
  const [loadingMakes,  setLoadingMakes]  = useState(true);
  const [loadingModels, setLoadingModels] = useState(false);

  const prevMakeId = useRef<number | null>(null);

  // ── Reset entire form to initial state ───────────────────────────────────
  const resetForm = useCallback(() => {
    setStep('vehicle');
    setVehicle(INITIAL_VEHICLE);
    setContact(INITIAL_CONTACT);
    setAgreed(false);
    setSubmitting(false);
    prevMakeId.current = null;
    setModels([]);
  }, []);

  // ── Fetch makes once on mount ────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/makes')
      .then(r => (r.ok ? r.json() : []))
      .then((data: Make[]) => setMakes(data))
      .catch(() => setMakes([]))
      .finally(() => setLoadingMakes(false));
  }, []);

  // ── Fetch models when makeId changes ─────────────────────────────────────
  useEffect(() => {
    if (!vehicle.makeId || vehicle.makeId === prevMakeId.current) return;
    prevMakeId.current = vehicle.makeId;

    setModels([]);
    setVehicle(prev => ({ ...prev, model: '' }));
    setLoadingModels(true);

    fetch(`/api/models?make=${encodeURIComponent(vehicle.make)}`)
      .then(r => (r.ok ? r.json() : []))
      .then((data: Model[]) => setModels(data))
      .catch(() => setModels([]))
      .finally(() => setLoadingModels(false));
  }, [vehicle.makeId, vehicle.make]);

  // ── Make selection handler ───────────────────────────────────────────────
  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const found = makes.find(m => m.name === selectedName);
    prevMakeId.current = null;
    setVehicle(prev => ({
      ...prev,
      make:   selectedName,
      makeId: found?.id ?? null,
      model:  '',
    }));
  };

  // ── Validation ───────────────────────────────────────────────────────────
  const step1Valid =
    vehicle.year  !== '' &&
    vehicle.make  !== '' &&
    vehicle.model !== '' &&
    vehicle.part  !== '';

  const step2Valid =
    contact.fullName.trim() !== '' &&
    contact.phone.trim()    !== '' &&
    contact.email.trim()    !== '' &&
    agreed;

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (submitting || !step2Valid) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/outbound-leads', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year:     vehicle.year,
          make:     vehicle.make,
          model:    vehicle.model,
          part:     vehicle.part,
          fullName: contact.fullName,
          phone:    contact.phone,
          email:    contact.email,
          zip:      contact.zip,
          source:   'AutoKing',
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setStep('success');
    } catch {
      alert('Something went wrong. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-0 flex-1">

      {/* ── Header ── */}
      <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-white/8 shrink-0">
        <div>
          <p className="text-[10px] font-bold text-red-500 tracking-widest uppercase mb-1">
            Free Estimate
          </p>
          <h2 className="text-[18px] font-bold text-white leading-tight">
            Get an Instant Quote
          </h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15
                     flex items-center justify-center transition-colors shrink-0"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>
      </div>

      {/* ── Step indicator ── */}
      {step !== 'success' && (
        <div className="flex items-center gap-2 px-5 py-3 shrink-0">
          {(['vehicle', 'contact'] as FormStep[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center
                            text-[11px] font-bold transition-all duration-200
                  ${step === s
                    ? 'bg-red-600 text-white'
                    : step === 'contact' && s === 'vehicle'
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 text-white/40'}`}
              >
                {step === 'contact' && s === 'vehicle' ? '✓' : i + 1}
              </div>
              <span
                className={`text-[11px] font-semibold
                  ${step === s ? 'text-white' : 'text-white/35'}`}
              >
                {s === 'vehicle' ? 'Vehicle Info' : 'Contact'}
              </span>
              {i === 0 && <div className="w-5 h-px bg-white/15 mx-1" />}
            </div>
          ))}
        </div>
      )}

      {/* ── Scrollable body ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-6">

        {/* ══ STEP 1 — Vehicle ══ */}
        {step === 'vehicle' && (
          <div className="space-y-4 pt-3">

            {/* Year */}
            <div>
              <label className={lbl}>Select Year</label>
              <div className="relative">
                <select
                  value={vehicle.year}
                  onChange={e =>
                    setVehicle(prev => ({ ...prev, year: e.target.value }))
                  }
                  className={darkSelect}
                >
                  <option value="">Select Year</option>
                  {YEARS.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>
            </div>

            {/* Make */}
            <div>
              <label className={lbl}>Vehicle Make</label>
              <div className="relative">
                <select
                  value={vehicle.make}
                  onChange={handleMakeChange}
                  disabled={loadingMakes}
                  className={darkSelect}
                >
                  <option value="">
                    {loadingMakes ? 'Loading…' : 'Select Make'}
                  </option>
                  {makes.map(m => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>
                {loadingMakes ? (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 animate-spin pointer-events-none" />
                ) : (
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                )}
              </div>
            </div>

            {/* Model */}
            <div>
              <label className={lbl}>Vehicle Model</label>
              <div className="relative">
                <select
                  value={vehicle.model}
                  onChange={e =>
                    setVehicle(prev => ({ ...prev, model: e.target.value }))
                  }
                  disabled={!vehicle.make || loadingModels}
                  className={darkSelect}
                >
                  <option value="">
                    {!vehicle.make
                      ? 'Select Make first'
                      : loadingModels
                        ? 'Loading…'
                        : 'Select Model'}
                  </option>
                  {models.map(m => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                  {!loadingModels && vehicle.make && (
                    <option value="Other">Other</option>
                  )}
                </select>
                {loadingModels ? (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 animate-spin pointer-events-none" />
                ) : (
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                )}
              </div>
            </div>

            {/* Part */}
            <div>
              <label className={lbl}>
                Part Needed <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {PARTS.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() =>
                      setVehicle(prev => ({ ...prev, part: p }))
                    }
                    className={`py-3 px-4 rounded-lg border text-[13px] font-semibold
                                transition-all duration-150 active:scale-[0.97]
                      ${vehicle.part === p
                        ? 'border-red-500 bg-red-600 text-white shadow-lg shadow-red-900/30'
                        : 'border-white/12 bg-white/8 text-white/70 hover:border-white/25 hover:text-white'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={() => { if (step1Valid) setStep('contact'); }}
              disabled={!step1Valid}
              className={primaryBtn}
            >
              Get Instant Quote
            </button>

            {/* Phone fallback */}
            <div className="flex items-center justify-center gap-1.5 pt-1 pb-2">
              <Phone className="w-3 h-3 text-red-500 shrink-0" />
              <p className="text-[11px] text-white/35">
                Or call:{' '}
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="text-red-400/80 hover:text-red-400 font-medium transition-colors"
                >
                  {PHONE}
                </a>
              </p>
            </div>
          </div>
        )}

        {/* ══ STEP 2 — Contact ══ */}
        {step === 'contact' && (
          <div className="space-y-4 pt-3">

            {/* Availability banner */}
            <div className="rounded-lg bg-green-900/30 border border-green-500/30 p-3.5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40
                              flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-green-400">
                  Great news! Available in Stock
                </p>
                <p className="text-[12px] text-green-300/80 mt-0.5 leading-snug">
                  <span className="font-semibold">
                    {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.part}
                  </span>{' '}
                  is currently available in stock.<br />
                  Fill out the below details to call you.
                </p>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className={lbl}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={contact.fullName}
                onChange={e =>
                  setContact(prev => ({ ...prev, fullName: e.target.value }))
                }
                className={darkInput}
              />
            </div>

            {/* Phone */}
            <div>
              <label className={lbl}>
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="(888) 000-0000"
                value={contact.phone}
                onChange={e =>
                  setContact(prev => ({ ...prev, phone: e.target.value }))
                }
                className={darkInput}
              />
            </div>

            {/* Email */}
            <div>
              <label className={lbl}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={contact.email}
                onChange={e =>
                  setContact(prev => ({ ...prev, email: e.target.value }))
                }
                className={darkInput}
              />
            </div>

            {/* Zip */}
            <div>
              <label className={lbl}>
                Zip Code{' '}
                <span className="text-white/30 normal-case font-normal tracking-normal">
                  (Optional)
                </span>
              </label>
              <input
                type="text"
                placeholder="12345"
                maxLength={10}
                value={contact.zip}
                onChange={e =>
                  setContact(prev => ({ ...prev, zip: e.target.value }))
                }
                className={darkInput}
              />
            </div>

            {/* Consent */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-red-600 shrink-0"
              />
              <span className="text-[11px] leading-relaxed text-white/35">
    I agree to be contacted by Auto King USA regarding my parts request and understand that a representative may call or text me using the information provided.
  </span>
            </label>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!step2Valid || submitting}
              className={primaryBtn}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting…</span>
                </>
              ) : (
                'Submit Request'
              )}
            </button>

            {/* Back */}
            <button
              type="button"
              onClick={() => setStep('vehicle')}
              className="w-full py-2.5 rounded-lg border border-white/10 text-[13px]
                         font-semibold text-white/50 hover:bg-white/5 hover:text-white/70
                         transition-colors mb-2"
            >
              ← Back
            </button>
          </div>
        )}

        {/* ══ STEP 3 — Success ══ */}
        {step === 'success' && (
          <div className="flex flex-col items-center justify-center gap-5 py-10 text-center">
            <div
              className="w-20 h-20 rounded-full bg-green-900/30 border border-green-500/30
                          flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>

            <div>
              <h3 className="text-[20px] font-bold text-white">Request Sent!</h3>
              <p className="text-[14px] text-white/50 mt-1.5 max-w-[260px] mx-auto leading-relaxed">
                Our team will call you shortly about your{' '}
                <span className="font-semibold text-white/80">
                  {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.part}
                </span>.
              </p>
            </div>

            <div className="w-full bg-white/5 border border-white/8 rounded-lg p-4 text-left space-y-2.5">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                What happens next
              </p>
              {SUCCESS_STEPS.map((t, i) => (
                <div key={t} className="flex items-center gap-2.5">
                  <div
                    className="w-5 h-5 rounded-full bg-red-900/40 text-red-400 text-[10px] font-bold
                                flex items-center justify-center shrink-0 border border-red-500/30"
                  >
                    {i + 1}
                  </div>
                  <span className="text-[12px] text-white/60">{t}</span>
                </div>
              ))}
            </div>

            {/* Done — resets form back to Step 1, stays visible */}
            <button
              type="button"
              onClick={resetForm}
              className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700
                         text-white font-bold text-[13px] tracking-widest uppercase
                         transition-colors mb-2 active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}