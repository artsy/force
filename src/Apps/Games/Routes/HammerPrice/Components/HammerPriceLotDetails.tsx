import { Box, Flex, Join, Separator, Text } from "@artsy/palette"
import { AuctionResultImage } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultImage"
import { selectGameSafeLotFields } from "Apps/Games/Routes/HammerPrice/Utils/selectGameSafeLotFields"
import { RouterLink } from "System/Components/RouterLink"
import type { HammerPriceLotDetails_auctionResult$key } from "__generated__/HammerPriceLotDetails_auctionResult.graphql"
import { graphql, useFragment } from "react-relay"

const HAMMER_PRICE_ATTRIBUTION = "Source: Artsy Price Database"

export interface HammerPriceLotDetailsProps {
  auctionResult: HammerPriceLotDetails_auctionResult$key
}

/**
 * The auction record as shown *during play*. Which fields appear here is
 * decided centrally by selectGameSafeLotFields — this fragment intentionally
 * requests no price, estimate, or performance data.
 */
export const HammerPriceLotDetails: React.FC<
  React.PropsWithChildren<HammerPriceLotDetailsProps>
> = ({ auctionResult }) => {
  const data = useFragment(FRAGMENT, auctionResult)

  const artistName = data.artist?.name
  const title = data.title
  const dateText = data.dateText

  const fields = selectGameSafeLotFields({ lot: data })

  return (
    <Box>
      <AuctionResultImage auctionResult={data} />

      <Separator my={4} />

      <Box mt={2}>
        <Text as="h2" variant={["sm-display", "lg-display"]}>
          {artistName}

          <br />

          <Box as="span" color="mono60">
            {title?.trim()}
            {dateText &&
              dateText.replace(/\s+/g, "").length > 0 &&
              `, ${dateText}`}
          </Box>
        </Text>
      </Box>

      <Box mt={2}>
        <Join separator={<Separator my={1} />}>
          {fields.map(field => {
            return (
              <Field
                key={field.label}
                label={field.label}
                value={field.value}
              />
            )
          })}
        </Join>
      </Box>

      <Text
        variant="xs"
        color="mono60"
        mt={2}
        display="block"
        as={RouterLink}
        to={`/auction-result/${data.internalID}`}
      >
        {HAMMER_PRICE_ATTRIBUTION}
      </Text>
    </Box>
  )
}

interface FieldProps {
  label: string
  value: string | null
}

const Field: React.FC<React.PropsWithChildren<FieldProps>> = ({
  label,
  value,
}) => {
  return (
    <Flex justifyContent="space-between">
      <Text minWidth={128} color="mono60" variant="xs">
        {label}
      </Text>

      <Text color={value ? "mono100" : "mono60"} variant="xs" textAlign="right">
        {value || "—"}
      </Text>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment HammerPriceLotDetails_auctionResult on AuctionResult {
    internalID
    title
    dateText
    artist {
      name
    }
    formattedSaleDate: saleDate(format: "MMM DD, YYYY")
    mediumText
    dimensionText
    organization
    location
    saleTitle
    lotNumber
    currency
    ...AuctionResultImage_auctionResult
  }
`
