import { describe, it, expect } from "vitest";
import { phoneCountryCodes } from "../data/phoneCodes.js";
import type { PhoneCountryCode } from "../types/index.js";

describe("phoneCountryCodes", () => {
  it("should export an array of phone country codes", () => {
    expect(Array.isArray(phoneCountryCodes)).toBe(true);
  });

  it("should contain a significant number of entries", () => {
    expect(phoneCountryCodes.length).toBeGreaterThan(150);
  });

  it("should have all required fields for each entry", () => {
    const requiredFields: (keyof PhoneCountryCode)[] = [
      "country",
      "code",
      "phoneCode",
      "flag",
    ];

    for (const entry of phoneCountryCodes) {
      for (const field of requiredFields) {
        expect(
          entry[field],
          `Entry "${entry.country}" is missing field "${field}"`
        ).toBeTruthy();
      }
    }
  });

  it("should have phone codes starting with +", () => {
    for (const entry of phoneCountryCodes) {
      expect(
        entry.phoneCode.startsWith("+"),
        `Entry "${entry.country}" has invalid phone code: "${entry.phoneCode}"`
      ).toBe(true);
    }
  });

  it("should have ISO alpha-2 codes of length 2", () => {
    for (const entry of phoneCountryCodes) {
      expect(
        entry.code.length,
        `Entry "${entry.country}" has invalid code: "${entry.code}"`
      ).toBe(2);
    }
  });

  it("should include well-known phone codes", () => {
    const us = phoneCountryCodes.find((c) => c.code === "US");
    expect(us?.phoneCode).toBe("+1");

    const gb = phoneCountryCodes.find((c) => c.code === "GB");
    expect(gb?.phoneCode).toBe("+44");

    const de = phoneCountryCodes.find((c) => c.code === "DE");
    expect(de?.phoneCode).toBe("+49");

    const cn = phoneCountryCodes.find((c) => c.code === "CN");
    expect(cn?.phoneCode).toBe("+86");

    const jp = phoneCountryCodes.find((c) => c.code === "JP");
    expect(jp?.phoneCode).toBe("+81");
  });

  it("should be searchable by phone code", () => {
    const entries = phoneCountryCodes.filter((c) => c.phoneCode === "+1");
    expect(entries.length).toBeGreaterThanOrEqual(1);
  });

  it("should have correct data for United Kingdom", () => {
    const gb = phoneCountryCodes.find((c) => c.code === "GB");
    expect(gb).toBeDefined();
    expect(gb?.country).toBe("United Kingdom");
    expect(gb?.phoneCode).toBe("+44");
    expect(gb?.flag).toBe("🇬🇧");
  });
});
