import React from "react"
import { Box, BoxProps, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowInfoLocation_show } from "v2/__generated__/ShowInfoLocation_show.graphql"

interface ShowInfoLocationProps extends BoxProps {
  show: ShowInfoLocation_show
}

export const ShowInfoLocation: React.FC<ShowInfoLocationProps> = ({
  show,
  ...rest
}) => {
  const location = show.location ?? show.fair?.location

  const lines = [
    // @ts-expect-error STRICT_NULL_CHECK
    location.display,
    // @ts-expect-error STRICT_NULL_CHECK
    location.address,
    // @ts-expect-error STRICT_NULL_CHECK
    location.address2,
    // @ts-expect-error STRICT_NULL_CHECK
    [location.city, location.state, location.country]
      .filter(Boolean)
      .join(", "),
    // @ts-expect-error STRICT_NULL_CHECK
    location.summary,
  ].filter(Boolean)

  return (
    <Box {...rest}>
      {lines.map(line => (
        // @ts-expect-error STRICT_NULL_CHECK
        <Text key={line}>{line}</Text>
      ))}
    </Box>
  )
}

export const ShowInfoLocationFragmentContainer = createFragmentContainer(
  ShowInfoLocation,
  {
    show: graphql`
      fragment ShowInfoLocation_show on Show {
        fair {
          location {
            display
            address
            address2
            city
            state
            country
            summary
          }
        }
        location {
          display
          address
          address2
          city
          state
          country
          summary
        }
      }
    `,
  }
)
