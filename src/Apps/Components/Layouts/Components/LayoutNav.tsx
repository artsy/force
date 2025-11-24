import { Box, THEME } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { NavBar } from "Components/NavBar/NavBar"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { useSticky } from "Components/Sticky"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import type { FC } from "react"
import styled from "styled-components"

export const LayoutNav: FC<React.PropsWithChildren<unknown>> = () => {
  const { isEigen } = useSystemContext()
  const { height: navBarHeight, mobile, desktop } = useNavBarHeight()
  const { isNavBarRetracted } = useSticky()
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)
  const navHeight = isMobile ? mobile : desktop

  if (isEigen) return null

  return (
    <Box
      // Occupy space for fixed position `NavBar`
      height={navBarHeight}
    >
      <NavWrapper
        $translate={isNavBarRetracted ? -navHeight : 0}
        left={0}
        position="fixed"
        width="100%"
        zIndex={Z.globalNav}
      >
        <NavBar />
      </NavWrapper>
    </Box>
  )
}

const NavWrapper = styled(Box)<{ $translate: number }>`
  transform: translateY(${({ $translate }) => `${$translate}px`});
  transition: transform 200ms ease;
  will-change: transform;
`
