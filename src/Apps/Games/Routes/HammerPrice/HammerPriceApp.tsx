import { Box, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { HammerPriceGamePanel } from "Apps/Games/Routes/HammerPrice/Components/HammerPriceGamePanel"
import { HammerPriceLotDetails } from "Apps/Games/Routes/HammerPrice/Components/HammerPriceLotDetails"
import {
  getDailyPuzzle,
  getPuzzleBySlug,
  getPuzzleNumber,
  getTodayDateString,
} from "Apps/Games/Routes/HammerPrice/Utils/puzzleSelection"
import { MetaTags } from "Components/MetaTags"
import { TopContextBar } from "Components/TopContextBar"
import { useRouter } from "System/Hooks/useRouter"
import type { HammerPriceApp_auctionResult$data } from "__generated__/HammerPriceApp_auctionResult.graphql"
import { HttpError } from "found"
import { DateTime } from "luxon"
import { createFragmentContainer, graphql } from "react-relay"

interface HammerPriceAppProps {
  auctionResult: HammerPriceApp_auctionResult$data
}

const HammerPriceApp: React.FC<
  React.PropsWithChildren<HammerPriceAppProps>
> = ({ auctionResult }) => {
  const { match } = useRouter()

  const slug: string | undefined = match?.params?.slug

  const puzzle = slug
    ? getPuzzleBySlug({ slug })
    : getDailyPuzzle({ today: getTodayDateString() })

  if (!puzzle) {
    throw new HttpError(404)
  }

  const puzzleNumber = getPuzzleNumber({ puzzle })

  const formattedPuzzleDate = DateTime.fromISO(puzzle.date).toFormat(
    "MMM d, yyyy",
  )

  const pathname = slug
    ? `/games/hammer-price/puzzles/${slug}`
    : "/games/hammer-price"

  return (
    <>
      <MetaTags
        title={`Hammer Price #${puzzleNumber} | Artsy`}
        description="Guess the hammer price of a real auction result, digit by digit, in six tries. A new puzzle every day."
        pathname={pathname}
      />

      <TopContextBar displayBackArrow href="/games/hammer-price/puzzles">
        Browse all puzzles
      </TopContextBar>

      <Spacer y={2} />

      <Box pb={12}>
        <Box as="header" textAlign="center">
          <Text as="h1" variant="lg">
            Hammer Price
          </Text>

          <Text variant="sm-display" color="mono60">
            Puzzle #{puzzleNumber} / {formattedPuzzleDate}
          </Text>
        </Box>

        <Spacer y={4} />

        <GridColumns gridRowGap={4}>
          <Column span={6}>
            <HammerPriceLotDetails
              auctionResult={auctionResult}
              puzzle={puzzle}
            />
          </Column>

          <Column span={6}>
            <HammerPriceGamePanel
              puzzle={puzzle}
              auctionResultHref={`/auction-result/${auctionResult.internalID}`}
            />
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
        ...HammerPriceLotDetails_auctionResult
      }
    `,
  },
)
