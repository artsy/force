import { Box, GridColumns, Column, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"

export const SignupStats = () => {
  return (
    <AppContainer>
      <Box mx="auto" maxWidth="1200px">
        <GridColumns textAlign="center" gridRowGap={[4, 2]}>
          <Column span={[12, 4]}>
            <Text variant="sm"> Stat 1 (DI-91) </Text>
          </Column>
          <Column span={[12, 4]}>
            <Text variant="sm"> Stat 2 (DI-91)</Text>
          </Column>
          <Column span={[12, 4]}>
            <Text variant="sm"> Stat 3 (DI-91) </Text>
          </Column>
        </GridColumns>
      </Box>
    </AppContainer>
  )
}
