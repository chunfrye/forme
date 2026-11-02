// Sample catalog. Will move to the database when the admin dashboard is built.
const active = "https://images.pexels.com/photos/6516201/pexels-photo-6516201.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const dress = "https://images.pexels.com/photos/32443160/pexels-photo-32443160.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const coat = "https://images.pexels.com/photos/19354455/pexels-photo-19354455.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const shirt = "https://images.pexels.com/photos/30809030/pexels-photo-30809030.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const blazer = "https://images.pexels.com/photos/36203255/pexels-photo-36203255.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const shoes = "https://images.pexels.com/photos/10352336/pexels-photo-10352336.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const mensActive = "https://images.pexels.com/photos/8401797/pexels-photo-8401797.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";

export type Gender = "women" | "men";
export type Product = {
  id: string;
  name: string;
  brand: string;
  retailer: string;
  category: string;
  gender: Gender;
  price: number;
  description: string;
  sizes: string[];
  colors: string[];
  images: string[];
  sourceUrl: string;
  available: boolean;
  isNew?: boolean;
  trending?: boolean;
};

export const BRANDS = ["Lululemon", "Aritzia", "Mango", "Zara", "COS", "Nordstrom"];
export const RETAILERS = ["Nordstrom", "Lululemon", "Aritzia", "Mango", "Zara", "COS"];
export const CATEGORIES = ["Tops", "Bottoms", "Dresses", "Activewear", "Jackets", "Shoes", "Accessories"];

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const W = ["XS", "S", "M", "L", "XL"];
const M = ["S", "M", "L", "XL", "XXL"];

export const PRODUCTS: Product[] = [
  { id: "align-set", name: "Align High-Rise Legging Set", brand: "Lululemon", retailer: "Lululemon", category: "Activewear", gender: "women", price: 128, description: "Buttery-soft, weightless fabric made for yoga and everyday movement.", sizes: W, colors: ["Black", "Graphite"], images: [active, shirt], sourceUrl: "https://shop.lululemon.com", available: true, trending: true },
  { id: "silk-slip", name: "Satin Bias Midi Slip Dress", brand: "Aritzia", retailer: "Aritzia", category: "Dresses", gender: "women", price: 148, description: "A fluid bias-cut slip dress in lustrous satin with adjustable straps.", sizes: W, colors: ["Ivory", "Black", "Champagne"], images: [dress, blazer], sourceUrl: "https://www.aritzia.com", available: true, isNew: true, trending: true },
  { id: "camel-coat", name: "Wool-Blend Tailored Overcoat", brand: "COS", retailer: "Nordstrom", category: "Jackets", gender: "men", price: 290, description: "A single-breasted overcoat cut from a warm wool blend.", sizes: M, colors: ["Camel", "Navy"], images: [coat, mensActive], sourceUrl: "https://www.nordstrom.com", available: true, trending: true },
  { id: "poplin-shirt", name: "Oversized Cotton Poplin Shirt", brand: "Mango", retailer: "Mango", category: "Tops", gender: "women", price: 59.99, description: "Relaxed button-down in crisp cotton poplin with dropped shoulders.", sizes: W, colors: ["White", "Sky Blue"], images: [shirt, dress], sourceUrl: "https://shop.mango.com", available: true, isNew: true },
  { id: "cropped-blazer", name: "Cropped Wool Blazer", brand: "Zara", retailer: "Zara", category: "Jackets", gender: "women", price: 119, description: "Structured cropped blazer with a sharp shoulder and single button.", sizes: W, colors: ["Black", "Ecru"], images: [blazer, shirt], sourceUrl: "https://www.zara.com", available: true, isNew: true, trending: true },
  { id: "wide-trouser", name: "Pleated Wide-Leg Trouser", brand: "Aritzia", retailer: "Nordstrom", category: "Bottoms", gender: "women", price: 148, description: "High-waisted pleated trousers with a fluid, floor-grazing drape.", sizes: ["0", "2", "4", "6", "8", "10"], colors: ["Black", "Oat"], images: [blazer, dress], sourceUrl: "https://www.nordstrom.com", available: true },
  { id: "leather-sneaker", name: "Minimal Leather Sneaker", brand: "COS", retailer: "COS", category: "Shoes", gender: "women", price: 150, description: "Clean low-top sneakers in smooth calf leather.", sizes: ["6", "7", "8", "9", "10"], colors: ["White"], images: [shoes], sourceUrl: "https://www.cos.com", available: true, isNew: true },
  { id: "leather-tote", name: "Soft Leather Tote", brand: "Mango", retailer: "Nordstrom", category: "Accessories", gender: "women", price: 129.99, description: "Roomy unlined tote in supple leather.", sizes: ["One Size"], colors: ["Tan", "Black"], images: [shoes], sourceUrl: "https://www.nordstrom.com", available: true, trending: true },
  { id: "metal-vent", name: "Metal Vent Tech Half Zip", brand: "Lululemon", retailer: "Nordstrom", category: "Activewear", gender: "men", price: 98, description: "Breathable half zip with anti-stink technology.", sizes: M, colors: ["Navy", "Black"], images: [mensActive, coat], sourceUrl: "https://www.nordstrom.com", available: true, isNew: true },
  { id: "abc-jogger", name: "ABC Jogger", brand: "Lululemon", retailer: "Lululemon", category: "Bottoms", gender: "men", price: 128, description: "Anti-ball-crushing jogger in four-way stretch Warpstreme.", sizes: M, colors: ["Black", "Obsidian"], images: [mensActive], sourceUrl: "https://shop.lululemon.com", available: true },
  { id: "merino-crew", name: "Merino Crew Knit", brand: "Zara", retailer: "Zara", category: "Tops", gender: "men", price: 69.9, description: "Fine-gauge merino crew neck for layering.", sizes: M, colors: ["Gray", "Navy"], images: [coat], sourceUrl: "https://www.zara.com", available: false },
  { id: "linen-suit", name: "Linen Relaxed Blazer", brand: "Nordstrom", retailer: "Nordstrom", category: "Jackets", gender: "women", price: 159, description: "An airy linen blazer with a relaxed, oversized fit.", sizes: W, colors: ["Natural", "Black"], images: [dress, shirt], sourceUrl: "https://www.nordstrom.com", available: true, isNew: true },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const money = (n: number) => `$${n.toFixed(n % 1 ? 2 : 0)}`;
