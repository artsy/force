import { Box, Flex, Join, Separator, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { Rarity } from "Components/Alert/Components/Filters/Rarity"
import { Medium } from "Components/Alert/Components/Filters/Medium"
import { PriceQueryRenderer } from "Components/Alert/Components/Filters/Price"
import { WaysToBuy } from "Components/Alert/Components/Filters/WaysToBuy"
import { Color } from "Components/Alert/Components/Filters/Color"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { Size } from "Components/Alert/Components/Filters/Size"

export const Filters: FC = () => {
  const isMounted = useDidMount()

  return (
    <>
      <Box
        minWidth={[null, 700]}
        p={2}
        style={{
          ...(isMounted
            ? {
                opacity: 1,
                transition: "opacity 250ms",
              }
            : {
                opacity: 0,
              }),
        }}
      >
        <Flex flexDirection="column" width="auto">
          <Text variant="lg">Filters</Text>
          <Separator my={2} />
          <Join separator={<Separator my={2} />}>
            <Medium />
            <Rarity />
            <PriceQueryRenderer />
            <WaysToBuy />
            <Color />
          </Join>
          <Spacer y={6} />
        </Flex>
      </Box>
    </>
  )
}
