import { Link } from "@tanstack/react-router";
import { money, type Product } from "@/lib/catalog";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link to="/product/$id" params={{ id: p.id }} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img src={p.images[0]} alt={p.name} loading="lazy" width={768} height={1024} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        {p.images[1] && (
          <img src={p.images[1]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        )}
        {!p.available && <span className="eyebrow absolute left-3 top-3 bg-background px-2 py-1">Unavailable</span>}
        {p.isNew && p.available && <span className="eyebrow absolute left-3 top-3 bg-background px-2 py-1">New</span>}
      </div>
      <div className="mt-3 space-y-0.5">
        <div className="eyebrow text-muted-foreground">{p.brand}</div>
        <div className="text-sm">{p.name}</div>
        <div className="text-sm text-muted-foreground">{money(p.price)} retail · via {p.retailer}</div>
      </div>
    </Link>
  );
}
