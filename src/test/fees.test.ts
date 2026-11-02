import { describe, expect, it } from "vitest";
import { calcServiceFee } from "@/lib/fees";

describe("try-on service fee", () => {
  it("charges the $25 base fee for 1-3 items", () => {
    expect(calcServiceFee(1).total).toBe(25);
    expect(calcServiceFee(3).total).toBe(25);
  });
  it("adds $5 for 4-6 items", () => {
    expect(calcServiceFee(4).total).toBe(30);
    expect(calcServiceFee(6).total).toBe(30);
  });
  it("adds $10 for 7-9 and $15 for 10-12 items", () => {
    expect(calcServiceFee(7).total).toBe(35);
    expect(calcServiceFee(12).total).toBe(40);
  });
  it("charges nothing for an empty bag", () => {
    expect(calcServiceFee(0).total).toBe(0);
  });
});
