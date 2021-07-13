import React from "react"
import { ArtsyMarkIcon, color, space } from "@artsy/palette"
import styled from "styled-components"
import { RouterLink } from "v2/System/Router/RouterLink"

export const NavBarPrimaryLogo: React.FC = () => {
  return (
    <HitArea to="/">
      <ArtsyMarkIcon height={40} width={40} name="Artsy" />
    </HitArea>
  )
}

NavBarPrimaryLogo.displayName = "NavBarPrimaryLogo"

const HitArea = styled(RouterLink)`
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
