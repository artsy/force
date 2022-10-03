import * as React from "react"
import { Box, BoxProps, HTML, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowLocationHours_location$data } from "__generated__/ShowLocationHours_location.graphql"

interface ShowLocationHoursProps extends BoxProps {
  location: ShowLocationHours_location$data
}

export const ShowLocationHours: React.FC<ShowLocationHoursProps> = ({
  location: { openingHours },
  ...rest
}) => {
  if (!openingHours?.text && !openingHours?.schedules) {
    return null
  }

  if (!!openingHours.text) {
    return (
      <Box {...rest}>
        <HTML variant="sm-display" html={openingHours.text} />
      </Box>
    )
  }

  return (
    <Box {...rest}>
      {(openingHours?.schedules ?? []).map((schedule, i) => {
        if (!schedule) {
          return null
        }

        return (
          <Text variant="sm-display" key={i}>
            {[schedule.days, schedule.hours].filter(Boolean).join(", ")}
          </Text>
        )
      })}
    </Box>
  )
}

export const ShowLocationHoursFragmentContainer = createFragmentContainer(
  ShowLocationHours,
  {
    location: graphql`
      fragment ShowLocationHours_location on Location {
        openingHours {
          ... on OpeningHoursArray {
            schedules {
              days
              hours
            }
          }
          ... on OpeningHoursText {
            text
          }
        }
      }
    `,
  }
)
