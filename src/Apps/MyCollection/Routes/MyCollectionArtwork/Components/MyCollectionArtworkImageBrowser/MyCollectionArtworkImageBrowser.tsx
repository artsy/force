import { Flex, ResponsiveBox } from "@artsy/palette"
import { ArtworkImageBrowserFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import { MyCollectionArtworkImageBrowser_artwork } from "__generated__/MyCollectionArtworkImageBrowser_artwork.graphql"
import { MyCollectionArtworkNoImageComponent } from "./MyCollectionArtworkNoImageComponent"

interface MyCollectionArtworkImageBrowserProps {
  artwork: MyCollectionArtworkImageBrowser_artwork
}
const MyCollectionArtworkImageBrowser: React.FC<MyCollectionArtworkImageBrowserProps> = ({
  artwork,
}) => {
  const { images } = artwork

  if ((images ?? []).length == 0) {
    return (
      <Flex maxWidth={["100%", 600]} mx="auto">
        <ResponsiveBox
          data-testid="artwork-browser-no-image-box"
          bg="black10"
          mx={[0, 2, 4]}
          maxWidth="100%"
          aspectWidth={1}
          aspectHeight={1}
        >
          <MyCollectionArtworkNoImageComponent artworkID={artwork.internalID} />
        </ResponsiveBox>
      </Flex>
    )
  }

  return (
    <ArtworkImageBrowserFragmentContainer
      artwork={artwork}
      isMyCollectionArtwork
    />
  )
}
export const MyCollectionArtworkImageBrowserFragmentContainer = createFragmentContainer(
  MyCollectionArtworkImageBrowser,
  {
    artwork: graphql`
      fragment MyCollectionArtworkImageBrowser_artwork on Artwork {
        ...ArtworkImageBrowser_artwork
        internalID
        images {
          width
          height
        }
      }
    `,
  }
)
