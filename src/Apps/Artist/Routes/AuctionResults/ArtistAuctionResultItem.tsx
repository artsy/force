import { ContextModule, Intent, OwnerType } from "@artsy/cohesion"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Box,
  Button,
  Clickable,
  Collapse,
  Column,
  Flex,
  GridColumns,
  Image,
  ResponsiveBox,
  Text,
} from "@artsy/palette"
import { ArtistAuctionResultItem_auctionResult$data } from "__generated__/ArtistAuctionResultItem_auctionResult.graphql"
import { SystemContextProps, useSystemContext } from "System"
import { SystemContext } from "System"
import { ModalType } from "Components/Authentication/Types"
import { DateTime, LocaleOptions } from "luxon"
import { FC, useContext, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { openAuthModal } from "Utils/openAuthModal"
import { AuctionResultPerformance } from "Components/AuctionResultPerformance"
import { useRouter } from "System/Router/useRouter"
import { useAuctionResultsTracking } from "Apps/Artist/Routes/AuctionResults/Components/Hooks/useAuctionResultsTracking"

export interface Props extends SystemContextProps {
  expanded?: boolean
  auctionResult: ArtistAuctionResultItem_auctionResult$data
  filtersAtDefault: boolean
  showArtistName?: boolean
}

export const ArtistAuctionResultItem: FC<Props> = props => {
  const { trackClickedAuctionResultItem } = useAuctionResultsTracking()
  const { pathname } = useRouter().match.location

  const [expanded, setExpanded] = useState(false)

  const toggle = () => {
    const expand = !expanded

    setExpanded(!expanded)

    if (pathname.startsWith("/my-collection/artwork")) {
      trackClickedAuctionResultItem(
        expand,
        OwnerType.myCollectionArtworkInsights
      )
    } else if (pathname.startsWith("/settings/insights")) {
      trackClickedAuctionResultItem(expand, OwnerType.myCollectionInsights)
    } else {
      trackClickedAuctionResultItem(expand)
    }
  }

  return (
    <>
      <Clickable
        display="block"
        width="100%"
        border="1px solid"
        borderColor="black10"
        p={2}
        onClick={toggle}
      >
        <ArtistAuctionResultItemTop {...props} expanded={expanded} />
      </Clickable>

      <ArtistAuctionResultItemBottom {...props} expanded={expanded} />
    </>
  )
}

const ArtistAuctionResultItemTop: FC<Props> = props => {
  const {
    expanded,
    showArtistName,
    auctionResult: {
      images,
      date_text,
      organization,
      title,
      mediumText,
      saleDate,
      artist,
    },
  } = getProps(props)

  const dateOfSale = getDisplaySaleDate(saleDate)
  const image = images?.larger?.cropped
  const artistName = artist?.name

  return (
    <GridColumns>
      <Column span={2}>
        <ResponsiveBox
          aspectWidth={1}
          aspectHeight={1}
          maxWidth={100}
          bg="black10"
        >
          {image && (
            <Image
              src={image.src}
              srcSet={image.srcSet}
              width="100%"
              height="100%"
              alt=""
              lazyLoad
            />
          )}
        </ResponsiveBox>
      </Column>

      <Column span={4}>
        {!!showArtistName && <Text variant="sm-display">{artistName}</Text>}

        {showArtistName ? (
          <Text variant="sm-display" color="black60">
            <i>{title?.trim()}</i>
            {date_text &&
              date_text.replace(/\s+/g, "").length > 0 &&
              ", " + date_text}
          </Text>
        ) : (
          <Text variant="sm-display">
            {[title, date_text].filter(Boolean).join(", ")}
          </Text>
        )}

        {mediumText !== "Unknown" && (
          <Text variant="xs" color="black60" lineClamp={4}>
            {mediumText}
          </Text>
        )}
      </Column>

      <Column span={2}>
        <Text variant="sm-display">{dateOfSale}</Text>

        <Text variant="xs" color="black60">
          {organization}
        </Text>
      </Column>

      <Column span={4} display="flex" justifyContent="flex-end">
        <ArtistAuctionResultItemPrice {...props} />

        <Box ml={1}>
          {expanded ? (
            <ArrowUpIcon display="block" />
          ) : (
            <ArrowDownIcon display="block" />
          )}
        </Box>
      </Column>
    </GridColumns>
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
          larger {
            cropped(width: 100, height: 100) {
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
      }
    `,
  }
)

const ArtistAuctionResultItemPrice: FC<Props> = props => {
  const {
    filtersAtDefault,
    salePrice,
    salePriceUSD,
    auctionResult: { saleDate, currency, performance, boughtIn },
  } = getProps(props)

  const { user, mediator } = useContext(SystemContext)

  // If user is logged in we show prices
  if (user || filtersAtDefault) {
    const dateOfSale = DateTime.fromISO(saleDate!, { zone: "utc" })
    const awaitingResults = dateOfSale > DateTime.local()
    const showPriceUSD = salePriceUSD && currency !== "USD"

    return (
      <Box textAlign="right" mb={0.5} mr={0.5}>
        {salePrice && (
          <>
            <Flex>
              <Text variant="sm-display">{salePrice}</Text>

              {!!showPriceUSD && (
                <Text variant="xs" color="black60" ml={0.5}>
                  {salePriceUSD}
                </Text>
              )}
            </Flex>

            <Text variant="xs" color="black60">
              Realized price
            </Text>

            {/* TODO: */}
            <AuctionResultPerformance value={performance?.mid!} align="right" />
          </>
        )}

        {!salePrice && boughtIn && <Text variant="sm-display">Bought in</Text>}

        {!salePrice && awaitingResults && (
          <Text variant="sm-display">Awaiting results</Text>
        )}

        {!salePrice && !awaitingResults && !boughtIn && (
          <Text variant="sm-display">Price not available</Text>
        )}
      </Box>
    )
  }

  // Otherwise we show prices only when filters at default
  return (
    <Button
      size="small"
      variant="primaryGray"
      onClick={() => {
        mediator &&
          openAuthModal(mediator, {
            mode: ModalType.signup,
            copy: "Sign up to see full auction records — for free",
            contextModule: ContextModule.auctionResults,
            intent: Intent.seePriceAuctionRecords,
          })
      }}
    >
      Sign up to see price
    </Button>
  )
}

const ArtistAuctionResultItemBottom: FC<Props> = props => {
  const {
    expanded,
    auctionResult: { dimension_text, organization, saleDate, categoryText },
    salePrice,
    estimatedPrice,
    filtersAtDefault,
  } = getProps(props)

  const { user, mediator } = useSystemContext()

  const dateOfSale = getDisplaySaleDate(saleDate)

  return (
    <Collapse open={!!expanded}>
      <GridColumns border="1px solid" borderColor="black10" p={2} mt="-1px">
        <Column span={2}>
          <Text variant="xs">
            {categoryText !== "Unknown" ? "Artwork Info" : "Artwork Dimension"}
          </Text>
        </Column>

        <Column span={4}>
          <Text variant="xs">
            {categoryText !== "Unknown" && (
              <>
                {categoryText}
                <br />
              </>
            )}

            {dimension_text}
          </Text>
        </Column>

        <Column span={2}>
          <Text variant="xs">Estimate</Text>
        </Column>

        <Column span={4}>
          {user ? (
            <Text variant="xs">
              {estimatedPrice || "Estimate not available"}
            </Text>
          ) : (
            <Clickable
              textDecoration="underline"
              onClick={() => {
                mediator &&
                  openAuthModal(mediator, {
                    mode: ModalType.signup,
                    copy: "Sign up to see full auction records — for free",
                    contextModule: ContextModule.auctionResults,
                    intent: Intent.seeEstimateAuctionRecords,
                  })
              }}
            >
              <Text variant="xs">Sign up to see estimate</Text>
            </Clickable>
          )}
        </Column>

        <Column span={2}>
          <Text variant="xs">Auction Sale</Text>
        </Column>

        <Column span={4}>
          <Text variant="xs">
            {dateOfSale}
            <br />
            {organization}
          </Text>
        </Column>

        <Column span={2}>
          <Text variant="xs">Realized Price</Text>
        </Column>

        <Column span={4}>
          {user || filtersAtDefault ? (
            <Text variant="xs">{salePrice || "Price not available"}</Text>
          ) : (
            <Clickable
              textDecoration="underline"
              onClick={() => {
                mediator &&
                  openAuthModal(mediator, {
                    mode: ModalType.signup,
                    copy: "Sign up to see full auction records — for free",
                    contextModule: ContextModule.auctionResults,
                    intent: Intent.seeRealizedPriceAuctionRecords,
                  })
              }}
            >
              <Text variant="xs">Sign up to see realized price</Text>
            </Clickable>
          )}
        </Column>
      </GridColumns>
    </Collapse>
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
