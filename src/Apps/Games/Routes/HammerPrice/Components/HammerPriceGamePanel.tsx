import { Box, Button, Flex, Stack, Text, VisuallyHidden } from "@artsy/palette"
import { HammerPriceGuessForm } from "Apps/Games/Routes/HammerPrice/Components/HammerPriceGuessForm"
import { HammerPriceGuessGrid } from "Apps/Games/Routes/HammerPrice/Components/HammerPriceGuessGrid"
import { HammerPriceResultModal } from "Apps/Games/Routes/HammerPrice/Components/HammerPriceResultModal"
import { useHammerPriceGame } from "Apps/Games/Routes/HammerPrice/Hooks/useHammerPriceGame"
import {
  HAMMER_PRICE_MAX_GUESSES,
  type HammerPricePuzzle,
} from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import { describeGuessFeedback } from "Apps/Games/Routes/HammerPrice/Utils/describeGuessFeedback"
import { formatPrice } from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"
import { isWinningFeedback } from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"
import { useState } from "react"
import { useTracking } from "react-tracking"

export interface HammerPriceGamePanelProps {
  puzzle: HammerPricePuzzle
  auctionResultHref: string
}

export const HammerPriceGamePanel: React.FC<
  React.PropsWithChildren<HammerPriceGamePanelProps>
> = ({ puzzle, auctionResultHref }) => {
  const { trackEvent } = useTracking()

  const { guesses, status, guessesRemaining, submitGuess } = useHammerPriceGame(
    { puzzle },
  )

  const [currentEntry, setCurrentEntry] = useState("")
  const [announcement, setAnnouncement] = useState("")
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)

  const isPlaying = status === "notStarted" || status === "inProgress"
  const isOver = status === "won" || status === "lost"

  const handleSubmit = () => {
    const result = submitGuess(currentEntry)

    if (!result) {
      return
    }

    const guessNumber = guesses.length + 1
    const won = isWinningFeedback(result.feedback)
    const isFinalGuess = guessNumber >= HAMMER_PRICE_MAX_GUESSES

    setCurrentEntry("")

    trackEvent({
      action: "submittedHammerPriceGuess",
      context_module: "hammerPrice",
      puzzle_id: puzzle.id,
      guess_number: guessNumber,
    })

    if (won || isFinalGuess) {
      trackEvent({
        action: "completedHammerPriceGame",
        context_module: "hammerPrice",
        puzzle_id: puzzle.id,
        won,
        guess_count: guessNumber,
      })

      setIsResultModalOpen(true)

      setAnnouncement(
        `${describeGuessFeedback({
          digits: result.digits,
          feedback: result.feedback,
          guessNumber,
        })} ${won ? "You solved the puzzle!" : "Game over."}`,
      )

      return
    }

    setAnnouncement(
      describeGuessFeedback({
        digits: result.digits,
        feedback: result.feedback,
        guessNumber,
      }),
    )
  }

  return (
    <Stack gap={2}>
      <Flex justifyContent="space-between" alignItems="baseline">
        <Text variant={["sm-display", "md"]}>Guess the hammer price</Text>

        {isPlaying && (
          <Text variant="xs" color="mono60">
            {guessesRemaining} {guessesRemaining === 1 ? "guess" : "guesses"}{" "}
            left
          </Text>
        )}
      </Flex>

      <HammerPriceGuessGrid
        puzzle={puzzle}
        guesses={guesses}
        currentEntry={currentEntry}
        isPlaying={isPlaying}
      />

      <Legend />

      {isPlaying && (
        <HammerPriceGuessForm
          digitCount={puzzle.digitCount}
          currency={puzzle.currency}
          value={currentEntry}
          onChange={setCurrentEntry}
          onSubmit={handleSubmit}
        />
      )}

      {isOver && (
        <Box>
          <Text variant="sm" mb={1}>
            {status === "won"
              ? `Solved in ${guesses.length} ${guesses.length === 1 ? "guess" : "guesses"}. The realized price was`
              : "Out of guesses. The realized price was"}{" "}
            <Text as="span" variant="sm" fontWeight="bold">
              {formatPrice({
                price: puzzle.priceRealized,
                currency: puzzle.currency,
              })}
            </Text>
            .
          </Text>

          <Button
            variant="secondaryBlack"
            width="100%"
            onClick={() => setIsResultModalOpen(true)}
          >
            View results
          </Button>
        </Box>
      )}

      <VisuallyHidden as="output" aria-live="polite">
        {announcement}
      </VisuallyHidden>

      {isResultModalOpen && isOver && (
        <HammerPriceResultModal
          puzzle={puzzle}
          guesses={guesses}
          status={status}
          auctionResultHref={auctionResultHref}
          onClose={() => setIsResultModalOpen(false)}
        />
      )}
    </Stack>
  )
}

const Legend: React.FC = () => {
  return (
    <Flex gap={2} flexWrap="wrap">
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
