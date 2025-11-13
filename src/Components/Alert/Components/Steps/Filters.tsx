import { ArtistSeriesQueryRenderer } from "Components/Alert/Components/Filters/ArtistSeries"
import { Color } from "Components/Alert/Components/Filters/Color"
import { Medium } from "Components/Alert/Components/Filters/Medium"
import { PriceQueryRenderer } from "Components/Alert/Components/Filters/Price"
import { Rarity } from "Components/Alert/Components/Filters/Rarity"
import { WaysToBuy } from "Components/Alert/Components/Filters/WaysToBuy"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { FadeInBox } from "Components/FadeInBox"
import { Flex, Separator, Spacer, Text } from "@artsy/palette"
import type { FC } from "react"

export const Filters: FC<React.PropsWithChildren<unknown>> = () => {
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
