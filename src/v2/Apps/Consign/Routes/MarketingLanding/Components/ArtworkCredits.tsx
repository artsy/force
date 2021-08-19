import { Separator, Text } from "@artsy/palette"
import React from "react"

export const ArtworkCredits: React.FC = () => {
  return (
    <>
      <Separator as="hr" mb={2} />

      <Text variant="xs" color="black60">
        Header Artwork credits: Alex Katz, <em>Brisk Day</em>, 1991. Courtesy of
        Marlborough Gallery; Robert Mangold, <em>Untitled</em>, 1997. Courtesy
        of Betsy Senior Fine Art; George Condo, <em>Toy Head</em>, 2012; David
        Hockney, <em>Untitled (For Joel Wachs)</em>, 1993. Courtesy of Zeit
        Contemporary Art.
      </Text>
    </>
  )
}
