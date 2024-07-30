import { Flex, ResponsiveBox } from "@artsy/palette"
import { MyCollectionArtworkImageBrowser_artwork$key } from "__generated__/MyCollectionArtworkImageBrowser_artwork.graphql"
import { ArtworkImageBrowserFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkImageBrowser"
import { graphql, useFragment } from "react-relay"
import { MyCollectionArtworkNoImageComponent } from "./MyCollectionArtworkNoImageComponent"

interface MyCollectionArtworkImageBrowserProps {
  artwork: MyCollectionArtworkImageBrowser_artwork$key
}

export const MyCollectionArtworkImageBrowser: React.FC<MyCollectionArtworkImageBrowserProps> = props => {
  const artwork = useFragment(FRAGMENT, props.artwork)

  if (artwork?.figures?.length === 0) {
    return (
      <Flex maxWidth={["100%", 600]} mx="auto" my={[2, 2]}>
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
    <Flex mb={[1, 0]}>
      <ArtworkImageBrowserFragmentContainer
        artwork={artwork}
        isMyCollectionArtwork
      />
    </Flex>
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
