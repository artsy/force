import React from "react"
import { Box, Text } from "@artsy/palette"
import { Timer } from "v2/Components/Timer"
import { createFragmentContainer, graphql } from "react-relay"
import { FairTimer_fair } from "v2/__generated__/FairTimer_fair.graphql"
import { useCurrentTime } from "v2/Utils/Hooks/useCurrentTime"
import { DateTime } from "luxon"

interface FairTimerProps {
  fair: FairTimer_fair
}

export const FairTimer: React.FC<FairTimerProps> = ({ fair: { endAt } }) => {
  const currentTime = useCurrentTime({ syncWithServer: true })

  if (!endAt) {
    return null
  }

  const hasEnded = DateTime.fromISO(endAt) < DateTime.fromISO(currentTime)

  return (
    <Box my={[2, 0]}>
      {hasEnded ? (
        <Text variant={["lg", "xl"]}>Closed</Text>
      ) : (
        <>
          <Text variant={["md", "xl"]}>Closes in:</Text>
          <Timer endDate={endAt} variant={["lg", "xl"]} alignItems="start" />
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
