import {
  Box,
  Clickable,
  Flex,
  InfoCircleIcon,
  Text,
  TimerIcon,
  Tooltip,
} from "@artsy/palette"
import { AuctionResultPrice_auctionResult$key } from "__generated__/AuctionResultPrice_auctionResult.graphql"
import { DateTime } from "luxon"
import { graphql, useFragment } from "react-relay"

interface AuctionResultPriceProps {
  auctionResult: AuctionResultPrice_auctionResult$key
}

export const AuctionResultPrice: React.FC<AuctionResultPriceProps> = ({
  auctionResult,
}) => {
  const data = useFragment(auctionResultPriceFragment, auctionResult)

  const {
    priceRealized,
    currency,
    boughtIn,
    estimate,
    isUpcoming,
    performance,
    saleDate,
  } = data

  if (isUpcoming) {
    return (
      <Box>
        <Text variant="xs">Pre-sale Estimate</Text>
        <Text variant="lg-display">
          {estimate?.display ? (
            estimate?.display
          ) : (
            <i>Estimate not available</i>
          )}
        </Text>
      </Box>
    )
  }

  const dateOfSale = DateTime.fromISO(saleDate!, { zone: "utc" })

  const awaitingResult = dateOfSale.plus({ month: 1 }) > DateTime.local()
  const showPriceUSD = priceRealized?.displayUSD && currency !== "USD"

  const salePrice = priceRealized?.display

  return (
    <Box>
      <Flex>
        <Text variant="xs">Sale Price</Text>

        <Tooltip
          placement="bottom-start"
          content="The sale price includes the hammer price and buyer's premium, as well as any other additional fees (e.g., Artist's Resale Rights)."
        >
          <Clickable ml={0.5} style={{ lineHeight: 0 }}>
            <InfoCircleIcon fill="black60" />
          </Clickable>
        </Tooltip>
      </Flex>

      {salePrice && (
        <>
          <Flex>
            <Text variant="lg-display">{salePrice}</Text>

            <AuctionResultPerformance value={performance?.mid!} />
          </Flex>
          {showPriceUSD && (
            <Text variant="sm" color="black60">
              {priceRealized?.displayUSD}
            </Text>
          )}
        </>
      )}

      {!salePrice && boughtIn && (
        <Text variant="lg-display">
          <i>Bought In</i>
        </Text>
      )}

      {!salePrice && awaitingResult && !boughtIn && (
        <Flex alignItems="center">
          <TimerIcon fill="black100" width={23} height={23} mr={0.5} />
          <Text variant="lg-display">
            <i>Awaiting results</i>
          </Text>
        </Flex>
      )}

      {!salePrice && !boughtIn && !awaitingResult && (
        <Text variant="lg-display">
          <i>Price not available</i>
        </Text>
      )}
    </Box>
  )
}

const AuctionResultPerformance = ({ value }) => {
  if (!value) {
    return null
  }

  const sign = value[0] === "-" ? "-" : "+"
  const color = value[0] === "-" ? "red100" : "green100"
  const text = value[0] === "-" ? value.slice(1) : value

  return (
    <Text variant="lg-display" color={color} ml={2}>
      {sign}
      {text} est
    </Text>
  )
}

const auctionResultPriceFragment = graphql`
  fragment AuctionResultPrice_auctionResult on AuctionResult {
    saleDate
    currency
    boughtIn
    isUpcoming
    performance {
      mid
    }
    estimate {
      display
    }
    priceRealized {
      display
      displayUSD
    }
  }
`
