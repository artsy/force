import { Flex, Separator, Spacer, Text } from "@artsy/palette"
import React, { FC } from "react"
import { Rarity } from "Components/Alert/Components/Filters/Rarity"
import { Medium } from "Components/Alert/Components/Filters/Medium"
import { PriceQueryRenderer } from "Components/Alert/Components/Filters/Price"
import { WaysToBuy } from "Components/Alert/Components/Filters/WaysToBuy"
import { Color } from "Components/Alert/Components/Filters/Color"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { ArtistSeriesQueryRenderer } from "Components/Alert/Components/Filters/ArtistSeries"
import { FadeInBox } from "Components/FadeInBox"

export const Filters: FC = () => {
  const { state } = useAlertContext()

  return (
    <FadeInBox minWidth={[null, state.isEditMode ? null : 700]}>
      <Flex flexDirection="column" width="auto" p={2}>
        <Text variant="lg">Filters</Text>

        <Separator my={2} />
        <Medium />

        <Separator my={2} />
        <Rarity />

        <Separator my={2} />
        <PriceQueryRenderer />

        {/* no separator, in case null */}
        <ArtistSeriesQueryRenderer />

        <Separator my={2} />
        <WaysToBuy />

        <Separator my={2} />
        <Color />

        <Spacer y={2} />
      </Flex>
    </FadeInBox>
  )
}
