import * as React from "react"
import { Box, Column, GridColumns, Toasts, useToasts } from "@artsy/palette"
import { AppContainer } from "./AppContainer"
import { Z } from "./constants"

export const AppToasts: React.FC = () => {
  const { toasts } = useToasts()

  if (toasts.length === 0) return null

  return (
    <Box
      position="fixed"
      zIndex={Z.toasts}
      bottom={0}
      left={0}
      width="100%"
      style={{ pointerEvents: "none" }}
    >
      <AppContainer px={[2, 4]} py={4}>
        <GridColumns>
          <Column span={4} start={5}>
            <Box style={{ pointerEvents: "auto" }}>
              <Toasts />
            </Box>
          </Column>
        </GridColumns>
      </AppContainer>
    </Box>
  )
}
