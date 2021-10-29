import {
  Button,
  Column,
  GridColumns,
  Join,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { compact } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "v2/Components/MetaTags"
import { GalleriesRoute_viewer } from "v2/__generated__/GalleriesRoute_viewer.graphql"
import { PartnersRailFragmentContainer } from "v2/Apps/Partners/Components/PartnersRail"
import { PartnersFilters } from "../Components/PartnersFilters"
import { PartnersFeaturedCarouselFragmentContainer } from "../Components/PartnersFeaturedCarousel"

interface GalleriesRouteProps {
  viewer: GalleriesRoute_viewer
}

const GalleriesRoute: React.FC<GalleriesRouteProps> = ({ viewer }) => {
  // TODO: In the original implementation these categories are shuffled.
  // We need a way to do SSR-stable shuffle.
  const categories = compact(viewer.partnerCategories)

  return (
    <>
      <MetaTags
        title="Galleries | Artsy"
        description="Browse art and design galleries around the globe by location and specialty and explore artists, artworks, shows, and fair booths."
      />

      <Join separator={<Spacer mt={4} />}>
        <PartnersFeaturedCarouselFragmentContainer viewer={viewer} />

        <PartnersFilters type="GALLERY" />

        {categories.map((partnerCategory, i) => {
          return (
            <PartnersRailFragmentContainer
              key={i}
              partnerCategory={partnerCategory}
            />
          )
        })}

        <Separator />

        <GridColumns>
          <Column span={6} textAlign="center">
            <Text variant="lg" mb={2}>
              Interested in Listing Your Gallery on Artsy?
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

          <Column span={6} textAlign="center">
            <Text variant="lg" mb={2}>
              Read Artsy Insights for Galleries
            </Text>

            <Button
              variant="secondaryOutline"
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
        partnerCategories(categoryType: GALLERY, size: 50, internal: false) {
          name
          slug
          ...PartnersRail_partnerCategory @arguments(type: GALLERY)
        }
      }
    `,
  }
)
