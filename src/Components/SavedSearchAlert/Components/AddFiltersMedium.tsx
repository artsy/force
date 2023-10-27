import * as React from "react"
import { Box, Checkbox, Flex, Spacer, Text } from "@artsy/palette"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"

export const MEDIUM_OPTIONS = [
  { value: "painting", name: "Painting" },
  { value: "photography", name: "Photography" },
  { value: "sculpture", name: "Sculpture" },
  { value: "prints", name: "Prints" },
  { value: "work-on-paper", name: "Work on Paper" },
  { value: "nft", name: "NFT" },
  { value: "design", name: "Design" },
  { value: "drawing", name: "Drawing" },
  { value: "installation", name: "Installation" },
  { value: "film-slash-video", name: "Film/Video" },
  { value: "jewelry", name: "Jewelry" },
  { value: "performance-art", name: "Performance Art" },
  { value: "reproduction", name: "Reproduction" },
  { value: "ephemera-or-merchandise", name: "Ephemera or Merchandise" },
]

export const AddFiltersMedium: React.FC = () => {
  const { criteria, setCriteriaValue } = useSavedSearchAlertContext()
  const { additionalGeneIDs = [] } = criteria

  const toggleSelection = (selected, name) => {
    let updatedValues = additionalGeneIDs || []

    if (selected) {
      updatedValues = [...updatedValues, name]
    } else {
      updatedValues = updatedValues.filter(item => item !== name)
    }
    setCriteriaValue("additionalGeneIDs", updatedValues)
  }
  return (
    <>
      <Text variant="sm-display">Medium</Text>
      <Spacer y={2} />
      <Box style={{ columns: "2" }}>
        <Flex flexDirection="column">
          {MEDIUM_OPTIONS.map(({ name, value }, index) => {
            return (
              <Checkbox
                key={index}
                my={1}
                onSelect={selected => toggleSelection(selected, value)}
                selected={criteria.additionalGeneIDs?.includes(value)}
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
