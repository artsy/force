import { Box, Flex, Spacer, Stack, Text } from "@artsy/palette"
import {
  type HammerPriceGameStatus,
  deriveGameStatus,
} from "Apps/Games/Routes/HammerPrice/Utils/deriveGameStatus"
import {
  type HammerPriceGameProgress,
  hammerPriceProgressStore,
} from "Apps/Games/Routes/HammerPrice/Utils/gameProgressStore"
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
import { DateTime } from "luxon"
import { useEffect, useState } from "react"

export const HammerPriceIndexApp: React.FC = () => {
  const today = getTodayDateString()
  const puzzles = getBrowsablePuzzles({ today })

  // Progress lives in localStorage, so it is only read after mount to keep
  // server and client renders identical.
  const [progressByPuzzleId, setProgressByPuzzleId] = useState<
    Record<string, HammerPriceGameProgress>
  >({})

  useEffect(() => {
    const entries = hammerPriceProgressStore
      .listProgress()
      .map(progress => [progress.puzzleId, progress] as const)

    setProgressByPuzzleId(Object.fromEntries(entries))
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
                key={puzzle.id}
                puzzle={puzzle}
                isToday={puzzle.date === today}
                progress={progressByPuzzleId[puzzle.id]}
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
  const status = deriveGameStatus({
    puzzle,
    guesses: progress?.guesses ?? [],
  })

  const formattedDate = DateTime.fromISO(puzzle.date).toFormat("MMM d, yyyy")

  return (
    <RouterLink
      to={`/games/hammer-price/puzzles/${puzzle.slug}`}
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
          <Text variant="sm-display">
            #{getPuzzleNumber({ puzzle })} — {puzzle.artistName}
          </Text>

          <Text variant="xs" color="mono60">
            {puzzle.title} • {formattedDate}
            {isToday && " • Today’s puzzle"}
          </Text>
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
