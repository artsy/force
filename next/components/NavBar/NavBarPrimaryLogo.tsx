import React from "react"
import { ArtsyMarkIcon, Box, color, space } from "@artsy/palette"
import styled from "styled-components"

const HitArea = styled(Box)`
  display: flex;
  align-items: center;

  > svg {
    box-sizing: content-box;
    padding: ${space(0.3)}px;
    border: 1px solid transparent;
  }

  &:focus {
    outline: none;

    > svg {
      border-color: ${color("purple100")};
    }
  }
`

export const NavBarPrimaryLogo: React.FC = props => {
  return (
    <HitArea {...props}>
      <ArtsyMarkIcon height={40} width={40} name="Artsy" />
    </HitArea>
  )
}

NavBarPrimaryLogo.displayName = "NavBarPrimaryLogo"
