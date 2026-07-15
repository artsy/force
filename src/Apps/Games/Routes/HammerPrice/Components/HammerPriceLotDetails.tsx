import {
  Box,
  Flex,
  Image,
  Join,
  ResponsiveBox,
  Separator,
  Text,
} from "@artsy/palette"
import { AuctionResultImage } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultImage"
import { selectGameSafeLotFields } from "Apps/Games/Routes/HammerPrice/Utils/selectGameSafeLotFields"
import type { HammerPricePuzzle } from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import { RouterLink } from "System/Components/RouterLink"
import type { HammerPriceLotDetails_auctionResult$key } from "__generated__/HammerPriceLotDetails_auctionResult.graphql"
import { graphql, useFragment } from "react-relay"

export interface HammerPriceLotDetailsProps {
  auctionResult: HammerPriceLotDetails_auctionResult$key
  puzzle: HammerPricePuzzle
}

/**
 * The auction record as shown *during play*. Which fields appear here is
 * decided centrally by selectGameSafeLotFields — this fragment intentionally
 * requests no price, estimate, or performance data.
 */
export const HammerPriceLotDetails: React.FC<
  React.PropsWithChildren<HammerPriceLotDetailsProps>
> = ({ auctionResult, puzzle }) => {
  const data = useFragment(hammerPriceLotDetailsFragment, auctionResult)

  const overrides = puzzle.overrides ?? {}

  const artistName =
    overrides.artistName ?? data.artist?.name ?? puzzle.artistName
  const title = overrides.title ?? data.title ?? puzzle.title
  const dateText = overrides.dateText ?? data.dateText

  const fields = selectGameSafeLotFields({ lot: data, puzzle })

  return (
    <Box>
      {overrides.imageUrl ? (
        <ResponsiveBox
          bg="mono10"
          mx="auto"
          maxWidth={400}
          aspectWidth={1}
          aspectHeight={1}
        >
          <Image
            lazyLoad
            width="100%"
            height="100%"
            src={overrides.imageUrl}
            alt={title ?? ""}
            style={{ position: "relative", objectFit: "contain" }}
          />
        </ResponsiveBox>
      ) : (
        <AuctionResultImage auctionResult={data} />
      )}

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

      {puzzle.attribution && (
        <Text
          variant="xs"
          color="mono60"
          mt={2}
          display="block"
          as={RouterLink}
          to={`/auction-result/${data.internalID}`}
        >
          {puzzle.attribution}
        </Text>
      )}
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

const hammerPriceLotDetailsFragment = graphql`
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
    ...AuctionResultImage_auctionResult
  }
`
