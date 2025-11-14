import { Flex, Spacer, Text } from "@artsy/palette"
import { getTotalCountLabel } from "Components/ArtworkFilter"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkSortFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtworkSortFilter"
import { Media } from "Utils/Responsive"
import type { FC } from "react"

export const ArtworkListArtworksGridHeader: FC<
  React.PropsWithChildren<unknown>
> = () => {
  const filterContext = useArtworkFilterContext()
  const totalCountLabel = getTotalCountLabel({
    total: `${filterContext.counts!.artworks}`,
    isAuctionArtwork: false,
  })

  return (
    <>
      {/* Mobile view */}
      <Media at="xs">
        <ArtworkSortFilter />

        <Spacer y={2} />

        <Text variant="sm" fontWeight="bold">
          {totalCountLabel}
        </Text>
      </Media>

      {/* Desktop view */}
      <Media greaterThan="xs">
        <Flex flexDirection="row" justifyContent="space-between">
          <Text variant="sm" fontWeight="bold">
            {totalCountLabel}
          </Text>

          <ArtworkSortFilter />
        </Flex>
      </Media>
    </>
  )
}
