import Image from 'next/image';
import Link from 'next/link';
import { BRANDING } from '@/app/components/constants/branding';

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Auto King USA home"
      className="flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
    >
      <Image
        src={BRANDING.logo.src}
        alt={BRANDING.logo.alt}
        width={BRANDING.logo.width}
        height={BRANDING.logo.height}
        priority
        sizes="(max-width: 767px) 250px, (max-width: 1023px) 280px, 350px"
        className="h-[108px] w-auto select-none object-contain sm:h-[112px] md:h-[120px] lg:h-[124px]"
      />
    </Link>
  );
}