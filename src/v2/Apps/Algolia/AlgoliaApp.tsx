import { Box, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AlgoliaApp_system } from "v2/__generated__/AlgoliaApp_system.graphql"

interface AlgoliaAppProps {
  system: AlgoliaApp_system
}

export const AlgoliaApp: React.FC<AlgoliaAppProps> = ({ children }) => {
  return (
    <Box>
      <Text>AlgoliaApp</Text>
      {children}
    </Box>
  )
}

export const AlgoliaAppFragmentContainer = createFragmentContainer(AlgoliaApp, {
  system: graphql`
    fragment AlgoliaApp_system on System {
      algolia {
        apiKey
        appID
      }
    }
  `,
})
