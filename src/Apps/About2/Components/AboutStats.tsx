import { Column, GridColumns, Text } from "@artsy/palette"

export const AboutStats = () => {
  return (
    <GridColumns textAlign={["left", "center"]}>
      <Column
        span={[12, 3]}
        start={[1, 2]}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Text variant={["xxl", "xxxl"]}>94K</Text>
        <Text variant="sm-display" color="mono60">
          Artists on Artsy
        </Text>
      </Column>

      <Column span={[12, 4]} display="flex" flexDirection="column" gap={2}>
        <Text variant={["xxl", "xxxl"]}>1M+</Text>
        <Text variant="sm-display" color="mono60">
          Artworks available
        </Text>
      </Column>

      <Column span={[12, 3]} display="flex" flexDirection="column" gap={2}>
        <Text variant={["xxl", "xxxl"]}>3K</Text>
        <Text variant="sm-display" color="mono60">
          Partner galleries and auction houses
        </Text>
      </Column>
    </GridColumns>
  )
}
