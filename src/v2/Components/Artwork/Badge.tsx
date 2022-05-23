import { FLAT_SHADOW, Flex, Text } from "@artsy/palette"
import { Badge_artwork } from "v2/__generated__/Badge_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { useArtworkGridContext } from "../ArtworkGrid/ArtworkGridContext"

interface BadgeProps {
  artwork: Badge_artwork
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

  return (
    <Badges flexDirection={isStackedLayout ? "column" : "row"}>
      {includeBidBadge && (
        <Label
          bg="white100"
          borderRadius={2}
          fontSize={8}
          letterSpacing={0.3}
          lineHeight={1}
          mb={1}
          ml={1}
          px={0.5}
          py="2px"
          textTransform="uppercase"
        >
          Bid{saleTimingHint}
        </Label>
      )}
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

const Label = styled(Text)`
  box-shadow: ${FLAT_SHADOW};
`

const Badges = styled(Flex)`
  position: absolute;
  bottom: 0;
  left: 0;
  pointer-events: none;
`
