import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl tracking-[0.25em]">FORME</div>
          <p className="mt-3 text-sm text-muted-foreground">Your favorite brands, tried on at home.</p>
        </div>
        <div className="space-y-2 text-sm">
          <div className="eyebrow mb-3">Shop</div>
          <Link to="/shop" className="block">Shop All</Link>
          <Link to="/brands" className="block">Brands</Link>
        </div>
        <div className="space-y-2 text-sm">
          <div className="eyebrow mb-3">Service</div>
          <Link to="/how-it-works" className="block">How It Works</Link>
          <Link to="/bag" className="block">Try-On Bag</Link>
        </div>
        <p className="text-xs text-muted-foreground">FORME is an independent try-on service and is not affiliated with the retailers listed.</p>
      </div>
    </footer>
  );
}
