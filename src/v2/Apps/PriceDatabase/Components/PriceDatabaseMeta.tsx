import * as React from "react"
import { MetaTags } from "v2/Components/MetaTags"

export const PriceDatabaseMeta: React.FC = () => {
  return (
    <MetaTags
      title="Search Auction Results for Free | Artsy Price Database"
      description="Unlimited access to millions of auction results and art market data—for free."
      pathname="/price-database"
      imageURL="" // TODO: replace with image
    />
  )
}
