import { HAMMER_PRICE_MAX_GUESSES } from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import type { DigitFeedback } from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"

const FEEDBACK_EMOJI: Record<DigitFeedback, string> = {
  exact: "🟩",
  close: "🟨",
  miss: "⬜",
}

export const feedbackToEmojiRow = (feedback: DigitFeedback[]): string => {
  return feedback.map(status => FEEDBACK_EMOJI[status]).join("")
}

export interface BuildShareTextParams {
  puzzleNumber: number
  /** Per-guess digit feedback, in submission order */
  feedbacks: DigitFeedback[][]
  won: boolean
  url: string
}

/**
 * Builds the spoiler-free share text: an emoji grid of the game’s digit
 * feedback with no digits or prices included.
 */
export const buildShareText = ({
  puzzleNumber,
  feedbacks,
  won,
  url,
}: BuildShareTextParams): string => {
  const score = won ? String(feedbacks.length) : "X"
  const grid = feedbacks.map(feedbackToEmojiRow).join("\n")

  return `Hammer Price #${puzzleNumber} ${score}/${HAMMER_PRICE_MAX_GUESSES}\n\n${grid}\n\n${url}`
}
