const STEPS = [
  ["01", "Browse & select", "Pick styles from your favorite brands and choose your sizes and colors."],
  ["02", "Pay the try-on fee", "$25 covers up to 3 items; every additional 3 items adds $5."],
  ["03", "We source & deliver", "We collect each piece from the original retailer and bring it to your door."],
  ["04", "Try on at home", "Keep what you love and buy it from the retailer — we handle the rest."],
];

export function HowSteps() {
  return (
    <div className="grid gap-10 md:grid-cols-4">
      {STEPS.map(([n, t, d]) => (
        <div key={n}>
          <div className="font-display text-5xl text-muted-foreground">{n}</div>
          <h3 className="mt-3 text-2xl">{t}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{d}</p>
        </div>
      ))}
    </div>
  );
}
