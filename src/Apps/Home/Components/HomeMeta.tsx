import { MetaTags } from "Components/MetaTags"
import type * as React from "react"

export const HomeMeta: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <MetaTags
      title="Artsy — Discover and Buy Fine Art"
      description="Artsy is the world's largest online art marketplace. Browse over 1 million artworks by iconic and emerging artists from 4000+ galleries and top auction houses."
      imageURL="https://files.artsy.net/images/00_home_og.png"
      pathname="/"
    />
  )
}
