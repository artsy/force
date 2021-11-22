import {
  Button,
  Column,
  Flex,
  GridColumns,
  Join,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "v2/Components/MetaTags"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useRouter } from "v2/System/Router/useRouter"
import { InstitutionsRoute_viewer } from "v2/__generated__/InstitutionsRoute_viewer.graphql"
import { PartnersFeaturedCarouselFragmentContainer } from "../Components/PartnersFeaturedCarousel"
import { PartnersFilteredCellsQueryRenderer } from "../Components/PartnersFilteredCells"
import { PartnersFilters } from "../Components/PartnersFilters"
import { PartnersRailsQueryRenderer } from "../Components/PartnersRails"

interface InstitutionsRouteProps {
  viewer: InstitutionsRoute_viewer
}

const InstitutionsRoute: React.FC<InstitutionsRouteProps> = ({ viewer }) => {
  const {
    match: {
      location: { query },
    },
  } = useRouter()

  return (
    <>
      <MetaTags
        title="Institutions | Artsy"
        description="Artsy promotes the collections, shows, and programs of the Louvre, Getty Museum, Robert Rauschenberg Foundation, and 600+ other museums and institutions worldwide."
      />

      <Join separator={<Spacer mt={4} />}>
        <PartnersFeaturedCarouselFragmentContainer viewer={viewer} />

        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="xl">Browse Institutions</Text>

          <Text
            variant="md"
            as={RouterLink}
            // @ts-ignore
            to="/institution-partnerships"
          >
            Partner with Artsy
          </Text>
        </Flex>

        <PartnersFilters type="INSTITUTION" />

        {"category" in query || "near" in query ? (
          <PartnersFilteredCellsQueryRenderer
            type="INSTITUTION"
            category={query.category}
            near={query.near}
          />
        ) : (
          <PartnersRailsQueryRenderer type="INSTITUTION" />
        )}

        <Separator />

        <GridColumns>
          <Column span={6} start={4} textAlign="center">
            <Text variant="lg" mb={2}>
              Interested in Listing Your Museum on Artsy?
            </Text>

            <Button
              variant="secondaryOutline"
              // @ts-ignore
              as="a"
              href="https://partners.artsy.net/"
            >
              Learn more
            </Button>
          </Column>
        </GridColumns>
      </Join>
    </>
  )
}

export const InstitutionsRouteFragmentContainer = createFragmentContainer(
  InstitutionsRoute,
  {
    viewer: graphql`
      fragment InstitutionsRoute_viewer on Viewer {
        ...PartnersFeaturedCarousel_viewer
          @arguments(id: "564e181a258faf3d5c000080")
      }
    `,
  }
)
