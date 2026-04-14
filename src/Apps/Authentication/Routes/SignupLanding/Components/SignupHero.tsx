import { GridColumns, Column, Text, Box } from "@artsy/palette"

export const SignupHero = () => {
  return (
    <Box mx="auto" px={[2, 4]} py={[4, 6, 12]}>
      <GridColumns textAlign="center" gridRowGap={[6, 0]} gridColumnGap={4}>
        <Column span={[12, 6]}>
          <Text variant="sm"> Hero content (DI-90) </Text>
        </Column>
        <Column span={[12, 6]}>
          <Text variant="sm"> Signup form (DI-90) </Text>
        </Column>
      </GridColumns>
    </Box>
  )
}
