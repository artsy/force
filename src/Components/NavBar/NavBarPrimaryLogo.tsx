import ArtsyMarkIcon from "@artsy/icons/ArtsyMarkIcon"
import { themeGet } from "@styled-system/theme-get"
import { RouterLink, type RouterLinkProps } from "System/Components/RouterLink"
import type * as React from "react"
import styled from "styled-components"

export const NavBarPrimaryLogo: React.FC<
  React.PropsWithChildren<Omit<RouterLinkProps, "to" | "ref">>
> = props => {
  return (
    <HitArea to="/" {...props} aria-label="Artsy">
      <ArtsyMarkIcon height={40} width={40} />
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

  &:focus-visible {
    outline: none;

    > svg {
      fill: ${themeGet("colors.brand")};
    }
  }
`
