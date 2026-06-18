/**
 * Auto King USA — Brand Colors
 * Extracted from logo:
 *   Red    → primary CTA, active states, "KING" wordmark
 *   Charcoal → "AUTO" wordmark, body text
 *   Silver → secondary accents (K icon facet)
 */
export const COLORS = {
  // ── Primary Brand ──────────────────────────────
  primary:      '#DC2626', // red-600  — logo red
  primaryHover: '#B91C1C', // red-700
  primaryLight: '#FEF2F2', // red-50   — hover bg on links

  // ── Neutrals ───────────────────────────────────
  charcoal:     '#1F2937', // gray-800 — "AUTO" text weight
  silver:       '#9CA3AF', // gray-400 — logo silver facet
  muted:        '#6B7280', // gray-500 — inactive nav links
  mutedDark:    '#4B5563', // gray-600 — mobile nav links

  // ── Accent ─────────────────────────────────────
  liveGreen:    '#22C55E', // green-400 — pulse dot on CTA

  // ── Surface ────────────────────────────────────
  navBg:        'rgba(255,255,255,0.97)',
  drawer:       '#FFFFFF',
  border:       '#F3F4F6', // gray-100
} as const;