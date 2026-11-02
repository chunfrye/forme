import { getProduct, money } from "@/lib/catalog";
import { calcServiceFee, FEE_CONFIG } from "@/lib/fees";
import type { BagItem } from "@/lib/bag";

export function OrderSummary({ items }: { items: BagItem[] }) {
  const fee = calcServiceFee(items.length);
  const rows = items.map((i) => ({ ...i, p: getProduct(i.productId) })).filter((r) => r.p);
  const retailTotal = rows.reduce((s, r) => s + r.p!.price, 0);

  return (
    <aside className="h-fit bg-secondary p-8 lg:sticky lg:top-32">
      <h2 className="text-3xl">Order summary</h2>
      <ul className="mt-6 divide-y border-y">
        {rows.map(({ key, p, size, color }) => (
          <li key={key} className="flex gap-4 py-4 text-sm">
            <img src={p!.images[0]} alt={p!.name} className="h-20 w-16 object-cover" />
            <div>
              <div className="font-display text-lg">{p!.name}</div>
              <div className="text-muted-foreground">{p!.brand}</div>
              <div className="text-muted-foreground">Color: {color} · Size: {size}</div>
            </div>
          </li>
        ))}
      </ul>
      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between"><dt>Base try-on fee (up to {FEE_CONFIG.itemsPerTier})</dt><dd>{money(fee.base)}</dd></div>
        <div className="flex justify-between"><dt>Additional item fees</dt><dd>{money(fee.additional)}</dd></div>
        <div className="flex justify-between border-t pt-3 text-base font-medium"><dt>Total due today</dt><dd>{money(fee.total)}</dd></div>
      </dl>
      <p className="mt-6 border-t pt-4 text-xs text-muted-foreground">
        Combined retail value {money(retailTotal)} is not charged. You only buy what you keep, directly from the retailer.
      </p>
    </aside>
  );
}
