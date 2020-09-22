import { Box, Flex, Text, color } from "@artsy/palette"
import { ArtistSeriesEntity_member } from "v2/__generated__/ArtistSeriesEntity_member.graphql"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Truncator } from "v2/Components/Truncator"
import currency from "currency.js"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { get } from "v2/Utils/get"
import { ContextModule, clickedArtistSeriesGroup } from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"

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
    id,
    title,
  } = member
  const artworks = artworksConnection.edges.map(({ node }) => node)
  const bgImages = artworks.map(({ image }) => image && image.url)
  const imageSize =
    bgImages!.length === 1 ? 221 : bgImages!.length === 2 ? 109 : 72

  const { trackEvent } = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const handleLinkClick = () => {
    trackEvent(
      clickedArtistSeriesGroup({
        contextModule: ContextModule.artistSeriesRail,
        contextPageOwnerId,
        contextPageOwnerSlug,
        contextPageOwnerType,
        destinationPageOwnerId: id,
        destinationPageOwnerSlug: slug,
        horizontalSlidePosition: itemNumber,
      })
    )
  }

  return (
    <Container px={2} pt={2} pb={2}>
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
        <Text variant="text" pt={2}>
          <Truncator maxLineCount={1}>{title}</Truncator>
        </Text>
        {price_guidance && (
          <Text variant="small" color="black60" pb={1}>
            From $
            {currency(price_guidance, {
              separator: ",",
              precision: 0,
            }).format()}
          </Text>
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

const ImgOverlay = styled(Box)<{ width: number }>`
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
  ArtistSeriesEntity as React.FC<ArtistSeriesEntityProps>,
  {
    member: graphql`
      fragment ArtistSeriesEntity_member on MarketingCollection {
        id
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
