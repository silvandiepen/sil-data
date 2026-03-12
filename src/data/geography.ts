import type { CountryGeography } from "../types/index.js";

/**
 * Geographic and climate data for all world countries.
 * Includes centroid coordinates, bounding boxes, area, landlocked status,
 * neighbouring countries, climate zone, and average annual temperature.
 *
 * Centroid (lat/lon) is the geographical centre of the country, used for
 * distance and direction calculations in geography games.
 *
 * Climate zone follows a simplified Köppen classification.
 * avgTemperature is approximate mean annual temperature in °C.
 * @note The `neighbors` arrays use ISO 3166-1 alpha-2 codes, including
 *   codes for disputed/special territories such as "EH" (Western Sahara)
 *   and "XK" (Kosovo). These are included to accurately reflect shared land
 *   borders, even where sovereignty is contested.
 */
export const countryGeography: CountryGeography[] = [
  // ── Africa ──────────────────────────────────────────────────────────────
  { alpha2: "DZ", lat: 28.03, lon: 1.66,   bounds: { north: 37.10, south: 18.97, east: 12.00, west: -8.67 },  area: 2381741,  landlocked: false, neighbors: ["TN","LY","NE","ML","MR","EH","MA"], climate: "arid",         avgTemperature: 22 },
  { alpha2: "AO", lat: -11.20, lon: 17.87,  bounds: { north: -4.38, south: -18.04, east: 24.09, west: 11.68 }, area: 1246700,  landlocked: false, neighbors: ["CD","ZM","NA","CG"],              climate: "tropical",     avgTemperature: 24 },
  { alpha2: "BJ", lat: 9.31,  lon: 2.32,   bounds: { north: 12.41, south: 6.22,  east: 3.84,  west: 0.77  },  area: 114763,   landlocked: false, neighbors: ["NG","BF","NE","TG"],              climate: "tropical",     avgTemperature: 27 },
  { alpha2: "BW", lat: -22.33, lon: 24.68,  bounds: { north: -17.78, south: -26.91, east: 29.37, west: 19.99 },area: 581730,   landlocked: true,  neighbors: ["ZA","ZW","NA","ZM"],              climate: "arid",         avgTemperature: 21 },
  { alpha2: "BF", lat: 12.36, lon: -1.56,  bounds: { north: 15.08, south: 9.39,  east: 2.40,  west: -5.52 },  area: 274200,   landlocked: true,  neighbors: ["ML","NE","BJ","TG","GH","CI"],   climate: "tropical",     avgTemperature: 28 },
  { alpha2: "BI", lat: -3.37, lon: 29.92,  bounds: { north: -2.31, south: -4.47, east: 30.84, west: 28.99 },  area: 27834,    landlocked: true,  neighbors: ["RW","TZ","CD"],                  climate: "tropical",     avgTemperature: 20 },
  { alpha2: "CV", lat: 16.54, lon: -24.01, bounds: { north: 17.20, south: 14.80, east: -22.66, west: -25.36 },area: 4033,     landlocked: false, neighbors: [],                                climate: "subtropical",  avgTemperature: 24 },
  { alpha2: "CM", lat: 3.85,  lon: 11.50,  bounds: { north: 13.08, south: 1.65,  east: 16.19, west: 8.50  },  area: 475440,   landlocked: false, neighbors: ["NG","TD","CF","CG","GA","GQ"],   climate: "tropical",     avgTemperature: 24 },
  { alpha2: "CF", lat: 6.61,  lon: 20.94,  bounds: { north: 11.00, south: 2.22,  east: 27.46, west: 14.42 },  area: 622984,   landlocked: true,  neighbors: ["SD","SS","CD","CG","CM","TD"],   climate: "tropical",     avgTemperature: 25 },
  { alpha2: "TD", lat: 15.45, lon: 18.73,  bounds: { north: 23.45, south: 7.44,  east: 24.00, west: 13.47 },  area: 1284000,  landlocked: true,  neighbors: ["LY","SD","CF","CM","NG","NE"],   climate: "arid",         avgTemperature: 26 },
  { alpha2: "KM", lat: -11.64, lon: 43.33, bounds: { north: -11.36, south: -12.38, east: 44.54, west: 43.20 },area: 2235,     landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 26 },
  { alpha2: "CD", lat: -4.04, lon: 21.76,  bounds: { north: 5.39,  south: -13.46, east: 31.31, west: 12.18 }, area: 2344858,  landlocked: false, neighbors: ["CF","SS","UG","RW","BI","TZ","ZM","AO","CG"], climate: "tropical", avgTemperature: 24 },
  { alpha2: "CG", lat: -0.23, lon: 15.83,  bounds: { north: 3.72,  south: -5.03, east: 18.65, west: 11.16 },  area: 342000,   landlocked: false, neighbors: ["CM","CF","CD","AO","GA"],         climate: "tropical",     avgTemperature: 25 },
  { alpha2: "CI", lat: 7.54,  lon: -5.55,  bounds: { north: 10.74, south: 4.34,  east: -2.49, west: -8.60 },  area: 322463,   landlocked: false, neighbors: ["LR","GN","ML","BF","GH"],         climate: "tropical",     avgTemperature: 26 },
  { alpha2: "DJ", lat: 11.83, lon: 42.59,  bounds: { north: 12.71, south: 10.93, east: 43.42, west: 41.77 },  area: 23200,    landlocked: false, neighbors: ["ET","ER","SO"],                   climate: "arid",         avgTemperature: 30 },
  { alpha2: "EG", lat: 26.82, lon: 30.80,  bounds: { north: 31.67, south: 21.99, east: 37.14, west: 24.70 },  area: 1002450,  landlocked: false, neighbors: ["LY","SD","IL","PS"],              climate: "arid",         avgTemperature: 21 },
  { alpha2: "GQ", lat: 1.65,  lon: 10.27,  bounds: { north: 3.78,  south: -1.47, east: 11.35, west: 5.62  },  area: 28051,    landlocked: false, neighbors: ["CM","GA"],                        climate: "tropical",     avgTemperature: 26 },
  { alpha2: "ER", lat: 15.18, lon: 39.78,  bounds: { north: 18.00, south: 12.36, east: 43.13, west: 36.44 },  area: 117600,   landlocked: false, neighbors: ["ET","SD","DJ"],                   climate: "arid",         avgTemperature: 25 },
  { alpha2: "SZ", lat: -26.52, lon: 31.47, bounds: { north: -25.72, south: -27.32, east: 32.13, west: 30.79 },area: 17364,    landlocked: true,  neighbors: ["ZA","MZ"],                       climate: "subtropical",  avgTemperature: 16 },
  { alpha2: "ET", lat: 9.15,  lon: 40.49,  bounds: { north: 14.89, south: 3.40,  east: 47.98, west: 32.99 },  area: 1104300,  landlocked: true,  neighbors: ["ER","DJ","SO","KE","SS","SD"],   climate: "tropical",     avgTemperature: 21 },
  { alpha2: "GA", lat: -0.80, lon: 11.61,  bounds: { north: 2.32,  south: -3.93, east: 14.50, west: 8.70  },  area: 267668,   landlocked: false, neighbors: ["CM","CF","CG","GQ"],              climate: "tropical",     avgTemperature: 26 },
  { alpha2: "GM", lat: 13.44, lon: -15.31, bounds: { north: 13.83, south: 13.05, east: -13.80, west: -16.84 },area: 11295,    landlocked: false, neighbors: ["SN"],                             climate: "tropical",     avgTemperature: 27 },
  { alpha2: "GH", lat: 7.95,  lon: -1.02,  bounds: { north: 11.17, south: 4.74,  east: 1.19,  west: -3.26 },  area: 238533,   landlocked: false, neighbors: ["CI","BF","TG"],                   climate: "tropical",     avgTemperature: 27 },
  { alpha2: "GN", lat: 9.95,  lon: -11.24, bounds: { north: 12.68, south: 7.19,  east: -7.64, west: -15.08 }, area: 245857,   landlocked: false, neighbors: ["GW","SN","ML","CI","LR","SL"],   climate: "tropical",     avgTemperature: 27 },
  { alpha2: "GW", lat: 11.80, lon: -15.18, bounds: { north: 12.68, south: 10.86, east: -13.64, west: -16.72 },area: 36125,    landlocked: false, neighbors: ["SN","GN"],                        climate: "tropical",     avgTemperature: 26 },
  { alpha2: "KE", lat: -0.02, lon: 37.91,  bounds: { north: 4.62,  south: -4.67, east: 41.91, west: 33.91 },  area: 580367,   landlocked: false, neighbors: ["ET","SO","TZ","UG","SS","SD"],   climate: "tropical",     avgTemperature: 21 },
  { alpha2: "LS", lat: -29.61, lon: 28.23, bounds: { north: -28.57, south: -30.68, east: 29.46, west: 27.01 },area: 30355,    landlocked: true,  neighbors: ["ZA"],                            climate: "temperate",    avgTemperature: 12 },
  { alpha2: "LR", lat: 6.43,  lon: -9.43,  bounds: { north: 8.55,  south: 4.35,  east: -7.37, west: -11.49 }, area: 111369,   landlocked: false, neighbors: ["SL","GN","CI"],                   climate: "tropical",     avgTemperature: 27 },
  { alpha2: "LY", lat: 26.34, lon: 17.23,  bounds: { north: 33.17, south: 19.50, east: 25.15, west: 9.32  },  area: 1759540,  landlocked: false, neighbors: ["TN","DZ","NE","TD","SD","EG"],   climate: "arid",         avgTemperature: 22 },
  { alpha2: "MG", lat: -18.77, lon: 46.87, bounds: { north: -11.95, south: -25.61, east: 50.48, west: 43.18 },area: 587041,   landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 22 },
  { alpha2: "MW", lat: -13.25, lon: 34.30, bounds: { north: -9.37, south: -17.13, east: 35.92, west: 32.67 }, area: 118484,   landlocked: true,  neighbors: ["TZ","ZM","MZ"],                  climate: "subtropical",  avgTemperature: 22 },
  { alpha2: "ML", lat: 17.57, lon: -3.99,  bounds: { north: 25.00, south: 10.14, east: 4.24,  west: -4.24 },  area: 1240192,  landlocked: true,  neighbors: ["DZ","NE","BF","CI","GN","SN","MR"], climate: "arid",      avgTemperature: 27 },
  { alpha2: "MR", lat: 21.01, lon: -10.94, bounds: { north: 27.30, south: 14.72, east: -4.83, west: -17.07 }, area: 1030700,  landlocked: false, neighbors: ["MA","DZ","ML","SN","EH"],         climate: "arid",         avgTemperature: 28 },
  { alpha2: "MU", lat: -20.35, lon: 57.55, bounds: { north: -19.98, south: -20.52, east: 57.79, west: 57.31 },area: 2040,     landlocked: false, neighbors: [],                                climate: "subtropical",  avgTemperature: 24 },
  { alpha2: "MA", lat: 31.79, lon: -7.09,  bounds: { north: 35.92, south: 27.67, east: -0.99, west: -13.17 }, area: 446550,   landlocked: false, neighbors: ["ES","DZ","EH","MR"],              climate: "mediterranean",avgTemperature: 18 },
  { alpha2: "MZ", lat: -18.67, lon: 35.53, bounds: { north: -10.47, south: -26.87, east: 40.84, west: 32.01 },area: 801590,   landlocked: false, neighbors: ["TZ","MW","ZM","ZW","ZA","SZ"],   climate: "tropical",     avgTemperature: 24 },
  { alpha2: "NA", lat: -22.96, lon: 18.49, bounds: { north: -16.96, south: -28.97, east: 25.26, west: 11.72 },area: 824292,   landlocked: false, neighbors: ["AO","ZM","BW","ZA"],              climate: "arid",         avgTemperature: 19 },
  { alpha2: "NE", lat: 17.61, lon: 8.08,   bounds: { north: 23.52, south: 11.69, east: 15.90, west: 0.16  },  area: 1267000,  landlocked: true,  neighbors: ["DZ","LY","TD","NG","BJ","BF","ML"], climate: "arid",      avgTemperature: 29 },
  { alpha2: "NG", lat: 9.08,  lon: 8.68,   bounds: { north: 13.89, south: 4.27,  east: 14.68, west: 2.69  },  area: 923768,   landlocked: false, neighbors: ["BJ","NE","TD","CM"],              climate: "tropical",     avgTemperature: 27 },
  { alpha2: "RW", lat: -1.94, lon: 29.87,  bounds: { north: -1.05, south: -2.84, east: 30.90, west: 28.86 },  area: 26338,    landlocked: true,  neighbors: ["UG","TZ","BI","CD"],              climate: "tropical",     avgTemperature: 19 },
  { alpha2: "ST", lat: 0.19,  lon: 6.61,   bounds: { north: 1.70,  south: -0.13, east: 7.46,  west: 5.47  },  area: 964,      landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 26 },
  { alpha2: "SN", lat: 14.50, lon: -14.45, bounds: { north: 16.69, south: 12.31, east: -11.35, west: -17.53 },area: 196722,   landlocked: false, neighbors: ["GM","GW","GN","ML","MR"],         climate: "subtropical",  avgTemperature: 27 },
  { alpha2: "SC", lat: -4.68, lon: 55.49,  bounds: { north: -4.17, south: -10.24, east: 56.29, west: 46.21 }, area: 455,      landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 27 },
  { alpha2: "SL", lat: 8.46,  lon: -11.78, bounds: { north: 9.98,  south: 6.93,  east: -10.27, west: -13.30 },area: 71740,    landlocked: false, neighbors: ["GN","LR"],                        climate: "tropical",     avgTemperature: 26 },
  { alpha2: "SO", lat: 5.15,  lon: 46.20,  bounds: { north: 11.99, south: -1.66, east: 51.41, west: 40.99 },  area: 637657,   landlocked: false, neighbors: ["ET","DJ","KE"],                   climate: "arid",         avgTemperature: 27 },
  { alpha2: "ZA", lat: -30.56, lon: 22.94, bounds: { north: -22.13, south: -34.83, east: 32.89, west: 16.46 },area: 1221037,  landlocked: false, neighbors: ["NA","BW","ZW","MZ","SZ","LS"],   climate: "subtropical",  avgTemperature: 18 },
  { alpha2: "SS", lat: 7.86,  lon: 29.69,  bounds: { north: 12.22, south: 3.49,  east: 35.95, west: 23.44 },  area: 644329,   landlocked: true,  neighbors: ["SD","ET","KE","UG","CD","CF"],   climate: "tropical",     avgTemperature: 26 },
  { alpha2: "SD", lat: 12.86, lon: 30.22,  bounds: { north: 22.23, south: 8.68,  east: 38.61, west: 21.83 },  area: 1861484,  landlocked: false, neighbors: ["EG","LY","TD","CF","SS","ET","ER"], climate: "arid",      avgTemperature: 28 },
  { alpha2: "TZ", lat: -6.37, lon: 34.89,  bounds: { north: -0.99, south: -11.74, east: 40.44, west: 29.32 }, area: 945087,   landlocked: false, neighbors: ["KE","UG","RW","BI","CD","ZM","MW","MZ"], climate: "tropical", avgTemperature: 22 },
  { alpha2: "TG", lat: 8.62,  lon: 0.82,   bounds: { north: 11.14, south: 6.10,  east: 1.81,  west: -0.05 },  area: 56785,    landlocked: false, neighbors: ["GH","BJ","BF"],                   climate: "tropical",     avgTemperature: 27 },
  { alpha2: "TN", lat: 33.89, lon: 9.54,   bounds: { north: 37.54, south: 30.24, east: 11.60, west: 7.52  },  area: 163610,   landlocked: false, neighbors: ["DZ","LY"],                        climate: "mediterranean",avgTemperature: 18 },
  { alpha2: "UG", lat: 1.37,  lon: 32.29,  bounds: { north: 4.23,  south: -1.48, east: 35.00, west: 29.57 },  area: 241551,   landlocked: true,  neighbors: ["SS","KE","TZ","RW","CD"],         climate: "tropical",     avgTemperature: 21 },
  { alpha2: "ZM", lat: -13.13, lon: 27.85, bounds: { north: -8.22, south: -18.08, east: 33.71, west: 21.97 }, area: 752618,   landlocked: true,  neighbors: ["CD","TZ","MW","MZ","ZW","BW","NA","AO"], climate: "subtropical", avgTemperature: 22 },
  { alpha2: "ZW", lat: -19.02, lon: 29.15, bounds: { north: -15.61, south: -22.42, east: 33.07, west: 25.24 },area: 390757,   landlocked: true,  neighbors: ["ZM","MZ","ZA","BW"],              climate: "subtropical",  avgTemperature: 20 },

  // ── Asia ────────────────────────────────────────────────────────────────
  { alpha2: "AF", lat: 33.93, lon: 67.71,  bounds: { north: 38.49, south: 29.38, east: 74.90, west: 61.00 },  area: 652230,   landlocked: true,  neighbors: ["IR","PK","TM","UZ","TJ","CN"],   climate: "continental",  avgTemperature: 12 },
  { alpha2: "AM", lat: 40.07, lon: 45.04,  bounds: { north: 41.30, south: 38.84, east: 46.63, west: 43.45 },  area: 29743,    landlocked: true,  neighbors: ["GE","AZ","TR","IR"],              climate: "continental",  avgTemperature: 7  },
  { alpha2: "AZ", lat: 40.14, lon: 47.58,  bounds: { north: 41.91, south: 38.39, east: 50.39, west: 44.77 },  area: 86600,    landlocked: false, neighbors: ["GE","RU","AM","IR","TR"],         climate: "continental",  avgTemperature: 12 },
  { alpha2: "BH", lat: 25.93, lon: 50.55,  bounds: { north: 26.33, south: 25.80, east: 50.82, west: 50.45 },  area: 760,      landlocked: false, neighbors: [],                                climate: "arid",         avgTemperature: 27 },
  { alpha2: "BD", lat: 23.68, lon: 90.36,  bounds: { north: 26.63, south: 20.59, east: 92.68, west: 88.01 },  area: 147570,   landlocked: false, neighbors: ["IN","MM"],                        climate: "tropical",     avgTemperature: 25 },
  { alpha2: "BT", lat: 27.51, lon: 90.43,  bounds: { north: 28.32, south: 26.70, east: 92.12, west: 88.74 },  area: 38394,    landlocked: true,  neighbors: ["CN","IN"],                        climate: "temperate",    avgTemperature: 8  },
  { alpha2: "BN", lat: 4.54,  lon: 114.73, bounds: { north: 5.05,  south: 4.00,  east: 115.36, west: 114.08 },area: 5765,     landlocked: false, neighbors: ["MY"],                             climate: "tropical",     avgTemperature: 27 },
  { alpha2: "KH", lat: 12.57, lon: 104.99, bounds: { north: 14.69, south: 10.41, east: 107.63, west: 102.33 },area: 181035,   landlocked: false, neighbors: ["TH","LA","VN"],                   climate: "tropical",     avgTemperature: 28 },
  { alpha2: "CN", lat: 35.86, lon: 104.19, bounds: { north: 53.56, south: 18.20, east: 135.09, west: 73.55 }, area: 9596960,  landlocked: false, neighbors: ["RU","MN","KZ","KG","TJ","AF","PK","IN","NP","BT","MM","LA","VN","KP"], climate: "continental", avgTemperature: 9 },
  { alpha2: "CY", lat: 35.13, lon: 33.43,  bounds: { north: 35.70, south: 34.57, east: 34.60, west: 32.27 },  area: 9251,     landlocked: false, neighbors: [],                                climate: "mediterranean",avgTemperature: 19 },
  { alpha2: "GE", lat: 42.32, lon: 43.36,  bounds: { north: 43.59, south: 41.05, east: 46.72, west: 39.99 },  area: 69700,    landlocked: false, neighbors: ["RU","AZ","AM","TR"],              climate: "temperate",    avgTemperature: 12 },
  { alpha2: "IN", lat: 20.59, lon: 78.96,  bounds: { north: 35.51, south: 8.08,  east: 97.40, west: 68.11 },  area: 3287263,  landlocked: false, neighbors: ["PK","CN","NP","BT","BD","MM","LK"], climate: "tropical",  avgTemperature: 24 },
  { alpha2: "ID", lat: -0.79, lon: 113.92, bounds: { north: 5.91,  south: -11.01, east: 141.02, west: 95.01 },area: 1904569,  landlocked: false, neighbors: ["PG","TL","MY"],                   climate: "tropical",     avgTemperature: 26 },
  { alpha2: "IR", lat: 32.43, lon: 53.69,  bounds: { north: 39.78, south: 25.06, east: 63.33, west: 44.02 },  area: 1648195,  landlocked: false, neighbors: ["IQ","TR","AM","AZ","TM","AF","PK"], climate: "arid",      avgTemperature: 17 },
  { alpha2: "IQ", lat: 33.22, lon: 43.68,  bounds: { north: 37.38, south: 29.06, east: 48.57, west: 38.80 },  area: 438317,   landlocked: false, neighbors: ["TR","SY","JO","SA","KW","IR"],   climate: "arid",         avgTemperature: 22 },
  { alpha2: "IL", lat: 31.05, lon: 34.85,  bounds: { north: 33.34, south: 29.50, east: 35.88, west: 34.27 },  area: 20770,    landlocked: false, neighbors: ["LB","SY","JO","EG","PS"],         climate: "mediterranean",avgTemperature: 19 },
  { alpha2: "JP", lat: 36.20, lon: 138.25, bounds: { north: 45.52, south: 24.45, east: 145.82, west: 122.94 },area: 377975,   landlocked: false, neighbors: [],                                climate: "temperate",    avgTemperature: 11 },
  { alpha2: "JO", lat: 30.59, lon: 36.24,  bounds: { north: 33.37, south: 29.19, east: 39.30, west: 34.96 },  area: 89342,    landlocked: false, neighbors: ["SY","IQ","SA","IL","PS"],         climate: "arid",         avgTemperature: 18 },
  { alpha2: "KZ", lat: 48.02, lon: 66.92,  bounds: { north: 55.43, south: 40.96, east: 87.36, west: 50.27 },  area: 2724900,  landlocked: true,  neighbors: ["RU","CN","KG","UZ","TM"],         climate: "continental",  avgTemperature: 5  },
  { alpha2: "KW", lat: 29.31, lon: 47.48,  bounds: { north: 30.10, south: 28.53, east: 48.42, west: 46.55 },  area: 17818,    landlocked: false, neighbors: ["IQ","SA"],                        climate: "arid",         avgTemperature: 26 },
  { alpha2: "KG", lat: 41.20, lon: 74.76,  bounds: { north: 43.21, south: 39.18, east: 80.28, west: 69.28 },  area: 199945,   landlocked: true,  neighbors: ["KZ","CN","TJ","UZ"],              climate: "continental",  avgTemperature: 4  },
  { alpha2: "LA", lat: 17.87, lon: 102.50, bounds: { north: 22.50, south: 13.93, east: 107.68, west: 100.10 },area: 236800,   landlocked: true,  neighbors: ["CN","VN","KH","TH","MM"],         climate: "tropical",     avgTemperature: 25 },
  { alpha2: "LB", lat: 33.85, lon: 35.86,  bounds: { north: 34.69, south: 33.07, east: 36.62, west: 35.10 },  area: 10452,    landlocked: false, neighbors: ["SY","IL"],                        climate: "mediterranean",avgTemperature: 16 },
  { alpha2: "MY", lat: 4.21,  lon: 108.96, bounds: { north: 7.36,  south: 0.85,  east: 119.27, west: 99.64 }, area: 330803,   landlocked: false, neighbors: ["TH","BN","ID"],                   climate: "tropical",     avgTemperature: 27 },
  { alpha2: "MV", lat: 3.20,  lon: 73.22,  bounds: { north: 7.10,  south: -0.70, east: 73.65, west: 72.68 },  area: 298,      landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 28 },
  { alpha2: "MN", lat: 46.86, lon: 103.85, bounds: { north: 52.15, south: 41.59, east: 119.93, west: 87.75 }, area: 1564116,  landlocked: true,  neighbors: ["RU","CN"],                        climate: "continental",  avgTemperature: 1  },
  { alpha2: "MM", lat: 21.92, lon: 95.96,  bounds: { north: 28.55, south: 9.79,  east: 101.18, west: 92.19 }, area: 676578,   landlocked: false, neighbors: ["BD","IN","CN","LA","TH"],         climate: "tropical",     avgTemperature: 25 },
  { alpha2: "NP", lat: 28.39, lon: 84.12,  bounds: { north: 30.42, south: 26.35, east: 88.20, west: 80.06 },  area: 147181,   landlocked: true,  neighbors: ["CN","IN"],                        climate: "temperate",    avgTemperature: 13 },
  { alpha2: "KP", lat: 40.34, lon: 127.51, bounds: { north: 42.99, south: 37.67, east: 130.68, west: 124.21 },area: 120538,   landlocked: false, neighbors: ["CN","RU","KR"],                   climate: "continental",  avgTemperature: 8  },
  { alpha2: "OM", lat: 21.51, lon: 55.92,  bounds: { north: 26.40, south: 16.65, east: 59.84, west: 51.99 },  area: 309500,   landlocked: false, neighbors: ["AE","SA","YE"],                   climate: "arid",         avgTemperature: 28 },
  { alpha2: "PK", lat: 30.38, lon: 69.35,  bounds: { north: 37.10, south: 23.63, east: 77.08, west: 60.87 },  area: 881913,   landlocked: false, neighbors: ["IR","AF","CN","IN"],               climate: "arid",         avgTemperature: 20 },
  { alpha2: "PW", lat: 7.51,  lon: 134.58, bounds: { north: 8.10,  south: 2.82,  east: 134.72, west: 131.12 },area: 458,      landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 28 },
  { alpha2: "PS", lat: 31.95, lon: 35.23,  bounds: { north: 32.55, south: 31.22, east: 35.57, west: 34.22 },  area: 5860,     landlocked: false, neighbors: ["IL","JO","EG"],                   climate: "mediterranean",avgTemperature: 18 },
  { alpha2: "PH", lat: 12.88, lon: 121.77, bounds: { north: 21.12, south: 4.64,  east: 126.60, west: 116.93 },area: 300000,   landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 27 },
  { alpha2: "QA", lat: 25.35, lon: 51.18,  bounds: { north: 26.17, south: 24.47, east: 51.65, west: 50.75 },  area: 11586,    landlocked: false, neighbors: ["SA"],                             climate: "arid",         avgTemperature: 28 },
  { alpha2: "SA", lat: 23.89, lon: 45.08,  bounds: { north: 32.16, south: 16.37, east: 55.67, west: 34.50 },  area: 2149690,  landlocked: false, neighbors: ["JO","IQ","KW","QA","AE","OM","YE"], climate: "arid",      avgTemperature: 26 },
  { alpha2: "SG", lat: 1.35,  lon: 103.82, bounds: { north: 1.47,  south: 1.15,  east: 104.01, west: 103.62 },area: 728,      landlocked: false, neighbors: ["MY"],                             climate: "tropical",     avgTemperature: 27 },
  { alpha2: "KR", lat: 35.91, lon: 127.77, bounds: { north: 38.62, south: 33.11, east: 129.58, west: 125.07 },area: 100210,   landlocked: false, neighbors: ["KP"],                             climate: "temperate",    avgTemperature: 12 },
  { alpha2: "LK", lat: 7.87,  lon: 80.77,  bounds: { north: 9.84,  south: 5.92,  east: 81.95, west: 79.65 },  area: 65610,    landlocked: false, neighbors: ["IN"],                             climate: "tropical",     avgTemperature: 27 },
  { alpha2: "SY", lat: 34.80, lon: 38.99,  bounds: { north: 37.32, south: 32.31, east: 42.38, west: 35.73 },  area: 185180,   landlocked: false, neighbors: ["TR","IQ","JO","IL","LB"],         climate: "arid",         avgTemperature: 17 },
  { alpha2: "TW", lat: 23.70, lon: 120.96, bounds: { north: 25.30, south: 21.90, east: 121.99, west: 119.97 },area: 36193,    landlocked: false, neighbors: [],                                climate: "subtropical",  avgTemperature: 22 },
  { alpha2: "TJ", lat: 38.86, lon: 71.28,  bounds: { north: 40.92, south: 36.67, east: 75.16, west: 67.36 },  area: 143100,   landlocked: true,  neighbors: ["KG","CN","AF","UZ"],              climate: "continental",  avgTemperature: 9  },
  { alpha2: "TH", lat: 15.87, lon: 100.99, bounds: { north: 20.46, south: 5.61,  east: 105.64, west: 97.35 }, area: 513120,   landlocked: false, neighbors: ["MM","LA","KH","MY"],              climate: "tropical",     avgTemperature: 28 },
  { alpha2: "TL", lat: -8.87, lon: 125.73, bounds: { north: -8.12, south: -9.46, east: 127.31, west: 124.04 },area: 14874,    landlocked: false, neighbors: ["ID"],                             climate: "tropical",     avgTemperature: 26 },
  { alpha2: "TR", lat: 38.96, lon: 35.24,  bounds: { north: 42.11, south: 35.82, east: 44.82, west: 25.66 },  area: 783562,   landlocked: false, neighbors: ["GE","AM","AZ","IR","IQ","SY","GR","BG"], climate: "continental", avgTemperature: 11 },
  { alpha2: "TM", lat: 38.97, lon: 59.56,  bounds: { north: 42.80, south: 35.13, east: 66.68, west: 52.44 },  area: 488100,   landlocked: true,  neighbors: ["KZ","UZ","AF","IR"],              climate: "arid",         avgTemperature: 14 },
  { alpha2: "AE", lat: 23.42, lon: 53.85,  bounds: { north: 26.09, south: 22.63, east: 56.38, west: 51.58 },  area: 83600,    landlocked: false, neighbors: ["SA","OM"],                        climate: "arid",         avgTemperature: 27 },
  { alpha2: "UZ", lat: 41.38, lon: 64.59,  bounds: { north: 45.59, south: 37.19, east: 73.15, west: 56.00 },  area: 448978,   landlocked: true,  neighbors: ["KZ","KG","TJ","AF","TM"],         climate: "continental",  avgTemperature: 14 },
  { alpha2: "VN", lat: 14.06, lon: 108.28, bounds: { north: 23.39, south: 8.56,  east: 109.46, west: 102.14 },area: 331212,   landlocked: false, neighbors: ["CN","LA","KH"],                   climate: "tropical",     avgTemperature: 23 },
  { alpha2: "YE", lat: 15.55, lon: 48.52,  bounds: { north: 19.00, south: 11.80, east: 54.97, west: 41.66 },  area: 527968,   landlocked: false, neighbors: ["SA","OM"],                        climate: "arid",         avgTemperature: 25 },
  { alpha2: "XK", lat: 42.60, lon: 20.90,  bounds: { north: 43.27, south: 41.86, east: 21.79, west: 20.01 },  area: 10887,    landlocked: true,  neighbors: ["RS","MK","AL","ME"],              climate: "continental",  avgTemperature: 10 },

  // ── Europe ──────────────────────────────────────────────────────────────
  { alpha2: "AL", lat: 41.15, lon: 20.17,  bounds: { north: 42.66, south: 39.63, east: 21.06, west: 19.27 },  area: 28748,    landlocked: false, neighbors: ["ME","RS","MK","GR","XK"],         climate: "mediterranean",avgTemperature: 14 },
  { alpha2: "AD", lat: 42.55, lon: 1.60,   bounds: { north: 42.66, south: 42.43, east: 1.79,  west: 1.41  },  area: 468,      landlocked: true,  neighbors: ["FR","ES"],                        climate: "temperate",    avgTemperature: 7  },
  { alpha2: "AT", lat: 47.52, lon: 14.55,  bounds: { north: 49.02, south: 46.37, east: 17.16, west: 9.53  },  area: 83871,    landlocked: true,  neighbors: ["DE","CZ","SK","HU","SI","IT","LI","CH"], climate: "temperate", avgTemperature: 8 },
  { alpha2: "BY", lat: 53.71, lon: 27.95,  bounds: { north: 56.17, south: 51.26, east: 32.78, west: 23.18 },  area: 207600,   landlocked: true,  neighbors: ["RU","UA","PL","LT","LV"],         climate: "continental",  avgTemperature: 6  },
  { alpha2: "BE", lat: 50.50, lon: 4.47,   bounds: { north: 51.51, south: 49.50, east: 6.41,  west: 2.55  },  area: 30528,    landlocked: false, neighbors: ["NL","DE","LU","FR"],              climate: "temperate",    avgTemperature: 10 },
  { alpha2: "BA", lat: 44.17, lon: 17.68,  bounds: { north: 45.28, south: 42.56, east: 19.63, west: 15.74 },  area: 51197,    landlocked: false, neighbors: ["HR","RS","ME"],                   climate: "temperate",    avgTemperature: 11 },
  { alpha2: "BG", lat: 42.73, lon: 25.49,  bounds: { north: 44.22, south: 41.23, east: 28.61, west: 22.36 },  area: 110879,   landlocked: false, neighbors: ["RO","RS","MK","GR","TR"],         climate: "continental",  avgTemperature: 12 },
  { alpha2: "HR", lat: 45.10, lon: 15.20,  bounds: { north: 46.56, south: 42.39, east: 19.45, west: 13.51 },  area: 56594,    landlocked: false, neighbors: ["SI","HU","RS","BA","ME"],         climate: "mediterranean",avgTemperature: 12 },
  { alpha2: "CZ", lat: 49.82, lon: 15.47,  bounds: { north: 51.06, south: 48.55, east: 18.86, west: 12.09 },  area: 78867,    landlocked: true,  neighbors: ["DE","AT","SK","PL"],              climate: "temperate",    avgTemperature: 8  },
  { alpha2: "DK", lat: 56.26, lon: 9.50,   bounds: { north: 57.75, south: 54.56, east: 15.20, west: 8.07  },  area: 42924,    landlocked: false, neighbors: ["DE"],                             climate: "temperate",    avgTemperature: 8  },
  { alpha2: "EE", lat: 58.60, lon: 25.01,  bounds: { north: 59.68, south: 57.52, east: 28.21, west: 21.76 },  area: 45228,    landlocked: false, neighbors: ["RU","LV"],                        climate: "temperate",    avgTemperature: 6  },
  { alpha2: "FI", lat: 61.92, lon: 25.75,  bounds: { north: 70.09, south: 59.81, east: 31.59, west: 20.56 },  area: 338145,   landlocked: false, neighbors: ["NO","SE","RU","EE"],              climate: "subarctic",    avgTemperature: 2  },
  { alpha2: "FR", lat: 46.23, lon: 2.21,   bounds: { north: 51.09, south: 41.34, east: 9.56,  west: -5.14 },  area: 547557,   landlocked: false, neighbors: ["ES","AD","MC","IT","CH","DE","LU","BE"], climate: "temperate", avgTemperature: 12 },
  { alpha2: "DE", lat: 51.17, lon: 10.45,  bounds: { north: 55.06, south: 47.27, east: 15.04, west: 5.99  },  area: 357114,   landlocked: false, neighbors: ["DK","NL","BE","LU","FR","CH","AT","CZ","PL"], climate: "temperate", avgTemperature: 9 },
  { alpha2: "GR", lat: 39.07, lon: 21.82,  bounds: { north: 41.75, south: 34.80, east: 26.60, west: 19.37 },  area: 131957,   landlocked: false, neighbors: ["AL","MK","BG","TR"],              climate: "mediterranean",avgTemperature: 17 },
  { alpha2: "HU", lat: 47.16, lon: 19.50,  bounds: { north: 48.58, south: 45.74, east: 22.90, west: 16.11 },  area: 93028,    landlocked: true,  neighbors: ["AT","SK","UA","RO","RS","HR","SI"], climate: "continental", avgTemperature: 11 },
  { alpha2: "IS", lat: 64.96, lon: -19.02, bounds: { north: 66.56, south: 63.40, east: -13.50, west: -24.55 },area: 103000,   landlocked: false, neighbors: [],                                climate: "subarctic",    avgTemperature: 2  },
  { alpha2: "IE", lat: 53.41, lon: -8.24,  bounds: { north: 55.38, south: 51.44, east: -6.00, west: -10.48 }, area: 70273,    landlocked: false, neighbors: ["GB"],                             climate: "temperate",    avgTemperature: 10 },
  { alpha2: "IT", lat: 41.87, lon: 12.57,  bounds: { north: 47.09, south: 37.93, east: 18.52, west: 6.63  },  area: 301340,   landlocked: false, neighbors: ["FR","CH","AT","SI","SM","VA"],   climate: "mediterranean",avgTemperature: 14 },
  { alpha2: "LV", lat: 56.88, lon: 24.60,  bounds: { north: 58.08, south: 55.67, east: 28.24, west: 20.97 },  area: 64589,    landlocked: false, neighbors: ["EE","RU","BY","LT"],              climate: "temperate",    avgTemperature: 6  },
  { alpha2: "LI", lat: 47.14, lon: 9.55,   bounds: { north: 47.27, south: 47.05, east: 9.64,  west: 9.47  },  area: 160,      landlocked: true,  neighbors: ["AT","CH"],                        climate: "temperate",    avgTemperature: 8  },
  { alpha2: "LT", lat: 55.17, lon: 23.88,  bounds: { north: 56.45, south: 53.90, east: 26.84, west: 20.94 },  area: 65300,    landlocked: false, neighbors: ["LV","BY","PL","RU"],              climate: "temperate",    avgTemperature: 7  },
  { alpha2: "LU", lat: 49.81, lon: 6.13,   bounds: { north: 50.18, south: 49.44, east: 6.53,  west: 5.74  },  area: 2586,     landlocked: true,  neighbors: ["BE","FR","DE"],                   climate: "temperate",    avgTemperature: 9  },
  { alpha2: "MT", lat: 35.94, lon: 14.38,  bounds: { north: 36.08, south: 35.80, east: 14.57, west: 14.18 },  area: 316,      landlocked: false, neighbors: [],                                climate: "mediterranean",avgTemperature: 19 },
  { alpha2: "MD", lat: 47.41, lon: 28.37,  bounds: { north: 48.49, south: 45.47, east: 30.14, west: 26.62 },  area: 33851,    landlocked: true,  neighbors: ["RO","UA"],                        climate: "continental",  avgTemperature: 10 },
  { alpha2: "MC", lat: 43.73, lon: 7.40,   bounds: { north: 43.75, south: 43.72, east: 7.44,  west: 7.37  },  area: 2,        landlocked: false, neighbors: ["FR"],                             climate: "mediterranean",avgTemperature: 16 },
  { alpha2: "ME", lat: 42.71, lon: 19.37,  bounds: { north: 43.52, south: 41.85, east: 20.36, west: 18.43 },  area: 13812,    landlocked: false, neighbors: ["HR","BA","RS","XK","AL"],         climate: "mediterranean",avgTemperature: 13 },
  { alpha2: "NL", lat: 52.13, lon: 5.29,   bounds: { north: 53.51, south: 50.75, east: 7.23,  west: 3.36  },  area: 41543,    landlocked: false, neighbors: ["BE","DE"],                        climate: "temperate",    avgTemperature: 10 },
  { alpha2: "MK", lat: 41.61, lon: 21.75,  bounds: { north: 42.37, south: 40.86, east: 23.03, west: 20.45 },  area: 25713,    landlocked: true,  neighbors: ["RS","BG","GR","AL","XK"],         climate: "continental",  avgTemperature: 12 },
  { alpha2: "NO", lat: 60.47, lon: 8.47,   bounds: { north: 71.18, south: 57.96, east: 31.03, west: 4.56  },  area: 385207,   landlocked: false, neighbors: ["SE","FI","RU"],                   climate: "subarctic",    avgTemperature: 2  },
  { alpha2: "PL", lat: 51.92, lon: 19.15,  bounds: { north: 54.84, south: 49.00, east: 24.15, west: 14.12 },  area: 312685,   landlocked: false, neighbors: ["DE","CZ","SK","UA","BY","RU","LT"], climate: "temperate",  avgTemperature: 8  },
  { alpha2: "PT", lat: 39.40, lon: -8.22,  bounds: { north: 42.15, south: 36.84, east: -6.19, west: -9.50 },  area: 92212,    landlocked: false, neighbors: ["ES"],                             climate: "mediterranean",avgTemperature: 16 },
  { alpha2: "RO", lat: 45.94, lon: 24.97,  bounds: { north: 48.27, south: 43.62, east: 29.69, west: 22.33 },  area: 238397,   landlocked: false, neighbors: ["UA","MD","BG","RS","HU"],         climate: "continental",  avgTemperature: 10 },
  { alpha2: "RU", lat: 61.52, lon: 105.32, bounds: { north: 81.86, south: 41.19, east: 180.00, west: 19.64 }, area: 17098242, landlocked: false, neighbors: ["NO","FI","EE","LV","LT","PL","BY","UA","GE","AZ","KZ","MN","CN","KP"], climate: "subarctic", avgTemperature: -5 },
  { alpha2: "SM", lat: 43.94, lon: 12.46,  bounds: { north: 44.00, south: 43.89, east: 12.52, west: 12.40 },  area: 61,       landlocked: true,  neighbors: ["IT"],                             climate: "temperate",    avgTemperature: 12 },
  { alpha2: "RS", lat: 44.02, lon: 21.01,  bounds: { north: 46.19, south: 42.23, east: 23.01, west: 18.82 },  area: 77474,    landlocked: true,  neighbors: ["HU","RO","BG","MK","XK","AL","ME","BA","HR"], climate: "continental", avgTemperature: 12 },
  { alpha2: "SK", lat: 48.67, lon: 19.70,  bounds: { north: 49.61, south: 47.73, east: 22.57, west: 16.83 },  area: 49035,    landlocked: true,  neighbors: ["CZ","AT","HU","UA","PL"],         climate: "temperate",    avgTemperature: 9  },
  { alpha2: "SI", lat: 46.15, lon: 14.99,  bounds: { north: 46.88, south: 45.42, east: 16.61, west: 13.38 },  area: 20273,    landlocked: false, neighbors: ["AT","HU","HR","IT"],              climate: "temperate",    avgTemperature: 10 },
  { alpha2: "ES", lat: 40.46, lon: -3.75,  bounds: { north: 43.79, south: 35.95, east: 4.33,  west: -9.30 },  area: 505992,   landlocked: false, neighbors: ["FR","AD","PT","MA"],              climate: "mediterranean",avgTemperature: 15 },
  { alpha2: "SE", lat: 60.13, lon: 18.64,  bounds: { north: 69.06, south: 55.34, east: 24.17, west: 11.11 },  area: 450295,   landlocked: false, neighbors: ["NO","FI"],                        climate: "subarctic",    avgTemperature: 3  },
  { alpha2: "CH", lat: 46.82, lon: 8.23,   bounds: { north: 47.81, south: 45.83, east: 10.49, west: 5.96  },  area: 41285,    landlocked: true,  neighbors: ["DE","AT","LI","IT","FR"],         climate: "temperate",    avgTemperature: 6  },
  { alpha2: "UA", lat: 48.38, lon: 31.17,  bounds: { north: 52.38, south: 44.39, east: 40.23, west: 22.14 },  area: 603550,   landlocked: false, neighbors: ["BY","RU","PL","SK","HU","RO","MD"], climate: "continental", avgTemperature: 8 },
  { alpha2: "GB", lat: 55.38, lon: -3.44,  bounds: { north: 60.86, south: 49.86, east: 1.76,  west: -8.65 },  area: 242495,   landlocked: false, neighbors: ["IE"],                             climate: "temperate",    avgTemperature: 9  },
  { alpha2: "VA", lat: 41.90, lon: 12.45,  bounds: { north: 41.91, south: 41.90, east: 12.46, west: 12.44 },  area: 0,        landlocked: true,  neighbors: ["IT"],                             climate: "mediterranean",avgTemperature: 15 },

  // ── North America ────────────────────────────────────────────────────────
  { alpha2: "AG", lat: 17.06, lon: -61.80, bounds: { north: 17.73, south: 16.90, east: -61.67, west: -62.24 },area: 442,      landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 27 },
  { alpha2: "BS", lat: 25.03, lon: -77.40, bounds: { north: 27.26, south: 20.91, east: -72.74, west: -79.30 },area: 13940,    landlocked: false, neighbors: [],                                climate: "subtropical",  avgTemperature: 26 },
  { alpha2: "BB", lat: 13.19, lon: -59.54, bounds: { north: 13.33, south: 13.04, east: -59.43, west: -59.65 },area: 430,      landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 27 },
  { alpha2: "BZ", lat: 17.19, lon: -88.50, bounds: { north: 18.50, south: 15.89, east: -87.49, west: -89.23 },area: 22966,    landlocked: false, neighbors: ["MX","GT"],                        climate: "tropical",     avgTemperature: 26 },
  { alpha2: "CA", lat: 56.13, lon: -106.35,bounds: { north: 83.11, south: 41.68, east: -52.62, west: -141.00 },area: 9984670, landlocked: false, neighbors: ["US"],                             climate: "continental",  avgTemperature: -5 },
  { alpha2: "CR", lat: 9.75,  lon: -83.75, bounds: { north: 11.22, south: 7.98,  east: -82.57, west: -85.95 },area: 51100,    landlocked: false, neighbors: ["NI","PA"],                        climate: "tropical",     avgTemperature: 23 },
  { alpha2: "CU", lat: 21.52, lon: -77.78, bounds: { north: 23.19, south: 19.83, east: -74.13, west: -84.96 },area: 109884,   landlocked: false, neighbors: [],                                climate: "subtropical",  avgTemperature: 25 },
  { alpha2: "DM", lat: 15.41, lon: -61.37, bounds: { north: 15.64, south: 15.21, east: -61.25, west: -61.50 },area: 751,      landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 27 },
  { alpha2: "DO", lat: 18.74, lon: -70.16, bounds: { north: 19.93, south: 17.47, east: -68.32, west: -74.48 },area: 48671,    landlocked: false, neighbors: ["HT"],                             climate: "tropical",     avgTemperature: 25 },
  { alpha2: "SV", lat: 13.79, lon: -88.90, bounds: { north: 14.45, south: 13.15, east: -87.69, west: -90.13 },area: 21041,    landlocked: false, neighbors: ["GT","HN"],                        climate: "tropical",     avgTemperature: 24 },
  { alpha2: "GD", lat: 12.12, lon: -61.68, bounds: { north: 12.54, south: 11.98, east: -61.59, west: -61.80 },area: 344,      landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 27 },
  { alpha2: "GT", lat: 15.78, lon: -90.23, bounds: { north: 17.82, south: 13.74, east: -88.22, west: -92.23 },area: 108889,   landlocked: false, neighbors: ["MX","BZ","HN","SV"],              climate: "tropical",     avgTemperature: 22 },
  { alpha2: "HT", lat: 18.97, lon: -72.29, bounds: { north: 20.09, south: 17.97, east: -71.62, west: -74.48 },area: 27750,    landlocked: false, neighbors: ["DO"],                             climate: "tropical",     avgTemperature: 25 },
  { alpha2: "HN", lat: 15.20, lon: -86.24, bounds: { north: 16.51, south: 13.00, east: -83.15, west: -89.35 },area: 112492,   landlocked: false, neighbors: ["GT","SV","NI"],                   climate: "tropical",     avgTemperature: 22 },
  { alpha2: "JM", lat: 18.11, lon: -77.30, bounds: { north: 18.53, south: 17.70, east: -76.18, west: -78.37 },area: 10991,    landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 26 },
  { alpha2: "MX", lat: 23.63, lon: -102.55,bounds: { north: 32.72, south: 14.53, east: -86.70, west: -118.40 },area: 1964375, landlocked: false, neighbors: ["US","GT","BZ"],                   climate: "subtropical",  avgTemperature: 22 },
  { alpha2: "NI", lat: 12.87, lon: -85.21, bounds: { north: 14.73, south: 10.95, east: -83.15, west: -87.69 },area: 130373,   landlocked: false, neighbors: ["HN","CR"],                        climate: "tropical",     avgTemperature: 26 },
  { alpha2: "PA", lat: 8.54,  lon: -80.78, bounds: { north: 9.65,  south: 7.20,  east: -77.16, west: -83.05 },area: 75417,    landlocked: false, neighbors: ["CR","CO"],                        climate: "tropical",     avgTemperature: 26 },
  { alpha2: "KN", lat: 17.36, lon: -62.78, bounds: { north: 17.42, south: 17.10, east: -62.52, west: -62.87 },area: 261,      landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 27 },
  { alpha2: "LC", lat: 13.91, lon: -60.98, bounds: { north: 14.12, south: 13.71, east: -60.87, west: -61.08 },area: 616,      landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 27 },
  { alpha2: "VC", lat: 12.98, lon: -61.29, bounds: { north: 13.38, south: 12.58, east: -61.13, west: -61.46 },area: 389,      landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 27 },
  { alpha2: "TT", lat: 10.69, lon: -61.22, bounds: { north: 10.90, south: 9.97,  east: -60.89, west: -61.92 },area: 5128,     landlocked: false, neighbors: [],                                climate: "tropical",     avgTemperature: 28 },
  { alpha2: "US", lat: 37.09, lon: -95.71, bounds: { north: 49.38, south: 24.52, east: -66.94, west: -124.78 },area: 9833517, landlocked: false, neighbors: ["CA","MX"],                        climate: "temperate",    avgTemperature: 12 },

  // ── South America ────────────────────────────────────────────────────────
  { alpha2: "AR", lat: -38.42, lon: -63.62,bounds: { north: -21.78, south: -55.06, east: -53.64, west: -73.56 },area: 2780400, landlocked: false, neighbors: ["CL","BO","PY","BR","UY"],        climate: "temperate",    avgTemperature: 14 },
  { alpha2: "BO", lat: -16.29, lon: -63.59,bounds: { north: -9.68, south: -22.90, east: -57.49, west: -69.64 },area: 1098581, landlocked: true,  neighbors: ["PE","BR","PY","AR","CL"],        climate: "tropical",     avgTemperature: 18 },
  { alpha2: "BR", lat: -14.24, lon: -51.93,bounds: { north: 5.27,  south: -33.74, east: -34.79, west: -73.98 },area: 8515767, landlocked: false, neighbors: ["VE","GY","SR","CO","PE","BO","PY","AR","UY"], climate: "tropical", avgTemperature: 24 },
  { alpha2: "CL", lat: -35.68, lon: -71.54,bounds: { north: -17.51, south: -55.91, east: -66.42, west: -75.71 },area: 756102,  landlocked: false, neighbors: ["PE","BO","AR"],                  climate: "temperate",    avgTemperature: 10 },
  { alpha2: "CO", lat: 4.57,  lon: -74.30, bounds: { north: 12.44, south: -4.23, east: -66.87, west: -79.01 },  area: 1141748, landlocked: false, neighbors: ["PA","VE","BR","PE","EC"],        climate: "tropical",     avgTemperature: 24 },
  { alpha2: "EC", lat: -1.83, lon: -78.18, bounds: { north: 1.44,  south: -5.02, east: -75.19, west: -81.00 },  area: 283561,  landlocked: false, neighbors: ["CO","PE"],                       climate: "tropical",     avgTemperature: 20 },
  { alpha2: "GY", lat: 4.86,  lon: -58.93, bounds: { north: 8.56,  south: 1.19,  east: -57.15, west: -61.39 },  area: 214969,  landlocked: false, neighbors: ["VE","BR","SR"],                  climate: "tropical",     avgTemperature: 26 },
  { alpha2: "PY", lat: -23.44, lon: -58.44,bounds: { north: -19.28, south: -27.59, east: -54.26, west: -62.64 },area: 406752,  landlocked: true,  neighbors: ["BO","BR","AR"],                  climate: "subtropical",  avgTemperature: 21 },
  { alpha2: "PE", lat: -9.19, lon: -75.02, bounds: { north: -0.04, south: -18.35, east: -68.67, west: -81.33 }, area: 1285216, landlocked: false, neighbors: ["EC","CO","BR","BO","CL"],        climate: "tropical",     avgTemperature: 18 },
  { alpha2: "SR", lat: 3.92,  lon: -56.03, bounds: { north: 6.00,  south: 1.83,  east: -53.98, west: -58.07 },  area: 163820,  landlocked: false, neighbors: ["GY","BR"],                       climate: "tropical",     avgTemperature: 26 },
  { alpha2: "UY", lat: -32.52, lon: -55.77,bounds: { north: -30.09, south: -34.96, east: -53.08, west: -58.44 },area: 176215,  landlocked: false, neighbors: ["BR","AR"],                       climate: "temperate",    avgTemperature: 17 },
  { alpha2: "VE", lat: 6.42,  lon: -66.59, bounds: { north: 12.20, south: 0.65,  east: -59.97, west: -73.35 },  area: 916445,  landlocked: false, neighbors: ["CO","BR","GY"],                  climate: "tropical",     avgTemperature: 26 },

  // ── Oceania ───────────────────────────────────────────────────────────────
  { alpha2: "AU", lat: -25.27, lon: 133.78, bounds: { north: -10.69, south: -43.64, east: 153.64, west: 113.15 },area: 7692024, landlocked: false, neighbors: ["PG","ID","TL"],                 climate: "arid",         avgTemperature: 21 },
  { alpha2: "FJ", lat: -16.58, lon: 179.41, bounds: { north: -12.48, south: -21.04, east: -176.95, west: 177.12 },area: 18272,  landlocked: false, neighbors: [],                               climate: "tropical",     avgTemperature: 25 },
  { alpha2: "KI", lat: -1.87, lon: -157.36, bounds: { north: 3.40, south: -11.44, east: 176.27, west: -174.52 }, area: 811,    landlocked: false, neighbors: [],                               climate: "tropical",     avgTemperature: 28 },
  { alpha2: "MH", lat: 7.13,  lon: 171.18,  bounds: { north: 14.64, south: 4.57, east: 172.02, west: 160.79 },   area: 181,    landlocked: false, neighbors: [],                               climate: "tropical",     avgTemperature: 28 },
  { alpha2: "FM", lat: 7.43,  lon: 150.55,  bounds: { north: 10.09, south: 1.00, east: 163.04, west: 138.07 },   area: 702,    landlocked: false, neighbors: [],                               climate: "tropical",     avgTemperature: 27 },
  { alpha2: "NR", lat: -0.52, lon: 166.93,  bounds: { north: -0.50, south: -0.55, east: 166.95, west: 166.90 },  area: 21,     landlocked: false, neighbors: [],                               climate: "tropical",     avgTemperature: 28 },
  { alpha2: "NZ", lat: -40.90, lon: 174.89, bounds: { north: -34.36, south: -47.29, east: 178.55, west: 166.43 },area: 268021, landlocked: false, neighbors: [],                               climate: "temperate",    avgTemperature: 12 },
  { alpha2: "PG", lat: -6.31, lon: 143.96,  bounds: { north: 0.01, south: -11.66, east: 155.97, west: 140.84 },  area: 462840, landlocked: false, neighbors: ["ID","AU"],                      climate: "tropical",     avgTemperature: 26 },
  { alpha2: "WS", lat: -13.76, lon: -172.10,bounds: { north: -13.46, south: -14.08, east: -171.43, west: -172.81 },area: 2842, landlocked: false, neighbors: [],                               climate: "tropical",     avgTemperature: 26 },
  { alpha2: "SB", lat: -9.65, lon: 160.16,  bounds: { north: -6.60, south: -11.85, east: 162.72, west: 155.51 }, area: 28896,  landlocked: false, neighbors: ["PG"],                           climate: "tropical",     avgTemperature: 26 },
  { alpha2: "TO", lat: -21.18, lon: -175.20,bounds: { north: -15.57, south: -23.44, east: -173.71, west: -175.68 },area: 748,  landlocked: false, neighbors: [],                               climate: "tropical",     avgTemperature: 24 },
  { alpha2: "TV", lat: -7.11, lon: 177.64,  bounds: { north: -5.61, south: -9.44, east: 179.79, west: 176.07 },  area: 26,     landlocked: false, neighbors: [],                               climate: "tropical",     avgTemperature: 28 },
  { alpha2: "VU", lat: -15.38, lon: 166.96, bounds: { north: -13.08, south: -20.30, east: 170.00, west: 166.52 },area: 12189,  landlocked: false, neighbors: [],                               climate: "tropical",     avgTemperature: 24 },
];

/**
 * Get geography data for a specific country by its alpha-2 code.
 */
export function getCountryGeography(alpha2: string): CountryGeography | undefined {
  return countryGeography.find(
    (g) => g.alpha2.toLowerCase() === alpha2.toLowerCase()
  );
}

/**
 * Get all landlocked countries.
 */
export function getLandlockedCountries(): CountryGeography[] {
  return countryGeography.filter((g) => g.landlocked);
}

/**
 * Get countries by climate zone.
 */
export function getCountriesByClimate(climate: CountryGeography["climate"]): CountryGeography[] {
  return countryGeography.filter((g) => g.climate === climate);
}

/**
 * Get all countries that neighbour a given country.
 */
export function getNeighbors(alpha2: string): CountryGeography[] {
  const geo = getCountryGeography(alpha2);
  if (!geo) return [];
  return geo.neighbors
    .map((code) => getCountryGeography(code))
    .filter((g): g is CountryGeography => g !== undefined);
}

/**
 * Check whether two countries share a land border.
 *
 * @param alpha2A - ISO 3166-1 alpha-2 code of the first country (case-insensitive).
 * @param alpha2B - ISO 3166-1 alpha-2 code of the second country (case-insensitive).
 * @returns `true` if the two countries are neighbours, `false` otherwise.
 *   Also returns `false` if either code is not found in the geography data.
 *
 * @example
 * ```ts
 * doCountriesBorder("DE", "FR"); // true  – Germany and France share a border
 * doCountriesBorder("DE", "US"); // false – no shared border
 * ```
 */
export function doCountriesBorder(alpha2A: string, alpha2B: string): boolean {
  const geoA = getCountryGeography(alpha2A);
  if (!geoA) return false;
  const geoB = getCountryGeography(alpha2B);
  if (!geoB) return false;
  const upper = geoB.alpha2.toUpperCase();
  return geoA.neighbors.some((n) => n.toUpperCase() === upper);
}
