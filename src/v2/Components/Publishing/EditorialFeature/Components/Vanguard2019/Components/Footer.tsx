import { Box, Flex, Sans, Separator, Serif } from "@artsy/palette"
import React from "react"

export const VanguardFooter = () => {
  return (
    <Box background="white" pb={80}>
      <Box
        maxWidth={["100vw", 1000]}
        px={["10vw", "10vw", "10vw", "10vw", 4]}
        mx="auto"
      >
        <Separator mb={4} />
        <Flex flexDirection={["column", "row"]}>
          <Box pr={[0, 2]} width={["100%", "50%"]} pb={4}>
            <Sans size="3" weight="medium">
              Corrections
            </Sans>
            <Serif size="3" element="p">
              {corrections}
            </Serif>
          </Box>
          <Box pl={[0, 2]} width={["100%", "50%"]} pb={4}>
            <Sans size="3" weight="medium">
              Clarifications
            </Sans>
            <Serif size="3" element="p">
              {clarifications}
            </Serif>
          </Box>
        </Flex>
        <Separator mb={2} />
        <Serif size="3">
          Back to <a href="/articles">Artsy Editorial</a>
        </Serif>
      </Box>
    </Box>
  )
}

const corrections = `A previous version of this article referred to Aike gallery as
Aike-Dellarco; McArthur Binion’s show at the Mississippi Museum of
Art, originally scheduled for this fall, is not opening until 2020;
and Melike Kara is Kurdish-German not Turkish-German. The text has
been updated to reflect these changes.`

const clarifications = `While only Beyoncé was named as the buyer of a Derek Fordjour work at
Frieze New York, Jay-Z was actually the buyer; in order to fully
recognize the breadth of galleries that represent the featured
artists, additional gallery names have been added to the text for
Beatriz González, Vivian Suter, and Diane Simpson; while the text on
Henry Taylor previously referred to Eva Presenhuber as his dealer, it
has been updated to reflect that Blum & Poe has been primarily
representing the artist for the past decade; and mention of
SculptureCenter, organizers of Tishan Hsu’s 2020 show at the Hammer,
has been added to clarify their involvement with the exhibition.`
