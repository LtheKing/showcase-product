export function formatIdr(amount: number): string {
  const formatted = new Intl.NumberFormat("id-ID").format(amount);
  return `Rp ${formatted}`;
}
