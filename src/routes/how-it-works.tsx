import { createFileRoute, Link } from "@tanstack/react-router";
import { HowSteps } from "@/components/how-steps";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — FORME" },
      { name: "description", content: "Select styles, pay a small try-on fee, and we deliver them to your door." },
      { property: "og:title", content: "How FORME Works" },
      { property: "og:description", content: "At-home try-on from your favorite retailers." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <h1 className="max-w-3xl text-6xl">The fitting room, brought to you.</h1>
      <p className="mt-6 max-w-xl text-muted-foreground">We're not a clothing store — we're a try-on service. We source the pieces you choose from the original retailers and deliver them so you can try everything on at home.</p>
      <div className="mt-16"><HowSteps /></div>
      <div className="mt-16 bg-secondary p-10">
        <h2 className="text-3xl">Pricing</h2>
        <table className="mt-6 w-full max-w-md text-sm">
          <tbody className="divide-y">
            {[["1–3 items", "$25"], ["4–6 items", "$30"], ["7–9 items", "$35"], ["10–12 items", "$40"]].map(([a, b]) => (
              <tr key={a}><td className="py-3">{a}</td><td className="py-3 text-right">{b}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/shop" className="mt-12 inline-block bg-primary px-10 py-4 text-xs tracking-[0.2em] text-primary-foreground uppercase">Start Shopping</Link>
    </div>
  ),
});
