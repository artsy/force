import { Box, Checkbox, Flex, Join, Spacer, Text } from "@artsy/palette"
import { entries } from "lodash"
import { FC } from "react"
import { WAYS_TO_BUY_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { SearchCriteriaAttributeKeys } from "Components/SavedSearchAlert/types"

interface WayToBuy {
  selected: boolean
  name: string
  key: SearchCriteriaAttributeKeys
}

export const WaysToBuy: FC = () => {
  const { state, dispatch } = useAlertContext()

  const checkboxes: WayToBuy[] = entries(WAYS_TO_BUY_OPTIONS).map(
    ([key, value]) => ({
      key: key as SearchCriteriaAttributeKeys,
      name: value.name,
      selected: state.criteria[key],
    })
  )

  return (
    <>
      <Text variant="sm-display">Ways to buy</Text>
      <Spacer y={2} />
      <Box style={{ columns: "2" }}>
        <Flex flexDirection="column">
          {checkboxes.map((checkbox, index) => {
            return (
              <>
                <Join separator={<Spacer y={1} />}>
                  <Checkbox
                    key={index}
                    onSelect={value => {
                      dispatch({
                        type: "SET_CRITERIA_ATTRIBUTE",
                        payload: { key: checkbox.key, value },
                      })
                    }}
                    selected={checkbox.selected}
                    my={1}
                  >
                    {checkbox.name}
                  </Checkbox>
                </Join>
              </>
            )
          })}
        </Flex>
      </Box>
    </>
  )
}
