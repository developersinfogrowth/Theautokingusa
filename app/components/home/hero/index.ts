/**
 * Hero module — barrel export
 *
 * Usage:
 *   import Hero                    from '@/components/home/hero';
 *   import { HeroContent }         from '@/components/home/hero';
 *   import { QuoteForm }           from '@/components/home/hero';
 *   import { FeaturePills }        from '@/components/home/hero';
 *   import { PHONE, FEATURES }     from '@/components/home/hero';
 */
export { default }          from './Hero';        // default: Hero wrapper
export { default as Hero }  from './Hero';
export { HeroContent }      from './HeroContent';
export { default as QuoteForm } from './QuoteForm';
export { FeaturePills }     from './FeaturePills';

// Constants — re-exported for use elsewhere (e.g. footer, contact page)
export {
  PHONE,
  PHONE_RAW,
  VEHICLE_MAKES,
  FEATURES,
} from './hero.constants';
export type { Feature } from './hero.constants';