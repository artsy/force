import { ShelfArtworkPlaceholder } from "Components/Artwork/ShelfArtwork"
import { Rail } from "Components/Rail/Rail"
import type * as React from "react"

export const RecentlyViewedPlaceholder: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Rail
      title="Recently Viewed"
      getItems={() => {
        return [...new Array(10)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })
      }}
    />
  )
}
