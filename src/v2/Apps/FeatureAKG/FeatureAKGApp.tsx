import { Col, Row, Separator } from "@artsy/palette"
import { FeatureAKGApp_viewer } from "v2/__generated__/FeatureAKGApp_viewer.graphql"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import React from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureFragmentContainer as Feature } from "./Components/Feature"

interface FeatureAKGAppProps {
  viewer: FeatureAKGApp_viewer
}

export const FeatureAKGApp: React.FC<FeatureAKGAppProps> = props => {
  return (
    <AppContainer>
      <Title>Art Keeps Going</Title>
      <Feature viewer={props.viewer} />
      <Separator mt={6} mb={3} />
      <Row>
        <Col>
          <HorizontalPadding>
            <Footer />
          </HorizontalPadding>
        </Col>
      </Row>
    </AppContainer>
  )
}

export const FeatureAKGAppFragmentContainer = createFragmentContainer(
  FeatureAKGApp,
  {
    viewer: graphql`
      fragment FeatureAKGApp_viewer on Viewer
        @argumentDefinitions(
          articleIDs: { type: "[String]!" }
          selectedWorksSetID: { type: "String!" }
          collectionRailItemIDs: { type: "[String!]" }
          auctionRailItemIDs: { type: "[String!]" }
          fairRailItemIDs: { type: "[String!]" }
          hasCollectionRailItems: { type: "Boolean!" }
          hasAuctionRailItems: { type: "Boolean!" }
          hasFairRailItems: { type: "Boolean!" }
        ) {
        ...Feature_viewer
          @arguments(
            articleIDs: $articleIDs
            selectedWorksSetID: $selectedWorksSetID
            collectionRailItemIDs: $collectionRailItemIDs
            auctionRailItemIDs: $auctionRailItemIDs
            fairRailItemIDs: $fairRailItemIDs
            hasCollectionRailItems: $hasCollectionRailItems
            hasAuctionRailItems: $hasAuctionRailItems
            hasFairRailItems: $hasFairRailItems
          )
      }
    `,
  }
)

export default FeatureAKGAppFragmentContainer
