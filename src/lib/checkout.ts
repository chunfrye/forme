import { z } from "zod";

export const DELIVERY_WINDOWS = [
  "8:00 AM – 11:00 AM",
  "11:00 AM – 2:00 PM",
  "2:00 PM – 5:00 PM",
  "5:00 PM – 8:00 PM",
] as const;

function todayIso() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export const checkoutSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name"),
  lastName: z.string().trim().min(1, "Enter your last name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\d\s-]{7,20}$/, "Enter a valid phone number"),
  address: z.string().trim().min(3, "Enter your delivery address"),
  apartment: z.string().trim().max(60, "Keep this under 60 characters"),
  city: z.string().trim().min(1, "Enter your city"),
  postalCode: z.string().trim().min(3, "Enter your postal code"),
  deliveryDate: z
    .string()
    .min(1, "Choose a delivery date")
    .refine((date) => date >= todayIso(), "Choose today or a later date"),
  deliveryWindow: z.enum(DELIVERY_WINDOWS, {
    errorMap: () => ({ message: "Choose a delivery time window" }),
  }),
  instructions: z.string().trim().max(500, "Keep instructions under 500 characters"),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;

export const EMPTY_CHECKOUT_VALUES: CheckoutValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  postalCode: "",
  deliveryDate: "",
  deliveryWindow: "" as CheckoutValues["deliveryWindow"],
  instructions: "",
};
