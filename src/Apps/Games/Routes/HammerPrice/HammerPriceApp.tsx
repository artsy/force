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

  const overrides = puzzle.overrides ?? {}
  const artistName = overrides.artistName ?? puzzle.artistName
  const title = overrides.title ?? puzzle.title
  const dateText = overrides.dateText ?? auctionResult.dateText
  const metaImageURL = overrides.imageUrl ?? auctionResult.images?.larger?.url

  return (
    <>
      <MetaTags
        title={`${artistName}, ${title} | Hammer Price #${puzzleNumber} | Artsy`}
        socialTitle={`Guess the hammer price: ${artistName}, ${title} | Artsy`}
        description={`Can you guess what ${artistName}’s “${title}” sold for at auction? Six guesses, a new puzzle every day.`}
        imageURL={metaImageURL}
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
            <HammerPriceGamePanel puzzle={puzzle} dateText={dateText} />
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
        dateText
        images {
          larger {
            url(version: "larger")
          }
        }
        ...HammerPriceLotDetails_auctionResult
      }
    `,
  },
)
