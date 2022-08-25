import { Flex, ResponsiveBox } from "@artsy/palette"
import { ArtworkImageBrowserFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import { Media } from "Utils/Responsive"
import { MyCollectionArtworkImageBrowser_artwork } from "__generated__/MyCollectionArtworkImageBrowser_artwork.graphql"
import { MyCollectionArtworkNoImageComponent } from "./MyCollectionArtworkImageBrowser"

interface MyCollectionArtworkImageBrowserProps {
  artwork: MyCollectionArtworkImageBrowser_artwork
}
const MyCollectionArtworkImageBrowser: React.FC<MyCollectionArtworkImageBrowserProps> = ({
  artwork,
}) => {
  const { images } = artwork

  if ((images ?? []).length == 0) {
    return (
      <>
        <Media greaterThanOrEqual="md">
          <Flex justifyContent="center">
            <ResponsiveBox
              data-testid="artwork-browser-no-image-box"
              bg="black10"
              mx={[0, 2, 4]}
              maxWidth={600}
              aspectWidth={1}
              aspectHeight={1}
            >
              <MyCollectionArtworkNoImageComponent
                artworkID={artwork.internalID}
              />
            </ResponsiveBox>
          </Flex>
        </Media>

        <Media lessThan="md">
          <Flex justifyContent="center">
            <ResponsiveBox
              data-testid="artwork-browser-no-image-box"
              bg="black10"
              mx={[0, 2, 4]}
              maxWidth="100%"
              aspectWidth={1}
              aspectHeight={1}
            >
              <MyCollectionArtworkNoImageComponent
                artworkID={artwork.internalID}
              />
            </ResponsiveBox>
          </Flex>
        </Media>
      </>
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
