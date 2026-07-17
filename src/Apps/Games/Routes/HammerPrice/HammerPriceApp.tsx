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
import { RouterLink } from "System/Components/RouterLink"
import { Analytics } from "System/Contexts/AnalyticsContext"
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
    <Analytics contextPageOwnerId={auctionResult.internalID}>
      <MetaTags
        title={`Hammer Price #${puzzleNumber} | Artsy`}
        description="Guess the hammer price of a real auction result, digit by digit, in six tries. A new puzzle every day."
        pathname={pathname}
      />

      <Box mt={4}>
        <Text as="h1" variant="xl">
          Hammer Price
        </Text>

        <Text variant="sm" color="mono60">
          Puzzle #{puzzleNumber} • {formattedPuzzleDate} •{" "}
          <RouterLink to="/games/hammer-price/puzzles">
            Browse all puzzles
          </RouterLink>
        </Text>

        <Spacer y={4} />

        <GridColumns gridRowGap={4}>
          <Column span={5}>
            <HammerPriceLotDetails
              auctionResult={auctionResult}
              puzzle={puzzle}
            />
          </Column>

          <Column span={6} start={7}>
            <HammerPriceGamePanel
              puzzle={puzzle}
              auctionResultHref={`/auction-result/${auctionResult.internalID}`}
            />
          </Column>
        </GridColumns>
      </Box>
    </Analytics>
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
