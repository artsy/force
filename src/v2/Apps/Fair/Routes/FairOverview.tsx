import { Col, Grid, Row, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairOverview_fair } from "v2/__generated__/FairOverview_fair.graphql"
import { FairEditorialFragmentContainer as FairEditorial } from "../Components/FairEditorial"
import { FairHeaderFragmentContainer as FairHeader } from "../Components/FairHeader"

interface FairOverviewProps {
  fair: FairOverview_fair
}

const FairOverview: React.FC<FairOverviewProps> = ({ fair }) => {
  return (
    <>
      <FairHeader fair={fair} />

      {fair.articles.edges.length > 0 && (
        <Grid mt={3} pt={3} borderTop="1px solid" borderColor="black10">
          <Row>
            <Col sm="6" mx="auto">
              <Text variant="subtitle" as="h3" mb={2}>
                Coverage by Artsy Editorial
              </Text>

              <FairEditorial fair={fair} />
            </Col>
          </Row>
        </Grid>
      )}
    </>
  )
}

export const FairOverviewFragmentContainer = createFragmentContainer(
  FairOverview,
  {
    fair: graphql`
      fragment FairOverview_fair on Fair {
        ...FairHeader_fair
        ...FairEditorial_fair
        articles: articlesConnection(first: 5, sort: PUBLISHED_AT_DESC) {
          edges {
            __typename
          }
        }
      }
    `,
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default FairOverviewFragmentContainer
