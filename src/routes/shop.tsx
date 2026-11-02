import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BRANDS, CATEGORIES, PRODUCTS, RETAILERS } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";

type S = { q?: string; gender?: string; brand?: string; retailer?: string; category?: string; size?: string; color?: string; max?: number; avail?: boolean; sort?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): S => ({
    q: s.q ? String(s.q) : undefined,
    gender: s.gender ? String(s.gender) : undefined,
    brand: s.brand ? String(s.brand) : undefined,
    retailer: s.retailer ? String(s.retailer) : undefined,
    category: s.category ? String(s.category) : undefined,
    size: s.size ? String(s.size) : undefined,
    color: s.color ? String(s.color) : undefined,
    max: s.max ? Number(s.max) : undefined,
    avail: s.avail ? true : undefined,
    sort: s.sort ? String(s.sort) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All — FORME" },
      { name: "description", content: "Browse clothing from top brands and retailers to try on at home." },
      { property: "og:title", content: "Shop All — FORME" },
      { property: "og:description", content: "Filter by brand, retailer, size, color and price." },
    ],
  }),
  component: Shop,
});

const SIZES = Array.from(new Set(PRODUCTS.flatMap((p) => p.sizes)));
const COLORS = Array.from(new Set(PRODUCTS.flatMap((p) => p.colors))).sort();

function Shop() {
  const s = Route.useSearch();
  const nav = useNavigate({ from: "/shop" });
  const set = (patch: Partial<S>) => nav({ search: (prev: S) => ({ ...prev, ...patch }) });
  const q = s.q?.toLowerCase();
  let list = PRODUCTS.filter((p) =>
    (!q || `${p.name} ${p.brand} ${p.retailer} ${p.category}`.toLowerCase().includes(q)) &&
    (!s.gender || p.gender === s.gender) && (!s.brand || p.brand === s.brand) &&
    (!s.retailer || p.retailer === s.retailer) && (!s.category || p.category === s.category) &&
    (!s.size || p.sizes.includes(s.size)) && (!s.color || p.colors.includes(s.color)) &&
    (!s.max || p.price <= s.max) && (!s.avail || p.available));
  if (s.sort === "new") list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
  if (s.sort === "price") list = [...list].sort((a, b) => a.price - b.price);

  const title = s.q ? `Results for “${s.q}”` : s.gender === "women" ? "Women's" : s.gender === "men" ? "Men's" : s.category ?? (s.sort === "new" ? "New Arrivals" : "Shop All");

  const Sel = ({ label, k, opts }: { label: string; k: keyof S; opts: string[] }) => (
    <label className="block">
      <span className="eyebrow text-muted-foreground">{label}</span>
      <select value={(s[k] as string) ?? ""} onChange={(e) => set({ [k]: e.target.value || undefined })} className="mt-1 w-full border-b border-input bg-transparent py-2 text-sm outline-none">
        <option value="">All</option>
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="text-5xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{list.length} styles</p>
      <div className="mt-10 grid gap-10 md:grid-cols-[220px_1fr]">
        <aside className="space-y-5">
          <Sel label="Category" k="category" opts={CATEGORIES} />
          <Sel label="Brand" k="brand" opts={BRANDS} />
          <Sel label="Retailer" k="retailer" opts={RETAILERS} />
          <Sel label="Size" k="size" opts={SIZES} />
          <Sel label="Color" k="color" opts={COLORS} />
          <label className="block">
            <span className="eyebrow text-muted-foreground">Max price</span>
            <select value={s.max ?? ""} onChange={(e) => set({ max: e.target.value ? Number(e.target.value) : undefined })} className="mt-1 w-full border-b border-input bg-transparent py-2 text-sm outline-none">
              <option value="">Any</option>
              {[50, 100, 150, 300].map((m) => <option key={m} value={m}>Under ${m}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!s.avail} onChange={(e) => set({ avail: e.target.checked || undefined })} /> Available only
          </label>
          <button onClick={() => nav({ search: {} })} className="text-xs tracking-[0.15em] uppercase underline underline-offset-4">Clear all</button>
        </aside>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
          {list.length === 0 && <p className="text-muted-foreground">No styles match these filters.</p>}
        </div>
      </div>
    </div>
  );
}
