import * as React from "react"
import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairTiming_fair$data } from "__generated__/FairTiming_fair.graphql"
import { EventTiming } from "Components/EventTiming"
import { useCurrentTime } from "Utils/Hooks/useCurrentTime"

interface Props {
  fair: FairTiming_fair$data
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
