import { DateTime, type LocaleOptions } from "luxon"

export const getDisplaySaleDate = (
  saleDate: string | null | undefined,
): string | null => {
  if (!saleDate) return null

  return DateTime.fromISO(saleDate, { zone: "utc" }).toLocaleString(
    DateTime.DATE_MED as LocaleOptions,
  )
}
