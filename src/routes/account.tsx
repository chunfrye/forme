import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — FORME" },
      { name: "description", content: "Your FORME account and try-on orders." },
      { property: "og:title", content: "My Account — FORME" },
      { property: "og:description", content: "Manage your FORME try-on orders." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-5xl">My Account</h1>
      <p className="mt-4 text-muted-foreground">Accounts and order history are coming soon.</p>
      <Link to="/shop" className="mt-8 inline-block text-xs tracking-[0.15em] uppercase underline underline-offset-4">Keep shopping</Link>
    </div>
  ),
});
