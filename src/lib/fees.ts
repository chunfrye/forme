// Try-on service fee: base fee covers up to `itemsPerTier` items; each extra
// group of `itemsPerTier` adds `tierFee`. Values become admin-configurable later.
export const FEE_CONFIG = { baseFee: 25, tierFee: 5, itemsPerTier: 3 };

export function calcServiceFee(itemCount: number, cfg = FEE_CONFIG) {
  if (itemCount <= 0) return { base: 0, additional: 0, total: 0 };
  const tiers = Math.ceil(itemCount / cfg.itemsPerTier);
  const additional = (tiers - 1) * cfg.tierFee;
  return { base: cfg.baseFee, additional, total: cfg.baseFee + additional };
}
