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
import { MetaTags } from "Components/MetaTags"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { InstitutionsRoute_viewer$data } from "__generated__/InstitutionsRoute_viewer.graphql"
import { PartnersFeaturedCarouselFragmentContainer } from "Apps/Partners/Components/PartnersFeaturedCarousel"
import { PartnersFilteredCellsQueryRenderer } from "Apps/Partners/Components/PartnersFilteredCells"
import { PartnersFilters } from "Apps/Partners/Components/PartnersFilters"
import { PartnersRailsQueryRenderer } from "Apps/Partners/Components/PartnersRails"

interface InstitutionsRouteProps {
  viewer: InstitutionsRoute_viewer$data
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
        pathname="institutions"
      />

      <Join separator={<Spacer y={4} />}>
        <PartnersFeaturedCarouselFragmentContainer viewer={viewer} />

        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="xl" as="h1">
            Browse Museums and Institutions
          </Text>

          <Text
            variant="sm-display"
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
            <Text variant="lg-display" mb={2}>
              Interested in Listing Your Museum on Artsy?
            </Text>

            <Button
              variant="secondaryBlack"
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
