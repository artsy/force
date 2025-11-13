import { useCurrentTime } from "Utils/Hooks/useCurrentTime"
import { useEventTiming } from "Utils/Hooks/useEventTiming"
import { Text, type TextProps } from "@artsy/palette"
import type { ShowsShowDates_show$data } from "__generated__/ShowsShowDates_show.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ShowsShowDatesProps extends TextProps {
  show: ShowsShowDates_show$data
}

const ShowsShowDates: React.FC<
  React.PropsWithChildren<ShowsShowDatesProps>
> = ({ show, ...rest }) => {
  const { formattedTime, closesSoon, closesToday, hasEnded } = useEventTiming({
    currentTime: useCurrentTime(),
    startAt: show.startAt!,
    endAt: show.endAt!,
  })

  const formattedDates = [show.formattedStartAt, show.formattedEndAt]
    .filter(Boolean)
    .join("–")

  const formattedString = [show.location?.city, formattedTime ?? formattedDates]
    .filter(Boolean)
    .join(", ")

  // TODO: Online Exclusive

  return (
    <Text
      color={closesSoon || closesToday || hasEnded ? "red100" : "mono60"}
      {...rest}
    >
      {formattedString}
    </Text>
  )
}

export const ShowsShowDatesFragmentContainer = createFragmentContainer(
  ShowsShowDates,
  {
    show: graphql`
      fragment ShowsShowDates_show on Show {
        startAt
        endAt
        formattedStartAt: startAt(format: "MMM D")
        formattedEndAt: endAt(format: "MMM D")
        location {
          city
        }
      }
    `,
  }
)
