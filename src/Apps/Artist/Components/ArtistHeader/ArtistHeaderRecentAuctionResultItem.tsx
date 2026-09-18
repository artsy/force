import { ContextModule, Intent } from "@artsy/cohesion"
import NoArtIcon from "@artsy/icons/NoArtIcon"
import { Box, Flex, Image, Text } from "@artsy/palette"
import type { RecentAuctionResult } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderRecentAuctionResults"
import { useAuthDialog } from "Components/AuthDialog"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { DateTime, type LocaleOptions } from "luxon"
import type { FC, MouseEvent } from "react"
import { useState } from "react"

const IMAGE_FRAME_SIZE = 75
const CELL_WIDTH = 250

export interface ArtistHeaderRecentAuctionResultItemProps {
  auctionResult: RecentAuctionResult
  isPriceGated?: boolean
}

export const ArtistHeaderRecentAuctionResultItem: FC<
  ArtistHeaderRecentAuctionResultItemProps
> = ({ auctionResult, isPriceGated = false }) => {
  const { user } = useSystemContext()
  const { showAuthDialog } = useAuthDialog()
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
  const isPerformanceNegative = performanceValue?.[0] === "-"

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
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
        height={IMAGE_FRAME_SIZE}
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

        {(() => {
          if (isPriceHidden) {
            return (
              <Text variant="xs" style={{ textDecoration: "underline" }}>
                Sign up to see price
              </Text>
            )
          }

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
                  {isPerformanceNegative
                    ? performanceValue
                    : `+${performanceValue}`}{" "}
                  est
                </Text>
              )}
            </Flex>
          )
        })()}
      </Flex>
    </RouterLink>
  )
}

const getDisplaySaleDate = (saleDate: string | null | undefined) => {
  if (!saleDate) return null

  return DateTime.fromISO(saleDate, { zone: "utc" }).toLocaleString(
    DateTime.DATE_MED as LocaleOptions,
  )
}
