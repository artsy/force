import { MetaTags } from "Components/MetaTags"
import type * as React from "react"

export const FairsMeta: React.FC<React.PropsWithChildren<unknown>> = ({}) => {
  return (
    <MetaTags
      title="Preview 60+ Top Art Fairs on Artsy | Artsy"
      description="Experience art fairs from all over the world before they open to the public. Browse and collect thousands of works from Art Basel, Frieze, The Armory Show, and more."
      pathname="/art-fairs"
    />
  )
}
