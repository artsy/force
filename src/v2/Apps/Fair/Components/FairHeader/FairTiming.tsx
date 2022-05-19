import * as React from "react"
import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairTiming_fair } from "v2/__generated__/FairTiming_fair.graphql"
import { EventTiming } from "v2/Components/EventTiming"
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
      <Text variant={["lg-display", "xl"]} color="black60" mb={1}>
        {exhibitionPeriod}
      </Text>
      <Text variant={["sm-display", "lg-display"]}>{renderEventTiming()}</Text>
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
