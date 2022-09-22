import { Flex, ResponsiveBox, Image } from "@artsy/palette"
import { ArtworkImageBrowserFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser"
import { IMAGES_LOCAL_STORE_KEY } from "Apps/Settings/Routes/MyCollection/constants"
import { useEffect, useState } from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import { getArtworkLocalImages, StoredImage } from "Utils/localImagesHelpers"
import { MyCollectionArtworkImageBrowser_artwork } from "__generated__/MyCollectionArtworkImageBrowser_artwork.graphql"
import { MyCollectionArtworkNoImageComponent } from "./MyCollectionArtworkNoImageComponent"

interface MyCollectionArtworkImageBrowserProps {
  artwork: MyCollectionArtworkImageBrowser_artwork
}
const MyCollectionArtworkImageBrowser: React.FC<MyCollectionArtworkImageBrowserProps> = ({
  artwork,
}) => {
  const { images } = artwork
  const [localArtworkImages, setLocalArtworkImages] = useState<StoredImage[]>()

  useEffect(() => {
    getArtworkLocalImages(artwork.internalID, IMAGES_LOCAL_STORE_KEY)
      .then(images => {
        if (images) {
          setLocalArtworkImages(images)
        }
      })
      .catch(error => {
        console.error("Error getting local images by artwork", error)
      })
  }, [])

  if ((images ?? []).length === 0) {
    if (localArtworkImages && localArtworkImages.length) {
      return (
        <Flex maxWidth={["100%", 600]} mx="auto">
          <ResponsiveBox
            maxWidth="100%"
            aspectWidth={1}
            aspectHeight={1}
            // mx={[0, 2, 4]}
          >
            <Flex
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src={localArtworkImages[0].data}
                style={{ objectFit: "contain" }}
                alt=""
                lazyLoad
              />
            </Flex>
          </ResponsiveBox>
        </Flex>
      )
    }
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
