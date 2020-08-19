import { Col, Grid, Row, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { FairAboveFold_fair } from "v2/__generated__/FairAboveFold_fair.graphql"
import { FairEditorialFragmentContainer as FairEditorial } from "../Components/FairEditorial"
import { FairHeaderFragmentContainer as FairHeader } from "../Components/FairHeader"

interface FairAboveFoldProps {
  fair: FairAboveFold_fair
}

const FairAboveFold: React.FC<FairAboveFoldProps> = ({ fair, children }) => {
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

      <RouteTabs>
        <RouteTab to={`/fair2/${fair.slug}`}>Exhibitors</RouteTab>
        <RouteTab to={`/fair2/${fair.slug}/artworks`}>Artworks</RouteTab>
      </RouteTabs>
    </>
  )
}

export const FairAboveFoldFragmentContainer = createFragmentContainer(
  FairAboveFold,
  {
    fair: graphql`
      fragment FairAboveFold_fair on Fair {
        ...FairHeader_fair
        ...FairEditorial_fair
        slug
        articles: articlesConnection(first: 5, sort: PUBLISHED_AT_DESC) {
          edges {
            __typename
          }
        }
      }
    `,
  }
)
