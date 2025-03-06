// Function to get current Hijri date
export function getCurrentHijriDate(): string {
  try {
    // Use Intl for Hijri calendar if supported
    const options: Intl.DateTimeFormatOptions = {
      calendar: "islamic",
      day: "numeric",
      month: "long",
      year: "numeric",
    }

    return new Intl.DateTimeFormat("ar-SA-u-ca-islamic", options).format(new Date())
  } catch (error) {
    // Fallback for browsers without Islamic calendar support
    return "رمضان 1446"
  }
}

