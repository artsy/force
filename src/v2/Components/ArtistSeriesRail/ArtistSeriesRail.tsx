import { Box, Sans } from "@artsy/palette"
import { ArrowButton, Carousel } from "v2/Components/Carousel"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { getENV } from "v2/Utils/getENV"
import { ArtistSeriesRail_artist } from "v2/__generated__/ArtistSeriesRail_artist.graphql"
import { ArtistSeriesItemFragmentContainer as ArtistSeriesItem } from "./ArtistSeriesItem"

interface Props {
  artist: ArtistSeriesRail_artist
}

const ArtistSeriesRail: React.SFC<Props> = props => {
  const isMobile = getENV("IS_MOBILE") === true
  const { artist } = props

  if (!artist) return null

  const { artistSeriesConnection } = artist
  const edges = artistSeriesConnection && artistSeriesConnection.edges

  if (edges && edges.length) {
    return (
      <Box my={3}>
        <Sans size="4" color="black100" my={1}>
          More series by this artist
        </Sans>

        <Box mx={[-20, 0]}>
          <Carousel
            height={200}
            options={{
              pageDots: false,
            }}
            data={edges}
            render={(slide, index: number) => {
              const { node } = slide
              return (
                <Box ml={isMobile && index === 0 ? 2 : 0}>
                  <ArtistSeriesItem lazyLoad={index > 5} artistSeries={node} />
                </Box>
              )
            }}
            renderLeftArrow={({ Arrow }) => {
              return (
                <ArrowContainer>
                  <Arrow />
                </ArrowContainer>
              )
            }}
            renderRightArrow={({ Arrow }) => {
              return (
                <ArrowContainer>{edges.length > 4 && <Arrow />}</ArrowContainer>
              )
            }}
          />
        </Box>
      </Box>
    )
  } else {
    return null
  }
}

const ArrowContainer = styled(Box)`
  align-self: flex-start;

  ${ArrowButton} {
    height: 80%;
  }
`

export const ArtistSeriesRailFragmentContainer = createFragmentContainer(
  ArtistSeriesRail,
  {
    artist: graphql`
      fragment ArtistSeriesRail_artist on Artist {
        artistSeriesConnection {
          edges {
            node {
              internalID
              ...ArtistSeriesItem_artistSeries
            }
          }
        }
      }
    `,
  }
)
