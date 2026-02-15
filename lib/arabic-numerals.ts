// Convert Western digits to Arabic digits
export function arabicNumerals(num: number | string): string {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/[0-9]/g, (d) => arabicDigits[Number.parseInt(d)]);
}

// Convert Western digits to French digits
export function frenchNumerals(num: number | string): string {
  // French uses the same digits as Western/Latin numerals
  return String(num);
}

// Format number based on locale
export function formatNumber(
  num: number | string,
  locale: string = 'en',
): string {
  if (locale === 'ar') {
    return arabicNumerals(num);
  }
  return String(num);
}
