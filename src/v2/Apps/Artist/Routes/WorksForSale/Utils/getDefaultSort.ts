import { Variant } from "unleash-client"

export const getDefaultSort = (
  sort: string,
  variant: Variant | null,
  defaultSort = "-decayed_merch"
) => {
  if (variant?.name === "experiment" && sort === defaultSort) {
    return "-default_trending_score"
  }

  return sort
}
