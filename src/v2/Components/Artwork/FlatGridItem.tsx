import { ContextModule } from "@artsy/cohesion"
import { ResponsiveBox, Image, Flex } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarAuctionProgressBar } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionProgressBar"
import { useSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useTimer } from "v2/Utils/Hooks/useTimer"
import { userIsTeam } from "v2/Utils/user"
import { FlatGridItem_artwork } from "v2/__generated__/FlatGridItem_artwork.graphql"
import { useArtworkGridContext } from "../ArtworkGrid/ArtworkGridContext"
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

  const { sale, saleArtwork } = artwork

  const extendedBiddingPeriodMinutes = sale?.extendedBiddingPeriodMinutes
  const extendedBiddingIntervalMinutes = sale?.extendedBiddingIntervalMinutes
  const extendedBiddingEndAt = saleArtwork?.extendedBiddingEndAt
  const isExtendedBiddingEnabledSale =
    extendedBiddingPeriodMinutes && extendedBiddingIntervalMinutes

  const startAt = sale?.startAt
  const biddingEndAt = extendedBiddingEndAt ?? saleArtwork?.endAt

  const { time, hasEnded } = useTimer(biddingEndAt!, startAt!)

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
      fragment FlatGridItem_artwork on Artwork {
        ...Metadata_artwork
        ...SaveButton_artwork

        sale {
          extendedBiddingPeriodMinutes
          extendedBiddingIntervalMinutes
          startAt
        }
        saleArtwork {
          endAt
          extendedBiddingEndAt
        }
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
