import AddStrokeIcon from "@artsy/icons/AddStrokeIcon"
import { Button, ResponsiveBox } from "@artsy/palette"
import { ArtworkImageBrowserFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkImageBrowser"
import { RouterLink } from "System/Components/RouterLink"
import type { MyCollectionArtworkImageBrowser_artwork$key } from "__generated__/MyCollectionArtworkImageBrowser_artwork.graphql"
import { graphql, useFragment } from "react-relay"

interface MyCollectionArtworkImageBrowserProps {
  artwork: MyCollectionArtworkImageBrowser_artwork$key
}

export const MyCollectionArtworkImageBrowser: React.FC<
  React.PropsWithChildren<MyCollectionArtworkImageBrowserProps>
> = props => {
  const artwork = useFragment(FRAGMENT, props.artwork)

  if (artwork.figures.length === 0) {
    return (
      <ResponsiveBox
        data-testid="artwork-browser-no-image-box"
        bg="mono10"
        maxWidth={600}
        mx="auto"
        aspectWidth={1}
        aspectHeight={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          data-testid="uploadPhotosButton"
          // @ts-ignore
          as={RouterLink}
          to={`/collector-profile/my-collection/artworks/${artwork.internalID}/edit?step=photos`}
          variant="secondaryNeutral"
          size="large"
          Icon={AddStrokeIcon}
        >
          Upload Photos
        </Button>
      </ResponsiveBox>
    )
  }

  return (
    <ArtworkImageBrowserFragmentContainer
      artwork={artwork}
      isMyCollectionArtwork
    />
  )
}

const FRAGMENT = graphql`
  fragment MyCollectionArtworkImageBrowser_artwork on Artwork {
    ...ArtworkImageBrowser_artwork @arguments(includeAllImages: true)
    internalID
    figures(includeAll: true) {
      ... on Image {
        width
        height
      }
    }
  }
`
