import { Theme } from "@artsy/palette"
import { CollectionsHubsNavQuery } from "v2/__generated__/CollectionsHubsNavQuery.graphql"
import { useSystemContext } from "v2/Artsy"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { CollectionsHubsNavFragmentContainer } from "../CollectionsHubsNav"

storiesOf("Components/CollectionsHubsNav", module).add("default", () => (
  <Theme>
    <CollectionsHubsNavQueryRenderer />
  </Theme>
))

const CollectionsHubsNavQueryRenderer = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<CollectionsHubsNavQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query CollectionsHubsNavQuery {
          marketingHubCollections {
            ...CollectionsHubsNav_marketingHubCollections
          }
        }
      `}
      render={renderWithLoadProgress(CollectionsHubsNavFragmentContainer)}
    />
  )
}
