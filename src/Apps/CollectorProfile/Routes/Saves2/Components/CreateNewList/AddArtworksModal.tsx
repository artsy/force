import React from "react"
import { Flex, Text, ModalDialog, Spacer, Button } from "@artsy/palette"
import { SortFilter } from "Components/SortFilter"
import { ArtworksList, TEMP_ARTWORKS } from "./ArtworksList"

interface AddArtworksModalProps {
  visible: boolean
  onClose: () => void
  onComplete: () => void
  listName: string
}

const AddArtworksModal: React.FC<AddArtworksModalProps> = ({
  listName,
  onClose,
}) => {
  return (
    <ModalDialog
      width={["100%", 713]}
      height={["100%", 800]}
      onClose={onClose}
      title={`${listName} created. Add saved works to the list.`}
      data-testid="CreateNewList"
      footer={
        <Flex justifyContent={"space-between"} alignItems={"baseline"}>
          <Text variant={"sm"}>{0} artworks selected</Text>

          <Button onClick={() => {}}>Save</Button>
        </Flex>
      }
    >
      <>
        <Flex justifyContent={"space-between"} alignItems={"baseline"}>
          <Text variant="sm">{TEMP_ARTWORKS.length} Artworks:</Text>

          <SortFilter
            sortOptions={[{ text: "Recently Saved", value: "-position" }]}
            selected={"-position"}
            onSort={() => {}}
          />
        </Flex>

        <Spacer y={1} />

        <ArtworksList />
      </>
    </ModalDialog>
  )
}

export const AddArtworksModalContainer: React.FC<AddArtworksModalProps> = props => {
  const { visible } = props

  if (!visible) return null

  return <AddArtworksModal {...props} />
}
