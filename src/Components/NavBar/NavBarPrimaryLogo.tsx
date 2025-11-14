import { RouterLink, type RouterLinkProps } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import ArtsyMarkIcon from "@artsy/icons/ArtsyMarkIcon"
import { themeGet } from "@styled-system/theme-get"
import type * as React from "react"
import styled from "styled-components"

export const NavBarPrimaryLogo: React.FC<
  React.PropsWithChildren<Omit<RouterLinkProps, "to" | "ref">>
> = props => {
  const { match } = useRouter()
  const { isEigen } = useSystemContext()

  return (
    <HitArea
      onClick={event => {
        if (match.location.pathname.includes("/order") && isEigen) {
          event.preventDefault()
        }
      }}
      to="/"
      {...props}
      aria-label="Artsy"
    >
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
