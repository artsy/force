import {
  ActionType,
  type ClickedAuctionResultItem,
  ContextModule,
  Intent,
  OwnerType,
} from "@artsy/cohesion"
import NoArtIcon from "@artsy/icons/NoArtIcon"
import { Box, Flex, Image, Text } from "@artsy/palette"
import { getDisplaySaleDate } from "Apps/Artist/Utils/getDisplaySaleDate"
import { useAuthDialog } from "Components/AuthDialog"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { ArtistHeaderRecentAuctionResultItem_auctionResult$key } from "__generated__/ArtistHeaderRecentAuctionResultItem_auctionResult.graphql"
import type { FC, MouseEvent } from "react"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

const IMAGE_FRAME_SIZE = 75
const TEXT_COLUMN_HEIGHT = IMAGE_FRAME_SIZE + 5
const CELL_WIDTH = 250

export interface ArtistHeaderRecentAuctionResultItemProps {
  auctionResult: ArtistHeaderRecentAuctionResultItem_auctionResult$key
  isPriceGated?: boolean
}

export const ArtistHeaderRecentAuctionResultItem: FC<
  ArtistHeaderRecentAuctionResultItemProps
> = ({ auctionResult: auctionResultRef, isPriceGated = false }) => {
  const auctionResult = useFragment(fragment, auctionResultRef)
  const { user } = useSystemContext()
  const { showAuthDialog } = useAuthDialog()
  const { trackEvent } = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()
  const [hasImageError, setHasImageError] = useState(false)

  const image = auctionResult.images?.thumbnail?.resized
  const hasImage = !!image?.src && !hasImageError
  const title = [auctionResult.title, auctionResult.dateText]
    .filter(Boolean)
    .join(", ")
  const saleDate = getDisplaySaleDate(auctionResult.saleDate)
  const salePrice =
    (auctionResult.priceRealized?.centsUSD ?? 0) === 0
      ? null
      : auctionResult.priceRealized?.display
  const isPriceHidden = isPriceGated && !user
  const performanceValue = auctionResult.performance?.mid

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const trackingEvent: ClickedAuctionResultItem = {
      action: ActionType.clickedAuctionResultItem,
      context_module: ContextModule.artistHeader,
      context_page_owner_type: contextPageOwnerType!,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      destination_page_owner_type: OwnerType.auctionResult,
      destination_page_owner_id: auctionResult.internalID,
      destination_page_owner_slug: auctionResult.slug ?? undefined,
      type: "thumbnail",
    }

    trackEvent(trackingEvent)

    if (user) return

    event.preventDefault()

    showAuthDialog({
      options: {
        title: "Sign up or log in to see full auction records — for free",
      },
      analytics: {
        contextModule: ContextModule.auctionResult,
        intent: Intent.viewAuctionResults,
      },
    })
  }

  return (
    <RouterLink
      to={`/auction-result/${auctionResult.internalID}`}
      onClick={handleClick}
      display="flex"
      flexDirection="row"
      alignItems="center"
      textDecoration="none"
      flexShrink={0}
      width={CELL_WIDTH}
      p={1}
      gap={1}
      bg="mono5"
      borderRadius="5px"
    >
      <Box
        width={IMAGE_FRAME_SIZE}
        height={IMAGE_FRAME_SIZE}
        flexShrink={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        bg={hasImage ? "mono0" : "mono10"}
      >
        {hasImage ? (
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            alt=""
            lazyLoad
            bg="mono0"
            style={{ objectFit: "contain" }}
            onError={() => setHasImageError(true)}
          />
        ) : (
          <NoArtIcon height={24} width={24} fill="mono60" />
        )}
      </Box>

      <Flex
        flexDirection="column"
        justifyContent="space-between"
        height={TEXT_COLUMN_HEIGHT}
        flex={1}
        minWidth={0}
      >
        <Box>
          {saleDate && (
            <Text variant="xs" color="mono100">
              {saleDate}
            </Text>
          )}

          <Text variant="xs" color="mono60" lineClamp={2}>
            {title}
          </Text>
        </Box>

        <AuctionResultPrice
          isPriceHidden={isPriceHidden}
          salePrice={salePrice}
          performanceValue={performanceValue}
        />
      </Flex>
    </RouterLink>
  )
}

const fragment = graphql`
  fragment ArtistHeaderRecentAuctionResultItem_auctionResult on AuctionResult {
    internalID
    slug
    title
    dateText
    saleDate
    images {
      thumbnail {
        resized(width: 130, height: 130) {
          src
          srcSet
        }
      }
    }
    priceRealized {
      display
      centsUSD
    }
    performance {
      mid
    }
  }
`

interface AuctionResultPriceProps {
  isPriceHidden: boolean
  salePrice?: string | null
  performanceValue?: string | null
}

const AuctionResultPrice: FC<AuctionResultPriceProps> = ({
  isPriceHidden,
  salePrice,
  performanceValue,
}) => {
  if (isPriceHidden) {
    return (
      <Text variant="xs" style={{ textDecoration: "underline" }}>
        Sign up to see price
      </Text>
    )
  }

  const isPerformanceNegative = performanceValue?.[0] === "-"

  return (
    <Flex alignItems="center" gap={0.5}>
      {salePrice ? (
        <Text variant="xs" fontWeight="bold" color="mono100">
          {salePrice}
        </Text>
      ) : (
        <Text variant="xs">
          <i>Price not available</i>
        </Text>
      )}

      {!!performanceValue && (
        <Text
          variant="xs"
          color={isPerformanceNegative ? "red100" : "green100"}
        >
          {isPerformanceNegative ? performanceValue : `+${performanceValue}`}{" "}
          est
        </Text>
      )}
    </Flex>
  )
}
