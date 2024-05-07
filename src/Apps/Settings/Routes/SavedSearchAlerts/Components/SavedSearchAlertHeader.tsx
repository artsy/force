import { Flex, Option, Select, Text } from "@artsy/palette"
import { FC } from "react"

interface SavedSearchAlertHeaderProps {
  selected: string
  onSortSelect: (value: string) => void
}

const SORT_OPTIONS: Option[] = [
  { value: "ENABLED_AT_DESC", text: "Recently Added" },
  { value: "NAME_ASC", text: "Name (A-Z)" },
]

export const SavedSearchAlertHeader: FC<SavedSearchAlertHeaderProps> = ({
  selected,
  onSortSelect,
}) => {
  return (
    <Flex
      flexDirection={["column", "row"]}
      alignItems={["stretch", "center"]}
      justifyContent="space-between"
      gap={[1, 2]}
    >
      <Text variant={["md", "lg"]}>Your Alerts</Text>

      <Select
        title="Sort"
        options={SORT_OPTIONS}
        selected={selected}
        onSelect={onSortSelect}
        width="auto"
      />
    </Flex>
  )
}
