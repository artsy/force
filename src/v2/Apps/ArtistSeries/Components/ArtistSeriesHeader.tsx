import React from "react"
import { Box, Col, Flex, Grid, Row, Sans } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtistSeriesHeader_artistSeries } from "v2/__generated__/ArtistSeriesHeader_artistSeries.graphql"

interface ArtistSeriesHeaderProps {
  artistSeries: ArtistSeriesHeader_artistSeries
}

const ArtistSeriesHeader: React.FC<ArtistSeriesHeaderProps> = props => {
  return (
    <>
      <Media greaterThanOrEqual="sm">
        <ArtistSeriesHeaderLarge {...props} />
      </Media>
    </>
  )
}

const ArtistSeriesHeaderLarge: React.FC<ArtistSeriesHeaderProps> = props => {
  const {
    artistSeries: { title, description },
  } = props
  return (
    <Box>
      <Grid>
        <Row>
          <Col sm={6}>
            <Flex
              height="100%"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Sans size="8">{title}</Sans>
              <Sans size="3t">{description}</Sans>
            </Flex>
          </Col>
          <Col sm={6}>
            <Box bg="black10" width={1} height={400}></Box>
          </Col>
        </Row>
      </Grid>
    </Box>
  )
}

export const ArtistSeriesHeaderFragmentContainer = createFragmentContainer(
  ArtistSeriesHeader,
  {
    artistSeries: graphql`
      fragment ArtistSeriesHeader_artistSeries on ArtistSeries {
        title
        description
      }
    `,
  }
)
