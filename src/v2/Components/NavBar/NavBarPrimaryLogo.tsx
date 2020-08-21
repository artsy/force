import React from "react"
import { ArtsyMarkBlackIcon } from "@artsy/palette/dist/svgs/ArtsyMarkBlackIcon"
import { space } from "@artsy/palette/dist/helpers/space"
import { color } from "@artsy/palette/dist/helpers/color"
import styled from "styled-components"
import { RouterLink, RouterLinkProps } from "v2/Artsy/Router/RouterLink"

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

export const NavBarPrimaryLogo: React.FC<Omit<
  Partial<RouterLinkProps>,
  "children"
>> = props => {
  return (
    <HitArea to="/" {...props}>
      <ArtsyMarkBlackIcon height={40} width={40} name="Artsy" />
    </HitArea>
  )
}

NavBarPrimaryLogo.displayName = "NavBarPrimaryLogo"
