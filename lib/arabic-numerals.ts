
export function arabicNumerals(num: number | string): string {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/[0-9]/g, (d) => arabicDigits[Number.parseInt(d)]);
}


export function frenchNumerals(num: number | string): string {
  
  return String(num);
}


export function formatNumber(
  num: number | string,
  locale: string = 'en',
): string {
  
  return String(num);
}
