"use client";

import {
  FaCar,
  FaCogs,
  FaTools,
  FaMapMarkerAlt,
} from "react-icons/fa";

export type PartType = "all" | "engine" | "transmission" | "location";

export interface ToggleOption {
  value: PartType;
  label: string;
  icon: React.ReactNode;
}

const ALL_OPTIONS: ToggleOption[] = [
  {
    value: "engine",
    label: "Engines",
    icon: <FaTools className="h-4 w-4" />,
  },
  {
    value: "transmission",
    label: "Transmissions",
    icon: <FaCogs className="h-4 w-4" />,
  },
  {
    value: "location",
    label: "By Location",
    icon: <FaMapMarkerAlt className="h-4 w-4" />,
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
  const visibleOptions = ALL_OPTIONS.filter((o) =>
    show.includes(o.value)
  );

  const tabs: ToggleOption[] = showAll
    ? [
        {
          value: "all",
          label: "All",
          icon: <FaCar className="h-4 w-4" />,
        },
        ...visibleOptions,
      ]
    : visibleOptions;

  return (
    <div className="inline-flex items-center gap-1 bg-gray-100 rounded-xl p-1">
      {tabs.map((tab) => {
        const active = value === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
              transition-all duration-200 whitespace-nowrap
              ${
                active
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800 hover:bg-white/70"
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}