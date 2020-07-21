import React from "react"
import styled from "styled-components"
import {
  BorderBox,
  BorderBoxProps,
  Box,
  Flex,
  Sans,
  Separator,
  Spacer,
} from "@artsy/palette"

const Container = styled(BorderBox)`
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.05);
`

export type MenuProps = BorderBoxProps & {
  title?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export const Menu: React.FC<MenuProps> = ({
  children,
  py = 1,
  title,
  width = 230,
  ...rest
}) => {
  return (
    <Container
      width={width}
      p={0}
      py={py}
      background="white"
      display="flex"
      flexDirection="column"
      {...rest}
    >
      {title && (
        <Box px={2} pt={1} pb={1}>
          <Sans size="3">{title}</Sans>
          <Spacer py={0.5} />
          <Separator />
        </Box>
      )}

      <Flex flexDirection="column">{children}</Flex>
    </Container>
  )
}
