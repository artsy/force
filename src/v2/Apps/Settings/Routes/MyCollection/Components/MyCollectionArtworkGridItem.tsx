import { AuthContextModule } from "@artsy/cohesion"
import { Box, ResponsiveBox } from "@artsy/palette"
import { MyCollectionArtworkGridItem_artwork } from "v2/__generated__/MyCollectionArtworkGridItem_artwork.graphql"
import { useSystemContext } from "v2/System"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { userIsTeam } from "v2/Utils/user"
import { cropped, resized } from "v2/Utils/resized"
import { useHoverMetadata } from "v2/Components/Artwork/useHoverMetadata"
import { DetailsFragmentContainer as Details } from "v2/Components/Artwork/Details"
import { MagnifyImage } from "v2/Components/MagnifyImage"

interface MyCollectionArtworkGridItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  artwork: MyCollectionArtworkGridItem_artwork
  contextModule?: AuthContextModule
  lazyLoad?: boolean
  onClick?: () => void
}

export const MyCollectionArtworkGridItem: React.FC<MyCollectionArtworkGridItemProps> = ({
  artwork,
  lazyLoad = true,
  contextModule,
  onClick,
  ...rest
}) => {
  const { user } = useSystemContext()
  const isTeam = userIsTeam(user)

  const { onMouseEnter, onMouseLeave } = useHoverMetadata()

  const aspectRatio = artwork.image?.aspectRatio ?? 1
  const width = 445
  const height = Math.floor(width / aspectRatio)
  const transform = aspectRatio === 1 ? cropped : resized
  const imageURL = artwork.image?.url
  const { src, srcSet } = imageURL
    ? transform(imageURL, { width, height })
    : { src: "", srcSet: "" }

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    onMouseEnter()
    rest.onMouseEnter?.(event)
  }

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    onMouseLeave()
    rest.onMouseLeave?.(event)
  }

  return (
    <div
      data-id={artwork.internalID}
      data-test="MyCollectionArtworkGridItem"
      {...rest}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        position="relative"
        width="100%"
        height="100%"
        bg="black10"
        style={{ paddingBottom: artwork.image?.placeholder ?? undefined }}
      >
        {imageURL ? (
          <ImageWrapper
            aria-label={`${artwork.title} by ${artwork.artistNames}`}
          >
            <MagnifyImage
              title={artwork.title ?? undefined}
              alt={artwork.imageTitle ?? ""}
              src={src}
              srcSet={srcSet}
              lazyLoad={lazyLoad}
              preventRightClick={!isTeam}
            />
          </ImageWrapper>
        ) : (
          <ResponsiveBox
            aspectWidth={4}
            aspectHeight={3}
            maxWidth="100%"
            position="relative"
          />
        )}
      </Box>

      <Details
        includeLinks={false}
        artwork={artwork}
        hideSaleInfo
        hidePartnerName
      />
    </div>
  )
}

MyCollectionArtworkGridItem.displayName = "MyCollectionArtworkGridItem"

const ImageWrapper = styled(Box)`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const MyCollectionArtworkGridItemFragmentContainer = createFragmentContainer(
  MyCollectionArtworkGridItem,
  {
    artwork: graphql`
      fragment MyCollectionArtworkGridItem_artwork on Artwork {
        internalID
        title
        imageTitle
        image {
          placeholder
          url(version: "large")
          aspectRatio
        }
        artistNames
        ...Details_artwork
      }
    `,
  }
)
