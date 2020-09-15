import { Flex, Sans, color } from "@artsy/palette"
import React from "react"

import {
  AuctionIcon,
  BlueChipIcon,
  TopEmergingIcon,
  TopEstablishedIcon,
} from "@artsy/palette"
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
  "top-established": TopEstablishedIcon,
  "top-emerging": TopEmergingIcon,
}

const RoundedFlex = styled(Flex)`
  border-radius: 100px;
`

export class ArtistIndicator extends React.Component<ArtistIndicatorProps> {
  renderIcon(insightType) {
    const Component = ICON_MAPPING[insightType]

    return <Component size="20px" pr={0.5} />
  }

  render() {
    const { label, type, link } = this.props

    return (
      <StyledLink to={link}>
        <RoundedFlex
          background={color("black5")}
          width="auto"
          py={0.5}
          px={1}
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
