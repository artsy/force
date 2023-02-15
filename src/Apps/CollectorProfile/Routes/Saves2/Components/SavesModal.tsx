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
  Button,
  CheckCircleIcon,
  Join,
} from "@artsy/palette"
import { useTranslation } from "react-i18next"

export interface SavesModalProps extends ModalBaseProps {
  title: string
  onClose: () => void
}

export const SavesModal: React.FC<SavesModalProps> = ({
  children,
  onClose,
  title,
  ...rest
}) => {
  const { t } = useTranslation()
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

        <Flex flexDirection="row" alignItems="center" m={2}>
          <Flex flexDirection="row" alignItems="center">
            <Flex flexShrink={0} width={50} height={50} bg="black10" />
            <Spacer x={1} />
            <Text>Marie Pop, The NAR, 2016</Text>
          </Flex>

          <Spacer x={1} />

          <Button variant="secondaryBlack" size="small">
            Create New List
          </Button>
        </Flex>

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
                <Clickable
                  display="flex"
                  width="100%"
                  flexDirection="row"
                  alignItems="center"
                  borderRadius={10}
                  p={1}
                  border="1px solid"
                  borderColor={isSelected ? "brand" : "transparent"}
                  onClick={() => handleItemSelected(item.id)}
                >
                  <Flex width={60} height={60} bg="black10" flexShrink={0} />

                  <Spacer x={1} />

                  <Flex flexDirection="column" flex={1}>
                    <Text variant="sm-display">{item.title}</Text>
                    <Text variant="sm-display" color="black60">
                      {t("collectorSaves.artworkLists.artworkWithCount", {
                        count: item.count,
                      })}
                    </Text>
                  </Flex>

                  <Spacer x={1} />

                  <CheckCircleIcon width={24} height={24} />
                </Clickable>
              )
            })}
          </Join>
        </Box>

        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          m={2}
        >
          <Text variant="sm-display">2 lists selected</Text>
          <Button>Save</Button>
        </Flex>
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

const items = [
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
