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
import { GalleriesRoute_viewer$data } from "__generated__/GalleriesRoute_viewer.graphql"
import { PartnersFilters } from "Apps/Partners/Components/PartnersFilters"
import { PartnersFeaturedCarouselFragmentContainer } from "Apps/Partners/Components/PartnersFeaturedCarousel"
import { PartnersFilteredCellsQueryRenderer } from "Apps/Partners/Components/PartnersFilteredCells"
import { PartnersRailsQueryRenderer } from "Apps/Partners/Components/PartnersRails"
import { useRouter } from "System/Hooks/useRouter"

interface GalleriesRouteProps {
  viewer: GalleriesRoute_viewer$data
}

const GalleriesRoute: React.FC<GalleriesRouteProps> = ({ viewer }) => {
  const {
    match: {
      location: { query },
    },
  } = useRouter()

  return (
    <>
      <MetaTags
        title="Galleries | Artsy"
        description="Browse art and design galleries around the globe by location and specialty and explore artists, artworks, shows, and fair booths."
        pathname="galleries"
      />

      <Join separator={<Spacer y={4} />}>
        <PartnersFeaturedCarouselFragmentContainer viewer={viewer} />

        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDirection={["column", "row"]}
        >
          <Text variant="xl" as="h1">
            Browse Galleries
          </Text>

          <Flex flexShrink={0} mt={[2, 0]}>
            <Text
              variant="sm-display"
              as="a"
              // @ts-ignore
              href="https://partners.artsy.net"
              mr={2}
            >
              Partner with Artsy
            </Text>

            <Text
              variant="sm-display"
              as="a"
              // @ts-ignore
              href="https://partners.artsy.net/gallery-resources/"
            >
              Gallery Insights
            </Text>
          </Flex>
        </Flex>

        <PartnersFilters type="GALLERY" />

        {"category" in query || "near" in query ? (
          <PartnersFilteredCellsQueryRenderer
            type="GALLERY"
            category={query.category}
            near={query.near}
          />
        ) : (
          <PartnersRailsQueryRenderer type="GALLERY" />
        )}

        <Separator />

        <GridColumns>
          <Column span={6} textAlign="center">
            <Text variant="lg-display" mb={2}>
              Interested in Listing Your Gallery on Artsy?
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

          <Column span={6} textAlign="center">
            <Text variant="lg-display" mb={2}>
              Read Artsy Insights for Galleries
            </Text>

            <Button
              variant="secondaryBlack"
              // @ts-ignore
              as="a"
              href="https://partners.artsy.net/"
            >
              Explore
            </Button>
          </Column>
        </GridColumns>
      </Join>
    </>
  )
}

export const GalleriesRouteFragmentContainer = createFragmentContainer(
  GalleriesRoute,
  {
    viewer: graphql`
      fragment GalleriesRoute_viewer on Viewer {
        ...PartnersFeaturedCarousel_viewer
          @arguments(id: "5638fdfb7261690296000031")
      }
    `,
  }
)
