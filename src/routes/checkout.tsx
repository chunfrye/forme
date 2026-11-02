import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckoutForm } from "@/components/checkout-form";
import { OrderSummary } from "@/components/checkout-summary";
import { useBag } from "@/lib/bag";
import { money } from "@/lib/catalog";
import { FEE_CONFIG } from "@/lib/fees";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — FORME" },
      { name: "description", content: "Enter your delivery details for your at-home try-on." },
      { property: "og:title", content: "Checkout — FORME" },
      { property: "og:description", content: "Enter your delivery details for your at-home try-on." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { items } = useBag();

  if (!items.length)
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-5xl">Nothing to check out yet</h1>
        <p className="mt-4 text-muted-foreground">Add up to 3 styles for a {money(FEE_CONFIG.baseFee)} try-on fee.</p>
        <Link to="/shop" className="mt-8 inline-block bg-primary px-10 py-4 text-xs tracking-[0.2em] text-primary-foreground uppercase">Start Shopping</Link>
      </div>
    );

  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[1fr_380px]">
      <div>
        <Link to="/bag" className="eyebrow text-muted-foreground hover:text-foreground">Back to bag</Link>
        <h1 className="mt-4 text-5xl">Checkout</h1>
        <div className="mt-10">
          <CheckoutForm />
        </div>
      </div>
      <OrderSummary items={items} />
    </div>
  );
}
