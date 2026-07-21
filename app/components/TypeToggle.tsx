"use client";

import type { ReactNode } from "react";
import {
  Boxes,
  Cog,
  MapPin,
  Wrench,
} from "lucide-react";

export type PartType = "all" | "engine" | "transmission" | "location";

export interface ToggleOption {
  value: PartType;
  label: string;
  icon: ReactNode;
}

const ICON_CLASS = "h-4 w-4 flex-shrink-0";

const ALL_OPTIONS: ToggleOption[] = [
  {
    value: "engine",
    label: "Engines",
    icon: <Wrench className={ICON_CLASS} />,
  },
  {
    value: "transmission",
    label: "Transmissions",
    icon: <Cog className={ICON_CLASS} />,
  },
  {
    value: "location",
    label: "By Location",
    icon: <MapPin className={ICON_CLASS} />,
  },
];

interface TypeToggleProps {
  show?: PartType[];
  showAll?: boolean;
  value: PartType;
  onChange: (value: PartType) => void;
}

export function TypeToggle({
  show = ["engine", "transmission", "location"],
  showAll = true,
  value,
  onChange,
}: TypeToggleProps) {
  const visibleOptions = ALL_OPTIONS.filter((option) =>
    show.includes(option.value)
  );

  const tabs: ToggleOption[] = showAll
    ? [
        {
          value: "all",
          label: "All",
          icon: <Boxes className={ICON_CLASS} />,
        },
        ...visibleOptions,
      ]
    : visibleOptions;

  return (
    <div
      className="
        -mx-4 w-full max-w-full overflow-x-auto px-4 scrollbar-hide
        sm:mx-0 sm:w-auto sm:max-w-none sm:overflow-visible sm:px-0
      "
    >
      <div
        className="
          inline-flex min-w-max items-center gap-1.5
          rounded-xl border border-gray-200 bg-gray-100 p-1.5
        "
      >
        {tabs.map((tab) => {
          const active = value === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onChange(tab.value)}
              aria-pressed={active}
              className={`
                inline-flex flex-shrink-0 items-center gap-2 whitespace-nowrap
                rounded-lg px-3.5 py-2.5
                text-sm font-semibold leading-none
                transition-all duration-200
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-red-500
                focus-visible:ring-offset-2
                ${
                  active
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-white hover:text-gray-900"
                }
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}