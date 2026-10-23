import { Box, Shelf, Skeleton } from "@artsy/palette"
import { ShelfArtworkPlaceholder } from "Components/Artwork/ShelfArtwork"
import { CellArtistPlaceholder } from "Components/Cells/CellArtist"
import type { FC } from "react"

export const ArtAssistantRailPlaceholder: FC<{
  type: "artworks" | "artists"
}> = ({ type }) => {
  return (
    <Box as="output" display="block" aria-label={`Loading ${type}`}>
      <Skeleton>
        <Shelf>
          {Array.from({ length: 3 }, (_, index) => {
            return type === "artworks" ? (
              <ShelfArtworkPlaceholder key={index} index={index} />
            ) : (
              <CellArtistPlaceholder key={index} />
            )
          })}
        </Shelf>
      </Skeleton>
    </Box>
  )
}
