import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { BRANDS, PRODUCTS, RETAILERS, slug } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/brands/$slug")({
  loader: ({ params }) => {
    const name = [...BRANDS, ...RETAILERS].find((b) => slug(b) === params.slug);
    if (!name) throw notFound();
    return { name };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — FORME` : "Brand — FORME" },
      { name: "description", content: `Try ${loaderData?.name ?? "this brand"} on at home with FORME.` },
      { property: "og:title", content: `${loaderData?.name ?? "Brand"} — FORME` },
      { property: "og:description", content: `Shop ${loaderData?.name ?? "this brand"} and try it on at home.` },
    ],
  }),
  component: BrandPage,
});

function BrandPage() {
  const { name } = Route.useLoaderData();
  const [mode, setMode] = useState<"brand" | "retailer">(BRANDS.includes(name) ? "brand" : "retailer");
  const list = PRODUCTS.filter((p) => (mode === "brand" ? p.brand : p.retailer) === name);
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="eyebrow text-muted-foreground">Brand</div>
      <h1 className="mt-2 text-6xl">{name}</h1>
      <div className="mt-6 flex gap-6 text-xs tracking-[0.15em] uppercase">
        {(["brand", "retailer"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={mode === m ? "underline underline-offset-8" : "text-muted-foreground"}>
            {m === "brand" ? `Made by ${name}` : `Sourced from ${name}`}
          </button>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
        {list.length === 0 && <p className="text-muted-foreground">No styles yet.</p>}
      </div>
    </div>
  );
}
