import { ArtworkImageBrowser_artwork } from "v2/__generated__/ArtworkImageBrowser_artwork.graphql"
import React, { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkActionsFragmentContainer as ArtworkActions } from "./ArtworkActions"
import { Box, Spacer } from "@artsy/palette"
import { ContextModule } from "@artsy/cohesion"
import { ArtworkImageBrowserLargeFragmentContainer } from "./ArtworkImageBrowserLarge"
import { ArtworkImageBrowserSmallFragmentContainer } from "./ArtworkImageBrowserSmall"
import { Media } from "v2/Utils/Responsive"

export interface ArtworkImageBrowserProps {
  artwork: ArtworkImageBrowser_artwork
}

export const ArtworkImageBrowser: React.FC<ArtworkImageBrowserProps> = ({
  artwork,
}) => {
  const { images } = artwork

  // Rather than lift state up to reset the carousel to the first slide, just
  // re-render it to reset the state.
  const [key, setKey] = useState(0)
  const handleSelectDefaultSlide = () => {
    return setKey(prevKey => prevKey + 1)
  }

  if ((images ?? []).length === 0) {
    return null
  }

  return (
    <Box data-test={ContextModule.artworkImage}>
      <Media at="xs">
        <ArtworkImageBrowserSmallFragmentContainer
          key={key}
          artwork={artwork}
        />
      </Media>

      <Media greaterThan="xs">
        <ArtworkImageBrowserLargeFragmentContainer
          key={key}
          artwork={artwork}
        />
      </Media>

      <Spacer mt={2} />

      <ArtworkActions
        artwork={artwork}
        selectDefaultSlide={handleSelectDefaultSlide}
      />
    </Box>
  )
}

export const ArtworkImageBrowserFragmentContainer = createFragmentContainer<
  ArtworkImageBrowserProps
>(ArtworkImageBrowser, {
  artwork: graphql`
    fragment ArtworkImageBrowser_artwork on Artwork {
      ...ArtworkActions_artwork
      ...ArtworkImageBrowserSmall_artwork
      ...ArtworkImageBrowserLarge_artwork
      images {
        internalID
      }
    }
  `,
})
