import { hasSeparatorBefore } from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"
import type { DigitFeedback } from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"

const FEEDBACK_EMOJI: Record<DigitFeedback, string> = {
  exact: "🟩",
  close: "🟨",
  miss: "⬜",
}

/**
 * Renders a guess as an emoji row with thousands-separator commas at the same
 * positions as the digit grid, e.g. 🟩🟩,🟩🟩🟩,🟩🟩🟩 for an 8-digit price.
 */
export const feedbackToEmojiRow = (feedback: DigitFeedback[]): string => {
  const digitCount = feedback.length

  return feedback
    .map((status, index) => {
      const separator = hasSeparatorBefore({ index, digitCount }) ? "," : ""

      return `${separator}${FEEDBACK_EMOJI[status]}`
    })
    .join("")
}

export interface BuildShareTextParams {
  artistName: string
  title: string
  /** e.g. "1964"; omitted from the header when not available */
  dateText?: string | null
  /** Per-guess digit feedback, in submission order */
  feedbacks: DigitFeedback[][]
  url: string
  /** Whether to append the puzzle link */
  includeLink: boolean
}

/** "Hammer Price: Name, Title (Year)", or without the year when unavailable */
export const buildShareHeader = ({
  artistName,
  title,
  dateText,
}: Pick<BuildShareTextParams, "artistName" | "title" | "dateText">): string => {
  const year = dateText?.trim()

  return `Hammer Price: ${artistName}, ${title}${year ? ` (${year})` : ""}`
}

/**
 * Builds the spoiler-free share text: a "Hammer Price: Name, Title (Year)"
 * header followed by an emoji grid of the game’s digit feedback (no digits
 * or prices). The puzzle link is appended only when requested.
 */
export const buildShareText = ({
  artistName,
  title,
  dateText,
  feedbacks,
  url,
  includeLink,
}: BuildShareTextParams): string => {
  const header = buildShareHeader({ artistName, title, dateText })
  const grid = feedbacks.map(feedbackToEmojiRow).join("\n")
  const result = `${header}\n\n${grid}`

  return includeLink ? `${result}\n\n${url}` : result
}
