import { useCurrentTime } from "Utils/Hooks/useCurrentTime"
import { useEventTiming } from "Utils/Hooks/useEventTiming"
import { Box, type BoxProps, Join, Spacer, Text } from "@artsy/palette"
import type { ShowHeader_show$data } from "__generated__/ShowHeader_show.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowContextualLinkFragmentContainer } from "./ShowContextualLink"

interface ShowHeaderProps extends BoxProps {
  show: ShowHeader_show$data
}
export const ShowHeader: React.FC<React.PropsWithChildren<ShowHeaderProps>> = ({
  show,
  ...rest
}) => {
  const { name, startAt, endAt, formattedStartAt, formattedEndAt } = show

  const currentTime = useCurrentTime({ syncWithServer: true })
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const { formattedTime } = useEventTiming({ currentTime, startAt, endAt })

  return (
    <Box {...rest}>
      <Join separator={<Spacer y={1} />}>
        <Text variant="xs">Show</Text>

        <Box>
          <Text as="h1" variant="xl" hyphenate>
            {name}
          </Text>

          <Text variant="xl" color="mono60">
            {formattedStartAt} – {formattedEndAt}
          </Text>
        </Box>

        <Text variant="lg-display">{formattedTime}</Text>

        <Box mt={[1, 0]}>
          <ShowContextualLinkFragmentContainer show={show} />
        </Box>
      </Join>
    </Box>
  )
}
export const ShowHeaderFragmentContainer = createFragmentContainer(ShowHeader, {
  show: graphql`
    fragment ShowHeader_show on Show {
      name
      startAt
      endAt
      status
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

      ...ShowContextualLink_show
    }
  `,
})
