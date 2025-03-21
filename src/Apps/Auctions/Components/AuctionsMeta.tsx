import { MetaTags } from "Components/MetaTags"
import type * as React from "react"

export const AuctionsMeta: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <MetaTags
      title="Auctions on Artsy | Premium Artworks from In-Demand Artists"
      description="Bid in live and online-only sales from the world’s leading auction houses. Browse paintings, sculptures, design, prints & multiples and more."
      pathname="/auctions"
    />
  )
}
