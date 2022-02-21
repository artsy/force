import { Col, Row } from "@artsy/palette"
import { FeatureAKGApp_viewer$data } from "v2/__generated__/FeatureAKGApp_viewer.graphql"
import { Footer } from "v2/Components/Footer"
import * as React from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureFragmentContainer as Feature } from "./Components/Feature"

interface FeatureAKGAppProps {
  viewer: FeatureAKGApp_viewer$data
}

export const FeatureAKGApp: React.FC<FeatureAKGAppProps> = props => {
  return (
    <>
      <Title>Art Keeps Going</Title>
      <Feature viewer={props.viewer} />
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </>
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
