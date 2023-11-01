import { Box, Checkbox, Flex, Spacer, Text } from "@artsy/palette"
import { FC } from "react"

import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"

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

export const Rarity: FC = () => {
  const { state, dispatch } = useAlertContext()
  const toggleSelection = (selected, name) => {
    let updatedValues = state.criteria.attributionClass || []

    if (selected) {
      updatedValues = [...updatedValues, name]
    } else {
      updatedValues = updatedValues.filter(item => item !== name)
    }
    dispatch({
      type: "SET_CRITERIA_ATTRIBUTE",
      payload: { key: "attributionClass", value: updatedValues },
    })
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
                selected={state.criteria.attributionClass?.includes(value)}
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
