import React from "react"
import { MetaTags } from "v2/Components/MetaTags"

export const PriceDatabaseMeta: React.FC = () => {
  return (
    <MetaTags
      title="Artsy | Artsy Price Database"
      description="Search auction results for more than 340,000 artists for free."
      pathname="/price-database"
      imageURL="" // TODO: replace with image
    />
  )
}
