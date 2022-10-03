import { ChevronIcon, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { ShowsAllCities_viewer$data } from "__generated__/ShowsAllCities_viewer.graphql"
import { ShowsMeta } from "../Components/ShowsMeta"

interface ShowsAllCitiesProps {
  viewer: ShowsAllCities_viewer$data
}

export const ShowsAllCities: React.FC<ShowsAllCitiesProps> = ({
  viewer: { cities },
}) => {
  return (
    <>
      <ShowsMeta />

      <Text variant="xl" mt={4} mb={2}>
        All Cities
      </Text>

      {cities.map(city => {
        return (
          <RouterLink
            key={city.slug}
            to={`/shows/${city.slug}`}
            textDecoration="none"
            display="flex"
            justifyContent="space-between"
            borderBottom="1px solid"
            borderColor="black10"
            py={2}
          >
            <Text variant="sm-display">{city.name}</Text>

            <ChevronIcon direction="right" color="black60" />
          </RouterLink>
        )
      })}
    </>
  )
}

export const ShowsAllCitiesFragmentContainer = createFragmentContainer(
  ShowsAllCities,
  {
    viewer: graphql`
      fragment ShowsAllCities_viewer on Viewer {
        cities {
          name
          slug
        }
      }
    `,
  }
)
