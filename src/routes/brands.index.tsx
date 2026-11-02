import { createFileRoute, Link } from "@tanstack/react-router";
import { BRANDS, PRODUCTS, RETAILERS, slug } from "@/lib/catalog";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title: "Brands & Retailers — FORME" },
      { name: "description", content: "Browse by brand or by the retailer we source from." },
      { property: "og:title", content: "Brands & Retailers — FORME" },
      { property: "og:description", content: "Lululemon, Aritzia, Mango, Zara, COS, Nordstrom and more." },
    ],
  }),
  component: Brands,
});

function Brands() {
  const all = Array.from(new Set([...BRANDS, ...RETAILERS]));
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="text-5xl">Brands & Retailers</h1>
      <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {all.map((b) => {
          const byBrand = PRODUCTS.filter((p) => p.brand === b).length;
          const byRetailer = PRODUCTS.filter((p) => p.retailer === b).length;
          return (
            <Link key={b} to="/brands/$slug" params={{ slug: slug(b) }} className="bg-background p-10 transition-colors hover:bg-secondary">
              <div className="font-display text-4xl">{b}</div>
              <div className="mt-2 text-sm text-muted-foreground">{byBrand} by brand · {byRetailer} sourced here</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
