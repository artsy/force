import { ContextModule, Intent } from "@artsy/cohesion"
import {
  Box,
  Clickable,
  Column,
  Flex,
  GridColumns,
  Image,
  NoArtworkIcon,
  ResponsiveBox,
  Spacer,
  Text,
  TimerIcon,
} from "@artsy/palette"
import { ArtistAuctionResultItem_auctionResult$data } from "__generated__/ArtistAuctionResultItem_auctionResult.graphql"
import { SystemContextProps, useSystemContext } from "System"
import { ModalType } from "Components/Authentication/Types"
import { DateTime, LocaleOptions } from "luxon"
import { createFragmentContainer, graphql } from "react-relay"
import { openAuthModal } from "Utils/openAuthModal"
import { AuctionResultPerformance } from "Components/AuctionResultPerformance"

export interface Props extends SystemContextProps {
  auctionResult: ArtistAuctionResultItem_auctionResult$data
  filtersAtDefault: boolean
  showArtistName?: boolean
}

export const ArtistAuctionResultItem: React.FC<Props> = props => {
  const {
    showArtistName,
    auctionResult: {
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

  return (
    <Box width="100%">
      <GridColumns>
        <Column span={[4, 2]}>
          <ResponsiveBox
            aspectWidth={1}
            aspectHeight={1}
            maxWidth={130}
            bg="black10"
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
                <NoArtworkIcon height={24} width={24} fill="black60" />
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
              <Text variant="xs" color="black60" lineClamp={1}>
                {mediumText}
              </Text>
            )}

            {dimension_text && (
              <Text variant="xs" color="black60" lineClamp={1}>
                {dimension_text}
              </Text>
            )}

            <Spacer y={1} />

            <Text variant="xs" color="black60" lineClamp={1}>
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
              ", " + date_text}
          </Text>

          {mediumText !== "Unknown" && (
            <Text variant="xs" color="black60">
              {mediumText}
            </Text>
          )}

          {dimension_text && (
            <Text variant="xs" color="black60">
              {dimension_text}
            </Text>
          )}
        </Column>

        <Column span={3} display={["none", "block"]}>
          <Text variant="sm-display">{dateOfSale}</Text>

          <Text variant="xs" color="black60">
            {organization}
            {!!location && ` • ${location}`}
          </Text>

          <Text variant="xs" color="black60">
            {saleTitle}
          </Text>

          <Text variant="xs" color="black60">
            Lot {lotNumber}
          </Text>
        </Column>

        <Column span={3} display={["none", "flex"]} justifyContent="flex-end">
          <ArtistAuctionResultItemPrice {...props} />
        </Column>
      </GridColumns>
    </Box>
  )
}

export const ArtistAuctionResultItemFragmentContainer = createFragmentContainer(
  ArtistAuctionResultItem,
  {
    auctionResult: graphql`
      fragment ArtistAuctionResultItem_auctionResult on AuctionResult {
        title
        dimension_text: dimensionText
        organization
        artist {
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
  }
)

const ArtistAuctionResultItemPrice: React.FC<Props> = props => {
  const {
    salePrice,
    salePriceUSD,
    auctionResult: { saleDate, currency, performance, boughtIn, isUpcoming },
    estimatedPrice,
  } = getProps(props)

  const { user, mediator } = useSystemContext()

  if (!user) {
    return (
      <Clickable
        alignSelf={"flex-start"}
        textDecoration="underline"
        onClick={() => {
          mediator &&
            openAuthModal(mediator, {
              mode: ModalType.signup,
              copy: "Sign up to see full auction records — for free",
              contextModule: ContextModule.auctionResults,
              intent: isUpcoming
                ? Intent.seeEstimateAuctionRecords
                : Intent.seePriceAuctionRecords,
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

  const dateOfSale = DateTime.fromISO(saleDate!, { zone: "utc" })
  const awaitingResults = dateOfSale > DateTime.local()
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

      {!salePrice && awaitingResults && (
        <Flex flexDirection="row" justifyContent="flex-end" alignItems="center">
          <TimerIcon fill="black100" width={16} height={16} />

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
        <Text variant="xs" color="black60" display={["none", "block"]}>
          {estimatedPrice} (est)
        </Text>
      )}
      <AuctionResultPerformance value={performance?.mid!} />
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

const getDisplaySaleDate = (saleDate: string | null) => {
  if (!saleDate) return null

  return DateTime.fromISO(saleDate, { zone: "utc" }).toLocaleString(
    DateTime.DATE_MED as LocaleOptions
  )
}
