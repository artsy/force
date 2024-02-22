import * as React from "react"
import { Box, BoxProps, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowInfoLocation_show$data } from "__generated__/ShowInfoLocation_show.graphql"

interface ShowInfoLocationProps extends BoxProps {
  show: ShowInfoLocation_show$data
}

export const ShowInfoLocation: React.FC<ShowInfoLocationProps> = ({
  show,
  ...rest
}) => {
  const location = show.location ?? show.fair?.location

  const lines = [
    location?.address,
    location?.address2,
    [location?.city, location?.state, location?.country]
      .filter(Boolean)
      .join(", "),
    location?.summary,
  ].filter(Boolean)

  return (
    <Box {...rest}>
      {lines.map((line, i) => (
        <Text variant="sm-display" key={line ?? i}>
          {line}
        </Text>
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
