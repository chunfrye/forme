import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { useBag } from "@/lib/bag";

const NAV = [
  { label: "Shop All", to: "/shop", search: {} },
  { label: "Women's", to: "/shop", search: { gender: "women" } },
  { label: "Men's", to: "/shop", search: { gender: "men" } },
  { label: "Brands", to: "/brands", search: {} },
  { label: "New Arrivals", to: "/shop", search: { sort: "new" } },
  { label: "How It Works", to: "/how-it-works", search: {} },
] as const;

export function SiteHeader() {
  const { items } = useBag();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="bg-primary py-2 text-center text-[11px] tracking-[0.18em] text-primary-foreground uppercase">
        Up to 3 items delivered for a $25 try-on fee
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-4">
        <Link to="/" className="font-display text-3xl tracking-[0.25em]">FORME</Link>
        <nav className="hidden flex-1 items-center justify-center gap-7 text-[13px] tracking-wide lg:flex">
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} search={n.search as never} className="hover:text-muted-foreground transition-colors">{n.label}</Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <form onSubmit={(e) => { e.preventDefault(); nav({ to: "/shop", search: { q } as never }); }} className="hidden items-center gap-2 border-b border-input md:flex">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="w-36 bg-transparent py-1 text-sm outline-none" />
          </form>
          <Link to="/account" aria-label="My Account"><User className="h-5 w-5" /></Link>
          <Link to="/bag" aria-label="Try-On Bag" className="relative">
            <ShoppingBag className="h-5 w-5" />
            {items.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">{items.length}</span>
            )}
          </Link>
        </div>
      </div>
      <nav className="flex gap-5 overflow-x-auto px-5 pb-3 text-[13px] lg:hidden">
        {NAV.map((n) => <Link key={n.label} to={n.to} search={n.search as never} className="whitespace-nowrap">{n.label}</Link>)}
      </nav>
    </header>
  );
}
