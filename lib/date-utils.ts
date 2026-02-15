// Function to get current Hijri date
export function getCurrentHijriDate(locale: string = 'ar'): string {
  try {
    // Use Intl for Hijri calendar if supported
    const options: Intl.DateTimeFormatOptions = {
      calendar: 'islamic-umalqura',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    // Construct the locale string for Intl
    // For English/French, we want latin numerals and English/French month names if possible (though Hijri often defaults)
    // For Arabic, we use 'ar-SA'
    const intlLocale =
      locale === 'ar'
        ? 'ar-SA-u-ca-islamic-umalqura-nu-latn'
        : `${locale}-u-ca-islamic-umalqura-nu-latn`;

    return new Intl.DateTimeFormat(intlLocale, options).format(new Date());
  } catch (error) {
    // Fallback for browsers without Islamic calendar support
    return 'Ramadan 1447';
  }
}
