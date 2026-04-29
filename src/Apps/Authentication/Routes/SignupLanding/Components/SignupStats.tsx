import { Column, GridColumns, Text } from "@artsy/palette"
import { getFactsAndFigures } from "Utils/factsAndFigures"

export const SignupStats = () => {
  return (
    <GridColumns
      textAlign="center"
      gridRowGap={[4, 2]}
      mx="auto"
      width="100%"
      pt={[0, 4]}
      pb={[2, 6]}
    >
      <Column span={[12, 4]}>
        <Text variant={["xl", "xxl"]}>
          {getFactsAndFigures("artworksCount", { format: "compact" })}+
        </Text>

        <Text variant="sm-display" color="mono60">
          Artworks available
        </Text>
      </Column>

      <Column span={[12, 4]}>
        <Text variant={["xl", "xxl"]}>
          {getFactsAndFigures("galleriesCount", { format: "compact" })}+
        </Text>

        <Text variant="sm-display" color="mono60">
          Gallery partners
        </Text>
      </Column>

      <Column span={[12, 4]}>
        <Text variant={["xl", "xxl"]}>
          {getFactsAndFigures("membersCount", { format: "compact" })}+
        </Text>

        <Text variant="sm-display" color="mono60">
          Artsy members
        </Text>
      </Column>
    </GridColumns>
  )
}
