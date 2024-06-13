import { ContextModule } from "@artsy/cohesion"
import { Flex, Image, ResponsiveBox } from "@artsy/palette"
import { ArtworkSidebarAuctionProgressBar } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionProgressBar"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { useAuctionWebsocket } from "Utils/Hooks/useAuctionWebsocket"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { RouterLink } from "System/Components/RouterLink"
import { useTimer } from "Utils/Hooks/useTimer"
import { userIsTeam } from "Utils/user"
import { FlatGridItem_artwork$data } from "__generated__/FlatGridItem_artwork.graphql"
import Metadata from "./Metadata"
import {
  DeprecatedSaveButtonFragmentContainer,
  useSaveButton,
} from "./SaveButton"

interface FlatGridItemProps {
  artwork: FlatGridItem_artwork$data
  onClick?: () => void
}

const FlatGridItem: React.FC<FlatGridItemProps> = ({ artwork, onClick }) => {
  const { user } = useSystemContext()
  const isTeam = userIsTeam(user)
  const { containerProps, isSaveButtonVisible } = useSaveButton({
    isSaved: !!artwork.isSaved,
  })

  const image = artwork.image?.resized
  const blurHashDataURL = artwork.image?.blurhashDataURL

  const handleClick = () => {
    onClick?.()
  }

  const { sale, saleArtwork } = artwork

  const extendedBiddingPeriodMinutes = sale?.extendedBiddingPeriodMinutes
  const extendedBiddingIntervalMinutes = sale?.extendedBiddingIntervalMinutes
  const extendedBiddingEndAt = saleArtwork?.extendedBiddingEndAt
  const isExtendedBiddingEnabledSale =
    extendedBiddingPeriodMinutes && extendedBiddingIntervalMinutes

  const startAt = sale?.startAt
  const biddingEndAt = extendedBiddingEndAt ?? saleArtwork?.endAt

  const [updatedBiddingEndAt, setUpdatedBiddingEndAt] = useState(biddingEndAt)

  useAuctionWebsocket({
    lotID: saleArtwork?.lotID!,
    onChange: ({ extended_bidding_end_at }) => {
      setUpdatedBiddingEndAt(extended_bidding_end_at)
    },
  })

  const { time, hasEnded } = useTimer(updatedBiddingEndAt!, startAt!)

  const { isAuctionArtwork } = useArtworkGridContext()
  const shouldRenderProgressBar =
    isAuctionArtwork && isExtendedBiddingEnabledSale && !hasEnded

  return (
    <Flex
      {...containerProps}
      flexDirection="column"
      justifyContent="flex-end"
      width="100%"
      height="100%"
    >
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
              placeHolderURL={blurHashDataURL ?? undefined}
              lazyLoad
            />
          )}

          {isSaveButtonVisible && (
            <DeprecatedSaveButtonFragmentContainer
              contextModule={ContextModule.artworkGrid}
              artwork={artwork}
            />
          )}
        </RouterLink>
      </ResponsiveBox>

      {shouldRenderProgressBar && (
        <ArtworkSidebarAuctionProgressBar
          time={time}
          extendedBiddingPeriodMinutes={extendedBiddingPeriodMinutes!}
          extendedBiddingIntervalMinutes={extendedBiddingIntervalMinutes!}
          hasBeenExtended={!!extendedBiddingEndAt}
          mb={0}
          mt={1}
        />
      )}

      <Metadata artwork={artwork} />
    </Flex>
  )
}

export const FlatGridItemFragmentContainer = createFragmentContainer(
  FlatGridItem,
  {
    artwork: graphql`
      fragment FlatGridItem_artwork on Artwork
        @argumentDefinitions(
          includeBlurHash: { type: "Boolean", defaultValue: true }
          includeAllImages: { type: "Boolean", defaultValue: false }
        ) {
        ...Metadata_artwork
        ...DeprecatedSaveButton_artwork

        sale {
          extendedBiddingPeriodMinutes
          extendedBiddingIntervalMinutes
          startAt
        }
        saleArtwork {
          endAt
          extendedBiddingEndAt
          lotID
        }
        internalID
        title
        image_title: imageTitle
        image(includeAll: $includeAllImages) {
          resized(width: 445, version: ["larger", "large"]) {
            src
            srcSet
            width
            height
          }
          blurhashDataURL @include(if: $includeBlurHash)
        }
        artistNames
        href
        isSaved
      }
    `,
  }
)
