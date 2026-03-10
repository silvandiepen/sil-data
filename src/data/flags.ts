import type { FlagInfo } from "../types/index.js";

/**
 * Build the flagcdn.com SVG URL for a country's flag.
 * @param alpha2 ISO 3166-1 alpha-2 country code (case-insensitive)
 */
export function getFlagSvgUrl(alpha2: string): string {
  return `https://flagcdn.com/${alpha2.toLowerCase()}.svg`;
}

/**
 * Build the flagcdn.com PNG URL for a country's flag.
 * @param alpha2 ISO 3166-1 alpha-2 country code (case-insensitive)
 * @param width Image width in pixels (40 | 80 | 160 | 320 | 640 | 1280 | 2560). Default: 320
 */
export function getFlagPngUrl(alpha2: string, width: 40 | 80 | 160 | 320 | 640 | 1280 | 2560 = 320): string {
  return `https://flagcdn.com/w${width}/${alpha2.toLowerCase()}.png`;
}

/**
 * Build a Wikimedia Commons URL for a country's outline SVG map.
 * This is a reference URL—not bundled in the package.
 * @param alpha3 ISO 3166-1 alpha-3 code (e.g., "USA")
 */
export function getCountryMapSvgUrl(alpha3: string): string {
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/maps/${alpha3.toUpperCase()}.svg/800px-${alpha3.toUpperCase()}.svg.png`;
}

/**
 * Flag metadata for all world countries.
 *
 * `colors` lists the most prominent flag colours (up to 4), most dominant first.
 * `similar` lists alpha-2 codes of countries whose flags are visually similar—
 *   useful for building confusing multiple-choice options in geography games.
 */
export const flagData: FlagInfo[] = [
  // ── A ─────────────────────────────────────────────────────────────────
  { alpha2: "AF", svgUrl: "https://flagcdn.com/af.svg", pngUrl: "https://flagcdn.com/w320/af.png", colors: ["black", "red", "green"], similar: ["IR", "SY", "EG"] },
  { alpha2: "AL", svgUrl: "https://flagcdn.com/al.svg", pngUrl: "https://flagcdn.com/w320/al.png", colors: ["red", "black"], similar: ["GE", "RS", "MK"] },
  { alpha2: "DZ", svgUrl: "https://flagcdn.com/dz.svg", pngUrl: "https://flagcdn.com/w320/dz.png", colors: ["green", "white"], similar: ["PK", "TR", "TN"] },
  { alpha2: "AD", svgUrl: "https://flagcdn.com/ad.svg", pngUrl: "https://flagcdn.com/w320/ad.png", colors: ["blue", "yellow", "red"], similar: ["RO", "TD", "MD"] },
  { alpha2: "AO", svgUrl: "https://flagcdn.com/ao.svg", pngUrl: "https://flagcdn.com/w320/ao.png", colors: ["red", "black"], similar: ["AL", "GE"] },
  { alpha2: "AG", svgUrl: "https://flagcdn.com/ag.svg", pngUrl: "https://flagcdn.com/w320/ag.png", colors: ["red", "black", "gold", "white", "blue"], similar: ["BB", "JM"] },
  { alpha2: "AR", svgUrl: "https://flagcdn.com/ar.svg", pngUrl: "https://flagcdn.com/w320/ar.png", colors: ["light-blue", "white"], similar: ["HN", "NI", "SV"] },
  { alpha2: "AM", svgUrl: "https://flagcdn.com/am.svg", pngUrl: "https://flagcdn.com/w320/am.png", colors: ["red", "blue", "orange"], similar: ["DE", "BE", "TD"] },
  { alpha2: "AU", svgUrl: "https://flagcdn.com/au.svg", pngUrl: "https://flagcdn.com/w320/au.png", colors: ["blue", "red", "white"], similar: ["NZ", "GB", "FJ", "TV"] },
  { alpha2: "AT", svgUrl: "https://flagcdn.com/at.svg", pngUrl: "https://flagcdn.com/w320/at.png", colors: ["red", "white"], similar: ["LV", "SG", "PE", "PL"] },
  { alpha2: "AZ", svgUrl: "https://flagcdn.com/az.svg", pngUrl: "https://flagcdn.com/w320/az.png", colors: ["light-blue", "red", "green"], similar: ["TR", "TM", "UZ"] },
  // ── B ─────────────────────────────────────────────────────────────────
  { alpha2: "BS", svgUrl: "https://flagcdn.com/bs.svg", pngUrl: "https://flagcdn.com/w320/bs.png", colors: ["black", "gold", "blue"], similar: ["PG", "TR"] },
  { alpha2: "BH", svgUrl: "https://flagcdn.com/bh.svg", pngUrl: "https://flagcdn.com/w320/bh.png", colors: ["red", "white"], similar: ["QA", "KW", "AT"] },
  { alpha2: "BD", svgUrl: "https://flagcdn.com/bd.svg", pngUrl: "https://flagcdn.com/w320/bd.png", colors: ["green", "red"], similar: ["JP", "PW", "CG"] },
  { alpha2: "BB", svgUrl: "https://flagcdn.com/bb.svg", pngUrl: "https://flagcdn.com/w320/bb.png", colors: ["blue", "gold", "black"], similar: ["BS", "AG"] },
  { alpha2: "BY", svgUrl: "https://flagcdn.com/by.svg", pngUrl: "https://flagcdn.com/w320/by.png", colors: ["red", "green", "white"], similar: ["AE", "TJ"] },
  { alpha2: "BE", svgUrl: "https://flagcdn.com/be.svg", pngUrl: "https://flagcdn.com/w320/be.png", colors: ["black", "yellow", "red"], similar: ["DE", "TD", "RO", "AM"] },
  { alpha2: "BZ", svgUrl: "https://flagcdn.com/bz.svg", pngUrl: "https://flagcdn.com/w320/bz.png", colors: ["blue", "red", "white"], similar: ["HN", "AR", "NI"] },
  { alpha2: "BJ", svgUrl: "https://flagcdn.com/bj.svg", pngUrl: "https://flagcdn.com/w320/bj.png", colors: ["green", "yellow", "red"], similar: ["GN", "ML", "SN", "ET"] },
  { alpha2: "BT", svgUrl: "https://flagcdn.com/bt.svg", pngUrl: "https://flagcdn.com/w320/bt.png", colors: ["orange", "yellow", "dark-green"], similar: ["ZW", "KE"] },
  { alpha2: "BO", svgUrl: "https://flagcdn.com/bo.svg", pngUrl: "https://flagcdn.com/w320/bo.png", colors: ["red", "yellow", "green"], similar: ["GH", "ET", "LT"] },
  { alpha2: "BA", svgUrl: "https://flagcdn.com/ba.svg", pngUrl: "https://flagcdn.com/w320/ba.png", colors: ["blue", "gold", "white"], similar: ["UK", "BW", "EU"] },
  { alpha2: "BW", svgUrl: "https://flagcdn.com/bw.svg", pngUrl: "https://flagcdn.com/w320/bw.png", colors: ["light-blue", "white", "black"], similar: ["SL", "TZ", "TF"] },
  { alpha2: "BR", svgUrl: "https://flagcdn.com/br.svg", pngUrl: "https://flagcdn.com/w320/br.png", colors: ["green", "yellow", "blue"], similar: ["AU", "VE", "MX"] },
  { alpha2: "BN", svgUrl: "https://flagcdn.com/bn.svg", pngUrl: "https://flagcdn.com/w320/bn.png", colors: ["yellow", "white", "black"], similar: ["MY", "LK"] },
  { alpha2: "BG", svgUrl: "https://flagcdn.com/bg.svg", pngUrl: "https://flagcdn.com/w320/bg.png", colors: ["white", "green", "red"], similar: ["HU", "IT", "MX"] },
  { alpha2: "BF", svgUrl: "https://flagcdn.com/bf.svg", pngUrl: "https://flagcdn.com/w320/bf.png", colors: ["red", "green", "yellow"], similar: ["GN", "ML", "SN"] },
  { alpha2: "BI", svgUrl: "https://flagcdn.com/bi.svg", pngUrl: "https://flagcdn.com/w320/bi.png", colors: ["red", "white", "green"], similar: ["HU", "IT", "MG"] },
  // ── C ─────────────────────────────────────────────────────────────────
  { alpha2: "CV", svgUrl: "https://flagcdn.com/cv.svg", pngUrl: "https://flagcdn.com/w320/cv.png", colors: ["blue", "white", "red"], similar: ["GY", "AT", "SI"] },
  { alpha2: "KH", svgUrl: "https://flagcdn.com/kh.svg", pngUrl: "https://flagcdn.com/w320/kh.png", colors: ["blue", "red", "white"], similar: ["TH", "LR", "CR"] },
  { alpha2: "CM", svgUrl: "https://flagcdn.com/cm.svg", pngUrl: "https://flagcdn.com/w320/cm.png", colors: ["green", "red", "yellow"], similar: ["SN", "GN", "ET", "ML"] },
  { alpha2: "CA", svgUrl: "https://flagcdn.com/ca.svg", pngUrl: "https://flagcdn.com/w320/ca.png", colors: ["red", "white"], similar: ["DK", "SG", "CH", "JP"] },
  { alpha2: "CF", svgUrl: "https://flagcdn.com/cf.svg", pngUrl: "https://flagcdn.com/w320/cf.png", colors: ["blue", "white", "green", "yellow", "red"], similar: ["SL", "RW"] },
  { alpha2: "TD", svgUrl: "https://flagcdn.com/td.svg", pngUrl: "https://flagcdn.com/w320/td.png", colors: ["blue", "yellow", "red"], similar: ["RO", "AD", "MD"] },
  { alpha2: "CL", svgUrl: "https://flagcdn.com/cl.svg", pngUrl: "https://flagcdn.com/w320/cl.png", colors: ["red", "white", "blue"], similar: ["CU", "NC", "TH"] },
  { alpha2: "CN", svgUrl: "https://flagcdn.com/cn.svg", pngUrl: "https://flagcdn.com/w320/cn.png", colors: ["red", "yellow"], similar: ["VN", "VU", "AZ"] },
  { alpha2: "CO", svgUrl: "https://flagcdn.com/co.svg", pngUrl: "https://flagcdn.com/w320/co.png", colors: ["yellow", "blue", "red"], similar: ["EC", "VE", "RO"] },
  { alpha2: "KM", svgUrl: "https://flagcdn.com/km.svg", pngUrl: "https://flagcdn.com/w320/km.png", colors: ["green", "white", "red", "blue"], similar: ["TZ", "YE"] },
  { alpha2: "CD", svgUrl: "https://flagcdn.com/cd.svg", pngUrl: "https://flagcdn.com/w320/cd.png", colors: ["blue", "red", "yellow"], similar: ["CG", "ST", "AO"] },
  { alpha2: "CG", svgUrl: "https://flagcdn.com/cg.svg", pngUrl: "https://flagcdn.com/w320/cg.png", colors: ["green", "yellow", "red"], similar: ["SN", "GN", "ML", "ET"] },
  { alpha2: "CR", svgUrl: "https://flagcdn.com/cr.svg", pngUrl: "https://flagcdn.com/w320/cr.png", colors: ["blue", "white", "red"], similar: ["HN", "CL", "CU", "TH"] },
  { alpha2: "HR", svgUrl: "https://flagcdn.com/hr.svg", pngUrl: "https://flagcdn.com/w320/hr.png", colors: ["red", "white", "blue"], similar: ["NL", "RU", "SK", "SI", "FR"] },
  { alpha2: "CU", svgUrl: "https://flagcdn.com/cu.svg", pngUrl: "https://flagcdn.com/w320/cu.png", colors: ["blue", "white", "red"], similar: ["CL", "PR", "CR", "TH"] },
  { alpha2: "CY", svgUrl: "https://flagcdn.com/cy.svg", pngUrl: "https://flagcdn.com/w320/cy.png", colors: ["white", "orange", "green"], similar: ["MT", "ME", "TR"] },
  { alpha2: "CZ", svgUrl: "https://flagcdn.com/cz.svg", pngUrl: "https://flagcdn.com/w320/cz.png", colors: ["white", "red", "blue"], similar: ["SK", "PH", "PL", "YU"] },
  // ── D ─────────────────────────────────────────────────────────────────
  { alpha2: "DK", svgUrl: "https://flagcdn.com/dk.svg", pngUrl: "https://flagcdn.com/w320/dk.png", colors: ["red", "white"], similar: ["NO", "SE", "FI", "IS", "CH"] },
  { alpha2: "DJ", svgUrl: "https://flagcdn.com/dj.svg", pngUrl: "https://flagcdn.com/w320/dj.png", colors: ["light-blue", "green", "white", "red"], similar: ["SO", "ER"] },
  { alpha2: "DM", svgUrl: "https://flagcdn.com/dm.svg", pngUrl: "https://flagcdn.com/w320/dm.png", colors: ["green", "red", "yellow", "black", "white"], similar: ["GN", "SN", "CM"] },
  { alpha2: "DO", svgUrl: "https://flagcdn.com/do.svg", pngUrl: "https://flagcdn.com/w320/do.png", colors: ["blue", "red", "white"], similar: ["CZ", "SK", "CU"] },
  // ── E ─────────────────────────────────────────────────────────────────
  { alpha2: "EC", svgUrl: "https://flagcdn.com/ec.svg", pngUrl: "https://flagcdn.com/w320/ec.png", colors: ["yellow", "blue", "red"], similar: ["CO", "VE", "RO"] },
  { alpha2: "EG", svgUrl: "https://flagcdn.com/eg.svg", pngUrl: "https://flagcdn.com/w320/eg.png", colors: ["red", "white", "black"], similar: ["SY", "IQ", "YE", "IR"] },
  { alpha2: "SV", svgUrl: "https://flagcdn.com/sv.svg", pngUrl: "https://flagcdn.com/w320/sv.png", colors: ["blue", "white"], similar: ["HN", "NI", "AR", "GT"] },
  { alpha2: "GQ", svgUrl: "https://flagcdn.com/gq.svg", pngUrl: "https://flagcdn.com/w320/gq.png", colors: ["green", "white", "red"], similar: ["IT", "IE", "MX", "CM"] },
  { alpha2: "ER", svgUrl: "https://flagcdn.com/er.svg", pngUrl: "https://flagcdn.com/w320/er.png", colors: ["green", "red", "blue"], similar: ["ET", "DJ", "BJ"] },
  { alpha2: "EE", svgUrl: "https://flagcdn.com/ee.svg", pngUrl: "https://flagcdn.com/w320/ee.png", colors: ["blue", "black", "white"], similar: ["DE", "BE", "NL"] },
  { alpha2: "SZ", svgUrl: "https://flagcdn.com/sz.svg", pngUrl: "https://flagcdn.com/w320/sz.png", colors: ["blue", "yellow", "red"], similar: ["TH", "CR", "CL"] },
  { alpha2: "ET", svgUrl: "https://flagcdn.com/et.svg", pngUrl: "https://flagcdn.com/w320/et.png", colors: ["green", "yellow", "red"], similar: ["GN", "ML", "CM", "SN", "BO"] },
  // ── F ─────────────────────────────────────────────────────────────────
  { alpha2: "FJ", svgUrl: "https://flagcdn.com/fj.svg", pngUrl: "https://flagcdn.com/w320/fj.png", colors: ["light-blue", "white", "blue"], similar: ["AU", "NZ", "TV", "GB"] },
  { alpha2: "FI", svgUrl: "https://flagcdn.com/fi.svg", pngUrl: "https://flagcdn.com/w320/fi.png", colors: ["white", "blue"], similar: ["SE", "DK", "NO", "IS", "GR"] },
  { alpha2: "FR", svgUrl: "https://flagcdn.com/fr.svg", pngUrl: "https://flagcdn.com/w320/fr.png", colors: ["blue", "white", "red"], similar: ["NL", "RU", "SI", "CG", "HR"] },
  // ── G ─────────────────────────────────────────────────────────────────
  { alpha2: "GA", svgUrl: "https://flagcdn.com/ga.svg", pngUrl: "https://flagcdn.com/w320/ga.png", colors: ["green", "yellow", "blue"], similar: ["TZ", "ET", "ML"] },
  { alpha2: "GM", svgUrl: "https://flagcdn.com/gm.svg", pngUrl: "https://flagcdn.com/w320/gm.png", colors: ["red", "blue", "green", "white"], similar: ["SL", "GN", "SN"] },
  { alpha2: "GE", svgUrl: "https://flagcdn.com/ge.svg", pngUrl: "https://flagcdn.com/w320/ge.png", colors: ["white", "red"], similar: ["ENG", "DK", "CH", "SG"] },
  { alpha2: "DE", svgUrl: "https://flagcdn.com/de.svg", pngUrl: "https://flagcdn.com/w320/de.png", colors: ["black", "red", "gold"], similar: ["BE", "BO", "UG", "RW"] },
  { alpha2: "GH", svgUrl: "https://flagcdn.com/gh.svg", pngUrl: "https://flagcdn.com/w320/gh.png", colors: ["red", "gold", "green"], similar: ["ET", "CM", "SN", "BO"] },
  { alpha2: "GR", svgUrl: "https://flagcdn.com/gr.svg", pngUrl: "https://flagcdn.com/w320/gr.png", colors: ["blue", "white"], similar: ["FI", "SE", "IS", "EL"] },
  { alpha2: "GD", svgUrl: "https://flagcdn.com/gd.svg", pngUrl: "https://flagcdn.com/w320/gd.png", colors: ["red", "yellow", "green"], similar: ["BJ", "CM", "ET"] },
  { alpha2: "GT", svgUrl: "https://flagcdn.com/gt.svg", pngUrl: "https://flagcdn.com/w320/gt.png", colors: ["blue", "white"], similar: ["SV", "HN", "NI", "AR"] },
  { alpha2: "GN", svgUrl: "https://flagcdn.com/gn.svg", pngUrl: "https://flagcdn.com/w320/gn.png", colors: ["red", "yellow", "green"], similar: ["ML", "SN", "CM", "ET"] },
  { alpha2: "GW", svgUrl: "https://flagcdn.com/gw.svg", pngUrl: "https://flagcdn.com/w320/gw.png", colors: ["red", "yellow", "green", "black"], similar: ["GN", "SN", "CM"] },
  { alpha2: "GY", svgUrl: "https://flagcdn.com/gy.svg", pngUrl: "https://flagcdn.com/w320/gy.png", colors: ["green", "yellow", "red", "black", "white"], similar: ["CG", "ET", "BJ"] },
  // ── H ─────────────────────────────────────────────────────────────────
  { alpha2: "HT", svgUrl: "https://flagcdn.com/ht.svg", pngUrl: "https://flagcdn.com/w320/ht.png", colors: ["blue", "red"], similar: ["CL", "FR", "NL"] },
  { alpha2: "HN", svgUrl: "https://flagcdn.com/hn.svg", pngUrl: "https://flagcdn.com/w320/hn.png", colors: ["blue", "white"], similar: ["AR", "SV", "NI", "GT"] },
  { alpha2: "HU", svgUrl: "https://flagcdn.com/hu.svg", pngUrl: "https://flagcdn.com/w320/hu.png", colors: ["red", "white", "green"], similar: ["IT", "IE", "BG", "MX"] },
  // ── I ─────────────────────────────────────────────────────────────────
  { alpha2: "IS", svgUrl: "https://flagcdn.com/is.svg", pngUrl: "https://flagcdn.com/w320/is.png", colors: ["blue", "white", "red"], similar: ["NO", "DK", "SE", "FI"] },
  { alpha2: "IN", svgUrl: "https://flagcdn.com/in.svg", pngUrl: "https://flagcdn.com/w320/in.png", colors: ["orange", "white", "green"], similar: ["IE", "CI", "IT"] },
  { alpha2: "ID", svgUrl: "https://flagcdn.com/id.svg", pngUrl: "https://flagcdn.com/w320/id.png", colors: ["red", "white"], similar: ["MC", "PL", "SG", "AT"] },
  { alpha2: "IR", svgUrl: "https://flagcdn.com/ir.svg", pngUrl: "https://flagcdn.com/w320/ir.png", colors: ["green", "white", "red"], similar: ["IT", "HU", "MX"] },
  { alpha2: "IQ", svgUrl: "https://flagcdn.com/iq.svg", pngUrl: "https://flagcdn.com/w320/iq.png", colors: ["red", "white", "black"], similar: ["EG", "SY", "YE"] },
  { alpha2: "IE", svgUrl: "https://flagcdn.com/ie.svg", pngUrl: "https://flagcdn.com/w320/ie.png", colors: ["green", "white", "orange"], similar: ["IN", "CI", "IT"] },
  { alpha2: "IL", svgUrl: "https://flagcdn.com/il.svg", pngUrl: "https://flagcdn.com/w320/il.png", colors: ["white", "blue"], similar: ["GR", "FI", "SI"] },
  { alpha2: "IT", svgUrl: "https://flagcdn.com/it.svg", pngUrl: "https://flagcdn.com/w320/it.png", colors: ["green", "white", "red"], similar: ["IE", "CI", "HU", "IR", "MX"] },
  // ── J ─────────────────────────────────────────────────────────────────
  { alpha2: "JM", svgUrl: "https://flagcdn.com/jm.svg", pngUrl: "https://flagcdn.com/w320/jm.png", colors: ["black", "gold", "green"], similar: ["DE", "BE", "BJ"] },
  { alpha2: "JP", svgUrl: "https://flagcdn.com/jp.svg", pngUrl: "https://flagcdn.com/w320/jp.png", colors: ["white", "red"], similar: ["BD", "CH", "CA", "GE"] },
  { alpha2: "JO", svgUrl: "https://flagcdn.com/jo.svg", pngUrl: "https://flagcdn.com/w320/jo.png", colors: ["black", "white", "green", "red"], similar: ["PS", "KW", "SD", "EG"] },
  // ── K ─────────────────────────────────────────────────────────────────
  { alpha2: "KZ", svgUrl: "https://flagcdn.com/kz.svg", pngUrl: "https://flagcdn.com/w320/kz.png", colors: ["light-blue", "yellow"], similar: ["UZ", "TM", "AZ"] },
  { alpha2: "KE", svgUrl: "https://flagcdn.com/ke.svg", pngUrl: "https://flagcdn.com/w320/ke.png", colors: ["black", "red", "green", "white"], similar: ["ZW", "UG", "GH", "SS"] },
  { alpha2: "KI", svgUrl: "https://flagcdn.com/ki.svg", pngUrl: "https://flagcdn.com/w320/ki.png", colors: ["red", "blue", "white", "gold"], similar: ["FJ", "AU", "PG"] },
  { alpha2: "XK", svgUrl: "https://flagcdn.com/xk.svg", pngUrl: "https://flagcdn.com/w320/xk.png", colors: ["blue", "gold", "white"], similar: ["BA", "EU", "CY"] },
  { alpha2: "KW", svgUrl: "https://flagcdn.com/kw.svg", pngUrl: "https://flagcdn.com/w320/kw.png", colors: ["green", "white", "red", "black"], similar: ["JO", "PS", "SD"] },
  { alpha2: "KG", svgUrl: "https://flagcdn.com/kg.svg", pngUrl: "https://flagcdn.com/w320/kg.png", colors: ["red", "yellow"], similar: ["CN", "VN", "TR"] },
  // ── L ─────────────────────────────────────────────────────────────────
  { alpha2: "LA", svgUrl: "https://flagcdn.com/la.svg", pngUrl: "https://flagcdn.com/w320/la.png", colors: ["blue", "red", "white"], similar: ["TH", "KH", "CR"] },
  { alpha2: "LV", svgUrl: "https://flagcdn.com/lv.svg", pngUrl: "https://flagcdn.com/w320/lv.png", colors: ["red", "white"], similar: ["AT", "SG", "DK", "PL"] },
  { alpha2: "LB", svgUrl: "https://flagcdn.com/lb.svg", pngUrl: "https://flagcdn.com/w320/lb.png", colors: ["red", "white", "green"], similar: ["HU", "IT", "BG"] },
  { alpha2: "LS", svgUrl: "https://flagcdn.com/ls.svg", pngUrl: "https://flagcdn.com/w320/ls.png", colors: ["blue", "white", "green"], similar: ["BW", "SL", "ES"] },
  { alpha2: "LR", svgUrl: "https://flagcdn.com/lr.svg", pngUrl: "https://flagcdn.com/w320/lr.png", colors: ["red", "white", "blue"], similar: ["US", "CL", "KH"] },
  { alpha2: "LY", svgUrl: "https://flagcdn.com/ly.svg", pngUrl: "https://flagcdn.com/w320/ly.png", colors: ["black", "red", "green", "white"], similar: ["SA", "EG", "SD"] },
  { alpha2: "LI", svgUrl: "https://flagcdn.com/li.svg", pngUrl: "https://flagcdn.com/w320/li.png", colors: ["blue", "red", "gold"], similar: ["NL", "LU", "HT"] },
  { alpha2: "LT", svgUrl: "https://flagcdn.com/lt.svg", pngUrl: "https://flagcdn.com/w320/lt.png", colors: ["yellow", "green", "red"], similar: ["BO", "ET", "GH"] },
  { alpha2: "LU", svgUrl: "https://flagcdn.com/lu.svg", pngUrl: "https://flagcdn.com/w320/lu.png", colors: ["red", "white", "light-blue"], similar: ["NL", "FR", "RU", "NL"] },
  // ── M ─────────────────────────────────────────────────────────────────
  { alpha2: "MG", svgUrl: "https://flagcdn.com/mg.svg", pngUrl: "https://flagcdn.com/w320/mg.png", colors: ["white", "red", "green"], similar: ["IT", "HU", "BI"] },
  { alpha2: "MW", svgUrl: "https://flagcdn.com/mw.svg", pngUrl: "https://flagcdn.com/w320/mw.png", colors: ["black", "red", "green"], similar: ["ZW", "KE", "ET"] },
  { alpha2: "MY", svgUrl: "https://flagcdn.com/my.svg", pngUrl: "https://flagcdn.com/w320/my.png", colors: ["red", "white", "blue", "yellow"], similar: ["US", "LR", "PH"] },
  { alpha2: "MV", svgUrl: "https://flagcdn.com/mv.svg", pngUrl: "https://flagcdn.com/w320/mv.png", colors: ["red", "green", "white"], similar: ["BD", "JP", "DZ"] },
  { alpha2: "ML", svgUrl: "https://flagcdn.com/ml.svg", pngUrl: "https://flagcdn.com/w320/ml.png", colors: ["green", "yellow", "red"], similar: ["GN", "SN", "CM", "ET"] },
  { alpha2: "MT", svgUrl: "https://flagcdn.com/mt.svg", pngUrl: "https://flagcdn.com/w320/mt.png", colors: ["white", "red"], similar: ["PL", "ID", "MC", "AT"] },
  { alpha2: "MH", svgUrl: "https://flagcdn.com/mh.svg", pngUrl: "https://flagcdn.com/w320/mh.png", colors: ["blue", "white", "orange"], similar: ["PW", "FJ", "NA"] },
  { alpha2: "MR", svgUrl: "https://flagcdn.com/mr.svg", pngUrl: "https://flagcdn.com/w320/mr.png", colors: ["green", "yellow", "red"], similar: ["DZ", "PK", "TN", "SA"] },
  { alpha2: "MU", svgUrl: "https://flagcdn.com/mu.svg", pngUrl: "https://flagcdn.com/w320/mu.png", colors: ["red", "blue", "yellow", "green"], similar: ["BJ", "ET", "CG"] },
  { alpha2: "MX", svgUrl: "https://flagcdn.com/mx.svg", pngUrl: "https://flagcdn.com/w320/mx.png", colors: ["green", "white", "red"], similar: ["IT", "IE", "CI", "HU"] },
  { alpha2: "FM", svgUrl: "https://flagcdn.com/fm.svg", pngUrl: "https://flagcdn.com/w320/fm.png", colors: ["light-blue", "white"], similar: ["PW", "SOM", "MH"] },
  { alpha2: "MD", svgUrl: "https://flagcdn.com/md.svg", pngUrl: "https://flagcdn.com/w320/md.png", colors: ["blue", "yellow", "red"], similar: ["RO", "TD", "AD"] },
  { alpha2: "MC", svgUrl: "https://flagcdn.com/mc.svg", pngUrl: "https://flagcdn.com/w320/mc.png", colors: ["red", "white"], similar: ["ID", "PL", "SG", "MT"] },
  { alpha2: "MN", svgUrl: "https://flagcdn.com/mn.svg", pngUrl: "https://flagcdn.com/w320/mn.png", colors: ["red", "blue", "yellow"], similar: ["KZ", "UZ", "TM"] },
  { alpha2: "ME", svgUrl: "https://flagcdn.com/me.svg", pngUrl: "https://flagcdn.com/w320/me.png", colors: ["gold", "red", "blue"], similar: ["RS", "MK", "BA"] },
  { alpha2: "MA", svgUrl: "https://flagcdn.com/ma.svg", pngUrl: "https://flagcdn.com/w320/ma.png", colors: ["red", "green"], similar: ["PT", "DZ", "TN", "WE"] },
  { alpha2: "MZ", svgUrl: "https://flagcdn.com/mz.svg", pngUrl: "https://flagcdn.com/w320/mz.png", colors: ["green", "white", "black", "yellow", "red"], similar: ["ZW", "AO", "ET"] },
  { alpha2: "MM", svgUrl: "https://flagcdn.com/mm.svg", pngUrl: "https://flagcdn.com/w320/mm.png", colors: ["yellow", "green", "red", "white"], similar: ["LT", "BO", "GH"] },
  // ── N ─────────────────────────────────────────────────────────────────
  { alpha2: "NA", svgUrl: "https://flagcdn.com/na.svg", pngUrl: "https://flagcdn.com/w320/na.png", colors: ["blue", "red", "green", "white", "gold"], similar: ["ZA", "BW", "ZW"] },
  { alpha2: "NR", svgUrl: "https://flagcdn.com/nr.svg", pngUrl: "https://flagcdn.com/w320/nr.png", colors: ["blue", "white", "gold"], similar: ["AU", "TV", "TO"] },
  { alpha2: "NP", svgUrl: "https://flagcdn.com/np.svg", pngUrl: "https://flagcdn.com/w320/np.png", colors: ["red", "white", "blue"], similar: [] },
  { alpha2: "NL", svgUrl: "https://flagcdn.com/nl.svg", pngUrl: "https://flagcdn.com/w320/nl.png", colors: ["red", "white", "blue"], similar: ["LU", "FR", "RU", "YU", "HR"] },
  { alpha2: "NZ", svgUrl: "https://flagcdn.com/nz.svg", pngUrl: "https://flagcdn.com/w320/nz.png", colors: ["blue", "red", "white"], similar: ["AU", "GB", "FJ", "TV"] },
  { alpha2: "NI", svgUrl: "https://flagcdn.com/ni.svg", pngUrl: "https://flagcdn.com/w320/ni.png", colors: ["blue", "white"], similar: ["HN", "SV", "AR", "GT"] },
  { alpha2: "NE", svgUrl: "https://flagcdn.com/ne.svg", pngUrl: "https://flagcdn.com/w320/ne.png", colors: ["orange", "white", "green"], similar: ["IN", "IE", "CI"] },
  { alpha2: "NG", svgUrl: "https://flagcdn.com/ng.svg", pngUrl: "https://flagcdn.com/w320/ng.png", colors: ["green", "white"], similar: ["IT", "MX", "IE"] },
  { alpha2: "KP", svgUrl: "https://flagcdn.com/kp.svg", pngUrl: "https://flagcdn.com/w320/kp.png", colors: ["blue", "red", "white"], similar: ["KR", "CU", "CL", "TH"] },
  { alpha2: "MK", svgUrl: "https://flagcdn.com/mk.svg", pngUrl: "https://flagcdn.com/w320/mk.png", colors: ["red", "yellow"], similar: ["CN", "KG", "TR"] },
  { alpha2: "NO", svgUrl: "https://flagcdn.com/no.svg", pngUrl: "https://flagcdn.com/w320/no.png", colors: ["red", "white", "blue"], similar: ["DK", "IS", "SE", "FI"] },
  // ── O ─────────────────────────────────────────────────────────────────
  { alpha2: "OM", svgUrl: "https://flagcdn.com/om.svg", pngUrl: "https://flagcdn.com/w320/om.png", colors: ["white", "red", "green"], similar: ["YE", "KW", "JO"] },
  // ── P ─────────────────────────────────────────────────────────────────
  { alpha2: "PK", svgUrl: "https://flagcdn.com/pk.svg", pngUrl: "https://flagcdn.com/w320/pk.png", colors: ["green", "white"], similar: ["DZ", "TN", "TR", "MY"] },
  { alpha2: "PW", svgUrl: "https://flagcdn.com/pw.svg", pngUrl: "https://flagcdn.com/w320/pw.png", colors: ["light-blue", "yellow"], similar: ["FM", "BD", "JP"] },
  { alpha2: "PS", svgUrl: "https://flagcdn.com/ps.svg", pngUrl: "https://flagcdn.com/w320/ps.png", colors: ["black", "white", "green", "red"], similar: ["JO", "KW", "SD"] },
  { alpha2: "PA", svgUrl: "https://flagcdn.com/pa.svg", pngUrl: "https://flagcdn.com/w320/pa.png", colors: ["red", "white", "blue"], similar: ["CU", "CL", "CR"] },
  { alpha2: "PG", svgUrl: "https://flagcdn.com/pg.svg", pngUrl: "https://flagcdn.com/w320/pg.png", colors: ["black", "red", "gold"], similar: ["BS", "DE", "BE"] },
  { alpha2: "PY", svgUrl: "https://flagcdn.com/py.svg", pngUrl: "https://flagcdn.com/w320/py.png", colors: ["red", "white", "blue"], similar: ["NL", "LU", "FR", "RU"] },
  { alpha2: "PE", svgUrl: "https://flagcdn.com/pe.svg", pngUrl: "https://flagcdn.com/w320/pe.png", colors: ["red", "white"], similar: ["AT", "LV", "DK", "SG"] },
  { alpha2: "PH", svgUrl: "https://flagcdn.com/ph.svg", pngUrl: "https://flagcdn.com/w320/ph.png", colors: ["blue", "red", "white", "yellow"], similar: ["MY", "CZ", "SK"] },
  { alpha2: "PL", svgUrl: "https://flagcdn.com/pl.svg", pngUrl: "https://flagcdn.com/w320/pl.png", colors: ["white", "red"], similar: ["ID", "MC", "SG", "MT"] },
  { alpha2: "PT", svgUrl: "https://flagcdn.com/pt.svg", pngUrl: "https://flagcdn.com/w320/pt.png", colors: ["green", "red", "yellow"], similar: ["IT", "IE", "MX", "GH"] },
  // ── Q ─────────────────────────────────────────────────────────────────
  { alpha2: "QA", svgUrl: "https://flagcdn.com/qa.svg", pngUrl: "https://flagcdn.com/w320/qa.png", colors: ["dark-red", "white"], similar: ["BH", "KW", "AT"] },
  // ── R ─────────────────────────────────────────────────────────────────
  { alpha2: "RO", svgUrl: "https://flagcdn.com/ro.svg", pngUrl: "https://flagcdn.com/w320/ro.png", colors: ["blue", "yellow", "red"], similar: ["TD", "MD", "AD", "BE"] },
  { alpha2: "RU", svgUrl: "https://flagcdn.com/ru.svg", pngUrl: "https://flagcdn.com/w320/ru.png", colors: ["white", "blue", "red"], similar: ["NL", "LU", "SK", "SI", "HR"] },
  { alpha2: "RW", svgUrl: "https://flagcdn.com/rw.svg", pngUrl: "https://flagcdn.com/w320/rw.png", colors: ["blue", "yellow", "green"], similar: ["DE", "ET", "BO"] },
  // ── S ─────────────────────────────────────────────────────────────────
  { alpha2: "KN", svgUrl: "https://flagcdn.com/kn.svg", pngUrl: "https://flagcdn.com/w320/kn.png", colors: ["green", "black", "red", "gold", "white"], similar: ["TT", "JM", "AG"] },
  { alpha2: "LC", svgUrl: "https://flagcdn.com/lc.svg", pngUrl: "https://flagcdn.com/w320/lc.png", colors: ["blue", "black", "yellow", "white"], similar: ["BS", "BB", "TT"] },
  { alpha2: "VC", svgUrl: "https://flagcdn.com/vc.svg", pngUrl: "https://flagcdn.com/w320/vc.png", colors: ["green", "gold", "blue"], similar: ["GY", "GN", "CM"] },
  { alpha2: "WS", svgUrl: "https://flagcdn.com/ws.svg", pngUrl: "https://flagcdn.com/w320/ws.png", colors: ["red", "white", "blue"], similar: ["NZ", "AU", "TW"] },
  { alpha2: "SM", svgUrl: "https://flagcdn.com/sm.svg", pngUrl: "https://flagcdn.com/w320/sm.png", colors: ["light-blue", "white"], similar: ["IL", "GR", "FI"] },
  { alpha2: "ST", svgUrl: "https://flagcdn.com/st.svg", pngUrl: "https://flagcdn.com/w320/st.png", colors: ["green", "yellow", "red", "black"], similar: ["GW", "BJ", "ET"] },
  { alpha2: "SA", svgUrl: "https://flagcdn.com/sa.svg", pngUrl: "https://flagcdn.com/w320/sa.png", colors: ["green", "white"], similar: ["PK", "DZ", "LY", "MR"] },
  { alpha2: "SN", svgUrl: "https://flagcdn.com/sn.svg", pngUrl: "https://flagcdn.com/w320/sn.png", colors: ["green", "yellow", "red"], similar: ["ML", "GN", "CM", "ET"] },
  { alpha2: "RS", svgUrl: "https://flagcdn.com/rs.svg", pngUrl: "https://flagcdn.com/w320/rs.png", colors: ["red", "blue", "white"], similar: ["NL", "RU", "LU", "FR", "HR"] },
  { alpha2: "SC", svgUrl: "https://flagcdn.com/sc.svg", pngUrl: "https://flagcdn.com/w320/sc.png", colors: ["blue", "yellow", "red", "white", "green"], similar: ["MU", "CM", "ET"] },
  { alpha2: "SL", svgUrl: "https://flagcdn.com/sl.svg", pngUrl: "https://flagcdn.com/w320/sl.png", colors: ["green", "white", "blue"], similar: ["LS", "BW", "ES"] },
  { alpha2: "SG", svgUrl: "https://flagcdn.com/sg.svg", pngUrl: "https://flagcdn.com/w320/sg.png", colors: ["red", "white"], similar: ["ID", "MC", "PL", "AT"] },
  { alpha2: "SK", svgUrl: "https://flagcdn.com/sk.svg", pngUrl: "https://flagcdn.com/w320/sk.png", colors: ["white", "blue", "red"], similar: ["CZ", "RU", "SI", "HR", "NL"] },
  { alpha2: "SI", svgUrl: "https://flagcdn.com/si.svg", pngUrl: "https://flagcdn.com/w320/si.png", colors: ["white", "blue", "red"], similar: ["RU", "SK", "HR", "FR", "NL"] },
  { alpha2: "SB", svgUrl: "https://flagcdn.com/sb.svg", pngUrl: "https://flagcdn.com/w320/sb.png", colors: ["blue", "green", "yellow", "white"], similar: ["PG", "FJ", "KI"] },
  { alpha2: "SO", svgUrl: "https://flagcdn.com/so.svg", pngUrl: "https://flagcdn.com/w320/so.png", colors: ["light-blue", "white"], similar: ["SM", "IS", "FI"] },
  { alpha2: "ZA", svgUrl: "https://flagcdn.com/za.svg", pngUrl: "https://flagcdn.com/w320/za.png", colors: ["green", "black", "gold", "white", "red", "blue"], similar: ["ZW", "NA", "LR"] },
  { alpha2: "KR", svgUrl: "https://flagcdn.com/kr.svg", pngUrl: "https://flagcdn.com/w320/kr.png", colors: ["white", "red", "blue", "black"], similar: ["KP", "TW", "JP"] },
  { alpha2: "SS", svgUrl: "https://flagcdn.com/ss.svg", pngUrl: "https://flagcdn.com/w320/ss.png", colors: ["black", "red", "green", "white", "blue", "yellow"], similar: ["KE", "ET", "ZW"] },
  { alpha2: "ES", svgUrl: "https://flagcdn.com/es.svg", pngUrl: "https://flagcdn.com/w320/es.png", colors: ["red", "yellow"], similar: ["AD", "MC", "DE"] },
  { alpha2: "LK", svgUrl: "https://flagcdn.com/lk.svg", pngUrl: "https://flagcdn.com/w320/lk.png", colors: ["dark-red", "gold", "orange", "green"], similar: ["IN", "BN", "IR"] },
  { alpha2: "SD", svgUrl: "https://flagcdn.com/sd.svg", pngUrl: "https://flagcdn.com/w320/sd.png", colors: ["red", "white", "black", "green"], similar: ["JO", "PS", "KW", "EG"] },
  { alpha2: "SR", svgUrl: "https://flagcdn.com/sr.svg", pngUrl: "https://flagcdn.com/w320/sr.png", colors: ["green", "white", "red", "yellow"], similar: ["GY", "BO", "CM"] },
  { alpha2: "SE", svgUrl: "https://flagcdn.com/se.svg", pngUrl: "https://flagcdn.com/w320/se.png", colors: ["blue", "yellow"], similar: ["DK", "NO", "FI", "IS"] },
  { alpha2: "CH", svgUrl: "https://flagcdn.com/ch.svg", pngUrl: "https://flagcdn.com/w320/ch.png", colors: ["red", "white"], similar: ["DK", "GE", "CA", "JP"] },
  { alpha2: "SY", svgUrl: "https://flagcdn.com/sy.svg", pngUrl: "https://flagcdn.com/w320/sy.png", colors: ["red", "white", "black", "green"], similar: ["EG", "IQ", "YE", "AF"] },
  // ── T ─────────────────────────────────────────────────────────────────
  { alpha2: "TW", svgUrl: "https://flagcdn.com/tw.svg", pngUrl: "https://flagcdn.com/w320/tw.png", colors: ["red", "blue", "white"], similar: ["KR", "US", "MY"] },
  { alpha2: "TJ", svgUrl: "https://flagcdn.com/tj.svg", pngUrl: "https://flagcdn.com/w320/tj.png", colors: ["red", "white", "green"], similar: ["BE", "IT", "HU", "BY"] },
  { alpha2: "TZ", svgUrl: "https://flagcdn.com/tz.svg", pngUrl: "https://flagcdn.com/w320/tz.png", colors: ["green", "black", "gold", "blue"], similar: ["ZA", "KE", "ZW"] },
  { alpha2: "TH", svgUrl: "https://flagcdn.com/th.svg", pngUrl: "https://flagcdn.com/w320/th.png", colors: ["red", "white", "blue"], similar: ["CL", "CU", "CR", "LA"] },
  { alpha2: "TL", svgUrl: "https://flagcdn.com/tl.svg", pngUrl: "https://flagcdn.com/w320/tl.png", colors: ["red", "black", "yellow", "white"], similar: ["PG", "BS", "CU"] },
  { alpha2: "TG", svgUrl: "https://flagcdn.com/tg.svg", pngUrl: "https://flagcdn.com/w320/tg.png", colors: ["green", "yellow", "red", "white"], similar: ["GN", "ET", "BF"] },
  { alpha2: "TO", svgUrl: "https://flagcdn.com/to.svg", pngUrl: "https://flagcdn.com/w320/to.png", colors: ["red", "white"], similar: ["DK", "CH", "GE", "SG"] },
  { alpha2: "TT", svgUrl: "https://flagcdn.com/tt.svg", pngUrl: "https://flagcdn.com/w320/tt.png", colors: ["red", "black", "white"], similar: ["KN", "AG", "LC"] },
  { alpha2: "TN", svgUrl: "https://flagcdn.com/tn.svg", pngUrl: "https://flagcdn.com/w320/tn.png", colors: ["red", "white"], similar: ["TR", "PK", "MR", "LY"] },
  { alpha2: "TR", svgUrl: "https://flagcdn.com/tr.svg", pngUrl: "https://flagcdn.com/w320/tr.png", colors: ["red", "white"], similar: ["TN", "PK", "AZ", "MY", "DZ"] },
  { alpha2: "TM", svgUrl: "https://flagcdn.com/tm.svg", pngUrl: "https://flagcdn.com/w320/tm.png", colors: ["green", "white"], similar: ["KZ", "AZ", "UZ"] },
  { alpha2: "TV", svgUrl: "https://flagcdn.com/tv.svg", pngUrl: "https://flagcdn.com/w320/tv.png", colors: ["light-blue", "white", "gold"], similar: ["AU", "NZ", "FJ"] },
  // ── U ─────────────────────────────────────────────────────────────────
  { alpha2: "UG", svgUrl: "https://flagcdn.com/ug.svg", pngUrl: "https://flagcdn.com/w320/ug.png", colors: ["black", "yellow", "red"], similar: ["DE", "BE", "ZW", "RW"] },
  { alpha2: "UA", svgUrl: "https://flagcdn.com/ua.svg", pngUrl: "https://flagcdn.com/w320/ua.png", colors: ["blue", "yellow"], similar: ["SE", "PW", "KZ"] },
  { alpha2: "AE", svgUrl: "https://flagcdn.com/ae.svg", pngUrl: "https://flagcdn.com/w320/ae.png", colors: ["red", "green", "white", "black"], similar: ["JO", "KW", "SD", "PS"] },
  { alpha2: "GB", svgUrl: "https://flagcdn.com/gb.svg", pngUrl: "https://flagcdn.com/w320/gb.png", colors: ["blue", "red", "white"], similar: ["AU", "NZ", "US", "FJ"] },
  { alpha2: "US", svgUrl: "https://flagcdn.com/us.svg", pngUrl: "https://flagcdn.com/w320/us.png", colors: ["red", "white", "blue"], similar: ["GB", "AU", "LR", "MY"] },
  { alpha2: "UY", svgUrl: "https://flagcdn.com/uy.svg", pngUrl: "https://flagcdn.com/w320/uy.png", colors: ["white", "blue", "yellow"], similar: ["AR", "HN", "NI"] },
  { alpha2: "UZ", svgUrl: "https://flagcdn.com/uz.svg", pngUrl: "https://flagcdn.com/w320/uz.png", colors: ["light-blue", "white", "green"], similar: ["AZ", "TM", "KZ"] },
  // ── V ─────────────────────────────────────────────────────────────────
  { alpha2: "VU", svgUrl: "https://flagcdn.com/vu.svg", pngUrl: "https://flagcdn.com/w320/vu.png", colors: ["green", "red", "black", "yellow"], similar: ["ZW", "ET", "GW"] },
  { alpha2: "VA", svgUrl: "https://flagcdn.com/va.svg", pngUrl: "https://flagcdn.com/w320/va.png", colors: ["yellow", "white"], similar: [] },
  { alpha2: "VE", svgUrl: "https://flagcdn.com/ve.svg", pngUrl: "https://flagcdn.com/w320/ve.png", colors: ["yellow", "blue", "red"], similar: ["CO", "EC", "RO"] },
  { alpha2: "VN", svgUrl: "https://flagcdn.com/vn.svg", pngUrl: "https://flagcdn.com/w320/vn.png", colors: ["red", "yellow"], similar: ["CN", "MN", "KG"] },
  // ── W ─────────────────────────────────────────────────────────────────
  { alpha2: "YE", svgUrl: "https://flagcdn.com/ye.svg", pngUrl: "https://flagcdn.com/w320/ye.png", colors: ["red", "white", "black"], similar: ["EG", "IQ", "SY"] },
  // ── Z ─────────────────────────────────────────────────────────────────
  { alpha2: "ZM", svgUrl: "https://flagcdn.com/zm.svg", pngUrl: "https://flagcdn.com/w320/zm.png", colors: ["green", "red", "black", "orange"], similar: ["ZW", "MZ", "ET"] },
  { alpha2: "ZW", svgUrl: "https://flagcdn.com/zw.svg", pngUrl: "https://flagcdn.com/w320/zw.png", colors: ["green", "gold", "red", "black", "white"], similar: ["ZA", "KE", "MZ", "DE"] },
];

/**
 * Get flag data for a specific country by its alpha-2 code.
 */
export function getFlagData(alpha2: string): FlagInfo | undefined {
  return flagData.find((f) => f.alpha2.toLowerCase() === alpha2.toLowerCase());
}

/**
 * Get all countries whose flags share a given color.
 */
export function getFlagsByColor(color: FlagInfo["colors"][number]): FlagInfo[] {
  return flagData.filter((f) => f.colors.includes(color));
}

/**
 * Get all similar-flag entries for a given country.
 * Returns an array of FlagInfo for each similar country.
 */
export function getSimilarFlags(alpha2: string): FlagInfo[] {
  const entry = getFlagData(alpha2);
  if (!entry) return [];
  return entry.similar
    .map((code) => getFlagData(code))
    .filter((f): f is FlagInfo => f !== undefined);
}
