import React from "react"
import { Box, Text } from "@artsy/palette"
import { Timer } from "v2/Components/Timer"
import { createFragmentContainer, graphql } from "react-relay"
import { FairTimer_fair } from "v2/__generated__/FairTimer_fair.graphql"

interface FairTimerProps {
  fair: FairTimer_fair
}

export const FairTimer: React.FC<FairTimerProps> = ({ fair: { endAt } }) => {
  if (!endAt) {
    return null
  }

  return (
    <Box my={[2, 0]}>
      <Text variant={["md", "xl"]}>Closes in:</Text>
      <Timer endDate={endAt} variant={["lg", "xl"]} alignItems="start" />
    </Box>
  )
}

export const FairTimerFragmentContainer = createFragmentContainer(FairTimer, {
  fair: graphql`
    fragment FairTimer_fair on Fair {
      endAt
    }
  `,
})
