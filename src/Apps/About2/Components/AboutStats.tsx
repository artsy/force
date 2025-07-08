import { Column, GridColumns, Text } from "@artsy/palette"

export const AboutStats = () => {
  return (
    <GridColumns textAlign={["left", "center"]} gridRowGap={[4, 2]}>
      <Column
        span={[12, 3]}
        start={[1, 2]}
        display="flex"
        flexDirection="column"
        gap={[1, 2]}
      >
        <Text variant={["xxl", "xxxl"]}>94K</Text>
        <Text variant="sm-display" color="mono60">
          Artists on Artsy
        </Text>
      </Column>

      <Column span={[12, 4]} display="flex" flexDirection="column" gap={[1, 2]}>
        <Text variant={["xxl", "xxxl"]}>1M+</Text>
        <Text variant="sm-display" color="mono60">
          Artworks Available
        </Text>
      </Column>

      <Column span={[12, 3]} display="flex" flexDirection="column" gap={[1, 2]}>
        <Text variant={["xxl", "xxxl"]}>3K</Text>
        <Text variant="sm-display" color="mono60">
          Partner Galleries and Auction Houses
        </Text>
      </Column>
    </GridColumns>
  )
}
