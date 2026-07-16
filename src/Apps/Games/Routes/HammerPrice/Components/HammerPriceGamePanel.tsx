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
import { HAMMER_PRICE_MAX_GUESSES } from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import { RouterLink } from "System/Components/RouterLink"
import type { HammerPriceGamePanel_auctionResult$key } from "__generated__/HammerPriceGamePanel_auctionResult.graphql"
import { useReducer } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

export interface HammerPriceGamePanelProps {
  auctionResult: HammerPriceGamePanel_auctionResult$key
}

export const HammerPriceGamePanel: React.FC<
  React.PropsWithChildren<HammerPriceGamePanelProps>
> = ({ auctionResult }) => {
  const data = useFragment(FRAGMENT, auctionResult)

  const { trackEvent } = useTracking()

  const { guesses, status, digitCount, isPlayable, submitGuess } =
    useHammerPriceGame({ auctionResult: data })

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const isPlaying = status === "notStarted" || status === "inProgress"
  const isOver = status === "won" || status === "lost"
  const isRevealing = state.revealingRowIndex !== -1

  const handleSubmit = (digits: string) => {
    const result = submitGuess(digits)

    if (!result) {
      return
    }

    const guessNumber = guesses.length + 1
    const rowIndex = guesses.length
    const won = isWinningFeedback(result.feedback)
    const isFinalGuess = guessNumber >= HAMMER_PRICE_MAX_GUESSES

    trackEvent({
      action: "submittedHammerPriceGuess",
      context_module: "hammerPrice",
      puzzle_id: data.internalID,
      guess_number: guessNumber,
    })

    dispatch({
      type: "GUESS_SUBMITTED",
      payload: {
        rowIndex,
        announcement: describeGuessFeedback({
          digits: result.digits,
          feedback: result.feedback,
          guessNumber,
        }),
        completion: won || isFinalGuess ? { won, guessNumber } : null,
      },
    })
  }

  const handleRevealComplete = () => {
    const completion = state.pendingCompletion

    if (completion) {
      trackEvent({
        action: "completedHammerPriceGame",
        context_module: "hammerPrice",
        puzzle_id: data.internalID,
        won: completion.won,
        guess_count: completion.guessNumber,
      })
    }

    dispatch({ type: "REVEAL_COMPLETED" })
  }

  if (!isPlayable) {
    return (
      <Text variant="sm" color="mono60">
        This lot has no realized price to guess.{" "}
        <RouterLink to="/games/hammer-price">Play today’s puzzle</RouterLink>{" "}
        instead.
      </Text>
    )
  }

  return (
    <Stack gap={2}>
      <HammerPriceGuessBoard
        guesses={guesses}
        digitCount={digitCount}
        activeRowIndex={isPlaying ? guesses.length : null}
        revealingRowIndex={state.revealingRowIndex}
        disabled={isRevealing || isOver}
        onSubmit={handleSubmit}
        onRevealComplete={handleRevealComplete}
      />

      <Legend digitCount={digitCount} />

      {isOver && !isRevealing && (
        <Box>
          <Button
            variant="secondaryBlack"
            onClick={() => dispatch({ type: "RESULT_MODAL_OPENED" })}
          >
            <ShareIcon mr={1} />
            Share your results
          </Button>
        </Box>
      )}

      <VisuallyHidden as="output" aria-live="polite">
        {state.announcement}
      </VisuallyHidden>

      {state.isResultModalOpen && isOver && (
        <HammerPriceResultModal
          auctionResult={data}
          guesses={guesses}
          status={status}
          onClose={() => dispatch({ type: "RESULT_MODAL_CLOSED" })}
        />
      )}
    </Stack>
  )
}

interface PendingCompletion {
  won: boolean
  guessNumber: number
}

interface State {
  /** Screen-reader announcement for the latest game event */
  announcement: string
  /** The row currently playing its flipboard reveal, or -1 when none */
  revealingRowIndex: number
  isResultModalOpen: boolean
  /** Set at submit time, consumed when the reveal animation finishes */
  pendingCompletion: PendingCompletion | null
}

const INITIAL_STATE: State = {
  announcement: "",
  revealingRowIndex: -1,
  isResultModalOpen: false,
  pendingCompletion: null,
}

type Action =
  | {
      type: "GUESS_SUBMITTED"
      payload: {
        rowIndex: number
        announcement: string
        completion: PendingCompletion | null
      }
    }
  | { type: "REVEAL_COMPLETED" }
  | { type: "RESULT_MODAL_OPENED" }
  | { type: "RESULT_MODAL_CLOSED" }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "GUESS_SUBMITTED":
      return {
        ...state,
        revealingRowIndex: action.payload.rowIndex,
        announcement: action.payload.announcement,
        pendingCompletion: action.payload.completion,
      }

    case "REVEAL_COMPLETED": {
      const completion = state.pendingCompletion

      if (!completion) {
        return { ...state, revealingRowIndex: -1 }
      }

      return {
        ...state,
        revealingRowIndex: -1,
        pendingCompletion: null,
        isResultModalOpen: true,
        announcement: completion.won
          ? "You solved the puzzle!"
          : "Game over. Out of guesses.",
      }
    }

    case "RESULT_MODAL_OPENED":
      return { ...state, isResultModalOpen: true }

    case "RESULT_MODAL_CLOSED":
      return { ...state, isResultModalOpen: false }
  }
}

interface LegendProps {
  digitCount: number
}

const Legend: React.FC<React.PropsWithChildren<LegendProps>> = ({
  digitCount,
}) => {
  return (
    <Flex gap={2} flexWrap="wrap">
      <Tooltip
        content={`Enter your guess in US dollars — all ${digitCount} digits, leading zeroes included. Press Enter to submit.`}
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

const FRAGMENT = graphql`
  fragment HammerPriceGamePanel_auctionResult on AuctionResult {
    internalID
    ...useHammerPriceGame_auctionResult
    ...HammerPriceResultModal_auctionResult
  }
`
