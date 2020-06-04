import { Box, Flex, Sans, space } from "@artsy/palette"
import { Badge_artwork } from "v2/__generated__/Badge_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { get } from "v2/Utils/get"

interface BadgeProps {
  artwork: Badge_artwork
  width?: number // for smaller images, we have a tweaked layout
}

const MIN_IMAGE_SIZE = 150

class Badge extends React.Component<BadgeProps> {
  get stackedLayout() {
    // During the SSR render pass we don't have access to window pixel data so
    // default to high density screen.
    const devicePixelRatio =
      typeof window === "undefined" ? 2 : window.devicePixelRatio

    return get(
      this.props,
      p => p.width / devicePixelRatio < MIN_IMAGE_SIZE,
      false
    )
  }

  render() {
    const { artwork } = this.props
    const { is_biddable, sale } = artwork
    const includeBidBadge = is_biddable || (sale && sale.is_preview)
    // E.g.(ENDS IN 59M)
    const saleTimingHint =
      sale && sale.display_timely_at ? ` (${sale.display_timely_at})` : ""
    return (
      <>
        <Badges flexDirection={this.stackedLayout ? "column" : "row"}>
          {includeBidBadge && (
            <Label>
              <Sans size="0">Bid{saleTimingHint}</Sans>
            </Label>
          )}
        </Badges>
      </>
    )
  }
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

const Label = styled(Box)`
  border-radius: 2px;
  letter-spacing: 0.3px;
  padding: 3px 5px 1px 6px;
  background-color: white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  margin-left: ${space(0.5)}px;
  margin-top: ${space(0.5)}px;
`

const Badges = styled(Flex)`
  position: absolute;
  bottom: 8px;
  left: 3px;
  pointer-events: none;
`
