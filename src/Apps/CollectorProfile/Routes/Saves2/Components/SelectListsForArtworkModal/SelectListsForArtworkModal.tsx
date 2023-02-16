import React, { useState } from "react"
import { Spacer, Join, ModalDialog } from "@artsy/palette"
import {
  ListItemEntity,
  SelectListItem,
} from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListItem"
import { SelectListsForArtworkHeader } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkHeader"
import { SelectListsForArtworkFooter } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkFooter"

export interface SelectListsForArtworkModalProps {
  onClose: () => void
}

export const SelectListsForArtworkModal: React.FC<SelectListsForArtworkModalProps> = ({
  onClose,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const handleItemSelected = (selectedId: string) => {
    if (selectedIds.includes(selectedId)) {
      const updatedSelectedIds = selectedIds.filter(id => id !== selectedId)

      setSelectedIds(updatedSelectedIds)
      return
    }

    setSelectedIds([...selectedIds, selectedId])
  }

  const handleSaveClicked = () => {
    onClose()
  }

  return (
    <ModalDialog
      title="Select lists for this artwork"
      onClose={onClose}
      onClick={event => {
        event.preventDefault()
      }}
      dialogProps={{
        width: ["100%", 700],
        height: ["100%", "auto"],
        maxHeight: [null, 800],
      }}
      m={0}
      header={<SelectListsForArtworkHeader />}
      footer={
        <SelectListsForArtworkFooter
          selectedListsCount={selectedIds.length}
          onSaveClick={handleSaveClicked}
        />
      }
    >
      <Join separator={<Spacer y={1} />}>
        {items.map(item => {
          const isSelected = selectedIds.includes(item.id)

          return (
            <SelectListItem
              item={item}
              isSelected={isSelected}
              onClick={handleItemSelected}
            />
          )
        })}
      </Join>
    </ModalDialog>
  )
}

const items: ListItemEntity[] = [
  {
    id: "collection-id-one",
    title: "All Saves",
    count: 36,
  },
  {
    id: "collection-id-two",
    title: "Works for Justine",
    count: 15,
  },
  {
    id: "collection-id-three",
    title: "Works for Liam",
    count: 5,
  },
  {
    id: "collection-id-four",
    title: "Dining room",
    count: 10,
  },
  {
    id: "collection-id-five",
    title: "Works for Kidane",
    count: 1,
  },
  {
    id: "collection-id-six",
    title: "Abstract",
    count: 6,
  },
]
