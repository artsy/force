import { ArtworkTopContextBarBreadcrumbFragmentContainer } from "Apps/Artwork/Components/ArtworkTopContextBar/ArtworkTopContextBarBreadcrumb"
import {
  ArtworkTopContextBarDynamicBreadcrumb,
  useDynamicBreadcrumb,
} from "Apps/Artwork/Components/ArtworkTopContextBar/ArtworkTopContextBarDynamicBreadcrumb"
import type { ArtworkTopContextBar_artwork$data } from "__generated__/ArtworkTopContextBar_artwork.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface ArtworkTopContextBarProps {
  artwork: ArtworkTopContextBar_artwork$data
}

export const ArtworkTopContextBar: React.FC<
  React.PropsWithChildren<ArtworkTopContextBarProps>
> = ({ artwork }) => {
  const { isEnabled, type, id } = useDynamicBreadcrumb()

  if (isEnabled) {
    return (
      <ArtworkTopContextBarDynamicBreadcrumb
        id={artwork.internalID}
        contextMatchId={id}
        contextMatchType={type}
      >
        <ArtworkTopContextBarBreadcrumbFragmentContainer artwork={artwork} />
      </ArtworkTopContextBarDynamicBreadcrumb>
    )
  }

  return <ArtworkTopContextBarBreadcrumbFragmentContainer artwork={artwork} />
}

export const ArtworkTopContextBarFragmentContainer = createFragmentContainer(
  ArtworkTopContextBar,
  {
    artwork: graphql`
      fragment ArtworkTopContextBar_artwork on Artwork {
        ...ArtworkTopContextBarBreadcrumb_artwork
        internalID
      }
    `,
  },
)
