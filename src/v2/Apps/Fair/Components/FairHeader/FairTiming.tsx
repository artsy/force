import React from "react"
import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairTiming_fair } from "v2/__generated__/FairTiming_fair.graphql"
import { WithCurrentTime } from "v2/Components/WithCurrentTime"
import { EventTiming } from "v2/Components/EventTiming"

interface Props {
  fair: FairTiming_fair
}

const FairTiming: React.FC<Props> = ({
  fair: { exhibitionPeriod, startAt, endAt },
}) => {
  return (
    <>
      <Text variant="xl" color="black60" mb={1}>
        {exhibitionPeriod}
      </Text>

      <Text variant="lg">
        <WithCurrentTime syncWithServer>
          {currentTime => {
            const props = {
              currentTime,
              startAt,
              endAt,
            }
            return <EventTiming {...props} />
          }}
        </WithCurrentTime>
      </Text>
    </>
  )
}

export const FairTimingFragmentContainer = createFragmentContainer(FairTiming, {
  fair: graphql`
    fragment FairTiming_fair on Fair {
      exhibitionPeriod
      startAt
      endAt
    }
  `,
})
