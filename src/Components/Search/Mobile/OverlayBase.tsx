import CloseIcon from "@artsy/icons/CloseIcon"
import {
  Box,
  Clickable,
  Flex,
  ModalBase,
  useSentinelVisibility,
  useTheme,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FC } from "react"
import styled from "styled-components"

export const OVERLAY_CONTENT_ID = "MobileSearchOverlayContent"

interface OverlayBaseProps {
  header: JSX.Element
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

  const { theme } = useTheme()

  return (
    <ModalBase
      dialogProps={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        backgroundColor: "white100",
      }}
    >
      <Flex
        bg="white100"
        style={{ boxShadow: theme.effects.dropShadow }}
      ></Flex>

      <Flex flexDirection="column" overflow="hidden" width="100%">
        <Flex
          flexDirection="column"
          zIndex={1}
          style={{
            transition: "box-shadow 250ms",
            boxShadow: isAtTop ? theme.effects.dropShadow : undefined,
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
          id={OVERLAY_CONTENT_ID}
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
