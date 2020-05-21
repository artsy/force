import { Box, color, Flex, Sans, Serif } from "@artsy/palette"
import { ArtistSeriesEntity_member } from "v2/__generated__/ArtistSeriesEntity_member.graphql"
import { AnalyticsSchema } from "v2/Artsy/Analytics"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Truncator } from "v2/Components/Truncator"
import currency from "currency.js"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { get } from "v2/Utils/get"

export interface ArtistSeriesEntityProps {
  member: ArtistSeriesEntity_member
  itemNumber: number
}

export const ArtistSeriesEntity: React.FC<ArtistSeriesEntityProps> = ({
  member,
  itemNumber,
}) => {
  const {
    headerImage,
    artworksConnection,
    price_guidance,
    slug,
    title,
  } = member
  const artworks = artworksConnection.edges.map(({ node }) => node)
  const bgImages = artworks.map(({ image }) => image && image.url)
  const imageSize =
    bgImages!.length === 1 ? 221 : bgImages!.length === 2 ? 109 : 72

  const { trackEvent } = useTracking()

  const handleLinkClick = () => {
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_page: AnalyticsSchema.PageName.CollectionPage,
      context_module: AnalyticsSchema.ContextModule.ArtistCollectionsRail,
      context_page_owner_type: AnalyticsSchema.OwnerType.Collection,
      type: AnalyticsSchema.Type.Thumbnail,
      destination_path: `${sd.APP_URL}/collection/${slug}`,
      item_number: itemNumber,
    })
  }

  return (
    <Container px={2} pt={2} pb={2} m={1}>
      <StyledLink to={`/collection/${slug}`} onClick={handleLinkClick}>
        <ImgWrapper>
          {bgImages!.length
            ? bgImages.map((url, i) => {
              const hit = artworks![i]
              const artistName = get(hit!.artist, a => a!.name)
              const alt = `${artistName ? artistName + ", " : ""}${
                hit!.title
                }`
              return (
                <SingleImgContainer key={i}>
                  <ImgOverlay width={imageSize} />
                  {url && (
                    <ArtworkImage
                      key={i}
                      src={url}
                      width={imageSize}
                      alt={alt}
                    />
                  )}
                </SingleImgContainer>
              )
            })
            : headerImage && <ArtworkImage src={headerImage} width={221} />}
        </ImgWrapper>
        {
          <CollectionTitle pt={1} pb={0.5} size="3">
            <Truncator maxLineCount={1}>{title}</Truncator>
          </CollectionTitle>
        }
        {price_guidance && (
          <Sans size="2" color="black60" pb={1}>
            From $
            {currency(price_guidance, {
              separator: ",",
              precision: 0,
            }).format()}
          </Sans>
        )}
      </StyledLink>
    </Container>
  )
}

export const ArtworkImage = styled.img<{ width: number }>`
  width: ${({ width }) => width}px;
  height: 125px;
  background-color: ${color("black10")};
  object-fit: cover;
  object-position: center;
  opacity: 0.9;
`

const ImgOverlay = styled(Box) <{ width: number }>`
  height: 125px;
  background-color: ${color("black30")};
  opacity: 0.1;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
`

export const Container = styled(Box)`
  border: 1px solid ${color("black10")};
  border-radius: 2px;

  &:hover {
    text-decoration: none;
    border: 1px solid ${color("black60")};
  }
`

const SingleImgContainer = styled(Box)`
  position: relative;
  margin-right: 2px;

  &:last-child {
    margin-right: 0;
  }
`

const CollectionTitle = styled(Serif)`
  width: 100%;
`

export const ImgWrapper = styled(Flex)`
  width: 221px;
`

export const StyledLink = styled(RouterLink)`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    text-decoration: none;
  }
`

export const ArtistSeriesRailContainer = createFragmentContainer(
  ArtistSeriesEntity,
  {
    member: graphql`
      fragment ArtistSeriesEntity_member on MarketingCollection {
        slug
        headerImage
        thumbnail
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
                url(version: "small")
              }
            }
          }
        }
      }
    `,
  }
)
