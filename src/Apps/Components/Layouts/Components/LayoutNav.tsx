import { Box } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { NavBar } from "Components/NavBar/NavBar"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { useSticky } from "Components/Sticky"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import type { FC } from "react"

export const LayoutNav: FC<React.PropsWithChildren<unknown>> = () => {
  const { isEigen } = useSystemContext()
  const { height, computedHeight } = useNavBarHeight()
  const { isGlobalNavRetracted } = useSticky()

  if (isEigen) return null

  return (
    <Box
      // Occupy space for fixed position `NavBar`
      height={height}
    >
      <Box
        left={0}
        position="fixed"
        top={0}
        width="100%"
        zIndex={Z.globalNav}
        style={{
          transform: isGlobalNavRetracted
            ? `translate3d(0, -${computedHeight}px, 0)`
            : "translate3d(0, 0, 0)",
          transition: "transform 250ms ease",
        }}
      >
        <NavBar />
      </Box>
    </Box>
  )
}
