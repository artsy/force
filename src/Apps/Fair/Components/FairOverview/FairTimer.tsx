import * as React from "react"
import { Box, Text } from "@artsy/palette"
import { Timer } from "Components/Timer"
import { createFragmentContainer, graphql } from "react-relay"
import { FairTimer_fair$data } from "__generated__/FairTimer_fair.graphql"
import { useTimer } from "Utils/Hooks/useTimer"

interface FairTimerProps {
  fair: FairTimer_fair$data
}

export const FairTimer: React.FC<FairTimerProps> = ({ fair: { endAt } }) => {
  const { hasEnded } = useTimer(endAt!)

  return (
    <Box my={[2, 0]}>
      {hasEnded ? (
        <Text variant={["lg-display", "xl"]}>Closed</Text>
      ) : (
        <>
          <Text variant={["sm-display", "xl"]}>Closes in:</Text>
          <Timer
            endDate={endAt!}
            variant={["lg-display", "xl"]}
            alignItems="start"
          />
        </>
      )}
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
