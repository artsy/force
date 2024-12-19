import { Button, Flex, Text } from "@artsy/palette"
import type { FC } from "react"

interface SelectArtworkListsFooterProps {
  selectedArtworkListsCount: number
  hasChanges?: boolean
  isSaving?: boolean
  onSaveClick: () => void
}

export const SelectArtworkListsFooter: FC<
  React.PropsWithChildren<SelectArtworkListsFooterProps>
> = ({ selectedArtworkListsCount, hasChanges, isSaving, onSaveClick }) => {
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text variant="sm-display">
        {selectedArtworkListsCount === 1
          ? `${selectedArtworkListsCount} list selected`
          : `${selectedArtworkListsCount} lists selected`}
      </Text>
      <Button onClick={onSaveClick} loading={isSaving} disabled={!hasChanges}>
        Save
      </Button>
    </Flex>
  )
}
