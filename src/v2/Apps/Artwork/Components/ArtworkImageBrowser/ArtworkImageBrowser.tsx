import { ArtworkImageBrowser_artwork } from "v2/__generated__/ArtworkImageBrowser_artwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkActionsFragmentContainer as ArtworkActions } from "./ArtworkActions"
import { Box, Spacer } from "@artsy/palette"
import { ContextModule } from "@artsy/cohesion"
import { ArtworkImageBrowserLargeFragmentContainer } from "./ArtworkImageBrowserLarge"
import { ArtworkImageBrowserSmallFragmentContainer } from "./ArtworkImageBrowserSmall"
import { Media } from "v2/Utils/Responsive"
import { useCursor } from "use-cursor"
import { getNFTMetadata } from "../ArtworkSidebar/ArtworkSidebarTitleInfo"

export interface ArtworkImageBrowserProps {
  artwork: ArtworkImageBrowser_artwork
}

export const ArtworkImageBrowser: React.FC<ArtworkImageBrowserProps> = ({
  artwork,
}) => {
  const [image, setImage] = React.useState("")
  React.useEffect(() => {
    const doIt = async () => {
      const metadata = await getNFTMetadata("1")
      setImage(metadata.image)
    }
    doIt()
  }, [])

  const { images } = artwork

  const { index, handleNext, handlePrev, setCursor } = useCursor({
    max: images?.length ?? 0,
  })

  const handleSelectDefaultSlide = () => {
    const defaultIndex = images?.findIndex(image => !!image?.isDefault) ?? 0
    setCursor(defaultIndex)
  }

  if ((images ?? []).length === 0) {
    return null
  }

  const isNFT = artwork.category === "NFT"

  return (
    <Box
      // Keyed to the artwork ID so that state is reset on route changes
      key={artwork.internalID}
      data-test={ContextModule.artworkImage}
    >
      {isNFT && (
        <div
          style={{
            flex: 1,
            marginTop: 20,
            paddingLeft: 150,
            width: "60%",
            height: 700,
            paddingTop: 100,
          }}
        >
          <img
            src={image}
            style={{
              width: "100%",
              transform: "scale(1.5)",
            }}
            alt="some nft"
          />
        </div>
      )}

      {!isNFT && (
        <>
          <Media at="xs">
            <ArtworkImageBrowserSmallFragmentContainer
              artwork={artwork}
              index={index}
              setIndex={setCursor}
            />
          </Media>

          <Media greaterThan="xs">
            <ArtworkImageBrowserLargeFragmentContainer
              artwork={artwork}
              index={index}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </Media>
        </>
      )}

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
      internalID
      category
      images {
        internalID
        isDefault
      }
    }
  `,
})
