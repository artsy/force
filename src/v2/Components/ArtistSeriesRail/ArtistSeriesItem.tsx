import { Box, Image, Sans, Spacer, color } from "@artsy/palette"
import { ArtistSeriesItem_artistSeries } from "v2/__generated__/ArtistSeriesItem_artistSeries.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface Props {
  artistSeries: ArtistSeriesItem_artistSeries
  lazyLoad: boolean
}

export const ArtistSeriesItem: React.SFC<Props> = props => {
  const {
    artistSeries: { slug, title, image, artworksCountMessage },
    lazyLoad,
  } = props

  return (
    <Box border="1px solid" borderColor="black10" borderRadius="2px">
      <StyledLink to={`/artist-series/${slug}`}>
        <SeriesImage
          src={image.cropped.url}
          alt={title}
          lazyLoad={lazyLoad}
          width={160}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <Box my={1} mx={2}>
          <SeriesTitle size={"3"}>{title}</SeriesTitle>
          <Spacer />
          <Sans size={"3"} color={"black60"}>
            {artworksCountMessage}
          </Sans>
        </Box>
      </StyledLink>
    </Box>
  )
}

const SeriesTitle = styled(Sans)`
  width: max-content;
`

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    text-decoration: none;
  }
`

export const SeriesImage = styled(Image)<{ width: number }>`
  width: ${({ width }) => width}px;
  height: 160px;
  background-color: ${color("black10")};
  opacity: 0.9;
`

export const ArtistSeriesItemFragmentContainer = createFragmentContainer(
  ArtistSeriesItem,
  {
    artistSeries: graphql`
      fragment ArtistSeriesItem_artistSeries on ArtistSeries {
        title
        slug
        artworksCountMessage
        image {
          # Fetch double the px for retina display
          cropped(width: 320, height: 320) {
            url
          }
        }
      }
    `,
  }
)
