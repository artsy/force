import { Box, Image, Sans, Spacer } from "@artsy/palette"
import { FeaturedRails_viewer } from "v2/__generated__/FeaturedRails_viewer.graphql"
import { StyledLink } from "../StyledLink"
import { FeaturedAuctionsRailFragmentContainer as FeaturedAuctions } from "v2/Apps/FeatureAKG/Components/FeaturedRails/FeaturedAuctions"
import { FeaturedCollectionsRailFragmentContainer as FeaturedCollections } from "v2/Apps/FeatureAKG/Components/FeaturedRails/FeaturedCollections"
import { FeaturedFairsRailFragmentContainer as FeaturedFairs } from "v2/Apps/FeatureAKG/Components/FeaturedRails/FeaturedFairs"
import { AnalyticsSchema, ContextModule } from "v2/System"
import { useTracking } from "v2/System/Analytics/useTracking"
import { Carousel } from "v2/Components/Carousel"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { crop } from "v2/Utils/resizer"

interface FeaturedRailsProps {
  viewer: FeaturedRails_viewer
  collections_rail: RailMetadata
  auctions_rail: RailMetadata
  fairs_rail: RailMetadata
}

const FeaturedRails: React.FC<FeaturedRailsProps> = props => {
  const hasCollectionsRail = !!props.collections_rail?.items?.length
  const hasAuctionsRail = !!props.auctions_rail?.items?.length
  const hasFairsRail = !!props.fairs_rail?.items?.length

  return (
    <Box>
      {hasCollectionsRail && (
        <>
          <FeaturedCollections
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            collections={props.viewer.collections}
            railMetadata={props.collections_rail}
          />
          <Spacer pb={3} />
        </>
      )}

      {hasAuctionsRail && (
        <>
          <FeaturedAuctions
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            auctions={props.viewer.auctions}
            railMetadata={props.auctions_rail}
          />
          <Spacer pb={3} />
        </>
      )}

      {hasFairsRail && (
        <>
          <FeaturedFairs
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            fairs={props.viewer.fairs}
            railMetadata={props.fairs_rail}
          />
          <Spacer pb={3} />
        </>
      )}
    </Box>
  )
}

export const FeaturedRailsFragmentContainer = createFragmentContainer(
  FeaturedRails,
  {
    viewer: graphql`
      fragment FeaturedRails_viewer on Viewer
        @argumentDefinitions(
          collectionRailItemIDs: { type: "[String!]" }
          auctionRailItemIDs: { type: "[String!]" }
          fairRailItemIDs: { type: "[String!]" }
          hasCollectionRailItems: { type: "Boolean!" }
          hasAuctionRailItems: { type: "Boolean!" }
          hasFairRailItems: { type: "Boolean!" }
        ) {
        collections: marketingCollections(slugs: $collectionRailItemIDs)
          @include(if: $hasCollectionRailItems) {
          ...FeaturedCollections_collections
        }
        auctions: salesConnection(first: 50, ids: $auctionRailItemIDs)
          @include(if: $hasAuctionRailItems) {
          ...FeaturedAuctions_auctions
        }
        fairs: fairs(ids: $fairRailItemIDs) @include(if: $hasFairRailItems) {
          ...FeaturedFairs_fairs
        }
      }
    `,
  }
)

export interface RailMetadata {
  title: string
  subtitle: string
  items: [{ image_src: string; id: string }]
}

interface FeaturedRailProps {
  title: string
  subtitle: string
}

export const FeaturedRail: React.FC<FeaturedRailProps> = props => {
  const { children, title, subtitle } = props

  return (
    <Box>
      <Box mb={1}>
        {title && <Sans size="4">{title}</Sans>}
        {subtitle && (
          <Sans size="2" color="black60">
            {subtitle}
          </Sans>
        )}
      </Box>
      {children}
    </Box>
  )
}

interface FeaturedRailCarouselProps {
  itemsForCarousel: Array<{
    imageSrc: string
    title: string
    subtitle: string
    href: string
  }>
  contextModule: ContextModule
}

export const FeaturedRailCarousel: React.FC<FeaturedRailCarouselProps> = props => {
  const { itemsForCarousel } = props
  const devicePixelRatio = 2
  const imgWidth = 245
  const imgHeight = 270

  const tracking = useTracking()

  return (
    <Carousel>
      {itemsForCarousel.map(item => {
        const croppedImageUrl = crop(item.imageSrc, {
          width: imgWidth * devicePixelRatio,
          height: imgHeight * devicePixelRatio,
          convert_to: "jpg",
        })

        return (
          <Box key={item.href} maxWidth={245} overflow="hidden">
            <StyledLink
              to={item.href}
              onClick={() => {
                tracking.trackEvent({
                  action_type: AnalyticsSchema.ActionType.Click,
                  context_module: props.contextModule,
                  destination_path: item.href,
                })
              }}
            >
              <Image
                lazyLoad
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                src={croppedImageUrl}
                width={imgWidth}
                height={imgHeight}
                alt={item.title}
              />
              <Sans size="2" weight="medium" mt={1}>
                {item.title}
              </Sans>
              <Sans size="2">{item.subtitle}</Sans>
            </StyledLink>
          </Box>
        )
      })}
    </Carousel>
  )
}
