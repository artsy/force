import { Box, Text } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { GlobeMap } from "./Components/GlobeMap"
import { graphql } from "react-relay"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import type { CityGuidesAppQuery } from "__generated__/CityGuidesAppQuery.graphql"

export const CityGuidesApp = () => {
  const { data } = useClientQuery<CityGuidesAppQuery>({
    query: cityGuidesQuery,
  })

  return (
    <>
      <MetaTags title="City Guides | Artsy" pathname="/city-guides" />

      <Box display="flex" flexDirection="column" height="100vh">
        <Box px={4} pt={2} pb={1}>
          <Text variant="xl" mb={2}>
            City Guides
          </Text>
          <Text variant="sm-display" color="black60">
            Discover galleries and art spaces around the world
          </Text>
        </Box>

        <Box flex={1} minHeight={0}>
          <GlobeMap partnersData={data?.partnersConnection} />
        </Box>
      </Box>
    </>
  )
}

const cityGuidesQuery = graphql`
  query CityGuidesAppQuery {
    partnersConnection(first: 1000, defaultProfilePublic: true) {
      edges {
        node {
          internalID
          name
          slug
          locationsConnection(first: 10) {
            edges {
              node {
                internalID
                city
                country
                publiclyViewable
                coordinates {
                  lat
                  lng
                }
              }
            }
          }
        }
      }
    }
  }
`
