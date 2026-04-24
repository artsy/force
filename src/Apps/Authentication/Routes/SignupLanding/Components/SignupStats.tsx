import { Box, GridColumns, Column, Text } from "@artsy/palette"
import { FACTS_AND_FIGURES } from "Utils/factsAndFigures"

const formatCompact = (value: string) => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value.replace(/,/g, "")))
}

export const SignupStats = () => {
  return (
    <Box mx="auto">
      <GridColumns textAlign="center" gridRowGap={[4, 2]}>
        <Column span={[12, 4]}>
          <Text variant={["xl", "xxl"]}>
            {formatCompact(FACTS_AND_FIGURES.artworksCount)}+
          </Text>
          <Text variant="sm-display" color="mono60">
            {" "}
            Artworks available
          </Text>
        </Column>
        <Column span={[12, 4]}>
          <Text variant={["xl", "xxl"]}>
            {formatCompact(FACTS_AND_FIGURES.galleriesCount)}+
          </Text>
          <Text variant="sm-display" color="mono60">
            {" "}
            Gallery partners
          </Text>
        </Column>
        <Column span={[12, 4]}>
          <Text variant={["xl", "xxl"]}>3.4M</Text>
          <Text variant="sm-display" color="mono60">
            {" "}
            Artsy members
          </Text>
        </Column>
      </GridColumns>
    </Box>
  )
}
