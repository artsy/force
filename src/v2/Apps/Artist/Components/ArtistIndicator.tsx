import React from "react"
import { Sans } from "@artsy/palette/dist/elements/Typography"
import { color } from "@artsy/palette/dist/helpers/color"
import { Flex } from "@artsy/palette/dist/elements/Flex"
import { AuctionIcon } from "@artsy/palette/dist/svgs/AuctionIcon"
import { BlueChipIcon } from "@artsy/palette/dist/svgs/BlueChipIcon"
import { EstablishedIcon } from "@artsy/palette/dist/svgs/EstablishedIcon"
import { TopEmergingIcon } from "@artsy/palette/dist/svgs/TopEmergingIcon"
import styled from "styled-components"
import { StyledLink } from "./StyledLink"

interface ArtistIndicatorProps {
  type: string
  label: string
  link: string
}

const ICON_MAPPING = {
  "high-auction": AuctionIcon,
  "blue-chip": BlueChipIcon,
  "top-established": EstablishedIcon,
  "top-emerging": TopEmergingIcon,
}

const RoundedFlex = styled(Flex)`
  border-radius: 100px;
`

export class ArtistIndicator extends React.Component<ArtistIndicatorProps> {
  renderIcon(insightType) {
    const Component = ICON_MAPPING[insightType]

    return <Component size="20px" pr={5} />
  }

  render() {
    const { label, type, link } = this.props

    return (
      <StyledLink to={link}>
        <RoundedFlex
          background={color("black5")}
          width="auto"
          py={5}
          px={10}
          mt={1}
        >
          {this.renderIcon(type)}
          <Sans pt="2px" size="2">
            {label}
          </Sans>
        </RoundedFlex>
      </StyledLink>
    )
  }
}
