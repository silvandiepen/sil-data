import type { PhoneCountryCode } from "../types/index.js";
import { countries } from "./countries.js";

/**
 * Phone country codes derived from the countries list, with additional
 * entries for territories and special regions. Suitable for use in
 * phone number input dropdowns.
 */
export const phoneCountryCodes: PhoneCountryCode[] = [
  ...countries.map((country) => ({
    country: country.name,
    code: country.alpha2,
    phoneCode: country.phoneCode,
    flag: country.flag,
  })),
  // Additional territories and special regions not in the main countries list
  { country: "American Samoa", code: "AS", phoneCode: "+1", flag: "🇦🇸" },
  { country: "Anguilla", code: "AI", phoneCode: "+1", flag: "🇦🇮" },
  { country: "Bermuda", code: "BM", phoneCode: "+1", flag: "🇧🇲" },
  {
    country: "British Virgin Islands",
    code: "VG",
    phoneCode: "+1",
    flag: "🇻🇬",
  },
  { country: "Cayman Islands", code: "KY", phoneCode: "+1", flag: "🇰🇾" },
  { country: "Christmas Island", code: "CX", phoneCode: "+61", flag: "🇨🇽" },
  { country: "Cocos Islands", code: "CC", phoneCode: "+61", flag: "🇨🇨" },
  { country: "Cook Islands", code: "CK", phoneCode: "+682", flag: "🇨🇰" },
  { country: "Falkland Islands", code: "FK", phoneCode: "+500", flag: "🇫🇰" },
  { country: "Faroe Islands", code: "FO", phoneCode: "+298", flag: "🇫🇴" },
  { country: "French Guiana", code: "GF", phoneCode: "+594", flag: "🇬🇫" },
  { country: "French Polynesia", code: "PF", phoneCode: "+689", flag: "🇵🇫" },
  { country: "Gibraltar", code: "GI", phoneCode: "+350", flag: "🇬🇮" },
  { country: "Greenland", code: "GL", phoneCode: "+299", flag: "🇬🇱" },
  { country: "Guadeloupe", code: "GP", phoneCode: "+590", flag: "🇬🇵" },
  { country: "Guam", code: "GU", phoneCode: "+1", flag: "🇬🇺" },
  { country: "Guernsey", code: "GG", phoneCode: "+44", flag: "🇬🇬" },
  { country: "Hong Kong", code: "HK", phoneCode: "+852", flag: "🇭🇰" },
  { country: "Isle of Man", code: "IM", phoneCode: "+44", flag: "🇮🇲" },
  { country: "Jersey", code: "JE", phoneCode: "+44", flag: "🇯🇪" },
  { country: "Macau", code: "MO", phoneCode: "+853", flag: "🇲🇴" },
  { country: "Martinique", code: "MQ", phoneCode: "+596", flag: "🇲🇶" },
  { country: "Mayotte", code: "YT", phoneCode: "+262", flag: "🇾🇹" },
  { country: "Montserrat", code: "MS", phoneCode: "+1", flag: "🇲🇸" },
  { country: "New Caledonia", code: "NC", phoneCode: "+687", flag: "🇳🇨" },
  { country: "Niue", code: "NU", phoneCode: "+683", flag: "🇳🇺" },
  { country: "Norfolk Island", code: "NF", phoneCode: "+672", flag: "🇳🇫" },
  {
    country: "Northern Mariana Islands",
    code: "MP",
    phoneCode: "+1",
    flag: "🇲🇵",
  },
  { country: "Puerto Rico", code: "PR", phoneCode: "+1", flag: "🇵🇷" },
  { country: "Réunion", code: "RE", phoneCode: "+262", flag: "🇷🇪" },
  { country: "Saint Barthélemy", code: "BL", phoneCode: "+590", flag: "🇧🇱" },
  { country: "Saint Helena", code: "SH", phoneCode: "+290", flag: "🇸🇭" },
  {
    country: "Saint Pierre and Miquelon",
    code: "PM",
    phoneCode: "+508",
    flag: "🇵🇲",
  },
  { country: "Sint Maarten", code: "SX", phoneCode: "+1", flag: "🇸🇽" },
  { country: "Svalbard", code: "SJ", phoneCode: "+47", flag: "🇸🇯" },
  { country: "Tokelau", code: "TK", phoneCode: "+690", flag: "🇹🇰" },
  {
    country: "Turks and Caicos Islands",
    code: "TC",
    phoneCode: "+1",
    flag: "🇹🇨",
  },
  { country: "U.S. Virgin Islands", code: "VI", phoneCode: "+1", flag: "🇻🇮" },
  {
    country: "Wallis and Futuna",
    code: "WF",
    phoneCode: "+681",
    flag: "🇼🇫",
  },
  { country: "Western Sahara", code: "EH", phoneCode: "+212", flag: "🇪🇭" },
];

/**
 * Get a phone country code entry by its ISO 3166-1 alpha-2 code.
 */
export function getPhoneCodeByCountry(code: string): PhoneCountryCode | undefined {
  return phoneCountryCodes.find(
    (p) => p.code.toLowerCase() === code.toLowerCase()
  );
}

/**
 * Get all countries with a specific phone code.
 * Useful for finding all countries that share a dialing code (e.g., +1).
 */
export function getCountriesByPhoneCode(phoneCode: string): PhoneCountryCode[] {
  const normalized = phoneCode.startsWith("+") ? phoneCode : `+${phoneCode}`;
  return phoneCountryCodes.filter((p) => p.phoneCode === normalized);
}
