import { Box, Flex, Image, Sans, color } from "@artsy/palette"
import { ArtistCollectionEntity_collection } from "v2/__generated__/ArtistCollectionEntity_collection.graphql"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import currency from "currency.js"
import { compact } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { get } from "v2/Utils/get"

export interface CollectionProps {
  collection: ArtistCollectionEntity_collection
  lazyLoad: boolean
}

@track()
export class ArtistCollectionEntity extends React.Component<CollectionProps> {
  @track<CollectionProps>(({ collection }) => ({
    action_type: Schema.ActionType.Click,
    context_module: Schema.ContextModule.CollectionsRail,
    context_page_owner_type: Schema.OwnerType.Artist,
    destination_path: `${sd.APP_URL}/collection/${collection.slug}`,
    type: Schema.Type.Thumbnail,
  }))
  onLinkClick() {
    // noop
  }

  render() {
    const {
      headerImage,
      price_guidance,
      slug,
      title,
      artworksConnection,
    } = this.props.collection
    const artworks = get(artworksConnection, ac =>
      ac.edges.map(({ node }) => node)
    )

    if (!artworks) {
      return null
    }

    const formattedTitle = (title && title.split(": ")[1]) || title
    const bgImages = compact(
      artworks.map(({ image }) => image && image.resized && image.resized.url)
    )
    const imageSize =
      bgImages.length === 1 ? 262 : bgImages.length === 2 ? 130 : 86

    return (
      <Box>
        <StyledLink
          to={`/collection/${slug}`}
          onClick={this.onLinkClick.bind(this)}
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
                      lazyLoad={this.props.lazyLoad}
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </SingleImgContainer>
                )
              })
            ) : (
              <ArtworkImage
                src={headerImage}
                alt={formattedTitle}
                lazyLoad={this.props.lazyLoad}
                width={262}
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            )}
          </ImgWrapper>

          <CollectionTitle size="3">{formattedTitle}</CollectionTitle>
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
}

const CollectionTitle = styled(Sans)`
  width: max-content;
`

const StyledLink = styled(RouterLink)`
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

export const ArtworkImage = styled(Image)<{ width: number }>`
  width: ${({ width }) => width}px;
  height: 125px;
  background-color: ${color("black10")};
  opacity: 0.9;
`

const ImgWrapper = styled(Flex)`
  width: 262px;
`

export const ArtistCollectionEntityFragmentContainer = createFragmentContainer(
  ArtistCollectionEntity,
  {
    collection: graphql`
      fragment ArtistCollectionEntity_collection on MarketingCollection {
        headerImage
        slug
        title
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
