import { describe, it, expect } from "vitest";
import {
  COUNTRY_MAP_DEFAULTS,
  latLonToMapPoint,
  getCountrySvg,
  getCountrySubdivisionMapUrl,
} from "../data/countryMaps.js";
import type { CountryMapOptions } from "../types/index.js";

describe("latLonToMapPoint", () => {
  it("should place (0, 0) at the centre of the world map", () => {
    const { x, y } = latLonToMapPoint(0, 0);
    // Equator / prime meridian → approximately (1000, 428.5)
    expect(x).toBeCloseTo(1000, 0);
    expect(y).toBeCloseTo(428.5, 0);
  });

  it("should place the north pole at the top of the canvas", () => {
    const { y } = latLonToMapPoint(90, 0);
    expect(y).toBeCloseTo(0, 0);
  });

  it("should place the south pole at the bottom of the canvas", () => {
    const { y } = latLonToMapPoint(-90, 0);
    expect(y).toBeCloseTo(857, 0);
  });

  it("should place the date-line at the right edge of the canvas", () => {
    const { x } = latLonToMapPoint(0, 180);
    expect(x).toBeCloseTo(2000, 0);
  });

  it("should place the anti-meridian at the left edge of the canvas", () => {
    const { x } = latLonToMapPoint(0, -180);
    expect(x).toBeCloseTo(0, 0);
  });

  it("should return numbers for any valid lat/lon pair", () => {
    const { x, y } = latLonToMapPoint(52.52, 13.41); // Berlin
    expect(typeof x).toBe("number");
    expect(typeof y).toBe("number");
    expect(isNaN(x)).toBe(false);
    expect(isNaN(y)).toBe(false);
  });
});

describe("COUNTRY_MAP_DEFAULTS", () => {
  it("should have all required styling properties", () => {
    const required: (keyof CountryMapOptions)[] = [
      "fill",
      "stroke",
      "strokeWidth",
      "width",
      "height",
      "className",
      "showCities",
      "cityColor",
      "capitalColor",
      "cityRadius",
      "capitalRadius",
      "padding",
    ];
    for (const key of required) {
      expect(COUNTRY_MAP_DEFAULTS[key]).toBeDefined();
    }
  });

  it("should have showCities set to true by default", () => {
    expect(COUNTRY_MAP_DEFAULTS.showCities).toBe(true);
  });

  it("should have positive radius values", () => {
    expect(COUNTRY_MAP_DEFAULTS.cityRadius).toBeGreaterThan(0);
    expect(COUNTRY_MAP_DEFAULTS.capitalRadius).toBeGreaterThan(0);
    expect(COUNTRY_MAP_DEFAULTS.capitalRadius).toBeGreaterThan(
      COUNTRY_MAP_DEFAULTS.cityRadius
    );
  });
});

describe("getCountrySvg", () => {
  it("should return null for an unknown country code", () => {
    expect(getCountrySvg("ZZ")).toBeNull();
  });

  it("should return an SVG string for a known country (DE)", () => {
    const svg = getCountrySvg("DE");
    expect(typeof svg).toBe("string");
    expect(svg).not.toBeNull();
  });

  it("should return an SVG string for a known country using lowercase code", () => {
    const svg = getCountrySvg("de");
    expect(svg).not.toBeNull();
  });

  it("returned SVG should contain the <svg> root element", () => {
    const svg = getCountrySvg("FR");
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
  });

  it("returned SVG should contain a viewBox attribute", () => {
    const svg = getCountrySvg("FR");
    expect(svg).toContain('viewBox="');
  });

  it("returned SVG should contain the country path with the correct id", () => {
    const svg = getCountrySvg("JP");
    expect(svg).toContain('id="JP"');
    expect(svg).toContain('data-code="JP"');
    expect(svg).toContain('data-name="Japan"');
  });

  it("returned SVG should include city markers by default", () => {
    // Germany has several cities in the dataset
    const svg = getCountrySvg("DE");
    expect(svg).toContain("<circle");
  });

  it("returned SVG should omit city markers when showCities is false", () => {
    const svg = getCountrySvg("DE", { showCities: false });
    expect(svg).not.toContain("<circle");
  });

  it("should mark capital city with data-capital attribute", () => {
    // US has Washington DC as capital
    const svg = getCountrySvg("US");
    expect(svg).toContain('data-capital="true"');
  });

  it("should apply custom fill color", () => {
    const svg = getCountrySvg("GB", { fill: "#4a90e2" });
    expect(svg).toContain('fill="#4a90e2"');
  });

  it("should apply custom stroke color", () => {
    const svg = getCountrySvg("GB", { stroke: "#ff0000" });
    expect(svg).toContain('stroke="#ff0000"');
  });

  it("should include aria-label with country name", () => {
    const svg = getCountrySvg("AU");
    expect(svg).toContain('aria-label="Australia map"');
  });

  it("should add CSS class when className is provided", () => {
    const svg = getCountrySvg("BR", { className: "my-map" });
    expect(svg).toContain('class="my-map"');
  });

  it("should not add class attribute when className is empty", () => {
    const svg = getCountrySvg("BR", { className: "" });
    expect(svg).not.toContain("class=");
  });

  it("should produce consistent output for the same input", () => {
    const svg1 = getCountrySvg("CN");
    const svg2 = getCountrySvg("CN");
    expect(svg1).toBe(svg2);
  });

  it("should produce different SVGs for different countries", () => {
    const svgDE = getCountrySvg("DE");
    const svgFR = getCountrySvg("FR");
    expect(svgDE).not.toBe(svgFR);
  });

  it("should work for countries in all continents", () => {
    const samples = [
      "NG", // Africa
      "JP", // Asia
      "DE", // Europe
      "US", // North America
      "BR", // South America
      "AU", // Oceania
    ];
    for (const code of samples) {
      const svg = getCountrySvg(code);
      expect(svg, `Expected SVG for ${code}`).not.toBeNull();
      expect(svg, `Expected SVG to start with <svg for ${code}`).toContain("<svg");
    }
  });
});

describe("getCountrySubdivisionMapUrl", () => {
  it("should return a string URL", () => {
    const url = getCountrySubdivisionMapUrl("DEU");
    expect(typeof url).toBe("string");
    expect(url.startsWith("https://")).toBe(true);
  });

  it("should include the alpha-3 code in the URL", () => {
    const url = getCountrySubdivisionMapUrl("FRA");
    expect(url).toContain("FRA");
  });

  it("should be case-insensitive (lowercase input)", () => {
    const url = getCountrySubdivisionMapUrl("usa");
    expect(url).toContain("USA");
  });

  it("should return different URLs for different countries", () => {
    expect(getCountrySubdivisionMapUrl("DEU")).not.toBe(
      getCountrySubdivisionMapUrl("FRA")
    );
  });

  it("should produce a URL pointing to Wikimedia Commons", () => {
    const url = getCountrySubdivisionMapUrl("ITA");
    expect(url).toContain("wikimedia.org");
  });
});
