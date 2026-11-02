import { createFileRoute, Link } from "@tanstack/react-router";
const hero = "https://images.pexels.com/photos/9148280/pexels-photo-9148280.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const dress = "https://images.pexels.com/photos/32443160/pexels-photo-32443160.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const active = "https://images.pexels.com/photos/6516201/pexels-photo-6516201.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const coat = "https://images.pexels.com/photos/19354455/pexels-photo-19354455.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const shoes = "https://images.pexels.com/photos/10352336/pexels-photo-10352336.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
import { BRANDS, PRODUCTS, slug } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { HowSteps } from "@/components/how-steps";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FORME — Your Favorite Styles, Tried On at Home" },
      { name: "description", content: "Shop Lululemon, Aritzia, Zara, Mango and more. We deliver it all to your door so you can try before you buy." },
      { property: "og:title", content: "FORME — Try Before You Buy, At Home" },
      { property: "og:description", content: "Shop your favorite brands and try it all on from the comfort of home." },
    ],
  }),
  component: Index,
});

const CATS = [
  { label: "Dresses", img: dress, cat: "Dresses" },
  { label: "Activewear", img: active, cat: "Activewear" },
  { label: "Jackets", img: coat, cat: "Jackets" },
  { label: "Shoes & Accessories", img: shoes, cat: "Shoes" },
];

function Index() {
  const trending = PRODUCTS.filter((p) => p.trending).slice(0, 4);
  const fresh = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  return (
    <>
      <section className="relative h-[82vh] min-h-[520px] overflow-hidden">
        <img src={hero} alt="Woman in a linen suit at home" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5">
          <div className="fade-up max-w-xl">
            <div className="eyebrow mb-5 text-muted-foreground">At-home try-on service</div>
            <h1 className="text-5xl leading-[1.05] md:text-7xl">Your Favorite Styles. Delivered to Your Door. Try Before You Buy.</h1>
            <p className="mt-6 max-w-md text-muted-foreground">Shop your favorite brands, select what you love, and try it all on from the comfort of home.</p>
            <Link to="/shop" className="mt-9 inline-block bg-primary px-10 py-4 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-opacity hover:opacity-85">Start Shopping</Link>
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-10">
          <span className="eyebrow text-muted-foreground">Featured brands</span>
          {BRANDS.map((b) => (
            <Link key={b} to="/brands/$slug" params={{ slug: slug(b) }} className="font-display text-2xl tracking-wide text-muted-foreground transition-colors hover:text-foreground">{b}</Link>
          ))}
        </div>
      </section>

      <Rail title="Trending Now" products={trending} />

      <section className="mx-auto max-w-7xl px-5 pt-20">
        <h2 className="mb-8 text-4xl">Popular Categories</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {CATS.map((c) => (
            <Link key={c.label} to="/shop" search={{ category: c.cat } as never} className="group relative block aspect-[3/4] overflow-hidden">
              <img src={c.img} alt={c.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute bottom-4 left-4 bg-background px-4 py-2 text-xs tracking-[0.15em] uppercase">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <Rail title="New Arrivals" products={fresh} />

      <section className="mt-24 bg-sand">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <h2 className="mb-12 text-center text-4xl">How It Works</h2>
          <HowSteps />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pt-24 md:grid-cols-3">
        {[
          ["Every brand, one bag", "Mix Lululemon, Aritzia, Zara and more in a single delivery."],
          ["Transparent pricing", "$25 covers up to 3 items. Each additional 3 items is just $5."],
          ["No more returns", "Try it on at home. Keep only what you love — skip the store and the shipping back."],
        ].map(([t, d]) => (
          <div key={t} className="border-t pt-6">
            <h3 className="text-2xl">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
    </>
  );
}

function Rail({ title, products }: { title: string; products: typeof PRODUCTS }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-20">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-4xl">{title}</h2>
        <Link to="/shop" className="text-xs tracking-[0.15em] uppercase underline underline-offset-4">View all</Link>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
        {products.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}
