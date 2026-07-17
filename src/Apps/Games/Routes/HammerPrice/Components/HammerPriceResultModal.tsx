import { Button, ModalDialog, Stack, Text, THEME } from "@artsy/palette"
import type { SubmittedGuess } from "Apps/Games/Routes/HammerPrice/Hooks/useHammerPriceGame"
import {
  buildShareText,
  feedbackToEmojiRow,
} from "Apps/Games/Routes/HammerPrice/Utils/shareText"
import { getENV } from "Utils/getENV"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import type { HammerPriceResultModal_auctionResult$key } from "__generated__/HammerPriceResultModal_auctionResult.graphql"
import { useEffect, useMemo, useState } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

type ShareTarget = "result" | "resultWithLink"

export interface HammerPriceResultModalProps {
  auctionResult: HammerPriceResultModal_auctionResult$key
  guesses: SubmittedGuess[]
  status: "won" | "lost"
  onClose: () => void
}

export const HammerPriceResultModal: React.FC<
  React.PropsWithChildren<HammerPriceResultModalProps>
> = ({ auctionResult, guesses, status, onClose }) => {
  const data = useFragment(FRAGMENT, auctionResult)

  const { trackEvent } = useTracking()
  const [copied, setCopied] = useState<ShareTarget | null>(null)

  // On mobile, prefer the native share sheet over copying to the clipboard.
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function",
    )
  }, [])

  const useNativeShare = !!isMobile && canNativeShare

  const won = status === "won"

  const displayUSD = data.priceRealized?.displayUSD
  const displayNative =
    data.currency && data.currency !== "USD"
      ? data.priceRealized?.display
      : null

  const handleShare = (target: ShareTarget) => async () => {
    const includeLink = target === "resultWithLink"
    const url = `${getENV("APP_URL")}/games/hammer-price/puzzles/${data.internalID}`

    // Spoiler-free body (no link); the URL is shared separately by the native
    // sheet, or appended for the clipboard fallback.
    const body = buildShareText({
      artistName: data.artist?.name ?? "Unknown artist",
      title: data.title ?? "Untitled",
      dateText: data.dateText,
      feedbacks: guesses.map(guess => guess.feedback),
      url,
      includeLink: false,
    })

    const fullText = includeLink ? `${body}\n\n${url}` : body

    // Prefer the native share sheet on mobile.
    if (useNativeShare) {
      try {
        await navigator.share({
          text: body,
          ...(includeLink ? { url } : {}),
        })

        trackEvent({
          action: "sharedHammerPriceResult",
          context_module: "hammerPrice",
          puzzle_id: data.internalID,
          with_link: includeLink,
          method: "native",
        })

        return
      } catch (error) {
        // The user dismissing the share sheet rejects with AbortError; there’s
        // nothing more to do. Any other failure falls back to copying below.
        if ((error as Error)?.name === "AbortError") {
          return
        }
      }
    }

    const didCopy = await copyToClipboard(fullText)

    if (!didCopy) {
      console.error("[HammerPrice] Unable to share or copy result")

      return
    }

    setCopied(target)
    setTimeout(() => setCopied(null), 2000)

    trackEvent({
      action: "copiedHammerPriceShareText",
      context_module: "hammerPrice",
      puzzle_id: data.internalID,
      with_link: includeLink,
      method: "clipboard",
    })
  }

  const headline = useMemo(() => {
    if (!won) {
      return "Better luck tomorrow"
    }

    if (guesses.length === 1) {
      return "Sold, on your first guess!"
    }

    return `Sold, in ${guesses.length} guesses!`
  }, [won, guesses.length])

  return (
    <ModalDialog onClose={onClose} title={headline} width={420}>
      <Stack gap={2}>
        <Text variant="sm-display" color="mono60">
          {data.artist?.name}, <i>{data.title}</i> realized{" "}
          <strong>{displayUSD}</strong>
          {displayNative && <> ({displayNative})</>} at auction
        </Text>

        <Text
          variant="sm"
          style={{ whiteSpace: "pre-line" }}
          aria-hidden="true"
          lineHeight="calc(1em + 1px)"
          letterSpacing="1px"
        >
          {guesses.map(guess => feedbackToEmojiRow(guess.feedback)).join("\n")}
        </Text>

        <Stack gap={1}>
          <Button
            variant="primaryBlack"
            width="100%"
            onClick={handleShare("resultWithLink")}
          >
            {copied === "resultWithLink"
              ? "Copied to clipboard"
              : "Share your result with link"}
          </Button>

          <Button
            variant="secondaryBlack"
            width="100%"
            onClick={handleShare("result")}
          >
            {copied === "result" ? "Copied to clipboard" : "Share your result"}
          </Button>
        </Stack>
      </Stack>
    </ModalDialog>
  )
}

/**
 * Copies text to the clipboard, falling back to a legacy selection-based copy
 * when the async Clipboard API is unavailable — notably in non-secure contexts
 * such as hitting a dev server over http from a phone, where `navigator.share`
 * and `navigator.clipboard` are both undefined. Returns whether it succeeded.
 */
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)

      return true
    }
  } catch {
    // Fall through to the legacy approach below.
  }

  try {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.setAttribute("readonly", "")
    textarea.style.position = "fixed"
    textarea.style.top = "-9999px"

    document.body.appendChild(textarea)
    textarea.select()

    const didCopy = document.execCommand("copy")

    document.body.removeChild(textarea)

    return didCopy
  } catch {
    return false
  }
}

const FRAGMENT = graphql`
  fragment HammerPriceResultModal_auctionResult on AuctionResult {
    internalID
    title
    dateText
    currency
    artist {
      name
    }
    priceRealized {
      display
      displayUSD
    }
  }
`
