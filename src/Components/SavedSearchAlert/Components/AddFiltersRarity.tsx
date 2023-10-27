import * as React from "react"
import { Box, Checkbox, Flex, Spacer, Text } from "@artsy/palette"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"

export const RARITY_OPTIONS = [
  {
    name: "Unique",
    value: "unique",
  },
  {
    name: "Limited Edition",
    value: "limited edition",
  },
  {
    name: "Open Edition",
    value: "open edition",
  },
  {
    name: "Unknown Edition",
    value: "unknown edition",
  },
]

export const AddFiltersRarity: React.FC = () => {
  const { criteria, setCriteriaValue } = useSavedSearchAlertContext()
  const { attributionClass = [] } = criteria

  const toggleSelection = (selected, name) => {
    let updatedValues = attributionClass || []

    if (selected) {
      updatedValues = [...updatedValues, name]
    } else {
      updatedValues = updatedValues.filter(item => item !== name)
    }
    setCriteriaValue("attributionClass", updatedValues)
  }
  return (
    <>
      <Text variant="sm-display">Rarity</Text>
      <Spacer y={2} />
      <Box style={{ columns: "2" }}>
        <Flex flexDirection="column">
          {RARITY_OPTIONS.map(({ name, value }, index) => {
            return (
              <Checkbox
                key={index}
                my={1}
                onSelect={selected => toggleSelection(selected, value)}
                selected={criteria.attributionClass?.includes(value)}
              >
                {name}
              </Checkbox>
            )
          })}
        </Flex>
      </Box>
    </>
  )
}
