import * as React from "react"
import { ArtsyMarkIcon } from "@artsy/palette"
import styled from "styled-components"
import { RouterLink, RouterLinkProps } from "System/Router/RouterLink"
import { themeGet } from "@styled-system/theme-get"

export const NavBarPrimaryLogo: React.FC<Omit<
  RouterLinkProps,
  "to" | "ref"
>> = props => {
  return (
    <HitArea to="/" {...props}>
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
  }

  &.focus-visible {
    outline: none;

    > svg {
      fill: ${themeGet("colors.brand")};
    }
  }
`
