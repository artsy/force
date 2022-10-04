import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import { extractNodes } from "Utils/extractNodes"
import { useStableShuffle } from "Utils/Hooks/useStableShuffle"
import { PartnersFeaturedCarousel_viewer$data } from "__generated__/PartnersFeaturedCarousel_viewer.graphql"
import { PartnersFeaturedCarouselCellFragmentContainer } from "./PartnersFeaturedCarouselCell"

interface PartnersFeaturedCarouselProps {
  viewer: PartnersFeaturedCarousel_viewer$data
}

const PartnersFeaturedCarousel: FC<PartnersFeaturedCarouselProps> = ({
  viewer,
}) => {
  const profiles = extractNodes(viewer.orderedSet?.orderedItemsConnection)
  const { shuffled } = useStableShuffle({ items: profiles })

  return (
    <HeroCarousel fullBleed={false}>
      {shuffled.map(profile => {
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
