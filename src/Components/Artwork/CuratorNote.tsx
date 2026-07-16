import { Text } from "@artsy/palette"

interface CuratorNoteProps {
  note: string
}

/**
 * Renders a curator's note for an artwork within a marketing collection.
 *
 * The note is an edge-level field on `MarketingCollection.artworksConnection`
 * (not a field on the `Artwork` node), so it is passed in as a plain string
 * prop rather than via a Relay fragment. It is intentionally distinct from the
 * collector signal badge (`PrimaryLabelLine`) and is meant to render directly
 * above it.
 */
export const CuratorNote: React.FC<CuratorNoteProps> = ({ note }) => {
  if (!note) {
    return null
  }

  return (
    <Text
      variant="xs"
      color="mono60"
      overflowEllipsis
      alignSelf="flex-start"
      my="1px"
      style={{ fontStyle: "italic", whiteSpace: "nowrap" }}
    >
      “{note}”
    </Text>
  )
}
