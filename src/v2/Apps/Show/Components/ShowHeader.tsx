import React from "react"
import { Box, BoxProps, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowHeader_show } from "v2/__generated__/ShowHeader_show.graphql"
import { useCurrentTime } from "v2/Utils/Hooks/useCurrentTime"
import { useEventTiming } from "v2/Utils/Hooks/useEventTiming"

interface ShowHeaderProps extends BoxProps {
  show: ShowHeader_show
}
export const ShowHeader: React.FC<ShowHeaderProps> = ({
  show: { name, startAt, endAt, formattedStartAt, formattedEndAt, partner },
  ...rest
}) => {
  const currentTime = useCurrentTime({ syncWithServer: true })
  const { formattedTime } = useEventTiming({ currentTime, startAt, endAt })

  return (
    <Box {...rest}>
      <Text as="h1" variant="largeTitle" mb={1.5}>
        {name}
      </Text>

      <Text variant="mediumText">
        {formattedStartAt} – {formattedEndAt}
      </Text>

      <Text variant="text" color="black60" mb={1}>
        {formattedTime}
      </Text>

      {partner?.name && (
        <Text variant="text" color="black60">
          {partner.name}
        </Text>
      )}
    </Box>
  )
}
export const ShowHeaderFragmentContainer = createFragmentContainer(ShowHeader, {
  show: graphql`
    fragment ShowHeader_show on Show {
      name
      startAt
      endAt
      formattedStartAt: startAt(format: "MMMM D")
      formattedEndAt: endAt(format: "MMMM D, YYYY")
      partner {
        ... on Partner {
          name
        }
        ... on ExternalPartner {
          name
        }
      }
    }
  `,
})
