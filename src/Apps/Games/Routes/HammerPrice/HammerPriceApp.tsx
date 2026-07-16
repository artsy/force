import { Box, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { HammerPriceGamePanel } from "Apps/Games/Routes/HammerPrice/Components/HammerPriceGamePanel"
import { HammerPriceLotDetails } from "Apps/Games/Routes/HammerPrice/Components/HammerPriceLotDetails"
import { HammerPriceMeta } from "Apps/Games/Routes/HammerPrice/Components/HammerPriceMeta"
import {
  getPuzzleByAuctionResultId,
  getPuzzleNumber,
} from "Apps/Games/Routes/HammerPrice/Utils/puzzleSelection"
import { TopContextBar } from "Components/TopContextBar"
import type { HammerPriceApp_auctionResult$data } from "__generated__/HammerPriceApp_auctionResult.graphql"
import { DateTime } from "luxon"
import { createFragmentContainer, graphql } from "react-relay"

interface HammerPriceAppProps {
  auctionResult: HammerPriceApp_auctionResult$data
}

const HammerPriceApp: React.FC<
  React.PropsWithChildren<HammerPriceAppProps>
> = ({ auctionResult }) => {
  // Configured puzzles get a number and date; any other auction result plays
  // as an ad-hoc puzzle with just the plain header.
  const puzzle = getPuzzleByAuctionResultId({
    auctionResultId: auctionResult.internalID,
  })

  const puzzleNumber = getPuzzleNumber({
    auctionResultId: auctionResult.internalID,
  })

  return (
    <>
      <HammerPriceMeta auctionResult={auctionResult} />

      <TopContextBar displayBackArrow href="/games/hammer-price/puzzles">
        Browse all puzzles
      </TopContextBar>

      <Spacer y={2} />

      <Box pb={12}>
        <Box as="header" textAlign="center">
          <Text as="h1" variant="lg">
            Hammer Price
          </Text>

          {puzzle && (
            <Text variant="sm-display" color="mono60">
              Puzzle #{puzzleNumber} /{" "}
              {DateTime.fromISO(puzzle.date).toFormat("MMM d, yyyy")}
            </Text>
          )}
        </Box>

        <Spacer y={4} />

        <GridColumns gridRowGap={4}>
          <Column span={6}>
            <HammerPriceLotDetails auctionResult={auctionResult} />
          </Column>

          <Column span={6}>
            <HammerPriceGamePanel auctionResult={auctionResult} />
          </Column>
        </GridColumns>
      </Box>
    </>
  )
}

export const HammerPriceAppFragmentContainer = createFragmentContainer(
  HammerPriceApp,
  {
    auctionResult: graphql`
      fragment HammerPriceApp_auctionResult on AuctionResult {
        internalID
        ...HammerPriceMeta_auctionResult
        ...HammerPriceLotDetails_auctionResult
        ...HammerPriceGamePanel_auctionResult
      }
    `,
  },
)
