import { Box, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairExhibitors_fair } from "v2/__generated__/FairExhibitors_fair.graphql"

interface FairExhibitorsProps {
  fair: FairExhibitors_fair
}

const FairExhibitors: React.FC<FairExhibitorsProps> = ({ fair }) => {
  return (
    <Box py={2}>
      <Text variant="text">Exhibitors</Text>
    </Box>
  )
}

export const FairExhibitorsFragmentContainer = createFragmentContainer(
  FairExhibitors,
  {
    fair: graphql`
      fragment FairExhibitors_fair on Fair {
        id
      }
    `,
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default FairExhibitorsFragmentContainer
