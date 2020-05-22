import { Box, Col, Grid, Row } from "@artsy/palette"
import { AnalyticsSchema } from "v2/Artsy"
import React from "react"
import { FeaturedContentLink, FeaturedLinkType } from "./Feature"

interface FeaturedThisWeekProps {
  featured_item_1: FeaturedLinkType
  featured_item_2: FeaturedLinkType
}

export const FeaturedThisWeek: React.FC<FeaturedThisWeekProps> = props => {
  const { featured_item_1, featured_item_2 } = props

  return (
    <Grid fluid>
      <Row>
        <Col md="6">
          <Box
            pr={[0, 0, 1]}
            mb={[3, 3, 0]}
            maxWidth="470px"
            mr="auto"
            ml="auto"
          >
            <FeaturedContentLink
              key={`featured-content-link-1`}
              size="large"
              contextModule={AnalyticsSchema.ContextModule.FeaturedThisWeek}
              {...featured_item_1}
            />
          </Box>
        </Col>
        <Col md="6">
          <Box pl={[0, 0, 1]} maxWidth="470px" mr="auto" ml="auto">
            <FeaturedContentLink
              key={`featured-content-link-2`}
              size="large"
              contextModule={AnalyticsSchema.ContextModule.FeaturedThisWeek}
              {...featured_item_2}
            />
          </Box>
        </Col>
      </Row>
    </Grid>
  )
}
