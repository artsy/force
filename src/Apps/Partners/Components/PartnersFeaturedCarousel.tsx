import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import { extractNodes } from "Utils/extractNodes"
import { useStableShuffle } from "Utils/Hooks/useStableShuffle"
import type { PartnersFeaturedCarousel_viewer$data } from "__generated__/PartnersFeaturedCarousel_viewer.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnersFeaturedCarouselCellFragmentContainer } from "./PartnersFeaturedCarouselCell"

interface PartnersFeaturedCarouselProps {
  viewer: PartnersFeaturedCarousel_viewer$data
}

const PartnersFeaturedCarousel: FC<
  React.PropsWithChildren<PartnersFeaturedCarouselProps>
> = ({ viewer }) => {
  const profiles = extractNodes(viewer.orderedSet?.orderedItemsConnection)
  const { shuffled } = useStableShuffle({ items: profiles })

  return (
    <HeroCarousel fullBleed={false}>
      {shuffled.map((profile, index) => {
        return (
          <PartnersFeaturedCarouselCellFragmentContainer
            key={profile.internalID}
            profile={profile}
            // LCP optimization
            lazyLoad={index > 0}
          />
        )
      })}
    </HeroCarousel>
  )
}

export const PartnersFeaturedCarouselFragmentContainer =
  createFragmentContainer(PartnersFeaturedCarousel, {
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
  })
