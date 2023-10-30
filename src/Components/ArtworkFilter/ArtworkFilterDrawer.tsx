import { Box, Drawer, Flex, ModalClose, Spacer, Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { FC, ReactNode } from "react"

interface ArtworkFilterDrawerProps {
  children: ReactNode
  open: boolean
  onClose: () => void
}

export const ArtworkFilterDrawer: FC<ArtworkFilterDrawerProps> = ({
  children,
  open,
  onClose,
}) => {
  return (
    <Drawer zIndex={Z.dropdown} open={open} onClose={onClose} anchor="left">
      <Box p={2} minWidth={375} position="relative">
        <Flex alignItems="center">
          <Text variant="xs" flex={1}>
            Filters
          </Text>

          <ModalClose onClick={onClose} />
        </Flex>

        <Spacer y={4} />

        {children}
      </Box>
    </Drawer>
  )
}
