import { Box, GridColumns, Column, Text } from "@artsy/palette"

export const SignupStats = () => {
  return (
    <Box mx="auto">
      <GridColumns textAlign="center" gridRowGap={[4, 2]}>
        <Column span={[12, 4]}>
          <Text variant="xl"> 1.6M</Text>
          <Text variant="md"> Artworks available</Text>
        </Column>
        <Column span={[12, 4]}>
          <Text variant="xl"> 3.1K</Text>
          <Text variant="md"> Gallery partners</Text>
        </Column>
        <Column span={[12, 4]}>
          <Text variant="xl"> 3.4M</Text>
          <Text variant="md"> Artsy members</Text>
        </Column>
      </GridColumns>
    </Box>
  )
}
