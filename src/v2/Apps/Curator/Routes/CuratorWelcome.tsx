import { Box, Text } from "@artsy/palette"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface CuratorWelcomeProps {
  geneFamilies: any
}

const CuratorWelcome: FC<CuratorWelcomeProps> = ({ geneFamilies }) => {
  return (
    <Box>
      <Text>
        The Artsy Curator is a fun way to browse art, while letting us know what
        you love and what you don't. The more you use our Curator, the easier it
        will be for us to suggest artists and artworks you'll love.
      </Text>
    </Box>
  )
}

const CuratorWelcomeFragmentContainer = createFragmentContainer(
  CuratorWelcome,
  {
    geneFamilies: graphql``,
  }
)

export { CuratorWelcomeFragmentContainer }
