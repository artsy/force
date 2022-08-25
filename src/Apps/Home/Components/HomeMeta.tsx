import * as React from "react"
import { MetaTags } from "Components/MetaTags"

export const HomeMeta: React.FC = () => {
  return (
    <MetaTags
      title="Artsy — Discover, Buy, and Sell Fine Art"
      description="Artsy is the world’s largest online art marketplace. Browse over 1 million artworks by iconic and emerging artists from 4000+ galleries and top auction houses."
      imageURL="https://files.artsy.net/images/00_home_og.png"
    />
  )
}
