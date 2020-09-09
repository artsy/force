import {
  Box,
  Flex,
  Image,
  Link,
  Sans,
  Serif,
  WebImageProps,
  color,
} from "@artsy/palette"
import { RelatedCollectionEntity_collection } from "v2/__generated__/RelatedCollectionEntity_collection.graphql"
import { useTracking } from "v2/Artsy/Analytics"
import currency from "currency.js"
import { compact } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { get } from "v2/Utils/get"
import { ContextModule, clickedCollectionGroup } from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"

export interface CollectionProps {
  collection: RelatedCollectionEntity_collection
  lazyLoad?: boolean
  slideIndex: number
}

export const RelatedCollectionEntity: React.FC<CollectionProps> = ({
  lazyLoad,
  collection,
  slideIndex,
}) => {
  const {
    artworksConnection,
    headerImage,
    price_guidance,
    id,
    slug,
    title,
  } = collection
  const artworks = artworksConnection.edges.map(({ node }) => node)
  const bgImages = compact(
    artworks.map(({ image }) => image && image.resized && image.resized.url)
  )
  const imageSize =
    bgImages.length === 1 ? 262 : bgImages.length === 2 ? 130 : 86
  const { trackEvent } = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const onLinkClick = () => {
    trackEvent(
      clickedCollectionGroup({
        contextModule: ContextModule.relatedCollectionsRail,
        contextPageOwnerId,
        contextPageOwnerSlug,
        contextPageOwnerType,
        destinationPageOwnerId: id,
        destinationPageOwnerSlug: slug,
        horizontalSlidePosition: slideIndex,
      })
    )
  }

  return (
    <Box>
      <StyledLink
        href={`${sd.APP_URL}/collection/${slug}`}
        onClick={onLinkClick}
      >
        <ImgWrapper pb={1}>
          {bgImages.length ? (
            bgImages.map((url, i) => {
              const artistName = get(artworks[i].artist, a => a.name)
              const alt = `${artistName ? artistName + ", " : ""}${
                artworks[i].title
              }`
              return (
                <SingleImgContainer key={i}>
                  <ImgOverlay width={imageSize} />
                  <ArtworkImage
                    key={i}
                    src={url}
                    width={imageSize}
                    alt={alt}
                    lazyLoad={lazyLoad}
                  />
                </SingleImgContainer>
              )
            })
          ) : (
            <ArtworkImage src={headerImage} alt={title} width={262} />
          )}
        </ImgWrapper>
        <CollectionTitle size="3">{title}</CollectionTitle>
        {price_guidance && (
          <Sans size="2" color="black60">
            From $
            {currency(price_guidance, {
              separator: ",",
              precision: 0,
            }).format()}
          </Sans>
        )}
      </StyledLink>
    </Box>
  )
}

const CollectionTitle = styled(Serif)`
  width: max-content;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    text-decoration: none;

    ${CollectionTitle} {
      text-decoration: underline;
    }
  }
`

const SingleImgContainer = styled(Box)`
  position: relative;
  margin-right: 2px;

  &:last-child {
    margin-right: 0;
  }
`

const ImgOverlay = styled(Box)<{ width: number }>`
  height: 125px;
  background-color: ${color("black30")};
  opacity: 0.1;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
`

export const ArtworkImage = styled(Image)<WebImageProps>`
  height: 125px;
  background-color: ${color("black10")};
  object-fit: cover;
  object-position: center;
  opacity: 0.9;
`

const ImgWrapper = styled(Flex)`
  width: 262px;
`

export const RelatedCollectionEntityFragmentContainer = createFragmentContainer(
  RelatedCollectionEntity as React.FC<CollectionProps>,
  {
    collection: graphql`
      fragment RelatedCollectionEntity_collection on MarketingCollection {
        headerImage
        slug
        title
        id
        price_guidance: priceGuidance
        artworksConnection(
          first: 3
          aggregations: [TOTAL]
          sort: "-decayed_merch"
        ) {
          edges {
            node {
              artist {
                name
              }
              title
              image {
                resized(width: 262) {
                  url
                }
              }
            }
          }
        }
      }
    `,
  }
)
