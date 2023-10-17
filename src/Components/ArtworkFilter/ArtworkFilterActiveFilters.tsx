import { FC } from "react"
import { useActiveFilterPills } from "Components/SavedSearchAlert/useActiveFilterPills"
import { Flex, Pill } from "@artsy/palette"

export interface ArtworkFilterActiveFiltersProps {}

export const ArtworkFilterActiveFilters: FC<ArtworkFilterActiveFiltersProps> = () => {
  const { pills, removePill } = useActiveFilterPills()

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
    </Flex>
  )
}
