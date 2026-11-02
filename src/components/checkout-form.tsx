import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutSchema,
  DELIVERY_WINDOWS,
  EMPTY_CHECKOUT_VALUES,
  type CheckoutValues,
} from "@/lib/checkout";

const inputClass =
  "w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground aria-[invalid=true]:border-destructive";

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string | undefined;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="eyebrow text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

export function CheckoutForm() {
  const [paymentPending, setPaymentPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: EMPTY_CHECKOUT_VALUES,
    mode: "onTouched",
  });

  const onValid = () => setPaymentPending(true);

  return (
    <form onSubmit={handleSubmit(onValid)} noValidate className="space-y-10">
      <section>
        <h2 className="text-3xl">Your details</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Field label="First name" error={errors.firstName?.message}>
            <input aria-invalid={!!errors.firstName} className={inputClass} autoComplete="given-name" {...register("firstName")} />
          </Field>
          <Field label="Last name" error={errors.lastName?.message}>
            <input aria-invalid={!!errors.lastName} className={inputClass} autoComplete="family-name" {...register("lastName")} />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input type="email" aria-invalid={!!errors.email} className={inputClass} autoComplete="email" {...register("email")} />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <input type="tel" aria-invalid={!!errors.phone} className={inputClass} autoComplete="tel" {...register("phone")} />
          </Field>
        </div>
      </section>

      <section>
        <h2 className="text-3xl">Delivery address</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Field label="Street address" error={errors.address?.message} className="sm:col-span-2">
            <input aria-invalid={!!errors.address} className={inputClass} autoComplete="address-line1" {...register("address")} />
          </Field>
          <Field label="Apartment, suite or unit (optional)" error={errors.apartment?.message}>
            <input aria-invalid={!!errors.apartment} className={inputClass} autoComplete="address-line2" {...register("apartment")} />
          </Field>
          <Field label="City" error={errors.city?.message}>
            <input aria-invalid={!!errors.city} className={inputClass} autoComplete="address-level2" {...register("city")} />
          </Field>
          <Field label="Postal code" error={errors.postalCode?.message}>
            <input aria-invalid={!!errors.postalCode} className={inputClass} autoComplete="postal-code" {...register("postalCode")} />
          </Field>
        </div>
      </section>

      <section>
        <h2 className="text-3xl">Delivery window</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Field label="Delivery date" error={errors.deliveryDate?.message}>
            <input type="date" aria-invalid={!!errors.deliveryDate} className={inputClass} {...register("deliveryDate")} />
          </Field>
          <Field label="Time window" error={errors.deliveryWindow?.message}>
            <select aria-invalid={!!errors.deliveryWindow} className={inputClass} {...register("deliveryWindow")}>
              <option value="">Choose a window</option>
              {DELIVERY_WINDOWS.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </Field>
          <Field label="Instructions for your stylist (optional)" error={errors.instructions?.message} className="sm:col-span-2">
            <textarea rows={3} aria-invalid={!!errors.instructions} className={`${inputClass} resize-none`} {...register("instructions")} />
          </Field>
        </div>
      </section>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary py-4 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Continue to payment
        </button>
        {paymentPending && (
          <p role="status" className="mt-4 border border-border bg-secondary p-4 text-sm">
            Your details look good. Online payment is not connected yet, so orders can't be placed at this time.
          </p>
        )}
      </div>
    </form>
  );
}
