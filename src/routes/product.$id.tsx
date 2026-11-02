import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { getProduct, money, slug } from "@/lib/catalog";
import { useBag } from "@/lib/bag";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { id: p.id };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.id) : undefined;
    return {
      meta: [
        { title: p ? `${p.name} by ${p.brand} — FORME` : "Product — FORME" },
        { name: "description", content: p?.description ?? "Try it on at home." },
        { property: "og:title", content: p ? `${p.name} — ${p.brand}` : "FORME" },
        { property: "og:description", content: p?.description ?? "Try it on at home." },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const p = getProduct(Route.useLoaderData().id)!;
  const { add } = useBag();
  const [img, setImg] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const ready = size && color && p.available;

  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 md:grid-cols-[1.2fr_1fr]">
      <div className="grid grid-cols-[72px_1fr] gap-4">
        <div className="space-y-3">
          {p.images.map((src, i) => (
            <button key={i} onClick={() => setImg(i)} className={`block aspect-[3/4] w-full overflow-hidden border ${i === img ? "border-foreground" : "border-transparent"}`}>
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <div className="aspect-[3/4] overflow-hidden bg-muted">
          <img src={p.images[img]} alt={p.name} width={768} height={1024} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="md:pt-6">
        <Link to="/brands/$slug" params={{ slug: slug(p.brand) }} className="eyebrow text-muted-foreground">{p.brand}</Link>
        <h1 className="mt-2 text-5xl leading-tight">{p.name}</h1>
        <div className="mt-3 text-sm text-muted-foreground">Retail price {money(p.price)} at <Link to="/brands/$slug" params={{ slug: slug(p.retailer) }} className="underline">{p.retailer}</Link></div>
        <p className="mt-6 text-sm leading-relaxed">{p.description}</p>

        <div className="mt-8">
          <div className="eyebrow mb-3">Color {color && <span className="text-muted-foreground">— {color}</span>}</div>
          <div className="flex flex-wrap gap-2">
            {p.colors.map((c) => (
              <button key={c} onClick={() => setColor(c)} className={`border px-4 py-2 text-sm ${color === c ? "border-foreground bg-primary text-primary-foreground" : "border-input"}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <div className="eyebrow mb-3">Size</div>
          <div className="flex flex-wrap gap-2">
            {p.sizes.map((s) => (
              <button key={s} onClick={() => setSize(s)} className={`min-w-12 border px-3 py-2 text-sm ${size === s ? "border-foreground bg-primary text-primary-foreground" : "border-input"}`}>{s}</button>
            ))}
          </div>
        </div>

        <button
          disabled={!ready}
          onClick={() => { add({ productId: p.id, size, color }); toast.success("Added to your try-on bag", { description: `${p.name} · ${color} · ${size}` }); }}
          className="mt-10 w-full bg-primary py-4 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-opacity disabled:opacity-40"
        >
          {!p.available ? "Currently unavailable" : ready ? "Add to Try-On Bag" : "Select color & size"}
        </button>
        <p className="mt-4 text-xs text-muted-foreground">You pay only the try-on service fee now. Buy what you keep from {p.retailer} after trying it on.</p>
        <a href={p.sourceUrl} target="_blank" rel="noreferrer" className="mt-6 inline-block text-xs underline underline-offset-4">View on {p.retailer}</a>
      </div>
    </div>
  );
}
