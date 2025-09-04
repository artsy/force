import { Column, GridColumns, Text } from "@artsy/palette"

export const AboutHeader = () => {
  return (
    <GridColumns>
      <Column
        span={[12, 8]}
        start={[1, 3]}
        textAlign="center"
        display="flex"
        gap={1}
        flexDirection="column"
      >
        <Text variant="lg-display" as="h2">
          About Artsy
        </Text>

        <Text variant={["xl", "xxl"]} as="h1">
          Artsy is the Leading Global Online Art Marketplace
        </Text>
      </Column>
    </GridColumns>
  )
}
