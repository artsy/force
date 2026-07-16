import { Clickable, ModalDialog, Text } from "@artsy/palette"
import {
  ActionType,
  type ClickedCuratorNote,
  ContextModule,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useFlag } from "@unleash/proxy-client-react"
import { useState } from "react"
import { useTracking } from "react-tracking"

// NOTE: this Unleash flag must be created in the Unleash dashboard; confirm the
// exact name/prefix with the owning team's convention (e.g. `diamond_…`).
export const CURATORS_NOTES_FLAG = "curators-notes"

// The inline badge shows at most 2 lines. Notes longer than this are very likely
// truncated in the artwork metadata column, so surface a "Read more" cue.
const READ_MORE_THRESHOLD = 80

interface CuratorNoteProps {
  note: string
  artworkInternalID?: string
  artworkSlug?: string
}

/**
 * Renders a curator's note for an artwork within a marketing collection.
 *
 * The note is an edge-level field on `MarketingCollection.artworksConnection`
 * (not a field on the `Artwork` node), so it is passed in as a plain string
 * prop rather than via a Relay fragment. It is intentionally distinct from the
 * collector signal badge (`PrimaryLabelLine`) and renders directly above it.
 *
 * The inline badge is truncated; clicking it opens a dialog with the full note.
 * Gated behind the `curators-notes` Unleash flag.
 */
export const CuratorNote: React.FC<CuratorNoteProps> = ({
  note,
  artworkInternalID,
  artworkSlug,
}) => {
  const [open, setOpen] = useState(false)
  const enabled = useFlag(CURATORS_NOTES_FLAG)
  const { trackEvent } = useTracking()
  const {
    contextPageOwnerType,
    contextPageOwnerId,
    contextPageOwnerSlug,
  } = useAnalyticsContext()

  if (!note || !enabled) {
    return null
  }

  const showReadMore = note.length > READ_MORE_THRESHOLD

  const handleClick = (event: React.MouseEvent) => {
    // The note sits inside the artwork metadata link — don't navigate to the
    // artwork when the note is clicked; open the dialog instead.
    event.preventDefault()
    event.stopPropagation()

    const trackingEvent: ClickedCuratorNote = {
      action: ActionType.clickedCuratorNote,
      context_module: ContextModule.artworkGrid,
      context_page_owner_type: contextPageOwnerType as any,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      artwork_id: artworkInternalID,
      artwork_slug: artworkSlug,
    }
    trackEvent(trackingEvent)

    setOpen(true)
  }

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
