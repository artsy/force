import * as React from "react"
import { Box, Column, GridColumns, Toasts, useToasts } from "@artsy/palette"
import { AppContainer } from "./AppContainer"
import { Z } from "./constants"

export const AppToasts: React.FC = () => {
  const { toasts } = useToasts()

  if (toasts.length === 0) return null

  return (
    <Box position="fixed" zIndex={Z.toasts} bottom={4} left={0} width="100%">
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
