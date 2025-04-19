import { Text } from "@artsy/palette"
import { EventTiming } from "Components/EventTiming"
import { useCurrentTime } from "Utils/Hooks/useCurrentTime"
import type { FairTiming_fair$data } from "__generated__/FairTiming_fair.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  fair: FairTiming_fair$data
}

const FairTiming: React.FC<React.PropsWithChildren<Props>> = ({
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
      <Text variant={["lg-display", "xl"]} color="mono60" mb={1}>
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
