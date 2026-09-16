import { ContextModule, Intent } from "@artsy/cohesion"
import NoArtIcon from "@artsy/icons/NoArtIcon"
import { Box, Flex, Image, ResponsiveBox, Text } from "@artsy/palette"
import type { RecentAuctionResult } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderRecentAuctionResults"
import { useAuthDialog } from "Components/AuthDialog"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { DateTime, type LocaleOptions } from "luxon"
import type { FC, MouseEvent } from "react"
import { useState } from "react"

const CELL_WIDTH = 175
const CELL_HEIGHT = 190

export interface ArtistHeaderRecentAuctionResultItemProps {
  auctionResult: RecentAuctionResult
  /** Hide the price behind a sign-up prompt for signed-out visitors. */
  isPriceGated?: boolean
}

export const ArtistHeaderRecentAuctionResultItem: FC<
  ArtistHeaderRecentAuctionResultItemProps
> = ({ auctionResult, isPriceGated = false }) => {
  const { user } = useSystemContext()
  const { showAuthDialog } = useAuthDialog()
  const [hasImageError, setHasImageError] = useState(false)

  const image = auctionResult.images?.thumbnail?.cropped
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

  // The full auction-result page requires an account for any visitor,
  // independent of the rail's own "first few prices are visible to
  // everyone" teaser above — so this matches the same behavior the full
  // Auction Results tab uses: show the sign-up dialog in place, rather
  // than navigating logged-out visitors to a page they can't view.
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
      flexDirection="column"
      alignItems="center"
      textDecoration="none"
      flexShrink={0}
      width={CELL_WIDTH}
      height={CELL_HEIGHT}
      p={1}
      gap={1}
      bg="mono5"
      borderRadius="5px"
    >
      <ResponsiveBox
        aspectWidth={1}
        aspectHeight={1}
        maxWidth="100%"
        bg="mono10"
      >
        {image?.src && !hasImageError ? (
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            alt=""
            lazyLoad
            onError={() => setHasImageError(true)}
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <NoArtIcon height={24} width={24} fill="mono60" />
          </Box>
        )}
      </ResponsiveBox>

      <Box width="100%">
        {saleDate && (
          <Text variant="xs" color="mono100">
            {saleDate}
          </Text>
        )}

        <Text variant="xs" color="mono60" lineClamp={1}>
          {title}
        </Text>

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
                <Text variant="xs" fontWeight="medium" color="mono100">
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
      </Box>
    </RouterLink>
  )
}

const getDisplaySaleDate = (saleDate: string | null | undefined) => {
  if (!saleDate) return null

  return DateTime.fromISO(saleDate, { zone: "utc" }).toLocaleString(
    DateTime.DATE_MED as LocaleOptions,
  )
}
