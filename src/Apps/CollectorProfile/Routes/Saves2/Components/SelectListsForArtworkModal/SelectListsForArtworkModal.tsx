import React, { useState } from "react"
import {
  ModalBase,
  ModalBaseProps,
  splitBoxProps,
  useDidMount,
  Box,
  Text,
  Flex,
  Spacer,
  Clickable,
  CloseIcon,
  Join,
} from "@artsy/palette"
import {
  ListItemEntity,
  SelectListItem,
} from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListItem"
import { SelectListsForArtworkHeader } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkHeader"
import { SelectListsForArtworkFooter } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkFooter"

export interface SelectListsForArtworkModalProps extends ModalBaseProps {
  title: string
  onClose: () => void
}

export const SelectListsForArtworkModal: React.FC<SelectListsForArtworkModalProps> = ({
  children,
  onClose,
  title,
  ...rest
}) => {
  const isMounted = useDidMount()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [boxProps, modalProps] = splitBoxProps(rest)
  const styles = getStyles(isMounted ?? false)

  const handleItemSelected = (selectedId: string) => {
    if (selectedIds.includes(selectedId)) {
      const updatedSelectedIds = selectedIds.filter(id => id !== selectedId)

      setSelectedIds(updatedSelectedIds)
      return
    }

    setSelectedIds([...selectedIds, selectedId])
  }

  const handleSaveClicked = () => {
    console.log("[debug] save pressed")
  }

  return (
    <ModalBase
      onClose={onClose}
      style={styles.modal}
      dialogProps={{
        width: ["100%", 700],
        height: ["100%", "90%"],
        maxHeight: [null, 800],
      }}
      {...modalProps}
    >
      <Box width="100%" bg="white100">
        <Flex flexDirection="row" justifyContent="space-between" m={2}>
          <Text variant="lg-display">{title}</Text>
          <Clickable onClick={onClose} ml={1} aria-label="Close">
            <CloseIcon fill="black100" />
          </Clickable>
        </Flex>

        <Spacer y={4} />

        <SelectListsForArtworkHeader />

        <Box
          overflowY="auto"
          style={{
            WebkitOverflowScrolling: "touch",
            margin: 20,
          }}
          {...boxProps}
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
        </Box>

        <SelectListsForArtworkFooter
          selectedListsCount={selectedIds.length}
          onSaveClick={handleSaveClicked}
        />
      </Box>
    </ModalBase>
  )
}

const getStyles = (isMounted: boolean) => {
  if (isMounted) {
    return {
      modal: {
        backgroundColor: "rgba(229, 229, 229, 0.5)",
        transition: "background-color 250ms",
      },
      content: {
        opacity: 1,
        transform: "translateY(0)",
        transition: "opacity 100ms, transform 250ms",
      },
    }
  }

  return {
    modal: {
      backgroundColor: "transparent",
    },
    content: {
      opacity: 0,
      transform: "translateY(10px)",
    },
  }
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
