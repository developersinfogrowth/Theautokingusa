'use client';

interface MobileMenuButtonProps {
  isOpen:  boolean;
  onClick: () => void;
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-nav"
      className="
        md:hidden
        relative
        flex items-center justify-center
        w-10 h-10
        rounded-xl
        text-white/80 hover:text-white
        bg-white/[0.04] hover:bg-white/[0.10]
        active:bg-white/[0.16]
        border border-white/[0.06]
        transition-all duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
        shrink-0
      "
    >
      {isOpen ? (
        <svg
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6"  x2="6"  y2="18" />
          <line x1="6"  y1="6"  x2="18" y2="18" />
        </svg>
      ) : (
        <svg
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="3"  y1="6"  x2="21" y2="6"  />
          <line x1="3"  y1="12" x2="21" y2="12" />
          <line x1="3"  y1="18" x2="21" y2="18" />
        </svg>
      )}
    </button>
  );
}