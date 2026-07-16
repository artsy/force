import { Button, ModalDialog, Stack, Text } from "@artsy/palette"
import type { SubmittedGuess } from "Apps/Games/Routes/HammerPrice/Hooks/useHammerPriceGame"
import {
  buildShareText,
  feedbackToEmojiRow,
} from "Apps/Games/Routes/HammerPrice/Utils/shareText"
import { getENV } from "Utils/getENV"
import type { HammerPriceResultModal_auctionResult$key } from "__generated__/HammerPriceResultModal_auctionResult.graphql"
import { useMemo, useState } from "react"
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

  const won = status === "won"

  const displayUSD = data.priceRealized?.displayUSD
  const displayNative =
    data.currency && data.currency !== "USD"
      ? data.priceRealized?.display
      : null

  const handleShare = (target: ShareTarget) => async () => {
    const includeLink = target === "resultWithLink"

    const shareText = buildShareText({
      artistName: data.artist?.name ?? "Unknown artist",
      title: data.title ?? "Untitled",
      dateText: data.dateText,
      feedbacks: guesses.map(guess => guess.feedback),
      url: `${getENV("APP_URL")}/games/hammer-price/puzzles/${data.internalID}`,
      includeLink,
    })

    try {
      await navigator.clipboard.writeText(shareText)

      setCopied(target)
      setTimeout(() => setCopied(null), 2000)

      trackEvent({
        action: "copiedHammerPriceShareText",
        context_module: "hammerPrice",
        puzzle_id: data.internalID,
        with_link: includeLink,
      })
    } catch (error) {
      console.error("[HammerPrice] Unable to copy share text", error)
    }
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
