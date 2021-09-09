export const isExceededZendeskThreshold = (amount, currencyCode) => {
  return (
    {
      USD: 10000,
      AUD: 13000,
      EUR: 8000,
      HKD: 77000,
      GBP: 7000,
    }[currencyCode] < amount
  )
}
