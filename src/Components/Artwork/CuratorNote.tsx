import { Clickable, ModalDialog, Text } from "@artsy/palette"
import { useState } from "react"

interface CuratorNoteProps {
  note: string
}

// The inline badge shows at most 2 lines. Notes longer than this are very likely
// truncated in the artwork metadata column, so surface a "Read more" cue. A length
// heuristic keeps this simple and avoids a measuring pass; it's good enough for a
// fixed-width card.
const READ_MORE_THRESHOLD = 80

/**
 * Renders a curator's note for an artwork within a marketing collection.
 *
 * The note is an edge-level field on `MarketingCollection.artworksConnection`
 * (not a field on the `Artwork` node), so it is passed in as a plain string
 * prop rather than via a Relay fragment. It is intentionally distinct from the
 * collector signal badge (`PrimaryLabelLine`) and renders directly above it.
 *
 * The inline badge is truncated; clicking it opens a dialog with the full note.
 */
export const CuratorNote: React.FC<CuratorNoteProps> = ({ note }) => {
  const [open, setOpen] = useState(false)

  if (!note) {
    return null
  }

  const handleClick = (event: React.MouseEvent) => {
    // The note sits inside the artwork metadata link — don't navigate to the
    // artwork when the note is clicked; open the dialog instead.
    event.preventDefault()
    event.stopPropagation()
    setOpen(true)
  }

  const showReadMore = note.length > READ_MORE_THRESHOLD

  return (
    <>
      <Clickable onClick={handleClick} alignSelf="flex-start" textAlign="left">
        <Text
          variant="xs"
          color="mono60"
          my="1px"
          style={{
            fontStyle: "italic",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          “{note}”
        </Text>

        {showReadMore && (
          <Text variant="xs" color="blue100" style={{ textDecoration: "underline" }}>
            Read more
          </Text>
        )}
      </Clickable>

      {open && (
        <ModalDialog title="Curator’s note" onClose={() => setOpen(false)}>
          <Text variant="sm">{note}</Text>
        </ModalDialog>
      )}
    </>
  )
}
