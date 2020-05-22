import { Theme } from "@artsy/palette"
import { CollectionsHubsHomepageNavQuery } from "v2/__generated__/CollectionsHubsHomepageNavQuery.graphql"
import { useSystemContext } from "v2/Artsy"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { CollectionsHubsHomepageNavFragmentContainer } from "../CollectionsHubsHomepageNav"

storiesOf("Components/CollectionsHubsHomepageNav", module).add(
  "default",
  () => (
    <Theme>
      <CollectionsHubsHomepageNavQueryRenderer />
    </Theme>
  )
)

const CollectionsHubsHomepageNavQueryRenderer = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<CollectionsHubsHomepageNavQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query CollectionsHubsHomepageNavQuery {
          marketingHubCollections {
            ...CollectionsHubsHomepageNav_marketingHubCollections
          }
        }
      `}
      render={renderWithLoadProgress(
        CollectionsHubsHomepageNavFragmentContainer
      )}
    />
  )
}
