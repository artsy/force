import { Button, Flex, Text } from "@artsy/palette"
import { FC } from "react"

interface SelectListsForArtworkFooterProps {
  selectedListsCount: number
  onSaveClick: () => void
}

export const SelectListsForArtworkFooter: FC<SelectListsForArtworkFooterProps> = ({
  selectedListsCount,
  onSaveClick,
}) => {
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      m={2}
    >
      <Text variant="sm-display">{selectedListsCount} lists selected</Text>
      <Button onClick={onSaveClick}>Save</Button>
    </Flex>
  )
}
