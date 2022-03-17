import { ContextModule } from "@artsy/cohesion"
import { ResponsiveBox, Image, Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { userIsTeam } from "v2/Utils/user"
import { FlatGridItem_artwork } from "v2/__generated__/FlatGridItem_artwork.graphql"
import Metadata from "./Metadata"
import { SaveButtonFragmentContainer, useSaveButton } from "./SaveButton"

interface FlatGridItemProps {
  artwork: FlatGridItem_artwork
  onClick?: () => void
}

const FlatGridItem: React.FC<FlatGridItemProps> = ({ artwork, onClick }) => {
  const { user } = useSystemContext()
  const isTeam = userIsTeam(user)
  const { containerProps, isSaveButtonVisible } = useSaveButton({
    isSaved: !!artwork.is_saved,
  })

  const image = artwork.image?.resized

  const handleClick = () => {
    onClick?.()
  }

  return (
    <Box {...containerProps}>
      <ResponsiveBox
        aspectWidth={image?.width ?? 1}
        aspectHeight={image?.height ?? 1}
        maxWidth="100%"
        bg="black10"
      >
        <RouterLink
          to={artwork.href}
          onClick={handleClick}
          aria-label={`${artwork.title} by ${artwork.artistNames}`}
        >
          {image && (
            <Image
              alt={artwork.image_title ?? ""}
              src={image.src}
              srcSet={image.srcSet}
              preventRightClick={!isTeam}
              width="100%"
              height="100%"
              style={{ display: "block" }}
              lazyLoad
            />
          )}

          {isSaveButtonVisible && (
            <SaveButtonFragmentContainer
              contextModule={ContextModule.artworkGrid}
              artwork={artwork}
            />
          )}
        </RouterLink>
      </ResponsiveBox>

      <Metadata artwork={artwork} />
    </Box>
  )
}

export const FlatGridItemFragmentContainer = createFragmentContainer(
  FlatGridItem,
  {
    artwork: graphql`
      fragment FlatGridItem_artwork on Artwork {
        ...Metadata_artwork
        ...SaveButton_artwork

        internalID
        title
        image_title: imageTitle
        image {
          resized(width: 445, version: ["normalized", "larger", "large"]) {
            src
            srcSet
            width
            height
          }
        }
        artistNames
        href
        is_saved: isSaved
      }
    `,
  }
)
