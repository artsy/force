import * as React from "react"
import { Box, Column, GridColumns, Toasts, useToasts } from "@artsy/palette"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { AppContainer } from "./AppContainer"
import { Z } from "./constants"

interface AppToastsProps {
  accomodateNav: boolean
}

export const AppToasts: React.FC<AppToastsProps> = ({ accomodateNav }) => {
  const { height } = useNavBarHeight()
  const { toasts } = useToasts()

  if (toasts.length === 0) return null

  return (
    <Box
      position="fixed"
      zIndex={Z.toasts}
      top={accomodateNav ? height : 0}
      left={0}
      width="100%"
    >
      <AppContainer px={[2, 4]} py={1}>
        <GridColumns>
          <Column span={4} start={5}>
            <Toasts />
          </Column>
        </GridColumns>
      </AppContainer>
    </Box>
  )
}
