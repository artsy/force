import { Box } from "@artsy/palette"
import { IMAGE_BROWSER_MAX_DIMENSION } from "Apps/Artwork/Components/ArtworkImageBrowser"
import { ArtworkImageBrowserLargeFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkImageBrowserLarge"
import { ArtworkImageBrowserSmallFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkImageBrowserSmall"
import { compact } from "lodash"
import { scale } from "proportional-scale"
import { createFragmentContainer, graphql } from "react-relay"
import { useCursor } from "use-cursor"
import { Media } from "Utils/Responsive"
import { MyCollectionArtworkImageBrowser_artwork } from "__generated__/MyCollectionArtworkImageBrowser_artwork.graphql"

interface MyCollectoinArtworkImageBrowserProps {
  artwork: MyCollectionArtworkImageBrowser_artwork
}

const MyCollectionArtworkImageBrowser: React.FC<MyCollectoinArtworkImageBrowserProps> = ({
  artwork,
}) => {
  const { figures } = artwork

  const { index, handleNext, handlePrev, setCursor } = useCursor({
    max: figures.length,
  })

  const images = compact(artwork.images)
  const hasGeometry = !!images[0]?.width
  const maxHeight = Math.max(
    ...images.map(image => {
      const scaled = scale({
        width: image.width!,
        height: image.height!,
        maxWidth: IMAGE_BROWSER_MAX_DIMENSION,
        maxHeight: IMAGE_BROWSER_MAX_DIMENSION,
      })

      return hasGeometry ? scaled.height : IMAGE_BROWSER_MAX_DIMENSION
    })
  )

  return (
    <Box
      // Keyed to the artwork ID so that state is reset on route changes
      key={artwork.internalID}
    >
      <Media at="xs">
        <ArtworkImageBrowserSmallFragmentContainer
          artwork={artwork}
          index={index}
          setIndex={setCursor}
          maxHeight={maxHeight}
        />
      </Media>

      <Media greaterThan="xs">
        <ArtworkImageBrowserLargeFragmentContainer
          artwork={artwork}
          index={index}
          onNext={handleNext}
          onPrev={handlePrev}
          maxHeight={maxHeight}
        />
      </Media>
    </Box>
  )
}

export const MyCollectionArtworkImageBrowserFragmentContainer = createFragmentContainer(
  MyCollectionArtworkImageBrowser,
  {
    artwork: graphql`
      fragment MyCollectionArtworkImageBrowser_artwork on Artwork {
        ...ArtworkImageBrowserSmall_artwork
        ...ArtworkImageBrowserLarge_artwork
        internalID
        images {
          width
          height
        }
        figures {
          ... on Image {
            internalID
            isDefault
          }
          ... on Video {
            type: __typename
          }
        }
      }
    `,
  }
)
