import React from "react"
import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowInfoLocation_show } from "v2/__generated__/ShowInfoLocation_show.graphql"

interface ShowInfoLocationProps {
  show: ShowInfoLocation_show
}

export const ShowInfoLocation: React.FC<ShowInfoLocationProps> = ({ show }) => {
  // Merge show location and fair location into a single object, favoring show
  const location = Object.entries(show.location).reduce((acc, [key, value]) => {
    return { ...acc, [key]: value ?? show.fair?.location?.[key] }
  }, {} as typeof show.location)

  const lines = [
    location.display,
    location.address,
    location.address2,
    [location.city, location.state, location.country]
      .filter(Boolean)
      .join(", "),
    location.summary,
  ].filter(Boolean)

  return (
    <>
      {lines.map(line => (
        <Text key={line}>{line}</Text>
      ))}
    </>
  )
}

export const ShowInfoLocationFragmentContainer = createFragmentContainer(
  ShowInfoLocation,
  {
    show: graphql`
      fragment ShowInfoLocation_show on Show {
        fair {
          location {
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
