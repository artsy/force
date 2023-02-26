import * as React from "react"
import { ShelfArtworkPlaceholder } from "Components/Artwork/ShelfArtwork"
import { Rail } from "Components/Rail/Rail"

export const RecentlyViewedPlaceholder: React.FC = () => {
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
