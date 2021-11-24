import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HeroCarousel } from "v2/Components/HeroCarousel/HeroCarousel"
import { extractNodes } from "v2/Utils/extractNodes"
import { PartnersFeaturedCarousel_viewer } from "v2/__generated__/PartnersFeaturedCarousel_viewer.graphql"
import { PartnersFeaturedCarouselCellFragmentContainer } from "./PartnersFeaturedCarouselCell"

interface PartnersFeaturedCarouselProps {
  viewer: PartnersFeaturedCarousel_viewer
}

const PartnersFeaturedCarousel: FC<PartnersFeaturedCarouselProps> = ({
  viewer,
}) => {
  const profiles = extractNodes(viewer.orderedSet?.orderedItemsConnection)

  return (
    <HeroCarousel fullBleed={false}>
      {profiles.map(profile => {
        return (
          <PartnersFeaturedCarouselCellFragmentContainer
            key={profile.internalID}
            profile={profile}
          />
        )
      })}
    </HeroCarousel>
  )
}

export const PartnersFeaturedCarouselFragmentContainer = createFragmentContainer(
  PartnersFeaturedCarousel,
  {
    viewer: graphql`
      fragment PartnersFeaturedCarousel_viewer on Viewer
        @argumentDefinitions(id: { type: "String!" }) {
        orderedSet(id: $id) {
          orderedItemsConnection(first: 50) {
            edges {
              node {
                ... on Profile {
                  internalID
                  ...PartnersFeaturedCarouselCell_profile
                }
              }
            }
          }
        }
      }
    `,
  }
)
