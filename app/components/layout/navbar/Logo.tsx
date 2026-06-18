import Image from 'next/image';
import Link  from 'next/link';
import { BRANDING } from '@/app/components/constants/branding';

export function Logo() {
  return (
    <Link 
      href="/" 
      className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-md py-1"
    >
      <Image
        src={BRANDING.logo.src}
        alt={BRANDING.logo.alt}
        width={BRANDING.logo.width}
        height={BRANDING.logo.height}
        priority
        sizes="(max-width: 767px) 180px, (max-width: 1023px) 200px, 300px"
className="h-[88px] w-auto md:h-24 lg:h-[96px] object-contain select-none"
        style={{ width: 'auto' }}
      />
    </Link>
  );
}