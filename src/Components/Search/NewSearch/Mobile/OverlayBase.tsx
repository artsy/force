import CloseIcon from "@artsy/icons/CloseIcon"
import {
  Box,
  Clickable,
  DROP_SHADOW,
  Flex,
  ModalBase,
  useSentinelVisibility,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FC } from "react"
import styled from "styled-components"

interface OverlayBaseProps {
  header: any // TODO: fix
  onClose: () => void
}

export const OverlayBase: FC<OverlayBaseProps> = ({
  header,
  children,
  onClose,
}) => {
  const {
    sentinel: topSentinel,
    isSentinelVisible: isAtTop,
  } = useSentinelVisibility()

  return (
    <ModalBase
      dialogProps={{
        width: "100%",
        height: "100%",
        background: "black100",
        justifyContent: "center",
        backgroundColor: "white100",
      }}
    >
      <Flex bg="white100" style={{ boxShadow: DROP_SHADOW }}></Flex>

      <Flex flexDirection="column" overflow="hidden" width="100%">
        <Flex
          flexDirection="column"
          zIndex={1}
          style={{
            transition: "box-shadow 250ms",
            boxShadow: isAtTop ? DROP_SHADOW : undefined,
          }}
        >
          <Flex alignItems="flex-start" justifyContent="space-between">
            <Close p={2} ml="auto" onClick={onClose} aria-label="Close">
              <CloseIcon fill="currentColor" display="block" />
            </Close>
          </Flex>

          <Box>{header}</Box>
        </Flex>

        <Box
          flex={1}
          overflow="auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {topSentinel}
          {children}
        </Box>
      </Flex>
    </ModalBase>
  )
}

const Close = styled(Clickable)`
  color: ${themeGet("colors.black100")};

  &:focus,
  &.focus-visible {
    outline: none;
    color: ${themeGet("colors.black60")};
  }
`
