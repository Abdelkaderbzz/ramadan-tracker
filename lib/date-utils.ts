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

export function getRamadanDay(): number {
  try {
    const formatter = new Intl.DateTimeFormat(
      'en-u-ca-islamic-umalqura-nu-latn',
      {
        day: 'numeric',
        month: 'numeric',
      },
    );
    const parts = formatter.formatToParts(new Date());
    const day = Number.parseInt(
      parts.find((p) => p.type === 'day')?.value || '1',
    );
    const month = Number.parseInt(
      parts.find((p) => p.type === 'month')?.value || '9',
    );

    // Ramadan is the 9th month of the Islamic calendar.
    if (month === 9) {
      return day;
    }

    // If we're not in Ramadan yet (month < 9), return -1 to indicate "Not Started".
    if (month < 9) return -1;

    // If we're after Ramadan (month > 9), return 30 (last day).
    if (month > 9) return 30;

    return day;
  } catch (error) {
    return 1;
  }
}
