import {
  Box,
  Flex,
  Text,
  DROP_SHADOW,
  Clickable,
  CloseIcon,
  Spacer,
  BoxProps,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled from "styled-components"

interface ArtworkPopoutPanelProps extends BoxProps {
  title: string
  onClose: () => void
}

export const ArtworkPopoutPanel: React.FC<ArtworkPopoutPanelProps> = ({
  onClose,
  title,
  children,
  ...rest
}) => {
  return (
    <Container bg="white100" minWidth={300} {...rest}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text
          mt={1}
          mx={1}
          variant="xs"
          textTransform="uppercase"
          lineHeight={1}
        >
          {title}
        </Text>

        <CloseButton pt={1} px={1} onClick={onClose}>
          <CloseIcon
            width={14}
            height={14}
            // @ts-ignore
            fill="currentColor"
          />
        </CloseButton>
      </Flex>

      <Spacer mt={1} />

      {children}
    </Container>
  )
}

const CloseButton = styled(Clickable)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${themeGet("colors.black60")};
  transition: color 250ms;

  &:hover {
    color: ${themeGet("colors.black100")};
  }
`

const Container = styled(Box)`
  border-radius: 2px;
  box-shadow: ${DROP_SHADOW};
`
