import { Box } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { NavBar } from "Components/NavBar/NavBar"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { FC } from "react"
import { useSystemContext } from "System/Hooks/useSystemContext"

export const LayoutNav: FC = () => {
  const { isEigen } = useSystemContext()
  const { height: navBarHeight } = useNavBarHeight()

  if (isEigen) return null

  return (
    <Box
      // Occupy space for fixed position `NavBar`
      height={navBarHeight}
    >
      <Box left={0} position="fixed" width="100%" zIndex={Z.globalNav}>
        <NavBar />
      </Box>
    </Box>
  )
}
