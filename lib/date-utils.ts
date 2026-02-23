
export function getCurrentHijriDate(locale: string = 'ar'): string {
  try {
    
    const options: Intl.DateTimeFormatOptions = {
      calendar: 'islamic-umalqura',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    
    
    
    const intlLocale =
      locale === 'ar'
        ? 'ar-SA-u-ca-islamic-umalqura-nu-latn'
        : `${locale}-u-ca-islamic-umalqura-nu-latn`;

    return new Intl.DateTimeFormat(intlLocale, options).format(new Date());
  } catch (error) {
    
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

    
    if (month === 9) {
      return day;
    }

    
    if (month < 9) return -1;

    
    if (month > 9) return 30;

    return day;
  } catch (error) {
    return 1;
  }
}
