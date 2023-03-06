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
  const handleSave = () => {
    onClose()
  }

  // TODO: title - next line after "XXX" created.

  return (
    <ModalDialog
      m={["0", "auto"]}
      dialogProps={{
        width: ["100%", 700],
        height: ["100%", "auto"],
        maxHeight: [null, 800],
      }}
      onClose={onClose}
      title={`${listName} created. Add saved works to the list.`}
      data-testid="CreateNewList"
      footer={
        <Flex justifyContent={"space-between"} alignItems={"baseline"}>
          <Text variant={"sm"}>{0} artworks selected</Text>

          <Button onClick={handleSave}>Save</Button>
        </Flex>
      }
    >
      <>
        <Flex justifyContent={"space-between"} alignItems={"baseline"}>
          <b>
            <Text variant={["xs", "sm"]}>{TEMP_ARTWORKS.length} Artworks:</Text>
          </b>

          <SortFilter
            sortOptions={[{ text: "Recently Saved", value: "-position" }]}
            selected={"-position"}
            onSort={() => {}}
          />
        </Flex>

        <Spacer y={2} />

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
