import { Column, GridColumns, Text } from "@artsy/palette"

export const AboutTagline = () => {
  return (
    <GridColumns>
      <Column span={8} start={3}>
        <Text variant={["xxl", "xxl", "xxxl"]} textAlign="center">
          Discover and Buy Art That Moves You
        </Text>
      </Column>
    </GridColumns>
  )
}
