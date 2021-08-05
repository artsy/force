import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Text } from "@artsy/palette"
import { Timer } from "v2/Components/Timer"
import { FairOrganizerTiming_fair } from "v2/__generated__/FairOrganizerTiming_fair.graphql"

interface FairOrganizerTimingProps {
  fair: FairOrganizerTiming_fair
}

export const FairOrganizerTiming: React.FC<FairOrganizerTimingProps> = ({
  fair,
}) => {
  const { isActive, startAt, exhibitionPeriod } = fair

  return (
    <>
      <Text variant="xl" color="black60" mb={1}>
        {exhibitionPeriod}
      </Text>

      {!isActive && <Timer size="lg" label="Opens in:" endDate={startAt!} />}
    </>
  )
}

export const FairOrganizerTimingFragmentContainer = createFragmentContainer(
  FairOrganizerTiming,
  {
    fair: graphql`
      fragment FairOrganizerTiming_fair on Fair {
        startAt
        isActive
        exhibitionPeriod
      }
    `,
  }
)
