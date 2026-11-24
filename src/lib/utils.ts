/** "01", "02", ... for numbered lists. */
export const pad = (n: number) => String(n + 1).padStart(2, "0");

/** "Backend & APIs" -> "backendApis" (used for JSON-style keys). */
export const camel = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, c: string) => c.toUpperCase());

type LatLon = [number, number];

/** Great-circle distance in km, rounded to the nearest 10. */
export function distanceKm(a: LatLon, b: LatLon): number {
  const r = Math.PI / 180;
  const dLat = (b[0] - a[0]) * r;
  const dLon = (b[1] - a[1]) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLon / 2) ** 2;
  return Math.round((2 * 6371 * Math.asin(Math.sqrt(h))) / 10) * 10;
}
