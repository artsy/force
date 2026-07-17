import { Button, ModalDialog, Stack, Text } from "@artsy/palette"
import type { SubmittedGuess } from "Apps/Games/Routes/HammerPrice/Hooks/useHammerPriceGame"
import {
  HAMMER_PRICE_MAX_GUESSES,
  type HammerPricePuzzle,
} from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import { formatPrice } from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"
import { getPuzzleNumber } from "Apps/Games/Routes/HammerPrice/Utils/puzzleSelection"
import {
  buildShareText,
  feedbackToEmojiRow,
} from "Apps/Games/Routes/HammerPrice/Utils/shareText"
import { RouterLink } from "System/Components/RouterLink"
import { getENV } from "Utils/getENV"
import { useState } from "react"
import { useTracking } from "react-tracking"

export interface HammerPriceResultModalProps {
  puzzle: HammerPricePuzzle
  guesses: SubmittedGuess[]
  status: "won" | "lost"
  auctionResultHref: string
  onClose: () => void
}

export const HammerPriceResultModal: React.FC<
  React.PropsWithChildren<HammerPriceResultModalProps>
> = ({ puzzle, guesses, status, auctionResultHref, onClose }) => {
  const { trackEvent } = useTracking()
  const [copyMode, setCopyMode] = useState<"Idle" | "Copied">("Idle")

  const won = status === "won"
  const puzzleNumber = getPuzzleNumber({ puzzle })

  const shareText = buildShareText({
    puzzleNumber,
    feedbacks: guesses.map(guess => guess.feedback),
    won,
    url: `${getENV("APP_URL")}/games/hammer-price/puzzles/${puzzle.slug}`,
  })

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText)

      setCopyMode("Copied")
      setTimeout(() => setCopyMode("Idle"), 2000)

      trackEvent({
        action: "copiedHammerPriceShareText",
        context_module: "hammerPrice",
        puzzle_id: puzzle.id,
      })
    } catch (error) {
      console.error("[HammerPrice] Unable to copy share text", error)
    }
  }

  const getHeadline = () => {
    if (!won) {
      return "Better luck tomorrow"
    }

    if (guesses.length === 1) {
      return "Sold — on your first guess!"
    }

    return `Sold — in ${guesses.length} guesses!`
  }

  return (
    <ModalDialog onClose={onClose} title={getHeadline()} width={420}>
      <Stack gap={2}>
        <Text variant="sm" color="mono60">
          {puzzle.artistName}, <i>{puzzle.title}</i> realized
        </Text>

        <Text variant="xl">
          {formatPrice({
            price: puzzle.priceRealized,
            currency: puzzle.currency,
          })}
        </Text>

        <Text
          variant="sm"
          style={{ whiteSpace: "pre-line" }}
          aria-hidden="true"
        >
          {guesses.map(guess => feedbackToEmojiRow(guess.feedback)).join("\n")}
        </Text>

        <Text variant="xs" color="mono60">
          Hammer Price #{puzzleNumber} — {won ? guesses.length : "X"}/
          {HAMMER_PRICE_MAX_GUESSES}
        </Text>

        <Button variant="primaryBlack" width="100%" onClick={handleShare}>
          {copyMode === "Copied" ? "Copied to clipboard" : "Share your result"}
        </Button>

        <Text variant="xs" color="mono60">
          <RouterLink to={auctionResultHref}>
            View the full auction result
          </RouterLink>{" "}
          or{" "}
          <RouterLink to="/games/hammer-price/puzzles">
            browse more puzzles
          </RouterLink>
          .
        </Text>
      </Stack>
    </ModalDialog>
  )
}
