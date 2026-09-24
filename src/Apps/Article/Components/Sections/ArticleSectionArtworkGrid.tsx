import {
  ActionType,
  type ClickedMainArtworkGrid,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Box } from "@artsy/palette"
import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { ArticleSectionArtworkGrid_section$key } from "__generated__/ArticleSectionArtworkGrid_section.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface ArticleSectionArtworkGridProps {
  section: ArticleSectionArtworkGrid_section$key
}

export const ArticleSectionArtworkGrid: FC<
  React.PropsWithChildren<ArticleSectionArtworkGridProps>
> = ({ section }) => {
  const data = useFragment(FRAGMENT, section)

  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerSlug, contextPageOwnerId } =
    useAnalyticsContext()

  if (!data.artworksConnection?.artworkEdges?.length) {
    return null
  }

  return (
    <Box data-testid="ArticleSectionArtworkGrid">
      <ArtworkGrid
        artworks={data.artworksConnection}
        columnCount={[
          // Keep artworks legible on narrow viewports: 2 columns on xs, at most 3 on sm
          Math.min(data.columns, 2),
          Math.min(data.columns, 3),
          data.columns,
        ]}
        contextModule={ContextModule.artworkGrid}
        layout="MASONRY"
        onBrickClick={(artwork, artworkIndex) => {
          const event: ClickedMainArtworkGrid = {
            action: ActionType.clickedMainArtworkGrid,
            context_module: ContextModule.artworkGrid,
            context_page_owner_type: contextPageOwnerType ?? OwnerType.article,
            context_page_owner_slug: contextPageOwnerSlug,
            context_page_owner_id: contextPageOwnerId,
            destination_page_owner_id: artwork.internalID,
            destination_page_owner_slug: artwork.slug,
            destination_page_owner_type: OwnerType.artwork,
            position: artworkIndex,
            type: "thumbnail",
          }

          trackEvent(event)
        }}
      />
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment ArticleSectionArtworkGrid_section on ArticleSectionArtworkGrid {
    columns
    artworksConnection {
      artworkEdges: edges {
        __typename
      }
      ...ArtworkGrid_artworks
    }
  }
`
