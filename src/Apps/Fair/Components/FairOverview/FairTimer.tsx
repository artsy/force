import { Timer } from "Components/Timer"
import { useTimer } from "Utils/Hooks/useTimer"
import { Box, Text } from "@artsy/palette"
import type { FairTimer_fair$data } from "__generated__/FairTimer_fair.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface FairTimerProps {
  fair: FairTimer_fair$data
}

export const FairTimer: React.FC<React.PropsWithChildren<FairTimerProps>> = ({
  fair: { endAt },
}) => {
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
