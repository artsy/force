import * as React from "react"
import { MetaTags } from "v2/Components/MetaTags"

export const PriceDatabaseMeta: React.FC = () => {
  return (
    <MetaTags
      title="Search Auction Results for Free | Artsy Price Database"
      description="Unlimited access to auction results and art market data—for free. Browse millions of auction records from top auction houses, from 1986 to today."
      pathname="/price-database"
      imageURL="" // TODO: replace with image
    />
  )
}
