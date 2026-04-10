import {
  Spacer,
  Box,
  GridColumns,
  Column,
  Text,
  FullBleed,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"

export const SignupValueProps = () => {
  return (
    <FullBleed bg="mono5" py={[6, 12]}>
      <AppContainer>
        <Text variant={["xl", "xxl"]} textAlign="center">
          Why Choose Artsy
        </Text>
        <Spacer y={4} />
        <Box mx="auto" maxWidth="1200px">
          <GridColumns textAlign="center" gridRowGap={4}>
            <Column span={[12, 4]}>
              <Text variant="sm"> Feature card 1 (DI-91)</Text>
            </Column>
            <Column span={[12, 4]}>
              <Text variant="sm"> Feature card 2 (DI-91)</Text>
            </Column>
            <Column span={[12, 4]}>
              <Text variant="sm"> Feature card 3 (DI-91)</Text>
            </Column>
          </GridColumns>
        </Box>
      </AppContainer>
    </FullBleed>
  )
}
