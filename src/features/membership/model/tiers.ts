export const membershipTiers = [
  { id: "silver", name: "Silver", multiplier: 1, minimumEur: 0, label: "Free", accent: "text-slate-300" },
  { id: "gold", name: "Gold", multiplier: 1.5, minimumEur: 500, label: "€500 token holding", accent: "text-amber-300" },
  { id: "black", name: "Black", multiplier: 2, minimumEur: 2500, label: "€2,500 token holding", accent: "text-violet-300" },
] as const;

/** Illustrative only; never use this as server-side eligibility verification. */
export function getMembershipPreview(value: string) {
  const amount = Number(value);
  if (value.trim() === "" || !Number.isFinite(amount) || amount < 0) return null;
  return [...membershipTiers].reverse().find(tier => amount >= tier.minimumEur) ?? null;
}
