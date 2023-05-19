import { Flex, Image, ResponsiveBox } from "@artsy/palette"
import { AuctionResultImage_auctionResult$key } from "__generated__/AuctionResultImage_auctionResult.graphql"
import { graphql, useFragment } from "react-relay"
import NoArtIcon from "@artsy/icons/NoArtIcon"

export const MAX_DIMENSION = 400

interface AuctionResultImageProps {
  auctionResult: AuctionResultImage_auctionResult$key
}

export const AuctionResultImage: React.FC<AuctionResultImageProps> = ({
  auctionResult,
}) => {
  const { images, title } = useFragment(
    auctionResultImageFragment,
    auctionResult
  )

  const image = images?.larger?.resized

  if (!image) {
    return (
      <Flex
        maxWidth={["100%", MAX_DIMENSION]}
        maxHeight={MAX_DIMENSION}
        mx="auto"
        bg="black10"
      >
        <ResponsiveBox
          data-testid="artwork-browser-no-image-box"
          bg="black10"
          maxWidth="100%"
          aspectWidth={1}
          aspectHeight={1}
        >
          <Flex height="100%" justifyContent="center" alignItems="center">
            <NoArtIcon width={28} height={28} fill="black60" />
          </Flex>
        </ResponsiveBox>
      </Flex>
    )
  }

  return (
    <ResponsiveBox
      data-testid="artwork-lightbox-box"
      bg="black10"
      mx="auto"
      maxWidth={MAX_DIMENSION}
      aspectWidth={image.width || 1}
      aspectHeight={image.height || 1}
    >
      <Image
        // updates the background of the image to be white
        // @ts-expect-error
        bg="white100"
        lazyLoad
        data-testid="artwork-lightbox-image"
        width="100%"
        height="100%"
        src={image.src}
        srcSet={image.srcSet}
        alt={title ?? ""}
        style={{ position: "relative", objectFit: "contain" }}
      />
    </ResponsiveBox>
  )
}

const auctionResultImageFragment = graphql`
  fragment AuctionResultImage_auctionResult on AuctionResult {
    title
    images {
      larger {
        resized(height: 400, width: 400, version: "larger") {
          src
          srcSet
          height
          width
        }
      }
    }
  }
`
