import { Flex, Text } from "@artsy/palette"
import { Badge_artwork } from "v2/__generated__/Badge_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
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
        <Label ml={1} mb={1}>
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
  background-color: ${themeGet("colors.white100")};
  border-radius: 2px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  font-size: 8px;
  letter-spacing: 0.3px;
  line-height: 1;
  padding: 2px 5px;
  text-transform: uppercase;
`

const Badges = styled(Flex)`
  position: absolute;
  bottom: 0;
  left: 0;
  pointer-events: none;
`
