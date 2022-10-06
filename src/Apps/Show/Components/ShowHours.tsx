import { BoxProps } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowLocationHoursFragmentContainer } from "./ShowLocationHours"
import { ShowHours_show$data } from "__generated__/ShowHours_show.graphql"

export interface ShowHoursProps extends BoxProps {
  show: ShowHours_show$data
}

export const ShowHours: React.FC<ShowHoursProps> = ({ show, ...rest }) => {
  const location = show.location ?? show.fair?.location

  if (!location) {
    return null
  }

  return <ShowLocationHoursFragmentContainer location={location} {...rest} />
}

export const ShowHoursFragmentContainer = createFragmentContainer(ShowHours, {
  show: graphql`
    fragment ShowHours_show on Show {
      location {
        ...ShowLocationHours_location
      }
      fair {
        location {
          ...ShowLocationHours_location
        }
      }
    }
  `,
})
