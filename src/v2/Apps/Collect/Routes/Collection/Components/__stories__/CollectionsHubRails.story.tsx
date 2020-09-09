import { Box } from "@artsy/palette"
import { CollectionsHubRailsStoryQuery } from "v2/__generated__/CollectionsHubRailsStoryQuery.graphql"
import { SystemContext } from "v2/Artsy"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import React, { useContext } from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import styled from "styled-components"
import { CollectionsHubRailsContainer as CollectionsHubRails } from "../CollectionsHubRails"

const RailsContainer = styled(Box)`
  max-width: 1250px;
`

storiesOf("Apps/Collect/Collection/Components", module).add(
  "Collection Hub Rails",
  () => (
    <Box p={1}>
      <RailsContainer width="100%">
        <CollectionHubRailsQueryRenderer collectionID="street-art-now" />
      </RailsContainer>
    </Box>
  )
)

interface Props {
  collectionID: string
}

export const CollectionHubRailsQueryRenderer: React.FC<Props> = ({
  collectionID,
}) => {
  const { relayEnvironment } = useContext(SystemContext)
  if (relayEnvironment) {
    return (
      <QueryRenderer<CollectionsHubRailsStoryQuery>
        environment={relayEnvironment}
        variables={{
          collectionID,
        }}
        query={graphql`
          query CollectionsHubRailsStoryQuery($collectionID: String!) {
            marketingCollection(slug: $collectionID) {
              linkedCollections {
                ...CollectionsHubRails_linkedCollections
              }
            }
          }
        `}
        render={({ props }) => {
          if (props) {
            const { linkedCollections } = props.marketingCollection
            return <CollectionsHubRails linkedCollections={linkedCollections} />
          } else {
            return null
          }
        }}
      />
    )
  } else {
    return null
  }
}
