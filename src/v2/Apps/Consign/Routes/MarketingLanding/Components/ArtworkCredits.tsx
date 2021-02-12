import { Text, color } from "@artsy/palette"
import React from "react"
import { SectionContainer } from "./SectionContainer"

export const ArtworkCredits: React.FC = () => {
  return (
    <SectionContainer
      borderBottom={`1px solid ${color("black10")}`}
      borderTop={`1px solid ${color("black10")}`}
      py={2}
    >
      <Text variant="small" color="black60">
        Header Artwork credits: Alex Katz, <i>Brisk Day</i>, 1991. Courtesy of
        Marlborough Gallery; Robert Mangold, <i>Untitled</i>, 1997. Courtesy of
        Betsy Senior Fine Art; George Condo, <i>Toy Head</i>, 2012; David
        Hockney, <i>Untitled (For Joel Wachs)</i>, 1993. Courtesy of Zeit
        Contemporary Art.
      </Text>
    </SectionContainer>
  )
}
