import { Box } from "@artsy/palette"
import { SelectedWorks_selectedWorks } from "v2/__generated__/SelectedWorks_selectedWorks.graphql"
import { AnalyticsSchema } from "v2/System"
import { useTracking } from "v2/System/Analytics/useTracking"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import * as React from "react";
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"

interface SelectedWorksProps {
  selectedWorks: SelectedWorks_selectedWorks
}

const SelectedWorks: React.FC<SelectedWorksProps> = props => {
  const tracking = useTracking()

  if (!props.selectedWorks?.itemsConnection?.edges?.length) {
    return null
  }

  return (
    <Box maxWidth="720px" style={{ margin: "0 auto" }}>
      <ArtworkGrid
        artworks={props.selectedWorks.itemsConnection}
        columnCount={[2, 3]}
        onBrickClick={artwork => {
          tracking.trackEvent({
            action_type: AnalyticsSchema.ActionType.Click,
            context_module: AnalyticsSchema.ContextModule.SelectedWorks,
            destination_path: artwork.href,
          })
        }}
      />
    </Box>
  )
}

export const SelectedWorksFragmentContainer = createFragmentContainer(
  SelectedWorks,
  {
    selectedWorks: graphql`
      fragment SelectedWorks_selectedWorks on OrderedSet {
        itemsConnection(first: 6) {
          ...ArtworkGrid_artworks

          # So we know whether or not to render the grid.
          edges {
            node {
              id
            }
          }
        }
      }
    `,
  }
)
