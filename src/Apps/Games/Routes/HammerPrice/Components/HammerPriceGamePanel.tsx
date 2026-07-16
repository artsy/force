import HelpIcon from "@artsy/icons/HelpIcon"
import ShareIcon from "@artsy/icons/ShareIcon"
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Tooltip,
  VisuallyHidden,
} from "@artsy/palette"
import { HammerPriceGuessBoard } from "Apps/Games/Routes/HammerPrice/Components/HammerPriceGuessBoard"
import { HammerPriceResultModal } from "Apps/Games/Routes/HammerPrice/Components/HammerPriceResultModal"
import { useHammerPriceGame } from "Apps/Games/Routes/HammerPrice/Hooks/useHammerPriceGame"
import { describeGuessFeedback } from "Apps/Games/Routes/HammerPrice/Utils/describeGuessFeedback"
import { isWinningFeedback } from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"
import {
  HAMMER_PRICE_DIGIT_COUNT,
  HAMMER_PRICE_MAX_GUESSES,
  type HammerPricePuzzle,
} from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import { useRef, useState } from "react"
import { useTracking } from "react-tracking"

export interface HammerPriceGamePanelProps {
  puzzle: HammerPricePuzzle
  dateText: string | null | undefined
}

interface PendingCompletion {
  won: boolean
  guessNumber: number
}

export const HammerPriceGamePanel: React.FC<
  React.PropsWithChildren<HammerPriceGamePanelProps>
> = ({ puzzle, dateText }) => {
  const { trackEvent } = useTracking()

  const { guesses, status, submitGuess } = useHammerPriceGame({
    puzzle,
  })

  const [announcement, setAnnouncement] = useState("")
  const [revealingRowIndex, setRevealingRowIndex] = useState(-1)
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)

  // Set at submit time, consumed when the row’s reveal animation finishes.
  const pendingCompletion = useRef<PendingCompletion | null>(null)

  const isPlaying = status === "notStarted" || status === "inProgress"
  const isOver = status === "won" || status === "lost"
  const isRevealing = revealingRowIndex !== -1

  const handleSubmit = (digits: string) => {
    const result = submitGuess(digits)

    if (!result) {
      return
    }

    const guessNumber = guesses.length + 1
    const rowIndex = guesses.length
    const won = isWinningFeedback(result.feedback)
    const isFinalGuess = guessNumber >= HAMMER_PRICE_MAX_GUESSES

    pendingCompletion.current =
      won || isFinalGuess ? { won, guessNumber } : null

    setRevealingRowIndex(rowIndex)

    trackEvent({
      action: "submittedHammerPriceGuess",
      context_module: "hammerPrice",
      puzzle_id: puzzle.id,
      guess_number: guessNumber,
    })

    setAnnouncement(
      describeGuessFeedback({
        digits: result.digits,
        feedback: result.feedback,
        guessNumber,
      }),
    )
  }

  const handleRevealComplete = () => {
    setRevealingRowIndex(-1)

    const completion = pendingCompletion.current
    pendingCompletion.current = null

    if (!completion) {
      return
    }

    trackEvent({
      action: "completedHammerPriceGame",
      context_module: "hammerPrice",
      puzzle_id: puzzle.id,
      won: completion.won,
      guess_count: completion.guessNumber,
    })

    setIsResultModalOpen(true)

    setAnnouncement(
      completion.won ? "You solved the puzzle!" : "Game over. Out of guesses.",
    )
  }

  return (
    <Stack gap={2}>
      <HammerPriceGuessBoard
        guesses={guesses}
        activeRowIndex={isPlaying ? guesses.length : null}
        revealingRowIndex={revealingRowIndex}
        disabled={isRevealing || isOver}
        onSubmit={handleSubmit}
        onRevealComplete={handleRevealComplete}
      />

      <Legend />

      {isOver && !isRevealing && (
        <Box>
          <Button
            variant="secondaryBlack"
            onClick={() => setIsResultModalOpen(true)}
          >
            <ShareIcon mr={1} />
            Share your results
          </Button>
        </Box>
      )}

      <VisuallyHidden as="output" aria-live="polite">
        {announcement}
      </VisuallyHidden>

      {isResultModalOpen && isOver && (
        <HammerPriceResultModal
          puzzle={puzzle}
          dateText={dateText}
          guesses={guesses}
          status={status}
          onClose={() => setIsResultModalOpen(false)}
        />
      )}
    </Stack>
  )
}

const Legend: React.FC = () => {
  return (
    <Flex gap={2} flexWrap="wrap">
      <Tooltip
        content={`Enter your guess in US dollars — all ${HAMMER_PRICE_DIGIT_COUNT} digits, leading zeroes included. Press Enter to submit.`}
      >
        <Box as="span" position="relative" top="1px">
          <HelpIcon ml={0.5} />
        </Box>
      </Tooltip>
      <LegendItem color="green100" label="Correct digit" />
      <LegendItem color="yellow100" label="Within 2" />
      <LegendItem color="mono10" label="Off by 3 or more" />
    </Flex>
  )
}

interface LegendItemProps {
  color: string
  label: string
}

const LegendItem: React.FC<React.PropsWithChildren<LegendItemProps>> = ({
  color,
  label,
}) => {
  return (
    <Flex alignItems="center" gap={0.5}>
      <Box width={12} height={12} bg={color} />

      <Text variant="xs" color="mono60">
        {label}
      </Text>
    </Flex>
  )
}
