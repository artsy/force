import React from "react"
import { Box, Column, Text } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
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
    <Column span={6}>
      {/* Desktop Fair Timer */}
      <Media greaterThan="xs">
        <Text variant="xl">Closes in:</Text>
        <Timer
          endDate={endAt}
          labelWithoutTimeRemaining="Closed"
          size="xl"
          alignItems="start"
        />
      </Media>

      {/* Mobile Fair Timer */}
      <Media at="xs">
        <Box my={2}>
          <Text variant="md">Closes in:</Text>
          <Timer
            endDate={endAt}
            labelWithoutTimeRemaining="Closed"
            size="lg"
            alignItems="start"
          />
        </Box>
      </Media>
    </Column>
  )
}

export const FairTimerFragmentContainer = createFragmentContainer(FairTimer, {
  fair: graphql`
    fragment FairTimer_fair on Fair {
      endAt
    }
  `,
})
