import * as React from "react";
import { Box, Column, GridColumns, Toasts } from "@artsy/palette"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"
import { AppContainer } from "./AppContainer"

export const AppToasts: React.FC = () => {
  const { height } = useNavBarHeight()

  return (
    <Box position="fixed" zIndex={1} top={height} left={0} width="100%">
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
