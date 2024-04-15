import { Flex, Label } from "@artsy/palette"
import { Badge_artwork$data } from "__generated__/Badge_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"

interface BadgeProps {
  artwork: Badge_artwork$data
  width?: number // for smaller images, we have a tweaked layout
}

const MIN_IMAGE_SIZE = 150

const Badge: React.FC<BadgeProps> = ({ artwork, width }) => {
  const { isAuctionArtwork } = useArtworkGridContext()

  if (isAuctionArtwork) {
    return null
  }

  const { is_biddable, sale } = artwork
  const includeBidBadge = is_biddable || (sale && sale.is_preview)

  // E.g.(ENDS IN 59M)
  const saleTimingHint =
    sale && sale.display_timely_at ? ` (${sale.display_timely_at})` : ""

  const isStackedLayout = (() => {
    // During the SSR render pass we don't have access to window pixel data so
    // default to high density screen.
    const devicePixelRatio =
      typeof window === "undefined" ? 2 : window.devicePixelRatio

    if (width) {
      return width / devicePixelRatio < MIN_IMAGE_SIZE
    } else {
      return false
    }
  })()

  if (!includeBidBadge) {
    return null
  }

  return (
    <Badges
      flexDirection={isStackedLayout ? "column" : "row"}
      position="absolute"
      overflow="hidden"
      left={1}
      right={1}
      bottom={1}
    >
      <Label>Bid{saleTimingHint}</Label>
    </Badges>
  )
}

export default createFragmentContainer(Badge, {
  artwork: graphql`
    fragment Badge_artwork on Artwork {
      is_biddable: isBiddable
      href
      sale {
        is_preview: isPreview
        display_timely_at: displayTimelyAt
      }
    }
  `,
})

const Badges = styled(Flex)`
  pointer-events: none;
`
