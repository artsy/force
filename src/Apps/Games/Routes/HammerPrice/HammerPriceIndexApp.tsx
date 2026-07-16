import { Box, Flex, SkeletonText, Spacer, Stack, Text } from "@artsy/palette"
import {
  deriveGameStatus,
  type HammerPriceGameStatus,
} from "Apps/Games/Routes/HammerPrice/Utils/deriveGameStatus"
import {
  type HammerPriceGameProgress,
  hammerPriceProgressStore,
} from "Apps/Games/Routes/HammerPrice/Utils/gameProgressStore"
import { realizedPriceToTargetDigits } from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"
import {
  getBrowsablePuzzles,
  getPuzzleNumber,
  getTodayDateString,
} from "Apps/Games/Routes/HammerPrice/Utils/puzzleSelection"
import {
  HAMMER_PRICE_MAX_GUESSES,
  type HammerPricePuzzle,
} from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import { MetaTags } from "Components/MetaTags"
import { RouterLink } from "System/Components/RouterLink"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import type { HammerPriceIndexAppPuzzleRowQuery } from "__generated__/HammerPriceIndexAppPuzzleRowQuery.graphql"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import { graphql } from "react-relay"

export const HammerPriceIndexApp: React.FC = () => {
  const today = getTodayDateString()
  const puzzles = getBrowsablePuzzles({ today })

  // Progress lives in localStorage, so it is only read after mount to keep
  // server and client renders identical.
  const [progressByAuctionResultId, setProgressByAuctionResultId] = useState<
    Record<string, HammerPriceGameProgress>
  >({})

  useEffect(() => {
    const entries = hammerPriceProgressStore
      .listProgress()
      .map(progress => [progress.auctionResultId, progress] as const)

    setProgressByAuctionResultId(Object.fromEntries(entries))
  }, [])

  return (
    <>
      <MetaTags
        title="Hammer Price — Browse Puzzles | Artsy"
        description="Guess the hammer price of a real auction result, digit by digit, in six tries. A new puzzle every day."
        pathname="/games/hammer-price/puzzles"
      />

      <Box mt={4}>
        <Text as="h1" variant="xl">
          Hammer Price
        </Text>

        <Text variant="sm" color="mono60">
          Guess the hammer price of a real auction result, digit by digit, in
          six tries. A new puzzle every day.
        </Text>

        <Spacer y={4} />

        <Stack gap={2}>
          {puzzles.map(puzzle => {
            return (
              <PuzzleRow
                key={puzzle.auctionResultId}
                puzzle={puzzle}
                isToday={puzzle.date === today}
                progress={progressByAuctionResultId[puzzle.auctionResultId]}
              />
            )
          })}
        </Stack>
      </Box>
    </>
  )
}

interface PuzzleRowProps {
  puzzle: HammerPricePuzzle
  isToday: boolean
  progress?: HammerPriceGameProgress
}

const PuzzleRow: React.FC<React.PropsWithChildren<PuzzleRowProps>> = ({
  puzzle,
  isToday,
  progress,
}) => {
  const { data, loading, error } =
    useClientQuery<HammerPriceIndexAppPuzzleRowQuery>({
      query: PUZZLE_ROW_QUERY,
      variables: { auctionResultId: puzzle.auctionResultId },
    })

  const auctionResult = data?.auctionResult

  const puzzleNumber = getPuzzleNumber({
    auctionResultId: puzzle.auctionResultId,
  })

  const formattedDate = DateTime.fromISO(puzzle.date).toFormat("MMM d, yyyy")

  const targetDigits = realizedPriceToTargetDigits(
    auctionResult?.priceRealized?.centsUSD,
  )

  const status: HammerPriceGameStatus = targetDigits
    ? deriveGameStatus({ targetDigits, guesses: progress?.guesses ?? [] })
    : "notStarted"

  return (
    <RouterLink
      to={`/games/hammer-price/puzzles/${puzzle.auctionResultId}`}
      textDecoration="none"
      display="block"
    >
      <Flex
        border="1px solid"
        borderColor="mono15"
        p={2}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <Box>
          {loading ? (
            <>
              <SkeletonText variant="sm-display">#0 — Artist Name</SkeletonText>

              <SkeletonText variant="xs">
                Artwork title • {formattedDate}
              </SkeletonText>
            </>
          ) : (
            <>
              <Text variant="sm-display">
                {puzzleNumber && `#${puzzleNumber} — `}
                {error || !auctionResult
                  ? "Unavailable"
                  : (auctionResult.artist?.name ?? "Unknown artist")}
              </Text>

              <Text variant="xs" color="mono60">
                {auctionResult?.title ?? "—"} • {formattedDate}
                {isToday && " • Today’s puzzle"}
              </Text>
            </>
          )}
        </Box>

        <StatusLabel
          status={status}
          guessCount={progress?.guesses.length ?? 0}
        />
      </Flex>
    </RouterLink>
  )
}

interface StatusLabelProps {
  status: HammerPriceGameStatus
  guessCount: number
}

const StatusLabel: React.FC<React.PropsWithChildren<StatusLabelProps>> = ({
  status,
  guessCount,
}) => {
  const getLabel = () => {
    if (status === "won") {
      return {
        text: `Solved ${guessCount}/${HAMMER_PRICE_MAX_GUESSES}`,
        color: "green100",
      }
    }

    if (status === "lost") {
      return { text: "Missed", color: "red100" }
    }

    if (status === "inProgress") {
      return {
        text: `In progress ${guessCount}/${HAMMER_PRICE_MAX_GUESSES}`,
        color: "blue100",
      }
    }

    return { text: "Not started", color: "mono60" }
  }

  const { text, color } = getLabel()

  return (
    <Text variant="xs" color={color} flexShrink={0}>
      {text}
    </Text>
  )
}

const PUZZLE_ROW_QUERY = graphql`
  query HammerPriceIndexAppPuzzleRowQuery($auctionResultId: String!) {
    auctionResult(id: $auctionResultId) {
      internalID
      title
      artist {
        name
      }
      priceRealized {
        centsUSD
      }
    }
  }
`
