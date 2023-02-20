import React, { useState } from "react"
import { Spacer, Join, ModalDialog } from "@artsy/palette"
import {
  ListItemEntity,
  SelectListItem,
} from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListItem"
import { SelectListsForArtworkHeader } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkHeader"
import { SelectListsForArtworkFooter } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkFooter"
import { times } from "lodash"

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

const items: ListItemEntity[] = times(20).map(item => ({
  id: `collection-id-${item}`,
  title: `Collection #${item + 1}`,
  count: item,
}))
