import * as React from "react"
import { MetaTags } from "Components/MetaTags"

export const PriceDatabaseMeta: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <MetaTags
      title="Search Auction Results for Free | Artsy Price Database"
      description="Unlimited access to millions of auction results—for free. The Artsy Price Database is a collector’s best resource for art market data."
      pathname="/price-database"
      imageURL="" // TODO: replace with image
    />
  )
}
