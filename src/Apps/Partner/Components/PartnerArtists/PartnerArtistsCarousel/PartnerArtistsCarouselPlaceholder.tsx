import { Shelf } from "@artsy/palette"
import { CellArtistPlaceholder } from "Components/Cells/CellArtist"
import * as React from "react"

export interface PartnerArtistsCarouselPlaceholderProps {
  count: number
}

export const PartnerArtistsCarouselPlaceholder: React.FC<PartnerArtistsCarouselPlaceholderProps> = ({
  count,
}) => {
  return (
    <Shelf alignItems="flex-start">
      {[...Array(count)].map((_, i) => {
        return <CellArtistPlaceholder key={i} />
      })}
    </Shelf>
  )
}
