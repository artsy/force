import React from "react"
import { useSentinelVisibility } from "@artsy/palette/dist/utils/useSentinelVisibility"
import { DROP_SHADOW } from "@artsy/palette/dist/helpers/shadow"
import { Box, BoxProps } from "@artsy/palette/dist/elements/Box/Box"
import { Flex, ModalClose } from "@artsy/palette"

export interface ModalDialogContentProps
  extends BoxProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  onClose?(): void
  header?: React.ReactNode
}

export const ModalContent: React.FC<ModalDialogContentProps> = ({
  children,
  header,
  onClose,
}) => {
  const {
    sentinel: topSentinel,
    isSentinelVisible: isAtTop,
  } = useSentinelVisibility()

  return (
    <Flex
      bg="white100"
      style={{ boxShadow: DROP_SHADOW }}
      width="100%"
      flexDirection="column"
      overflow="hidden"
    >
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        zIndex={1}
        style={{
          transition: "box-shadow 250ms",
          boxShadow: isAtTop ? DROP_SHADOW : undefined,
        }}
      >
        {header && (
          <>
            <Box p={2}>{header}</Box>
            <ModalClose onClick={onClose} />
          </>
        )}
      </Flex>

      <Box
        flex={1}
        overflow="auto"
        width="100%"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {topSentinel}
        {children}
      </Box>
    </Flex>
  )
}
