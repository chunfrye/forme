import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useBag } from "@/lib/bag";
import { getProduct, money } from "@/lib/catalog";
import { calcServiceFee, FEE_CONFIG } from "@/lib/fees";

export const Route = createFileRoute("/bag")({
  head: () => ({
    meta: [
      { title: "Your Try-On Bag — FORME" },
      { name: "description", content: "Review your selected styles and transparent try-on fee." },
      { property: "og:title", content: "Your Try-On Bag — FORME" },
      { property: "og:description", content: "Review your try-on selections." },
    ],
  }),
  component: Bag,
});

function Bag() {
  const { items, remove } = useBag();
  const fee = calcServiceFee(items.length);
  const rows = items.map((i) => ({ ...i, p: getProduct(i.productId) })).filter((r) => r.p);
  const retailTotal = rows.reduce((s, r) => s + r.p!.price, 0);

  if (!items.length)
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-5xl">Your try-on bag is empty</h1>
        <p className="mt-4 text-muted-foreground">Add up to 3 styles for a {money(FEE_CONFIG.baseFee)} try-on fee.</p>
        <Link to="/shop" className="mt-8 inline-block bg-primary px-10 py-4 text-xs tracking-[0.2em] text-primary-foreground uppercase">Start Shopping</Link>
      </div>
    );

  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[1fr_380px]">
      <div>
        <h1 className="text-5xl">Try-On Bag</h1>
        <p className="mt-2 text-sm text-muted-foreground">{items.length} {items.length === 1 ? "item" : "items"}</p>
        <ul className="mt-8 divide-y border-y">
          {rows.map(({ key, p, size, color }) => (
            <li key={key} className="flex gap-5 py-6">
              <img src={p!.images[0]} alt={p!.name} className="h-36 w-28 object-cover" />
              <div className="flex-1 text-sm">
                <div className="eyebrow text-muted-foreground">{p!.brand}</div>
                <Link to="/product/$id" params={{ id: p!.id }} className="mt-1 block font-display text-xl">{p!.name}</Link>
                <div className="mt-2 text-muted-foreground">Color: {color} · Size: {size}</div>
                <div className="text-muted-foreground">Sourced from {p!.retailer}</div>
                <div className="mt-2">Retail {money(p!.price)} <span className="text-muted-foreground">(for reference)</span></div>
              </div>
              <button onClick={() => remove(key)} aria-label="Remove item" className="self-start text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
            </li>
          ))}
        </ul>
      </div>
      <aside className="h-fit bg-secondary p-8 lg:sticky lg:top-32">
        <h2 className="text-3xl">Service fee</h2>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between"><dt>Items</dt><dd>{items.length}</dd></div>
          <div className="flex justify-between"><dt>Base try-on fee (up to {FEE_CONFIG.itemsPerTier})</dt><dd>{money(fee.base)}</dd></div>
          <div className="flex justify-between"><dt>Additional item fees</dt><dd>{money(fee.additional)}</dd></div>
          <div className="flex justify-between border-t pt-3 text-base font-medium"><dt>Total due today</dt><dd>{money(fee.total)}</dd></div>
        </dl>
        <p className="mt-4 text-xs text-muted-foreground">Each additional group of {FEE_CONFIG.itemsPerTier} items adds {money(FEE_CONFIG.tierFee)}.</p>
        <div className="mt-6 border-t pt-4 text-xs text-muted-foreground">
          Combined retail value {money(retailTotal)} — not charged. You only buy what you keep, directly from the retailer.
        </div>
        <button disabled className="mt-8 w-full bg-primary py-4 text-xs tracking-[0.2em] text-primary-foreground uppercase opacity-50">Checkout — coming soon</button>
      </aside>
    </div>
  );
}
