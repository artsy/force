import { Button, Flex, Pill } from "@artsy/palette"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { useActiveFilterPills } from "Components/SavedSearchAlert/useActiveFilterPills"
import type { FC } from "react"

export type ArtworkFilterActiveFiltersProps = {}

export const ArtworkFilterActiveFilters: FC<
  React.PropsWithChildren<ArtworkFilterActiveFiltersProps>
> = () => {
  const { pills, removePill } = useActiveFilterPills()

  const { resetFilters } = useArtworkFilterContext()

  if (pills.length === 0) {
    return null
  }

  return (
    <Flex flexWrap="wrap" data-testid="artworkGridFilterPills" gap={1}>
      {pills.map(pill => {
        const key = [pill.field, pill.value].join(":")
        return (
          <Pill
            key={key}
            variant="gray"
            selected
            onClick={() => removePill(pill)}
          >
            {pill.displayValue}
          </Pill>
        )
      })}

      <Button variant="tertiary" size="small" onClick={resetFilters}>
        Clear all
      </Button>
    </Flex>
  )
}
