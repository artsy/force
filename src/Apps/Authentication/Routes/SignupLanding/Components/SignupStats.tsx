import { Box, GridColumns, Column, Text } from "@artsy/palette"
import { getFactsAndFigures } from "Utils/factsAndFigures"

const artworkCount = getFactsAndFigures("artworksCount", { format: "compact" })
const galleryCount = getFactsAndFigures("galleriesCount", { format: "compact" })

export const SignupStats = () => {
  return (
    <Box mx="auto">
      <GridColumns textAlign="center" gridRowGap={[4, 2]}>
        <Column span={[12, 4]}>
          <Text variant={["xl", "xxl"]}>{artworkCount}+</Text>
          <Text variant="sm-display" color="mono60">
            {" "}
            Artworks available
          </Text>
        </Column>
        <Column span={[12, 4]}>
          <Text variant={["xl", "xxl"]}>{galleryCount}+</Text>
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
