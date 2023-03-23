const CURRENCIES = {
  USD: 10000,
  AUD: 13000,
  EUR: 8000,
  HKD: 77000,
  GBP: 7000,
} as const

export const exceedsChatSupportThreshold = (
  amount: number,
  currencyCode: string
) => {
  return (CURRENCIES[currencyCode] ?? 0) < amount
}
