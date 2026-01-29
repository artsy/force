import { ContextModule, Intent } from "@artsy/cohesion"
import NoArtIcon from "@artsy/icons/NoArtIcon"
import StopwatchIcon from "@artsy/icons/StopwatchIcon"
import {
  Box,
  Clickable,
  Column,
  Flex,
  GridColumns,
  Image,
  ResponsiveBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { AuctionResultPerformance } from "Components/AuctionResultPerformance"
import { useAuthDialog } from "Components/AuthDialog"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { ArtistAuctionResultItem_auctionResult$data } from "__generated__/ArtistAuctionResultItem_auctionResult.graphql"
import { DateTime, type LocaleOptions } from "luxon"
import { createFragmentContainer, graphql } from "react-relay"

export interface Props {
  auctionResult: ArtistAuctionResultItem_auctionResult$data
  filtersAtDefault: boolean
  showArtistName?: boolean
}

export const ArtistAuctionResultItem: React.FC<
  React.PropsWithChildren<Props>
> = props => {
  const { user } = useSystemContext()
  const { showAuthDialog } = useAuthDialog()

  const {
    showArtistName,
    auctionResult: {
      internalID,
      images,
      date_text,
      organization,
      title,
      mediumText,
      saleDate,
      artist,
      dimension_text,
      saleTitle,
      location,
      lotNumber,
    },
  } = getProps(props)

  const dateOfSale = getDisplaySaleDate(saleDate)
  const image = images?.thumbnail?.cropped
  const artistName = artist?.name

  const onAuctionResultClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!user) {
      event.preventDefault()
      showAuthDialog({
        options: {
          title: "Sign up or log in to see full auction records — for free",
          nodeId: artist?.id,
        },
        analytics: {
          contextModule: ContextModule.auctionResult,
        },
      })
    }
  }

  return (
    <RouterLink
      to={`/auction-result/${internalID}`}
      textDecoration="none"
      display="block"
      onClick={onAuctionResultClick}
    >
      <GridColumns>
        <Column span={[4, 2]}>
          <ResponsiveBox
            aspectWidth={1}
            aspectHeight={1}
            maxWidth={130}
            bg="mono10"
          >
            {image ? (
              <Image
                src={image.src}
                srcSet={image.srcSet}
                width="100%"
                height="100%"
                alt=""
                lazyLoad
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
        </Column>

        <Column span={[8, 1]} display={["block", "none"]}>
          <Box>
            {!!showArtistName && <Text variant="xs">{artistName}</Text>}

            <Text variant="xs" lineClamp={1}>
              {[title, date_text].filter(Boolean).join(", ")}
            </Text>

            {mediumText !== "Unknown" && (
              <Text variant="xs" color="mono60" lineClamp={1}>
                {mediumText}
              </Text>
            )}

            {dimension_text && (
              <Text variant="xs" color="mono60" lineClamp={1}>
                {dimension_text}
              </Text>
            )}

            <Spacer y={1} />

            <Text variant="xs" color="mono60" lineClamp={1}>
              {dateOfSale} • {organization}
            </Text>

            <ArtistAuctionResultItemPrice {...props} />
          </Box>
        </Column>

        <Column span={4} display={["none", "block"]}>
          {!!showArtistName && <Text variant="sm-display">{artistName}</Text>}

          <Text variant="sm-display">
            <i>{title?.trim()}</i>
            {date_text &&
              date_text.replace(/\s+/g, "").length > 0 &&
              `, ${date_text}`}
          </Text>

          {mediumText !== "Unknown" && (
            <Text variant="xs" color="mono60">
              {mediumText}
            </Text>
          )}

          {dimension_text && (
            <Text variant="xs" color="mono60">
              {dimension_text}
            </Text>
          )}
        </Column>

        <Column span={3} display={["none", "block"]}>
          <Text variant="sm-display">{dateOfSale}</Text>

          <Text variant="xs" color="mono60">
            {organization}
            {!!location && ` • ${location}`}
          </Text>

          <Text variant="xs" color="mono60">
            {saleTitle}
          </Text>

          <Text variant="xs" color="mono60">
            Lot {lotNumber}
          </Text>
        </Column>

        <Column span={3} display={["none", "flex"]} justifyContent="flex-end">
          <ArtistAuctionResultItemPrice {...props} />
        </Column>
      </GridColumns>
    </RouterLink>
  )
}

export const ArtistAuctionResultItemPlaceholder: React.FC<
  React.PropsWithChildren<{ showArtistName: boolean }>
> = ({ showArtistName }) => {
  return (
    <GridColumns>
      <Column span={[4, 2]}>
        <ResponsiveBox
          aspectWidth={1}
          aspectHeight={1}
          maxWidth={130}
          bg="mono10"
        />
      </Column>

      {/* Mobile */}
      <Column span={[8, 1]} display={["block", "none"]}>
        {showArtistName && (
          <SkeletonText variant="xs" lineClamp={1}>
            Artist Name
          </SkeletonText>
        )}

        <SkeletonText variant="xs" lineClamp={1}>
          Title, 0000
        </SkeletonText>

        <SkeletonText variant="xs">Example medium on canvas</SkeletonText>

        <SkeletonText variant="xs">00 x 00 in (00 x 00 cm)</SkeletonText>

        <Spacer y={1} />

        <SkeletonText variant="xs">Jan 00, 0000 • Organization</SkeletonText>

        <SkeletonText variant="xs">US$00,000 (+25% est)</SkeletonText>
      </Column>

      {/* Desktop */}
      <Column span={4} display={["none", "block"]}>
        {showArtistName && (
          <SkeletonText variant="sm-display">Artist Name</SkeletonText>
        )}

        <SkeletonText variant="sm-display">Title, 0000</SkeletonText>

        <SkeletonText variant="xs">Example medium on canvas</SkeletonText>

        <SkeletonText variant="xs">00 x 00 in (00 x 00 cm)</SkeletonText>
      </Column>

      <Column span={3} display={["none", "block"]}>
        <SkeletonText variant="sm-display">Jan 00, 0000</SkeletonText>

        <SkeletonText variant="xs">Example London</SkeletonText>

        <SkeletonText variant="xs">The Sale Title Example</SkeletonText>

        <SkeletonText variant="xs">Lot 000</SkeletonText>
      </Column>

      <Column
        span={3}
        display={["none", "flex"]}
        alignItems="flex-end"
        flexDirection="column"
      >
        <SkeletonText variant="sm-display">US$00,000</SkeletonText>
        <SkeletonText variant="xs">US$00,000–US$00,000 (est)</SkeletonText>
        <SkeletonText variant="xs">-25% (est)</SkeletonText>
      </Column>
    </GridColumns>
  )
}

export const ArtistAuctionResultItemFragmentContainer = createFragmentContainer(
  ArtistAuctionResultItem,
  {
    auctionResult: graphql`
      fragment ArtistAuctionResultItem_auctionResult on AuctionResult {
        internalID
        title
        dimension_text: dimensionText
        organization
        artist {
          id
          name
        }
        images {
          thumbnail {
            cropped(width: 130, height: 130, version: ["square140"]) {
              src
              srcSet
              width
              height
            }
          }
        }
        mediumText
        categoryText
        date_text: dateText
        saleDate
        boughtIn
        currency
        price_realized: priceRealized {
          display
          display_usd: displayUSD
          cents_usd: centsUSD
        }
        performance {
          mid
        }
        estimate {
          display
        }
        location
        lotNumber
        saleTitle
        isUpcoming
      }
    `,
  },
)

const ArtistAuctionResultItemPrice: React.FC<
  React.PropsWithChildren<Props>
> = props => {
  const {
    salePrice,
    salePriceUSD,
    auctionResult: {
      saleDate,
      currency,
      performance,
      boughtIn,
      isUpcoming,
      artist,
    },
    estimatedPrice,
  } = getProps(props)

  const { user } = useSystemContext()

  const { showAuthDialog } = useAuthDialog()

  const intent = isUpcoming
    ? Intent.seeEstimateAuctionRecords
    : Intent.seePriceAuctionRecords

  if (!user) {
    return (
      <Clickable
        alignSelf={"flex-start"}
        textDecoration="underline"
        onClick={() => {
          showAuthDialog({
            options: {
              title: "Sign up or log in to see full auction records — for free",
              nodeId: artist?.id,
            },
            analytics: {
              contextModule: ContextModule.auctionResults,
              intent,
            },
          })
        }}
      >
        <Text variant={["xs", "sm"]}>
          Sign up to see {isUpcoming ? "estimate" : "price"}
        </Text>
      </Clickable>
    )
  }
  // If user is logged in we show prices
  if (isUpcoming) {
    return (
      <Box textAlign={["left", "right"]}>
        <Text
          fontWeight={[estimatedPrice ? "bold" : "normal", "normal"]}
          variant={["xs", "sm-display"]}
        >
          {estimatedPrice ? (
            `${estimatedPrice} (est)`
          ) : (
            <i>Estimate not available</i>
          )}
        </Text>
      </Box>
    )
  }

  const dateOfSale = DateTime.fromISO(saleDate as string, { zone: "utc" })

  // Did the sale happened last month and the price hasn't been realized yet?
  const awaitingResults = dateOfSale.plus({ month: 1 }) > DateTime.local()
  const showPriceUSD = salePriceUSD && currency !== "USD"

  return (
    <Box
      textAlign={["left", "right"]}
      display={["flex", "block"]}
      flexDirection="row"
      flexWrap="wrap"
    >
      {salePrice && (
        <Text fontWeight={["bold", "normal"]} variant={["xs", "sm-display"]}>
          {salePrice}
          {showPriceUSD ? ` • ${salePriceUSD}` : ""}
        </Text>
      )}

      {!salePrice && boughtIn && (
        <Text variant={["xs", "sm-display"]}>
          <i>Bought In</i>
        </Text>
      )}

      {!salePrice && !boughtIn && awaitingResults && (
        <Flex flexDirection="row" justifyContent="flex-end" alignItems="center">
          <StopwatchIcon fill="mono100" width={16} height={16} />

          <Spacer x="4px" />

          <Text variant={["xs", "sm-display"]}>
            <i>Awaiting results</i>
          </Text>
        </Flex>
      )}

      {!salePrice && !boughtIn && !awaitingResults && (
        <Text variant={["xs", "sm-display"]}>
          <i>Price not available</i>
        </Text>
      )}

      {!!estimatedPrice && (
        <Text variant="xs" color="mono60" display={["none", "block"]}>
          {estimatedPrice} (est)
        </Text>
      )}
      <AuctionResultPerformance value={performance?.mid as string} />
    </Box>
  )
}

const getProps = (props: Props) => {
  const {
    auctionResult: { estimate, price_realized },
  } = props

  const salePrice =
    (price_realized?.cents_usd ?? 0) === 0 ? null : price_realized?.display
  const salePriceUSD =
    (price_realized?.cents_usd ?? 0) === 0 ? null : price_realized?.display_usd
  const estimatedPrice = estimate?.display

  return {
    ...props,
    salePrice,
    salePriceUSD,
    estimatedPrice,
  }
}

const getDisplaySaleDate = (saleDate: string | null | undefined) => {
  if (!saleDate) return null

  return DateTime.fromISO(saleDate, { zone: "utc" }).toLocaleString(
    DateTime.DATE_MED as LocaleOptions,
  )
}
