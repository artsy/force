import React, { useContext } from "react"
import { graphql } from "react-relay"

import { CollectionsRailQuery } from "v2/__generated__/CollectionsRailQuery.graphql"
import { SystemContext } from "v2/Artsy"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { CollectionsRailFragmentContainer as CollectionsRail } from "./CollectionsRail"

interface Props {
  articleId?: string
  showOnEditorial?: boolean
}

export const CollectionsRailContent: React.FC<Props> = passedProps => {
  const { relayEnvironment } = useContext(SystemContext)
  return (
    <QueryRenderer<CollectionsRailQuery>
      environment={relayEnvironment}
      variables={{
        showOnEditorial: true,
        size: 4,
        randomizationSeed: passedProps.articleId,
      }}
      query={graphql`
        query CollectionsRailQuery(
          $showOnEditorial: Boolean
          $size: Int
          $randomizationSeed: String
        ) {
          collections: marketingCollections(
            showOnEditorial: $showOnEditorial
            size: $size
            randomizationSeed: $randomizationSeed
          ) {
            ...CollectionsRail_collections
          }
        }
      `}
      render={renderWithLoadProgress(CollectionsRail)}
      cacheConfig={{ force: true }}
    />
  )
}
