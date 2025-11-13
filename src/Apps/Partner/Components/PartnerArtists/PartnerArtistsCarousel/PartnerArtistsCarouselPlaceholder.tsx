import { CellArtistPlaceholder } from "Components/Cells/CellArtist"
import { Shelf } from "@artsy/palette"
import type * as React from "react"

export interface PartnerArtistsCarouselPlaceholderProps {
  count: number
}

export const PartnerArtistsCarouselPlaceholder: React.FC<
  React.PropsWithChildren<PartnerArtistsCarouselPlaceholderProps>
> = ({ count }) => {
  return (
    <Shelf alignItems="flex-start">
      {[...Array(count)].map((_, i) => {
        return <CellArtistPlaceholder key={i} />
      })}
    </Shelf>
  )
}
