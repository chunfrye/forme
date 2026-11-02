import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type BagItem = { key: string; productId: string; size: string; color: string };
type Ctx = { items: BagItem[]; add: (i: Omit<BagItem, "key">) => void; remove: (key: string) => void; clear: () => void };

const BagContext = createContext<Ctx | null>(null);
const STORAGE = "forme-bag";

export function BagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem(STORAGE) || "[]")); } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(STORAGE, JSON.stringify(items)); }, [items, loaded]);

  return (
    <BagContext.Provider
      value={{
        items,
        add: (i) => setItems((s) => [...s, { ...i, key: `${i.productId}-${i.size}-${i.color}-${Date.now()}` }]),
        remove: (key) => setItems((s) => s.filter((x) => x.key !== key)),
        clear: () => setItems([]),
      }}
    >
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  const c = useContext(BagContext);
  if (!c) throw new Error("useBag outside BagProvider");
  return c;
}
