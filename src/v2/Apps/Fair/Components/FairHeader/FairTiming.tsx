import React from "react"
import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairTiming_fair } from "v2/__generated__/FairTiming_fair.graphql"
import { EventTiming } from "v2/Components/EventTiming"
import { Media } from "v2/Utils/Responsive"
import { useCurrentTime } from "v2/Utils/Hooks/useCurrentTime"

interface Props {
  fair: FairTiming_fair
}

const FairTiming: React.FC<Props> = ({
  fair: { exhibitionPeriod, startAt, endAt },
}) => {
  const currentTime = useCurrentTime({ syncWithServer: true })

  const renderEventTiming = () =>
    startAt &&
    endAt && (
      <EventTiming currentTime={currentTime} startAt={startAt} endAt={endAt} />
    )

  return (
    <>
      {/* Desktop Fair Timing */}
      <Media greaterThan="xs">
        <Text variant="xl" color="black60" mb={1}>
          {exhibitionPeriod}
        </Text>
        <Text variant="lg">{renderEventTiming()}</Text>
      </Media>

      {/* Mobile Fair Timing */}
      <Media at="xs">
        <Text variant="lg" color="black60" mb={1}>
          {exhibitionPeriod}
        </Text>
        <Text variant="md">{renderEventTiming()}</Text>
      </Media>
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
