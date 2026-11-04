export const membershipTiers = [
  { id: "silver", name: "Silver", multiplier: 1, minimumEur: 0, label: "Free", accent: "text-slate-300" },
  { id: "gold", name: "Gold", multiplier: 1.5, minimumEur: 500, label: "€500 token holding", accent: "text-amber-300" },
  { id: "black", name: "Black", multiplier: 2, minimumEur: 2500, label: "€2,500 token holding", accent: "text-violet-300" },
] as const;
