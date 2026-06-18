// ─────────────────────────────────────────────────────────────────
// USAGE EXAMPLES — how to use <TypeToggle /> on sub-pages
// ─────────────────────────────────────────────────────────────────

// ── 1. /used-engine page ─────────────────────────────────────────
// Shows: [ Engines | By Location ]
// No "Transmission" tab, no "All" tab

import { TypeToggle, type PartType } from "@/app/components/TypeToggle";
import { useState } from "react";

export function UsedEngineBrowse() {
  const [filter, setFilter] = useState<PartType>("engine");

  return (
    <div>
      <TypeToggle
        show={["engine", "location"]}
        showAll={false}           // no "All" tab on sub-pages
        value={filter}
        onChange={setFilter}
      />

      {/* Use `filter` to drive your Supabase query:
          filter === "engine"   → type = 'engine'
          filter === "location" → type = 'location'  */}
    </div>
  );
}


// ── 2. /used-transmission page ───────────────────────────────────
// Shows: [ Transmissions | By Location ]

export function UsedTransmissionBrowse() {
  const [filter, setFilter] = useState<PartType>("transmission");

  return (
    <div>
      <TypeToggle
        show={["transmission", "location"]}
        showAll={false}
        value={filter}
        onChange={setFilter}
      />
    </div>
  );
}


// ── 3. Homepage (TopSelling) ──────────────────────────────────────
// Shows: [ All | Engines | Transmissions | By Location ]
// Already wired inside TopSelling.tsx — no extra setup needed.


// ─────────────────────────────────────────────────────────────────
// PROPS REFERENCE
// ─────────────────────────────────────────────────────────────────
//
// <TypeToggle
//   show={["engine", "transmission", "location"]}
//   //  ^ which tabs to display (any subset of the 3)
//
//   showAll={true}
//   //  ^ prepend an "All" tab. true = homepage, false = sub-pages
//
//   value={filter}
//   //  ^ currently active tab value (controlled)
//
//   onChange={(val) => setFilter(val)}
//   //  ^ called when user clicks a different tab
// />
//
// PartType = "all" | "engine" | "transmission" | "location"